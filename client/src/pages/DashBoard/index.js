import React,{usestate, useEffect} from 'react'
import { useStore} from '../../store';
import { Link, useNavigate } from 'react-router-dom';
import NewsDashBoard from './news';

function Dashboards() {
  const [state] = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    if(state.users.usertitle !== 'admin'){
      navigate('/forum')
    }
  }, [state.users, navigate])
  
  return (
    <div className='flex h-full w-full justify-center bg-[var(--primary-bg-color)] '>
        <div className='w-1/6 h-screen flex bg-[--primary-color] flex-col cursor-pointer select-none'>

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
            
            <div className={`${true?'border-l-8 bg-lime-500 text-lime-50 text-xl ':'text-lime-100 text-lg '} border-l-[var(--sub-color)] border-b-[2px] border-white p-2 font-medium hover:bg-lime-400`}>
              Quản lý trang chủ
            </div>

            <div className={`border-b-[2px] border-white p-2 text-lg font-medium text-lime-100 hover:bg-lime-400`}>
              Quản lý User
            </div>

            <div className={`border-b-[2px] border-white p-2 text-lg font-medium text-lime-100 hover:bg-lime-400`}>
              Quản lý Chủ đề
            </div>

            <div className={`border-b-[2px] border-white p-2 text-lg font-medium text-lime-100 hover:bg-lime-400`}>
              Quản lý Bài viết
            </div>

            <div className={`border-b-[2px] border-white p-2 text-lg font-medium text-lime-100 hover:bg-lime-400`}>
              Quản lý Bình luận
            </div>

            <Link to='/forum' className={`border-b-[2px] border-white p-2 text-lg font-medium text-lime-100 hover:bg-lime-400`}>
              Trở lại diễn đàn
            </Link>

        </div>
        <div className='w-5/6 h-screen'>
            <NewsDashBoard/>
        </div>
    </div>
  )
}

export default Dashboards