import React,{useEffect, useState} from 'react'
import { useStore} from '../../store';
import { Link, useNavigate } from 'react-router-dom';
import UserManager from './UserManage';
import PostManage from './PostManage';
import TopicManage from './TopicManage';
import ReplyManage from './ReplyManage';

function Dashboards() {
  const [state] = useStore();
  const [Page, setPage] = useState(<UserManager/>)
  const navigate = useNavigate();
  
  useEffect(() => {
    if(state.users.usertitle !== 'admin'){
      navigate('/forum')
    }
  }, [state.users, navigate])
  
  return (
    <div className='flex max-h-screen h-screen w-full justify-center bg-[var(--primary-bg-color)] '>
        <div className='w-1/6 h-auto flex bg-[--primary-color] flex-col cursor-pointer select-none'>

            <div className="mt-2 border-b-[2px] border-white flex w-full justify-center">
              <div className='flex flex-col p-2 w-40 rounded justify-center items-center '>
                <div className='rounded-full h-16 w-16 bg-[#e1ffb4] border-[2px] border-green-800'>
                    <img 
                    className='rounded-full w-full h-full object-cover'
                    src={state.users.useravatar} alt='avatar'/>
                </div>
                <div className='text-2xl max-w-[130px] overflow-hidden text-ellipsis font-medium my-2 text-lime-50'>{state.users.username}</div>
              </div>
            </div>
            <div className=' bg-lime-500 text-lime-50 text-xl'></div>
            <div onClick={()=>setPage(<UserManager/>)}  className={`border-b-[2px] border-white p-2 text-lg font-medium text-lime-100 hover:bg-lime-400`}>
              Quản lý người dùng
            </div>

            <div onClick={()=>setPage(<TopicManage/>)} className={`border-b-[2px] border-white p-2 text-lg font-medium text-lime-100 hover:bg-lime-400`}>
              Quản lý chủ đề
            </div>

            <div onClick={()=>setPage(<PostManage/>)} className={`border-b-[2px] border-white p-2 text-lg font-medium text-lime-100 hover:bg-lime-400`}>
              Quản lý bài viết
            </div>

            <div onClick={()=>setPage(<ReplyManage/>)} className={`border-b-[2px] border-white p-2 text-lg font-medium text-lime-100 hover:bg-lime-400`}>
              Quản lý bình luận
            </div>

            <Link to='/forum' className={`border-b-[2px] border-white p-2 text-lg font-medium text-lime-100 hover:bg-lime-400`}>
              Trở lại diễn đàn
            </Link>

        </div>
        <div className='max-w-5/6 flex flex-col flex-1 p-2 overflow-y-scroll'>
            {Page}
        </div>
    </div>
  )
}

export default Dashboards