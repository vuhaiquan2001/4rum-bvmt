import React,{useEffect, useState, memo} from 'react'

import axios from 'axios';
import { Link } from 'react-router-dom';

function SideBar() {
    const [top, setTop] = useState();
    const [isLoading, setisLoading] = useState(true);
    useEffect(() => {
        axios.get('/api/topuser').then((response) => {
            setTop(response.data);
            setisLoading(false)
          })
          .catch(e => {
            console.log(e);
          });
    }, [])
  return (
    <>
    <div className='border-b-[1px] p-2'>Mạng xã hội blar blar</div>
    <div className='border-b-[1px] p-2'>Slidebar</div>
    
    {!isLoading&&<div className='hidden lg:flex flex-col border-b-[1px] p-2'>
        <span className='text-center bg-'>Người dùng tiêu biểu</span>
        {top.map((user,index)=>(
            <Link key={index} to={`/profile/${user.iduser}`} className='flex my-2 items-center justify-between'>
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

    <div className='border-b-[1px] p-2'>Menu</div>
    </>
  )
}

export default memo(SideBar)