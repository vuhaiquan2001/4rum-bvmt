import React, {memo, useEffect, useState} from 'react'
import {FaUser} from 'react-icons/fa';
import {BiTime, BiUpload} from 'react-icons/bi';
import {FaBookmark, FaShare, FaComment, FaEllipsisV} from 'react-icons/fa'
import{MdFavorite, MdReport} from 'react-icons/md'
import Moment from 'moment';
import { useStore } from '../../store';

import { firstLetterUppercase } from '../FirstLetterUppercase';
import { Link } from 'react-router-dom';

function PostBody({post, myRef}) {
    const executeScroll = () => myRef.current.scrollIntoView()
    const [isOwner, setIsOwner] = useState(false)
    const [menuactive, setMenuActice] = useState(false)
    const [state, ] = useStore();
    useEffect(()=>{
        if(post.iduser === state.users.iduser || state.users.usertitle === 'admin'){
            setIsOwner(true)
        } else{
            setIsOwner(false)
        }
    },[post.iduser, state])

    const handleDeletePost =()=>{
        const answer = window.confirm("Bạn có chắc muốn xóa bài chứ? Mọi dữ liệu, comment của bài viết sẽ biến mất!");
        if (answer) {
        
        }
    }

  return (
    <div className='flex text-2xl mb-4 rounded w-full border-[1px] bg-[#83cc15] shadow-xl'>
        <div className='flex flex-col p-2 w-40 justify-start items-center'>
            <div className='rounded-full h-16 w-16 bg-[#e1ffb4] border-[2px] border-green-800'>
                <img 
                className='rounded-full w-full h-full object-cover'
                src={post.useravatar} alt='avatar'/>
            </div>
            <div className='text-lg max-w-[130px] overflow-hidden text-ellipsis font-medium my-2 text-[#d9ffa0]'>{firstLetterUppercase(post.username)}</div>
            <div className='flex items-center justify-center rounded  h-5 w-full bg-green-400 shadow-md text-yellow-100 text-base leading-none'>
            <BiUpload className='mr-1'/>
            Uploader
            </div>
            <div className='flex items-center justify-center rounded  h-5 w-full bg-green-400 shadow-md text-yellow-100 my-2 text-base leading-none'>
            <FaUser className='mr-1'/>
            {firstLetterUppercase(post.usertitle)}
            </div>
            <div className='flex items-center justify-center rounded  h-5 w-full bg-green-400 shadow-md text-yellow-100 text-base leading-none'>
            <BiTime className='mr-1'/>
            {Moment(post.joindate).format("DD-MM-YYYY")}
            </div>
        </div>

        <div className='flex flex-col flex-1 justify-between items-center border-l-[1px] p-2'>
            <div className='flex justify-between items-center w-full my-1 text-sm text-[#e3e63f] select-none'>
                <div className='flex underline hover:text-[#fdff83]'>
                    <BiTime className='w-5 h-5 mr-1'/>
                    {Moment(post.ngaytao).format("DD-MM-YYYY")}
                </div>
                <div className='flex '>
                    <FaBookmark className='hover:text-[#fdff83]'/>
                    <FaShare className='ml-2 hover:text-[#fdff83]'/>
                    {isOwner?<div onClick={()=>setMenuActice(!menuactive)} className={`relative cursor-pointer px-2 group ${menuactive? 'text-[#fdff83]':'hover:text-[#fdff83]'} `}>
                        <FaEllipsisV/>
                        <div className={`absolute text-gray-600 bg-white w-28 ${menuactive? 'flex':'group-hover:flex hidden'} flex-col`} >
                            <div onClick={()=>handleDeletePost()} className='border-b-[1px]'>Xóa</div>
                            <Link to={`/updatepost/${post.idpost}`} className=''>Sửa</Link>
                        </div>
                    </div>:<></>}
                </div>
            </div>
            <div dangerouslySetInnerHTML={{__html: post.postdesc}} className='w-full text-xl flex-1'></div>
            <div className='flex h-9 justify-start items-center w-full my-1 text-2xl leading-none text-[#e3e63f] bg-[#6eb00b] px-2 border-l-4 border-[#bdff5a]'>   
                <div className='flex hover:text-[#fdff83] hover:text-4xl'>
                    <MdFavorite/>
                    <span className='text-lg'>{post.likequantity}</span>
                </div>
                <div onClick={()=>executeScroll()} className='flex ml-4 hover:text-[#fdff83] hover:text-4xl'>
                    <FaComment/>
                    <span className='text-lg'>{post.commentquantity}</span>
                </div>

                <div className='flex ml-4 hover:text-[#fdff83] hover:text-4xl'>
                    <MdReport/>
                </div>
            </div>
        </div>  
    </div>
  )
}

export default memo(PostBody)