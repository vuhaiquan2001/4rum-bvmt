const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const moment = require('moment');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'quancap2001',
    database: 'forumbvmt'
  });
  
  connection.connect(function(err){
    (err) ? console.log(err) : console.log('Ket noi thanh cong');
  });
  
//API GET DATA
  //lấy ra tất cả topic
  app.get('/api/topics', (req, res) => {
  var sql = "SELECT * FROM topics";
  connection.query(sql, (err, results) =>{
    if (err) throw err;
    res.json(results);
  });
  });
  // lấy ra topic theo idtopic
  app.get('/api/topics/:id', (req, res) => {
    const {id}= req.params;
    var sql = "SELECT * FROM topics where idtopic =?";
    connection.query(sql, id,(err, results) =>{
      if (err) throw err;
      res.json(results);
    });
    });

  //api cho chi tiết bài viết theo id bài viết
  app.get('/api/postdetail/:id', (req, res) => {
    const {id}= req.params;
    const sql = "SELECT * FROM posts, user_detail where posts.iduser=user_detail.iduser and idpost=?";
    connection.query(sql, id,(err, results) =>{
      if (err) throw err;
      res.json(results);
    });
  })
  //lấy ra detail user theo id user
  app.get('/api/user/:id', (req, res) => {
    const {id}= req.params;
    const sql = "SELECT * FROM user_detail where iduser=?";
    connection.query(sql, id,(err, results) =>{
      if(results){
      res.json(results);
      } else {
        res.json({message: 'Không xác định được user'})
      }
    });
  })
  // lấy ra detail user bằng email
  app.get('/api/useremail/:email', (req, res) => {
    const {email}= req.params;
    const sql = "SELECT * FROM users where useremail=?";
    connection.query(sql, email,(err, results) =>{
      if (err) throw err;
      res.json(results);
    });
  })
  //lấy api user và post cho post list theo topic
  app.get('/api/userpost/:id', (req, res) => {
    const {id}= req.params;
    const sql = "SELECT * FROM posts, user_detail where posts.iduser=user_detail.iduser and idtopic=?";
    connection.query(sql, id,(err, results) =>{
      if (err) throw err;
      res.json(results);
    });
  })

  app.get('/api/reply/:id', (req, res) => {
    const {id}= req.params;
    const sql = "SELECT * FROM replys, user_detail where replys.iduser=user_detail.iduser and idpost=?";
    connection.query(sql, id,(err, results) =>{
      if (err) throw err;
      res.json(results);
    });
  })
// API POST DATA

  app.post('/api/login', async (req, res) => {
    const {email,password}=req.body;
    connection.query('select password from users where useremail=?', email,(err, rs)=>{
      if(rs.length>0){
        const sql = "SELECT * FROM users where useremail =? and password =?";
        bcrypt.compare(password, JSON.parse(JSON.stringify(rs))[0].password).then(function(iscorrect) {   
          if(iscorrect){
            connection.query(sql, [email, JSON.parse(JSON.stringify(rs))[0].password],(err, results) =>{
              if (results){
                const userdata=JSON.parse(JSON.stringify(results))[0].iduser
                connection.query("select * from user_detail where iduser=?", userdata, (err, rs)=>{
                  if(rs){
                    res.json(rs)
                  } else{
                    res.json({message: "Đã có vấn đề sảy ra @@!"})
                  }
                })
              } else {
                res.json({message: err});}
            });
          } else{
            res.json({message: 'Mật khẩu không chính xác'})
          }
        })
      } else {
        res.json({message: 'Email không tồn tại'})
      }
    })
  })

  app.post('/api/register', async (req, res) => {
    const {email,password}=req.body;
    const joindate = moment().format("yyyy-MM-DD");
    const username = 'user'+Math.random().toString().slice(2);
    const usertitle = 'member';
    const userdesc = '';
    const useravatar = 'https://as2.ftcdn.net/v2/jpg/03/31/69/91/1000_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg'
    const usercoverimg = 'https://cdn.metatft.com/file/metatft/home/set7_bg.webp';
    const isban = 0;
    const ischatban = 0;
    bcrypt.hash(password, 10)
    .then(function(hash) {
      const sql = "Insert into users (useremail, password) values (?,?)";
        connection.query(sql, [email, hash],(err, results) =>{
          if(results){
            const sql2 = "Insert into user_detail (iduser, username, joindate, usertitle, useravatar, usercoverimg, isban, ischatban, userdesc) values (?,?,?,?,?,?,?,?,?)";
            console.log(results.insertId)
            connection.query(sql2, [results.insertId, username, joindate, usertitle, useravatar, usercoverimg, isban, ischatban, userdesc], (err2, rs)=>{
              if(rs){
                connection.query("select * from user_detail where iduser_detail=?", rs.insertId, (err, rs)=>{
                  if(rs){
                    res.json(rs)
                  } else {
                    res.json({message: "Có sự cố sảy ra @@!"})
                  }
                })
              } else {
                res.json({message: "Có sự cố sảy ra @@!"})
              }
            })
          } else{
            res.json({message: "Email đã tồn tại!"})
          }  
        });
    });
  })

  app.post('/api/uppost', (req, res) => {
    const {posttitle, idtopic, postdesc, postthumb, iduser, tags}=req.body;
    const ngaytao = moment().format("yyyy-MM-DD");
    const likequantity = 0;
    const viewquantity = 0;
    const commentquantity = 0;
      const sql = "Insert into posts (posttitle, idtopic, postdesc, ngaytao, likequantity, viewquantity, commentquantity, postthumb, iduser, tags) values (?,?,?,?,?,?,?,?,?,?)";
        connection.query(sql, [posttitle, idtopic, postdesc, ngaytao, likequantity, viewquantity, commentquantity, postthumb, iduser, tags],(err, results) =>{
          if(results){
              res.send(results) 
          } else{
            res.json({message: err})
          }  
        });
  })

  app.post('/api/reply', (req, res) => {
    const {idpost, iduser, replydesc, replyref}=req.body;
    const replydate = moment().format("yyyy-MM-DD");
    const rereply = JSON.stringify(replyref)
    const replylike = 0;
      const sql = "Insert into replys (idpost, iduser, replydesc, replydate, replyref, replylike) values (?,?,?,?,?,?)";
        connection.query(sql, [idpost, iduser, replydesc, replydate, rereply, replylike],(err, results) =>{
          if(results){
              res.send(results) 
          } else{
            res.json({message: err})
          }  
        });
  })
  // PATCH API
  app.patch('/api/updatepost', (req, res) => {
    const {posttitle, idpost, postdesc, postthumb, tags}=req.body;
    const postupdate = moment().format("yyyy-MM-DD");
      const sql = "Update posts set posttitle=?, postdesc=?, postthumb=?, tags=?, postupdate=? where idpost=? ";
        connection.query(sql, [posttitle, postdesc, postthumb, tags, postupdate, idpost],(err, results) =>{
          if(results){
              res.send(results) 
              console.log(results)
          } else{
            res.json({message: err})
          }  
        });
  })

  app.patch('/api/updateuser', (req, res) => {
    const {iduser, username, userdesc, useravatar, usercoverimg}=req.body;
      const sql = "Update user_detail set username=?, userdesc=?, useravatar=?, usercoverimg=? where iduser=? ";
        connection.query(sql, [username, userdesc, useravatar, usercoverimg, iduser],(err, results) =>{
          if(results){
              res.send(results) 
              console.log(results)
          } else{
            res.json({message: err})
          }  
        });
  })
  //DELETE API
  app.get('/api/deletepost/:id', (req, res) => {
    const {id}= req.params;
    const sql = "Delete from posts where idpost=?";
    connection.query(sql, id,(err, results) =>{
      if (err) throw err;
      res.json(results);
    });
  })
app.listen(4000, () => console.log('App listening on port 4000'));