import React, {useState, useEffect, useRef, useCallback} from 'react';
import { Link, useParams } from 'react-router-dom';
import PostBody from '../../components/postdesc';
import ReplyBody from '../../components/replyBody';
import PostThumb from '../../components/thumbnail';
import CommentEditor from '../../components/CommentEditor/commentEditor';
import { useStore } from '../../store';
import axios from "axios";
import '../../styles/tiptap.scss';


function Post() {
    const {idpost} = useParams();
    const [state,]=useStore();
    const [post, setPost] = useState({});
    const [isLoading, setisLoading] = useState(true);
    const [comment, setComment] = useState();
    const [replyRef, setreplyRef] = useState();
    const [replyupdate, setreplyUpdate] = useState();
    //canreply xem người dùng có muốn reply nữa không(nếu có) trong phần sửa comment
    const [canreply, setCanReply] = useState(true);
    // cài biến rerender làm props cho component muốn rerender khi làm 1 việc gì đó.
    const [reRender, setreRender] = useState(1);
    // lấy vị trí comment để scroll tới
    const scrollRef = useRef();
    //lấy html của text editor khi onchange
    
    const getcomment = useCallback((comment)=>{
      setComment(comment)
    },[])
    //lấy data của comment muốn trả lời qua việc click biểu tượng comment
    const getReplyRef = useCallback((ref)=>{
      setreplyRef(JSON.parse(ref))
    }, [])
    //lấy data của comment muốn sửa, tương tự bên trên
    const getReplyUpdate = useCallback((ref)=>{
      setreplyUpdate(JSON.parse(ref))
    }, [])

    //lấy data post theo id post trên params
    useEffect(() => {
      const controller = new AbortController();
      const fetchPost = async (idpost) => {
        await axios.get(`/api/postdetail/${idpost}`,{
          signal: controller.signal
        }).then((response) => {
          if(response.data.message){
            setPost({})
            setisLoading(false)
          } else{
            setPost(...response.data)
            setisLoading(false)
          }
        })
        .catch(e=>{

        })
      }   
      fetchPost(idpost); 
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      return ()=>{
        if (controller) {
          controller.abort();
        }
      }
    }, [idpost])
    
    
    //thêm mới comment vào csdl và load ra
    const handleSend = () => {
      if(comment ==='<p></p>' || comment===''){
      } else {
        if(replyRef){
          const commentData = {
            idpost: idpost,
            iduser: state.users.iduser,
            replydesc: comment,
            replyref: {
              iduserref: replyRef.iduser,
              usernameref: replyRef.username,
              replydateref: replyRef.replydate,
              contentref: replyRef.replydesc,
            }
          }
          axios.post(`/api/upreply`, commentData)
          .then(res => {
            if(res.data.message){
              
            } else {
              setComment('')
              setreRender(Math.floor(Math.random() * 100))
            }
          })
        } else {
          const commentData = {
            idpost: idpost,
            iduser: state.users.iduser,
            replydesc: comment,
            replyref: {}
          }
          axios.post(`/api/upreply`, commentData)
          .then(res => {
            if(res.data.message){
              
            } else {
              setComment('')
              setreRender(Math.floor(Math.random() * 100))
            }})}}}
    
    const handleUpdate = () => {
      if(comment ==='<p></p>' || comment===''){
        return
      }
      const commentData = {
        idreply: replyupdate.idreply,
        replydesc: comment?comment:replyupdate.replydesc,
        replyref: canreply? replyupdate.replyref:{}
      }
      axios.patch(`/api/updatecomment`, commentData)
        .then(res => {
          if(res.data.changeRows ===0){
            console.log(res)
          } else {
            setComment('')
            setreplyUpdate()
            setCanReply(true);
            setreRender(Math.floor(Math.random() * 100))
          }
        })
    }

   const handleCancel=()=>{
    setreplyUpdate();
    setCanReply(true);
    }
  return (
    <div className='p-5 flex flex-col items-center'>
    {!isLoading? 
    <div className='max-w-7xl w-full min-h-screen'>
      {
        !post.idpost? 
        <div className="h-screen w-full flex flex-col justify-center items-center bg-[var(--primary-color)]">
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
        : <React.Fragment>
          <PostThumb post={post}/>
          <PostBody post={post} myRef={scrollRef}/>
          <ReplyBody iduserpost={post.iduser} key={reRender} setreplyupdate={getReplyUpdate} setrerender={setreRender} setdata={getReplyRef} myRef={scrollRef}/>
        </React.Fragment>
      }
      {
      state.users.iduser?
      <div key={reRender} className='text-lg my-4 p-2 rounded w-full border-[1px] bg-[var(--primary-color)] shadow-xl' ref={scrollRef}>
        {replyupdate?
        <>
        <div onClick={()=>handleCancel()} className='flex justify-center w-28 px-2 border-[1px] border-gray-200 rounded bg-gray-500 text-gray-50 cursor-pointer'>Hủy sửa</div>
        {JSON.parse(replyupdate.replyref).usernameref&&canreply&&<div className='bg-gray-100 p-1 mb-1 flex'>
          <div className='text-lg w-28 whitespace-nowrap overflow-hidden text-ellipsis underline text-blue-600 mr-2'>@{JSON.parse(replyupdate.replyref).usernameref}</div>
          <div className='flex flex-1'>: 
          <div dangerouslySetInnerHTML={{__html: JSON.parse(replyupdate.replyref).contentref}}></div></div>
          <div onClick={()=>setCanReply(!canreply)} className='flex justify-center w-28 px-2 border-[1px] border-gray-200 rounded bg-gray-500 text-gray-50 cursor-pointer'>Hủy reply</div>
        </div>}
        <CommentEditor  setdata={getcomment} initdata={replyupdate.replydesc}/>
          <button
          onClick={()=>handleUpdate()}
          className='py-2 px-4 mt-3 border-[1px] rounded bg-[#4c760d] hover:bg-[#6a932d]'>Cập nhật</button>
        </>:
        <>
        {replyRef? 
          <div className='bg-gray-100 p-1 mb-1 flex'>
          <div className='text-lg w-28 whitespace-nowrap overflow-hidden text-ellipsis underline text-blue-600 mr-2'>@{replyRef.username}</div>
          <div className='flex flex-1'>: 
          <div dangerouslySetInnerHTML={{__html: replyRef.replydesc}}></div></div>
          <div onClick={()=>setreplyRef()} className='flex justify-center w-11 px-2 border-[1px] border-gray-200 rounded bg-gray-500 text-gray-50 cursor-pointer'>Hủy</div>
          </div>:<></>
        }
          <CommentEditor setdata={getcomment} initdata={false}/>
          <button
          onClick={()=>handleSend()}
          className='py-2 px-4 mt-3 border-[1px] text-white text-lg font-semibold rounded bg-[#4c760d] hover:bg-[#6a932d]'>Gửi</button>
        </>}
      </div>
        :
      <div className='text-lg flex flex-col items-center my-4 p-2 rounded w-full border-[1px] border-[var(--sub-text-color)] bg-[var(--primary-color)] shadow-xl' ref={scrollRef}>
          <span className='text-center font-medium'> Vui lòng đăng nhập để được bình luận.</span>
          <Link to={'/login'} className='text-base underline text-blue-900'>Đăng nhập ngay</Link>
      </div>
      }
    </div>
    :
    <div className='max-w-7xl w-full min-h-screen'>
      <div className='h-48 relative text-2xl mb-4 rounded w-full border-[1px] bg-[var(--primary-color)] shadow-xl animate-pulse'></div>
      <div className='flex min-h-screen text-2xl mb-4 rounded w-full border-[1px] bg-[var(--sub-bg-color)] shadow-xl animate-pulse'></div>
      <div className='flex min-h-[48rem] text-2xl mb-4 rounded w-full border-[1px] bg-[var(--sub-bg-color)] shadow-xl animate-pulse'></div>
    </div>
    }
  </div>
  )
}

export default Post