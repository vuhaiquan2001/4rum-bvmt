import React, {useState, useEffect} from 'react'
import { useStore } from '../../store';
import { useParams } from 'react-router-dom';
import UpdatePostEditor from '../../components/UpdatePostEditor/UpdatePostEditor';

import axios from "axios";

function UpdatePost() {
    const {idpost} = useParams();
    const [post, setPost] = useState({});
    const [owner, setOwner] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [state, ] = useStore();

    useEffect(() => {    
        async function fetchData() {
            await axios.get(`/api/postdetail/${idpost}`).then((response) => {
                setPost(...response.data)
              })
            setIsLoading(false);
        }
        fetchData()
    }, [idpost])

    useEffect(() => {
        if(state.users.iduser === post.iduser){
            setOwner(true)
        } else {
            setOwner(false)
        }
    }, [state.users, post])
    
   
    
    return (
        <>
        {isLoading? <div className='w-full min-h-screen flex justify-center mt-8 bg-[#62ac00] animate-pulse'>Đang tải</div>:
            <>
                {owner?
                    <div className='w-full min-h-screen flex justify-center mt-8'>
                       <div className='w-full max-w-[1280px] flex flex-col'>
                           <UpdatePostEditor post={post}/>
                       </div>            
                   </div>
                   :
                   <div className='w-full min-h-screen flex justify-center mt-8'>
                       <div className="h-screen w-full flex flex-col justify-center items-center bg-[#62ac00]">
                           <h1 className="text-9xl font-extrabold text-white tracking-widest">SORRY</h1>
                           <div className="bg-[#84d41a] px-2 text-base rounded rotate-12 absolute text-white shadow-xl">
                               Bạn không có quyền sửa bài này!
                           </div>
                           <button className="mt-5 rounded">
                           <a href='/' className="relative inline-block text-sm font-medium text-[#405e19] group active:text-[#8ac53c] focus:outline-none focus:ring">
                               <span
                               className="absolute rounded inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#e4ffc1] group-hover:translate-y-0 group-hover:translate-x-0"
                               ></span>
           
                               <span className="relative text-lg block px-8 py-3 text-white bg-[#8be415] border border-[#e4ffc1] shadow-lg rounded">
                               <router-link to="/">Trở lại trang chủ</router-link>
                               </span>
                           </a>
                           </button>
                       </div>
                   </div>   
                   }
            </>
            }
        </>
    )
}

export default UpdatePost