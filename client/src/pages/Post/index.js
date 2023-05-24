import React, {useState, useEffect, useRef, useCallback} from 'react';
import { useParams } from 'react-router-dom';
import PostBody from '../../components/postdesc';
import ReplyBody from '../../components/replyBody';
import PostThumb from '../../components/thumbnail';
import CommentEditor from '../../components/CommentEditor/commentEditor';

import axios from "axios";


function Post() {
    const {idpost} = useParams();
    const [post, setPost] = useState({});
    const [isLoading, setisLoading] = useState(true);
    const [comment, setComment] = useState();
    const [replyRef, setreplyRef] = useState();
    const [reRender, setreRender] = useState(1);



    const scrollRef = useRef();
    
    const getcomment = (comment)=>{
      setComment(comment)
    }
    const getReplyRef = useCallback((ref)=>{
      setreplyRef(JSON.parse(ref))
    }, [])

    const fetchPost = async (idpost) => {
      await axios.get(`/api/postuserbyidpost/${idpost}`).then((response) => {
        setPost(...response.data);
      });
      setisLoading(false)
    }
    useEffect(() => {
      fetchPost(idpost); 
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [idpost])
    
    const handleSend = () => {
      if(replyRef){
        const commentData = {
          idpost: idpost,
          iduser: JSON.parse(localStorage.getItem("userinfo")).iduser,
          replydesc: comment,
          replyref: {
            iduserref: replyRef.iduser,
            usernameref: replyRef.username,
            replydateref: replyRef.replydate,
            contentref: replyRef.replydesc,
          }
        }
        axios.post(`/api/reply`, commentData)
        .then(res => {
          if(res.data.message){
            
          } else {
            setreRender(Math.floor(Math.random() * 100))
          }
        })
      } else {
        const commentData = {
          idpost: idpost,
          iduser: JSON.parse(localStorage.getItem("userinfo")).iduser,
          replydesc: comment,
          replyref: {}
        }
        axios.post(`/api/reply`, commentData)
        .then(res => {
          if(res.data.message){
            
          } else {
            setreRender(Math.floor(Math.random() * 100))
          }
        })
      }
      
    }

  return (
    <>
    {post ? 
    <div className='p-5 flex flex-col items-center'>
    <div className='max-w-7xl w-full min-h-screen'>
      {
        isLoading? 
        <React.Fragment>
          <div className='h-48 relative text-2xl mb-4 rounded w-full border-[1px] bg-[#557d19] shadow-xl animate-pulse'></div>
          <div className='flex min-h-screen text-2xl mb-4 rounded w-full border-[1px] bg-[#83cc15] shadow-xl animate-pulse'></div>
          <div className='flex min-h-[48rem] text-2xl mb-4 rounded w-full border-[1px] bg-[#83cc15] shadow-xl animate-pulse'></div>
        </React.Fragment>
        : <React.Fragment>
          <PostThumb post={post}/>
          <PostBody post={post} myRef={scrollRef}/>
          <ReplyBody key={reRender} setdata={getReplyRef} myRef={scrollRef}/>
        </React.Fragment>
      }
      <div className='text-lg my-4 p-2 rounded w-full border-[1px] bg-[#84cc16] shadow-xl' ref={scrollRef}>
        {replyRef? <div className='bg-gray-100 p-1 mb-1 flex'>
          <div className='text-lg w-24 overflow-hidden text-ellipsis underline text-blue-600 mr-2'>@{replyRef.username}</div>
          <div className='flex flex-1'>: <div dangerouslySetInnerHTML={{__html: replyRef.replydesc}}></div></div>
          <div onClick={()=>setreplyRef()} className='flex justify-center w-11 px-2 border-[1px] border-gray-200 rounded bg-gray-500 text-gray-50 cursor-pointer'>Hủy</div>
        </div>:<></>}
        <CommentEditor key={reRender} setdata={getcomment}/>
        <button
        onClick={()=>handleSend()}
        className='py-2 px-4 mt-3 border-[1px] rounded bg-[#4c760d] hover:bg-[#6a932d]'>Gửi</button>
      </div>
    </div>
  </div>
    :
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[#62ac00]">
        <h1 className="text-4xl font-extrabold text-white tracking-widest">Bài viết không tồn tại</h1>
        <button className="mt-5 rounded">
        <a href='/' className="relative inline-block text-sm font-medium text-[#405e19] group active:text-[#8ac53c] focus:outline-none focus:ring">
            <span
            className="absolute rounded inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#e4ffc1] group-hover:translate-y-0 group-hover:translate-x-0"
            ></span>

            <span className="relative text-lg block px-8 py-3 text-white bg-[#8be415] border border-[#e4ffc1] shadow-lg rounded">
            <router-link to="/">Về trang chủ</router-link>
            </span>
        </a>
        </button>
    </div>
    }
    </>
  )
}

export default Post