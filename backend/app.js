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


  // lấy bài viết mới nhất
  app.get('/api/newestpost', (req, res) => {
    var sql = "SELECT * FROM posts, user_detail where not idtopic=1 and posts.iduser=user_detail.iduser order by ngaytao desc";
    connection.query(sql, (err, results) =>{
      if (err) throw err;
      res.json(results);
    });
    });
  // lấy bài viết nhiều vote nhất
  app.get('/api/themostvotes', (req, res) => {
    var sql = "SELECT * FROM posts, user_detail where not idtopic=1 and posts.iduser=user_detail.iduser order by likequantity desc";
    connection.query(sql, (err, results) =>{
      if (err) throw err;
      res.json(results);
    });
    });
   // lấy bài viết nhiều views nhất
  app.get('/api/themostviews', (req, res) => {
    var sql = "SELECT * FROM posts, user_detail where not idtopic=1 and posts.iduser=user_detail.iduser order by viewquantity desc";
    connection.query(sql, (err, results) =>{
      if (err) throw err;
      res.json(results);
    });
    }); 
  // lấy bài viết nhiều replys nhất
  app.get('/api/themostreplys', (req, res) => {
    var sql = "SELECT * FROM posts, user_detail where not idtopic=1 and posts.iduser=user_detail.iduser order by commentquantity desc";
    connection.query(sql, (err, results) =>{
      if (err) throw err;
      res.json(results);
    });
    }); 
    // lấy bài viết nhiều của những người đã follow 
  app.get('/api/followingpost/:id', (req, res) => {
    const {id}= req.params;
    var sql = "SELECT * FROM posts,user_detail where posts.iduser in (select following_id from follows where follower_id=?) and posts.iduser=user_detail.iduser";
    connection.query(sql, id,(err, results) =>{
      if(results.length>0){
        res.json(results)
      } else {
        res.json({message: 'Bạn không follow ai cả.'})
      }
    });
    }); 

    // lấy bài 10 viết nhiều views nhất
  app.get('/api/top10views', (req, res) => {
    var sql = "SELECT * FROM posts, user_detail where not idtopic=1 and posts.iduser=user_detail.iduser order by viewquantity desc Limit 10";
    connection.query(sql, (err, results) =>{
      if (err) throw err;
      res.json(results);
    });
    }); 
  //api cho chi tiết bài viết theo id bài viết
  app.get('/api/postdetail/:id', (req, res) => {
    const {id}= req.params;
    const sql = "SELECT * FROM posts, user_detail where posts.iduser=user_detail.iduser and idpost=?";
    connection.query(sql, id,(err, results) =>{
      if(results.length>0){
        const viewquantity=JSON.parse(JSON.stringify(results))[0].viewquantity +1;
        connection.query('update posts set viewquantity=? where idpost=?',[viewquantity,id],(err,rs)=>{
        })
        res.json(results)
      } else{
        res.json({message: 'Không thể lấy thông tin post!'})
      }
    });
  })
  //api get post by iduser
  app.get('/api/profilepost/:id', (req, res) => {
    const {id}= req.params;
    const sql = "SELECT * FROM posts where iduser=?";
    connection.query(sql, id,(err, results) =>{
      if(results){
        res.json(results)
      } else{
        res.json({message: 'Không thể lấy thông tin post!'})
      }
    });
  })
  //api get post for user storage
  //bookmark post
  app.get('/api/userbookmarkpost/:id', (req, res) => {
    const {id}= req.params;
    //lấy tất cả thông tin ở bảng posts với điều kiện idpost = (idpost trong bảng postemotion và id = iduser)
    const sql = "select * from posts, user_detail where posts.iduser=user_detail.iduser and idpost in (SELECT idpost FROM posts where idpost in (select idpost from bookmark where iduser =?))";
    connection.query(sql, id,(err, results) =>{
      if(results){
        res.json(results)
      } else{
        res.json({message: 'Không thể lấy thông tin post!'})
      }
    });
  })
  //voted post
  app.get('/api/uservotepost/:id', (req, res) => {
    const {id}= req.params;
    //lấy tất cả thông tin ở bảng posts với điều kiện idpost = (idpost trong bảng postemotion và id = iduser)
    const sql = "select * from posts, user_detail where posts.iduser=user_detail.iduser and idpost in (SELECT idpost FROM posts where idpost in (select idpost from postemotion where iduser =?))";
    connection.query(sql, id,(err, results) =>{
      if(results){
        res.json(results)
      } else{
        res.json({message: 'Không thể lấy thông tin post!'})
      }
    });
  })


  //
  app.get('/api/commentcount/:id',(req,res)=>{
    const {id}= req.params;
    connection.query('select count(idreply) as comment from replys where idpost=?',id,(err,rs)=>{
      if(rs){
        res.json(rs)
      }
    })
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
  // lấy account user
  app.get('/api/useraccount/:id', (req, res) => {
    const {id}= req.params;
    const sql = "SELECT * FROM users where iduser=?";
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
  app.get('/api/homepost/:id', (req, res) => {
    const {id}= req.params;
    const sql = `SELECT * FROM posts, user_detail where posts.iduser=user_detail.iduser and idtopic=? order by ngaytao desc limit 3`;
    connection.query(sql, id,(err, results) =>{
      if (err) throw err;
      res.json(results);
    });
  })

  //lấy api user và post cho post list theo topic
  app.get('/api/userpost', (req, res) => {
    const {id, orderby}= req.query;
    const sql = `SELECT *FROM posts, user_detail where posts.iduser=user_detail.iduser and idtopic=? order by ${orderby}`;
    connection.query(sql, id,(err, results) =>{
      if (err) throw err;
      res.json(results);
    });
  })

  app.get('/api/reply/:id', (req, res) => {
    const {id}= req.params;
    const sql = "SELECT * FROM replys, user_detail where replys.iduser=user_detail.iduser and idpost=? order by replydate desc";
    connection.query(sql, id,(err, results) =>{
      if (err) throw err;
      res.json(results);
    });
  })
  //api search page
  app.get('/api/searchpost/:keyword', (req, res) => {
    const {keyword}= req.params;
    const sql = "SELECT * FROM posts, user_detail where posts.iduser=user_detail.iduser and posttitle like ?";
    connection.query(sql, `%${keyword}%`,(err, results) =>{
      if (err) throw err;
      res.json(results);
    });
  })

  app.get('/api/searchuser/:keyword', (req, res) => {
    const {keyword}= req.params;
    const sql = "SELECT * FROM user_detail where username like ?";
    connection.query(sql, `%${keyword}%`,(err, results) =>{
      if (err) throw err;
      res.json(results);
    });
  })

  //api get topuser
  app.get('/api/topuser', (req, res) => {
    const sql = "SELECT (SELECT username from user_detail where user_detail.iduser = posts.iduser) as username, (SELECT useravatar from user_detail where user_detail.iduser = posts.iduser) as useravatar,(SELECT iduser from user_detail where user_detail.iduser = posts.iduser) as iduser, SUM(commentquantity) + SUM(viewquantity) + SUM(likequantity) AS Sum  FROM posts WHERE posts.iduser IN (SELECT iduser from user_detail) GROUP BY iduser ORDER BY sum DESC LIMIT 10";
    connection.query(sql, (err, results) =>{
      if (results.length>0){
      res.json(results);
      }
    });
  })
  //api get follower
  app.get('/api/getfollower/:iduser', (req, res) => {
    const {iduser} = req.params;
    const sql = "select * from user_detail where iduser in (select follower_id as iduser from follows where following_id=?)";
    connection.query(sql, iduser,(err, results) =>{
      if (results.length>0){
      res.json(results);
      } else {
        res.json({message: 'Bạn không có Follower nào :('})
      }
    });
  })
  //api get following
  app.get('/api/getfollowing/:iduser', (req, res) => {
    const {iduser} = req.params;
    const sql = "select * from user_detail where iduser in (select following_id as iduser from follows where follower_id=?)";
    connection.query(sql, iduser,(err, results) =>{
      if (results.length>0){
      res.json(results); 
      } else {
        res.json({message: 'Bạn không theo dõi ai :('})
      }
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
            connection.query('select count(idpost) as post from posts where iduser=?', iduser, (err,rs)=>{
              if(rs){
                const postcount = JSON.parse(JSON.stringify(rs))[0].post
                connection.query('update user_detail set postCount=? where iduser=?',[postcount, iduser])
              }
            })
              res.send(results) 
          } else{
            res.json({message: err})
          }  
        });
  })
  //api gửi bình luận
  app.post('/api/upreply', (req, res) => {
    const {idpost, iduser, replydesc, replyref}=req.body;
    const replydate = moment().format("yyyy-MM-DD");
    const rereply = JSON.stringify(replyref)
    const replylike = 0;
      const sql = "Insert into replys (idpost, iduser, replydesc, replydate, replyref, replylike) values (?,?,?,?,?,?)";
        connection.query(sql, [idpost, iduser, replydesc, replydate, rereply, replylike],(err, results) =>{
          if(results){
            //nếu bình luận thành công thì tăng số bình luận ở post lên = số bình luận trong bảng bình luận
            connection.query('select count(idreply) as comment from replys where idpost=?', idpost, (err,rs)=>{
              if(rs){
                const commentcount = JSON.parse(JSON.stringify(rs))[0].comment
                connection.query('update posts set commentquantity=? where idpost=?',[commentcount, idpost])
              }
            })
              res.send(results)
          } else{
            res.json({message: err})
          }  
        });
  })
  //Api vote Post
  app.post('/api/votepost', (req, res) => {
    const {idpost, iduser}=req.body;
      const sql = "Select id_postemotion from postemotion where postemotion.iduser=? and postemotion.idpost=?";
       connection.query(sql,[iduser,idpost],(err,rs)=>{
        if(rs.length>0){
          // nếu thấy người dùng đã thích bài rồi thì xóa thích
          const id_emotion = JSON.parse(JSON.stringify(rs))[0].id_postemotion;
          const deletesql = "delete from postemotion where id_postemotion=?";
          connection.query(deletesql,id_emotion,(err,rs)=>{
            connection.query('select count(id_postemotion) as vote from postemotion where idpost=?', idpost, (err,rs)=>{
              if(rs){
                const emotioncount = JSON.parse(JSON.stringify(rs))[0].vote
                res.json({message: 'unvote', count: emotioncount})
                connection.query('update posts set likequantity=? where idpost=?',[emotioncount, idpost])
              }
            })
          })
        }else{
          const insertsql = "insert into postemotion (idpost, iduser) values (?,?)";
          connection.query(insertsql,[idpost, iduser],(err,rs)=>{
            connection.query('select count(id_postemotion) as vote from postemotion where idpost=?', idpost, (err,rs)=>{
              if(rs){
                const emotioncount = JSON.parse(JSON.stringify(rs))[0].vote;
                res.json({message: 'vote', count: emotioncount})
                connection.query('update posts set likequantity=? where idpost=?',[emotioncount, idpost])
              }
            })
          })
        }
       })
  })
  
    //api check ng dùng đã vote bài chưa
    app.post('/api/isvote', (req, res) => {
      const {idpost, iduser}=req.body;
      const sql = "Select id_postemotion from postemotion where postemotion.iduser=? and postemotion.idpost=?";
      connection.query(sql,[iduser,idpost],(err,rs)=>{
        if(rs.length>0){
          connection.query('select count(id_postemotion) as vote from postemotion where idpost=?', idpost, (err,rs)=>{
            if(rs){
              const emotioncount = JSON.parse(JSON.stringify(rs))[0].vote
              res.json({isvote: 'vote', count: emotioncount})
            }
          })
        }
      })
    })
    //Api bookmark
  app.post('/api/bookmark', (req, res) => {
    const {idpost, iduser}=req.body;
      const sql = "Select idbookmark from bookmark where bookmark.iduser=? and bookmark.idpost=?";
       connection.query(sql,[iduser,idpost],(err,rs)=>{
        if(rs.length>0){
          // nếu thấy người dùng đã thích bài rồi thì xóa thích
          const idbookmark = JSON.parse(JSON.stringify(rs))[0].idbookmark;
          const deletesql = "delete from bookmark where idbookmark=?";
          connection.query(deletesql,idbookmark,(err,rs)=>{
            if(rs) {
              res.json({message: 'unbookmark'})
            }
          })
        }else{
          const insertsql = "insert into bookmark (idpost, iduser) values (?,?)";
          connection.query(insertsql,[idpost, iduser],(err,rs)=>{   
              res.json({message: 'bookmark'})
          })
        }
       })
  })
    //api check ng dùng đã bookmark bài chưa
    app.post('/api/isbookmark', (req, res) => {
      const {idpost, iduser}=req.body;
      const sql = "Select idbookmark from bookmark where bookmark.iduser=? and bookmark.idpost=?";
      connection.query(sql,[iduser,idpost],(err,rs)=>{
        if(rs.length>0){ 
            res.json({isbookmark: 'bookmark'})
        }
      })
    })
    //api follow
    app.post('/api/follow', (req, res) => {
      //idfollower là id của người theo dõi, idfollowing là id của người được theo dõi, iduser ở đây là id của người cần xem số follow
      const {idfollower, idfollowing}=req.body;
      const sql = "Select idfollow from follows where follows.follower_id=? and follows.following_id=?";
       connection.query(sql,[idfollower, idfollowing],(err,rs)=>{
        if(rs.length>0){
          // nếu thấy người dùng đã thích bài rồi thì xóa thích
          const idfollow = JSON.parse(JSON.stringify(rs))[0].idfollow;
          const deletesql = "delete from follows where idfollow=?";
          connection.query(deletesql,idfollow,(err,rs)=>{
            // đếm các follower_id sẽ ra xem đã follow bao nhiêu người, đếm following_id sẽ ra số người đang theo dõi
            connection.query('select (select count(idfollow) from follows where follower_id=?) as following,(select count(follower_id) from follows where following_id=?) as follower', [idfollower, idfollowing], (err,rs)=>{
              if(rs){
                const follower = JSON.parse(JSON.stringify(rs))[0].follower;
                const following = JSON.parse(JSON.stringify(rs))[0].following;
                connection.query('update user_detail set followerCount=? where iduser=?',[follower, idfollowing])
                connection.query('update user_detail set followingCount=? where iduser=?',[following, idfollower])
                connection.query('select followerCount, followingCount from user_detail where iduser=?', idfollowing,(err,rs)=>{
                  if(rs.length>0){
                  const follower = JSON.parse(JSON.stringify(rs))[0].followerCount;
                  const following = JSON.parse(JSON.stringify(rs))[0].followingCount;
                   res.json({message: 'unfollow', follower, following})
                  }
                })
              }
            })
          })
        }else{
          const insertsql = "insert into follows (follower_id, following_id) values (?,?)";
          connection.query(insertsql,[idfollower, idfollowing],(err,rs)=>{
            connection.query('select (select count(following_id) from follows where follower_id=?) as following,(select count(follower_id) from follows where following_id=?) as follower', [idfollower, idfollowing], (err,rs)=>{
              if(rs){
                const follower = JSON.parse(JSON.stringify(rs))[0].follower;
                const following = JSON.parse(JSON.stringify(rs))[0].following;
                connection.query('update user_detail set followerCount=? where iduser=?',[follower, idfollowing])
                connection.query('update user_detail set followingCount=? where iduser=?',[following, idfollower])
                connection.query('select followerCount, followingCount from user_detail where iduser=?', idfollowing,(err,rs)=>{
                  if(rs.length>0){
                    const follower = JSON.parse(JSON.stringify(rs))[0].followerCount;
                    const following = JSON.parse(JSON.stringify(rs))[0].followingCount;
                    res.json({message: 'follow', follower, following})
                  }
                })
              }
            })
          })
        }
       })
    })
    //api check ng dùng đã follow bài chưa
    app.post('/api/isfollow', (req, res) => {
      const {idfollower, idfollowing}=req.body;
      const sql = "Select idfollow from follows where follows.follower_id=? and follows.following_id=?";
      connection.query(sql,[idfollower, idfollowing],(err,rs)=>{
        if(rs.length>0){ 
          connection.query('select followerCount, followingCount from user_detail where iduser=?', idfollowing,(err,rs)=>{
            if(rs.length>0){
              const follower = JSON.parse(JSON.stringify(rs))[0].followerCount;
              const following = JSON.parse(JSON.stringify(rs))[0].followingCount;
              res.json({message: 'follow', follower, following})
            }
          })
        } else {
          res.json({message: 'unfollow'})
        }
      })
    })
  // PATCH API
  app.patch('/api/updatepost', (req, res) => {
    const {posttitle, idpost, postdesc, postthumb, tags}=req.body;
    const postupdate = moment().format("yyyy-MM-DD");
      const sql = "Update posts set posttitle=?, postdesc=?, postthumb=?, tags=?, postupdate=? where idpost=? ";
        connection.query(sql, [posttitle, postdesc, postthumb, tags, postupdate, idpost],(err, results) =>{
          if(results){
              res.send(results) 
          } else{
            res.json({message: err})
          }  
        });
  })

  app.patch('/api/updateuser', (req, res) => {
    const {iduser, username, userdesc, useravatar, usercoverimg}=req.body;
      const sql = "Update user_detail set username=?, userdesc=?, useravatar=?, usercoverimg=? where iduser=? ";
        connection.query(sql, [username, userdesc, useravatar, usercoverimg, iduser],(err, results) =>{
          if(results.changedRows !==0){
            connection.query('select * from user_detail where iduser=?', iduser,(err, rs)=>{
              if(rs){
                res.json(rs)
              }
            })    
          } else{
            res.json({message: 'Không có thay đổi'})
          }  
        });
  })

  // update user account
  app.patch('/api/updateaccount', (req, res) => {
    const {iduser, password, newpassword}= req.body;
    connection.query('select password from users where iduser=?',iduser,(err,rs)=>{
      if(rs.length>0){
        bcrypt.compare(password, JSON.parse(JSON.stringify(rs))[0].password).then(function(iscorrect) {
          if(iscorrect){
            bcrypt.hash(newpassword, 10).then(hash=>{
              connection.query('update users set password=? where iduser=?',[hash, iduser],(err,rs)=>{
                if(rs.changedRows !==0){
                  res.json(rs)
                } else{
                  res.json({message: 'Không thể cập nhật mật khẩu!'})
                }
              })
            })
          } else{
            res.json({message: 'Mật cũ khẩu không đúng'})
          }
        })
      } else{
        res.json({message: 'User không tồn tại'})
      }
    })
  })

  app.patch('/api/updatecomment', (req, res) =>{
    const {idreply, replydesc, replyref}= req.body;
    const rereply = JSON.stringify(replyref)
    const replyupdate = moment().format("yyyy-MM-DD")
    connection.query('update replys set replydesc=?, replyref=?, replyupdate=? where idreply=?',[replydesc, rereply, replyupdate,idreply], (err, rs)=>{
      if(rs.changedRows !==0){
        res.json(rs)
      } else {
        res.json({message: 'Không thể cập nhật'})
      }
    })
  })
  //DELETE API
  app.delete('/api/deletepost/:id', (req, res) => {
    const {id}= req.params;
    const sql = "Delete from posts where idpost=?";
    connection.query(sql, id,(err, results) =>{
      if (results){
        res.json(results);
      } else {
        res.json({message: err})
      }
    });
  })

  app.get('/api/deletereply', (req, res) => {
    const {id, idpost}= req.query;
    const sql = "Delete from replys where idreply=?";
    connection.query(sql, id,(err, results) =>{
      if(results){
        connection.query('select count(idreply) as comment from replys where idpost=?', idpost, (err,rs)=>{
          if(rs){
            const commentcount = JSON.parse(JSON.stringify(rs))[0].comment
            connection.query('update posts set commentquantity=? where idpost=?',[commentcount, idpost])
          }
        })
        res.json(results);
      }
    });
  })


  // ADMIN DASHBOARD API

  //Start User
  //Get all user
  app.get('/api/alluser', (req, res) => {
    const sql = "SELECT * FROM users inner join user_detail on users.iduser=user_detail.iduser where user_detail.usertitle <> 'admin'";
    connection.query(sql, (err, results) =>{
      if(results){
      res.json(results);
      } else {
        res.json({message: 'Không xác định được user'})
      }
    });
  })
  //Chat Ban User
  app.patch('/api/chatbanuser', (req, res) =>{
    const {iduser, bool}= req.body;
    const chatban = bool===1?false:true
    connection.query('update user_detail set ischatban=? where iduser=?',[chatban, iduser], (err, rs)=>{
      if(rs.changedRows !==0){
        res.json(rs)
      } else {
        res.json({message: 'Không thể cập nhật'})
      }
    })
  })
  //Ban User
  app.patch('/api/banuser', (req, res) =>{
    const {iduser, bool}= req.body;
    const ban = bool===1?false:true
    connection.query('update user_detail set isban=? where iduser=?',[ban, iduser], (err, rs)=>{
      if(rs.changedRows !==0){
        res.json(rs)
      } else {
        res.json({message: 'Không thể cập nhật'})
      }
    })
  })
  //Delete User
  app.delete('/api/deleteuser/:iduser', (req, res) =>{
    const {iduser}= req.params;
    connection.query('delete from users where iduser=?',[iduser], (err, rs)=>{
        res.json({message: err})
      if (err){
        res.json({message: err})
      } else {
        res.json(rs);
      }
    })
  })
  //Edit user
  app.patch('/api/updateuserdetail', (req, res) => {
    const {iduser, username, userdesc, useravatar, usertitle, usercoverimg}= req.body;
    const sql = "update user_detail set username=?, userdesc=?, usertitle=?, useravatar=?, usercoverimg=? where iduser=? ";
    connection.query(sql, [username, userdesc,  usertitle, useravatar, usercoverimg, iduser],(err, results) =>{
      if(err){
        res.json({message: err})
      } else {
        res.json(results);
      }
    });
  })
  ////Edit user account
  app.patch('/api/updateuseraccount', (req, res) => {
    const {iduser, email, password, newpassword}= req.body;
    connection.query('select password from users where iduser=?',iduser,(err,rs)=>{
      if(rs.length>0){
        bcrypt.compare(password, JSON.parse(JSON.stringify(rs))[0].password).then(function(iscorrect) {
          if(iscorrect){
            bcrypt.hash(newpassword, 10).then(hash=>{
              connection.query('update users set password=?, useremail=? where iduser=?',[hash, email, iduser],(err,rs)=>{
                if(rs.changedRows !==0){
                  res.json(rs)
                } else{
                  res.json({message: 'Email đã tồn tại hoặc mật khẩu có vấn đề.'})
                }
              })
            })
          } else{
            res.json({message: 'Mật cũ khẩu không đúng'})
          }
        })
      } else{
        res.json({message: 'User không tồn tại'})
      }
    })
  })
  //End User
  //Post
  //Get all post
  app.get('/api/allpost', (req, res) => {
    const sql = "SELECT * FROM posts";
    connection.query(sql, (err, results) =>{
      if(results){
      res.json(results);
      } else {
        res.json({message: 'Không xác định được bài viết'})
      }
    });
  })
  // LOCK POST - UNLOCKPOST
  app.patch('/api/lockpost', (req, res) =>{
    const {idpost, bool}= req.body;
    const postclose = bool===1?false:true
    connection.query('update posts set postclose=? where idpost=?',[postclose, idpost], (err, rs)=>{
      if(rs.changedRows !==0){
        res.json(rs)
      } else {
        res.json({message: 'Không thể cập nhật'})
      }
    })
  })
  // reply
  //Get all reply
  app.get('/api/allreply', (req, res) => {
    const sql = "SELECT * FROM replys";
    connection.query(sql, (err, results) =>{
      if(results){
      res.json(results);
      } else {
        res.json({message: 'Không xác định được bình luận'})
      }
    });
  })
  //delete reply
  app.delete('/api/deletereply/:id', (req, res) => {
    const {id}= req.params;
    const sql = "Delete from replys where idreply=?";
    connection.query(sql, id,(err, results) =>{
      if (results){
        res.json(results);
      } else {
        res.json({message: err})
      }
    });
  })
  //update reply
  app.patch('/api/updatereply', (req, res) =>{
    const {idreply, replydesc}= req.body;
    console.log(idreply, replydesc)
    connection.query('update replys set replydesc=? where idreply=?',[replydesc, idreply], (err, rs)=>{
      if(rs.changedRows !==0){
        res.json({message: 'OK'})
      } else {
        res.json({message: 'NOT OK'})
      }
    })
  })
  //Topic
  //add topic
  app.post('/api/addtopic', (req, res) => {
    const {topicname, topicfor}= req.body;
    const sql = "insert into topics (topicname, topicfor) values (?,?)";
    connection.query(sql, [topicname, topicfor],(err, results) =>{
      if(err){
        res.json({message: err})
      } else {
        res.json(results);
      }
    });
  })
  //update topic
  app.patch('/api/updatetopic', (req, res) => {
    const {topicname, topicfor, idtopic}= req.body;
    const sql = "update topics set topicname=?, topicfor=? where idtopic=? ";
    connection.query(sql, [topicname, topicfor, idtopic],(err, results) =>{
      if(err){
        res.json({message: err})
      } else {
        res.json(results);
      }
    });
  })
  //delete topic
  app.delete('/api/deletetopic/:id', (req, res) => {
    const {id}= req.params;
    const sql = "Delete from topics where idtopic=?";
    connection.query(sql, id,(err, results) =>{
      if(err){
        res.json({message: err});
      } else {
        res.json(results);
      }
    });
  })


app.listen(4000, () => console.log('App listening on port 4000'));