import React,{useEffect, useState, memo} from 'react'

import axios from 'axios';
import { Link } from 'react-router-dom';
import {useStore} from '../../store';

function SideBar() {
    const [top, setTop] = useState();
    const [state,] = useStore();
    const [isLoading, setisLoading] = useState(true);
    useEffect(() => {
    const controller = new AbortController();
        axios.get('/api/topuser',{signal: controller.signal}).then((response) => {
            setTop(response.data);
            setisLoading(false)
          })
          .catch(e => {
            
          });
          return ()=>{
            controller.abort()
          }
    }, [])
  return (
    <>
    <div className='border-b-[3px] p-2 h-fit'>
      <span className='text-center text-lg font-medium'>Theo dõi chúng tôi tại:</span>
      <div className="lg:mr-2 lg:mt-0 mt-3 w-full flex justify-between">
        <Link
            to="/download"
            className="bg-gradient-to-r hover:bg-gradient-to-l from-[#17aafd] to-[#0674e8] px-2 w-[86px] justify-center shadow-[5px_5px_9px_0px_rgba(0,0,0,0.3)] hover:bg-gray text-[#e6e6e6!important] font-medium 
             rounded-lg inline-flex items-center"
        >
            FaceBook
        </Link>
        <Link
            to="/download"
            className="bg-gradient-to-r hover:bg-gradient-to-l from-[#ef790b] to-[#e31317] px-2 w-[86px] justify-center shadow-[5px_5px_9px_0px_rgba(0,0,0,0.3)] hover:bg-gray text-[#e6e6e6!important] font-medium 
             rounded-lg inline-flex items-center"
        >
            Reddit
        </Link>
        <Link
            to="/download"
            className="bg-gradient-to-r hover:bg-gradient-to-l from-[#68c5ff] to-[#1c99e6] px-2 w-[86px] justify-center shadow-[5px_5px_9px_0px_rgba(0,0,0,0.3)] hover:bg-gray text-[#e6e6e6!important] font-medium 
             rounded-lg inline-flex items-center"
        >
            Twitter
        </Link>
      </div>
    </div>
    <div className='border-b-[3px] p-2 text-base font-medium text-yellow-100'>
      Xin chào {state.users.username?<span className='text-lg font-semibold text-yellow-100'>{state.users.username}</span>:<Link to={'/login'} className='underline text-base text-blue-800'>Đăng nhập ngay</Link>}
    </div>
    <div className='flex flex-col border-b-[3px]'>
      <span className='text-center text-lg font-medium'>Bài viết</span>
      <Link to={`/news/follower`} className='border-b-[1px] p-2 hover:bg-[#acf83a]'>Bài viết bạn theo dõi</Link>
      <Link to={`/news/newest`} className='border-y-[1px] p-2 hover:bg-[#acf83a]'>Bài viết mới nhất</Link>
      <Link to={`/news/mostview`} className='border-y-[1px] p-2 hover:bg-[#acf83a]'>Bài viết nhiều lượt xem nhất</Link>

      <Link to={`/news/mostvote`} className='border-y-[1px] p-2 hover:bg-[#acf83a]'>Bài viết nhiều lượt Vote nhất</Link>
      <Link to={`/news/mostcomment`} className='border-b-[1px] p-2 hover:bg-[#acf83a]'>Bài viết sôi nổi nhất</Link>
    </div>
    {!isLoading&&<div className='flex flex-col border-b-[3px] '>
        <span className='text-center text-lg font-medium'>Người dùng tiêu biểu</span>
        {top.map((user,index)=>(
            <Link key={index} to={`/profile/${user.iduser}`} className='flex p-2 items-center justify-between hover:bg-[#acf83a]'>
                <div className='flex items-center'>
                    <div className='rounded-full h-10 w-10 mr-2  bg-[#e1ffb4] '>
                        <img 
                        className='rounded-full w-full h-full object-cover'
                        src={user.useravatar} alt='avatar'/>
                    </div>
                    {user.username}
                </div>
                <div>{user.Sum} Điểm</div>
            </Link>
        ))}
    </div>}
    </>
  )
}

export default memo(SideBar)