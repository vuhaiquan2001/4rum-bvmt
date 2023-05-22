import React,{useState, useEffect} from 'react';
import PostEditor from './../../components/PostEditor/PostEditor';
import { useStore } from '../../store';

function CreatePost() {
    const [islogin, setIslogin] = useState(true);
    const [state, ] = useStore();
    useEffect(() => {
        if(state.users.iduser){
            setIslogin(true)
        }  else{
            setIslogin(false)
        }
    }, [state])
    


  return (
    <div className='w-full min-h-screen flex justify-center mt-8'>
        {islogin
        ?<div className='w-full max-w-[1280px] flex flex-col'>
            <PostEditor />
        </div>
       
        
        :<div className="h-screen w-full flex flex-col justify-center items-center bg-[#62ac00]">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">SORRY</h1>
            <div className="bg-[#84d41a] px-2 text-base rounded rotate-12 absolute text-white shadow-xl">
                Phải đăng nhập mới đăng được bài :\
            </div>
            <button className="mt-5 rounded">
            <a href='/login' className="relative inline-block text-sm font-medium text-[#405e19] group active:text-[#8ac53c] focus:outline-none focus:ring">
                <span
                className="absolute rounded inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#e4ffc1] group-hover:translate-y-0 group-hover:translate-x-0"
                ></span>

                <span className="relative text-lg block px-8 py-3 text-white bg-[#8be415] border border-[#e4ffc1] shadow-lg rounded">
                <router-link to="/login">Đăng nhập ngay</router-link>
                </span>
            </a>
            </button>
        </div>}
    </div>
  )
}

export default CreatePost