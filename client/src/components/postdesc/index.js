import React, {memo, useEffect, useState} from 'react'
import {BiTime, BiUpload} from 'react-icons/bi';
import {ImArrowUp} from 'react-icons/im';
import {FaBookmark, FaShare, FaComment, FaEllipsisV, FaUser} from 'react-icons/fa'
import {BsFillBookmarkCheckFill} from 'react-icons/bs';
import{MdReport} from 'react-icons/md'
import Moment from 'moment';
import { useStore } from '../../store';

import { firstLetterUppercase } from '../FirstLetterUppercase';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import UserDetailModal from '../userdetailModal';

function PostBody({post, myRef}) {
    const executeScroll = () => myRef.current.scrollIntoView();
    const [isOwner, setIsOwner] = useState(false);
    const [menuactive, setMenuActice] = useState(false);
    const [vote, setVote]= useState(false);
    const [bookmark, setBookmark]= useState(false);
    const [votecount, setVoteCount]= useState();
    const [userdetail, setUserdetail]= useState(false);
    const [state, ] = useStore();
    const navigate = useNavigate();


    useEffect(()=>{
        if(post.iduser === state.users.iduser || state.users.usertitle === 'admin'){
            setIsOwner(true)
        } else{
            setIsOwner(false)
        }
    },[post.iduser, state])

    useEffect(()=>{
      const controller = new AbortController();
        const checkvote=(idpost, iduser)=>{
            axios.post(`/api/isvote`,{idpost: idpost, iduser: iduser},{
                signal: controller.signal
              }).then((res)=>{
                if(res.data.isvote){
                    setVote(true)
                    setVoteCount(res.data.count)
                }
            })
            .catch(e => {
            });
        }
        checkvote(post.idpost, state.users.iduser)
        return ()=>{
            if (controller) {
              controller.abort();
            }
          }
    },[post.idpost, state])

    useEffect(()=>{
      const controller = new AbortController();
        const checkbookmark=(idpost, iduser)=>{
            axios.post(`/api/isbookmark`,{idpost: idpost, iduser: iduser},{
                signal: controller.signal
              }).then((res)=>{
                if(res.data.isbookmark){
                    setBookmark(true)
                }
            })
            .catch(e => {
            });
        }
        checkbookmark(post.idpost, state.users.iduser)
        return ()=>{
            if (controller) {
              controller.abort();
            }
          }
    },[post.idpost, state])

    const handleDeletePost = ()=>{
        const answer = window.confirm("Bạn có chắc muốn xóa bài chứ? Mọi dữ liệu, comment của bài viết sẽ biến mất!");
        if (answer) {
            axios.get(`/api/deletepost/${post.idpost}`).then((response) => {
                navigate('/')
              })
              .catch(e => {
                console.log(e);
            });
        }
    }

    const handleVote=()=>{
        axios.post(`/api/votepost`,{idpost: post.idpost, iduser: state.users.iduser}).then((res)=>{
            if(res.data.message === 'vote'){
                setVoteCount(res.data.count)
                setVote(true)
            } else{
                setVoteCount(res.data.count)
                setVote(false)
            }
        })
        .catch(e => {
            console.log(e);
        });
    }
    const handleBookmark = ()=>{
        axios.post(`/api/bookmark`,{idpost: post.idpost, iduser: state.users.iduser}).then((res)=>{
            if(res.data.message === 'bookmark'){
                setBookmark(true)
            } else{
                setBookmark(false)
            }
        })
        .catch(e => {
    console.log(e);
    });}

    const handleHover = ()=>{
        setTimeout(() => {
            setUserdetail(true)
        }, 1000);
    }
  return (
    <div className='flex flex-col md:flex-row text-2xl mb-4 rounded w-full border-[1px] bg-[#83cc15] shadow-xl'>
        <div onMouseLeave={()=>setUserdetail(false)} className='flex relative h-fit md:flex-col w-full p-2 md:w-40 justify-start items-center'>
            {userdetail&&post.iduser!==state.users.iduser&&
            <UserDetailModal user={post}/>
            }
            <Link onMouseEnter={()=>handleHover()} to={`/profile/${post.iduser}`} className='rounded-full cursor-pointer h-16 w-16 bg-[#e1ffb4] border-[2px] border-green-800 hover:border-green-500'>
                <img 
                className='rounded-full w-full h-full object-cover'
                src={post.useravatar} alt='avatar'/>
            </Link>
            
            <div className='flex flex-col ml-2'>
                <div className='text-lg w-fit md:max-w-[130px] md:text-center overflow-hidden text-ellipsis font-medium mb-1 text-[#d9ffa0]'>
                    {firstLetterUppercase(post.username)} 
                    <span className='md:hidden text-xs text-yellow-100 ml-1'>Uploader</span>
                </div>
                <span className='md:hidden text-xs text-yellow-100'>{firstLetterUppercase(post.usertitle)}.{Moment(post.joindate).format("DD-MM-YYYY")}</span>
            </div>
            <div className='md:flex hidden items-center justify-center rounded  h-5 md:w-full bg-green-400 shadow-md text-yellow-100 text-base leading-none'>
            <BiUpload className='mr-1'/>
            Uploader
            </div>
            <div className='md:flex hidden items-center justify-center rounded  h-5 md:w-full bg-green-400 shadow-md text-yellow-100 my-2 text-base leading-none'>
            <FaUser className='mr-1'/>
            {firstLetterUppercase(post.usertitle)}
            </div>
            <div className='md:flex hidden items-center justify-center rounded  h-5 md:w-full bg-green-400 shadow-md text-yellow-100 text-base leading-none'>
            <BiTime className='mr-1'/>
            {Moment(post.joindate).format("DD-MM-YYYY")}
            </div>
        </div>

        <div className='flex flex-col flex-1 justify-between items-center border-t-[1px] md:border-l-[1px] p-2'>
            <div className='flex justify-between items-center w-full my-1 text-sm text-[#e3e63f] select-none'>
                <div className='flex underline hover:text-[#fdff83]'>
                    <BiTime className='w-5 h-5 mr-1'/>
                    {Moment(post.ngaytao).format("DD-MM-YYYY")}
                </div>
                <div className='flex cursor-pointer'>
                    <div onClick={()=>handleBookmark()}>
                        {bookmark?<BsFillBookmarkCheckFill className='text-[#e0ffb1]'/>:
                        <FaBookmark className='hover:text-[#fdff83] text-[#fcff5f]'/>}
                    </div>
                    <FaShare className='ml-2 hover:text-[#fdff83]'/>
                    {isOwner?<div onClick={()=>setMenuActice(!menuactive)} className={`relative cursor-pointer px-2 group ${menuactive? 'text-[#fdff83]':'hover:text-[#fdff83]'} `}>
                        <FaEllipsisV/>
                        <div className={`absolute text-gray-600 top-5 after:top-[-10px] after:absolute after:content-[''] after:h-3 after:w-full right-1/2 translate-x-1/2 bg-[#a4ea3c]  w-28 ${menuactive? 'flex':'group-hover:flex hidden'} flex-col`} >
                            <div onClick={()=>handleDeletePost()} className='border-b-[1px] p-2 hover:bg-[#c3fa70] text-center rounded-t'>Xóa</div>
                            <Link to={`/updatepost/${post.idpost}`} className='p-2 hover:bg-[#c3fa70] text-center rounded-b'>Sửa</Link>
                        </div>
                    </div>:<></>}
                </div>
            </div>
            <div dangerouslySetInnerHTML={{__html: post.postdesc}} className='w-full text-xl flex-1'></div>
            <div className='flex h-9 justify-start items-center w-full my-1 text-2xl leading-none text-[#e3e63f] bg-[#6eb00b] px-2 border-l-4 border-[#bdff5a]'>   
                <div onClick={()=>handleVote()} className='flex hover:text-[#fdff83] hover:text-3xl'>
                    {vote?<ImArrowUp className='text-[#d1fe8e]'/>:<ImArrowUp className='text-[#46631a]'/>}
                    <span className='text-lg'>{votecount?votecount:post.likequantity}</span>
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