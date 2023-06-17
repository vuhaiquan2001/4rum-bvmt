import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../paginations';
import moment from 'moment';
import { useStore } from '../../store';

import {FaEllipsisV} from 'react-icons/fa'

function ProfilePost({iduser}) {
    const [isOwner, setIsOwner] = useState(false);
    const [menuactive, setMenuActice] = useState(false);
    const [state, ] = useStore();
    const navigate = useNavigate();



    const [posts, setPosts] = useState([])
    const [isLoading, setisLoading] = useState(true)

    const [currentpage, setCurrentPage] = useState(1);
    const [postperpage, ] = useState(10);
    //lấy ra index của post cuối cùng của 1 trang = index trang hiện tại nhân số trang
    const indexOfLastPost = currentpage*postperpage;
    //lấy ra index của post đầu tiên bằng trang cuối trừ đi số trang mỗi page
    const indexOfFirstPost= indexOfLastPost - postperpage;
    //cắt mảng post ban đầu ra theo từng trang
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
    // Khi đổi trang trong paginate thì đổi current page = số trên pagi  
    const Paginate = (pageNumber)=> {setCurrentPage(pageNumber); window.scrollTo({top: 0, left: 0, behavior: 'smooth'});};

    useEffect(() => {
       axios(`/api/profilepost/${iduser}`).then(res=>{
            setPosts(res.data)
            setisLoading(false)
       })  
    }, [iduser])

    useEffect(()=>{
        if(iduser === state.users.iduser || state.users.usertitle === 'admin'){
            setIsOwner(true)
        } else{
            setIsOwner(false)
        }
    },[iduser, state])

    const handleDeletePost = ({e, id})=>{
        e.stopPropagation();
        const answer = window.confirm("Bạn có chắc muốn xóa bài chứ? Mọi dữ liệu, comment của bài viết sẽ biến mất!");
        if (answer) {
            axios.get(`/api/deletepost/${id}`).then((response) => {
                navigate('/forum')
              })
              .catch(e => {
                console.log(e);
            });
        }
    }

    const handleEdit = ({e, id})=>{
        e.stopPropagation();
        navigate(`/updatepost/${id}`)
    }

    const handleGoToPost = ({e, id})=>{
        navigate(`/post/${id}`)
    }

  return (
    <>
    {
    isLoading?<div className='h-12 animate-bounce'>Loading</div>:
    <div className='flex flex-col border-b-[1px]'>
        {currentPosts.map((post,index)=>(
            <div
            key={index}
            onClick={(e)=>handleGoToPost({e, id: post.idpost})}
            className='flex flex-col relative lg:flex-row justify-between items-center border-[1px] mt-[-1px]  bg-[var(--sub-bg-color)] hover:bg-[var(--hover-bg-color)]' 
            >
                <div className='flex py-4 w-full lg:w-[75%] text-ellipsis h-fit'>
                    <div className='flex flex-col lg:flex-row justify-between flex-1 px-2'>
                        <div className='h-8 max-w-[200px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[800px] whitespace-nowrap overflow-hidden text-ellipsis'>
                            <span className='text-lg font-medium text-[var(--text-color)] hover:underline hover:text-[#851210] text-ellipsis'>
                            {post.posttitle}
                            </span>
                        </div>
                        <div className='flex flex-wrap'>
                            {post.tags.split(',').map((tag, index)=> (
                                <div key={index} className='text-base h-fit font-medium leading-none p-2 mr-2 border-[1px] text-green-200 bg-green-600 rounded hover:bg-green-400'>#{tag}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex flex-row flex-wrap lg:flex-col justify-between items-start px-2 w-full lg:w-[25%] lg:border-l-[1px]'>
                        <span className='text-sm lg:text-base font-medium hover:text-green-700 text-[var(--sub-text-color)] hover:underline'>CreateAt: {moment(post.ngaytao).format("DD-MM-YYYY")}</span>    
                        <span className='text-sm lg:text-base font-medium hover:text-green-700 text-[var(--sub-text-color)] hover:underline'>Votes: {post.likequantity}</span>
                        <span className='text-sm lg:text-base font-medium hover:text-green-700 text-[var(--sub-text-color)] hover:underline pb-1'>Views: {post.viewquantity}</span>
                        <span className='text-sm lg:text-base font-medium hover:text-green-700 text-[var(--sub-text-color)] hover:underline'>Comments: {post.commentquantity}</span>
                </div>
                <div className='absolute right-0 top-0'>
                {isOwner?<div onMouseLeave={()=>setMenuActice(false)} onMouseEnter={()=>setMenuActice(post.idpost)} className={`relative cursor-pointer ${menuactive===post.idpost? 'text-[var(--primary-text-color)]':'hover:text-[var(--sub-text-color)]'} `}>
                        <FaEllipsisV/>
                        <div className={`absolute text-gray-600 top-5 after:top-[-10px] after:absolute after:content-[''] after:h-3 after:w-full right-0 lg:right-1/2 lg:translate-x-1/2 bg-[#e8ffc4]  w-16 ${menuactive===post.idpost? 'flex':'hidden'} flex-col`} >
                            <div onClick={(e)=>handleDeletePost({e, id: post.idpost})} className='border-b-[1px] hover:bg-[#c3fa70] text-center rounded-t'>Xóa</div>
                            <div onClick={(e)=>handleEdit({e, id: post.idpost})} className=' hover:bg-[#c3fa70] text-center rounded-b'>Sửa</div>
                        </div>
                    </div>:<></>}
                </div>
            </div>
        ))}
          {posts.length>10&&<Pagination postPerPage={postperpage} currentPage={currentpage} totalPosts={posts.length} Paginate={Paginate}/>}
    </div>
    }
    </>
  )
}

export default ProfilePost