import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from './../../store/hooks';
import {AiFillCamera} from 'react-icons/ai';
import icons from '../../assets/icons';
import { Link } from 'react-router-dom';

import DangerToast from './../../components/toast/dangerToast';
import SuccessToast from './../../components/toast/successToast';

function EditProfile() {
    const {iduser} = useParams();
    const navigate = useNavigate();
    const [state,] = useStore();
    const [user, setUser] = useState();
    const [username, setUserName] = useState('');
    const [userdesc, setUserDesc] = useState('');
    const [useravatar, setUserAvatar] = useState('');
    const [usercoverimg, setUserCoverImg] = useState('');
    const [isloading, setIsLoading] = useState(true);

    const [isSuccess, setisSuccess]= useState(false);
    const [isDanger, setisDanger]= useState(false);
    
    useEffect(() => {
        if(String(state.users.iduser) !== iduser){
            navigate(`/profile/${iduser}`)
        }
    }, [state.users, iduser, navigate])
    
    useEffect(() => {
      async function fetchUser(iduser) {
        await axios.get(`/api/user/${iduser}`).then((res)=>{
            if(res.data.message){
                console.log('Không tìm thấy user')
            } else {
                setUser(...res.data)
                setUserName(res.data[0].username)
                setUserDesc(res.data[0].userdesc)
                setUserAvatar(res.data[0].useravatar)
                setUserCoverImg(res.data[0].usercoverimg)
            }
        })
        setIsLoading(false)
      }
      fetchUser(iduser)
    }, [iduser])
  
    const handleUpdate =()=>{
        if(username === '' || userdesc === ''){
            setisDanger(true)
            setTimeout(() => {
                setisDanger(false)
            }, 1000);  
        } else{
            const userdata ={
                iduser: user.iduser,
                username: username,
                userdesc: userdesc,
                useravatar: useravatar,
                usercoverimg: usercoverimg
            }
            axios.patch(`/api/updateuser`, userdata)
        .then(res => {
          if(res.data.changedRows ===0){
            setisDanger(true)
            setTimeout(() => {
                setisDanger(false)
            }, 1000);            
          } else {
            setisSuccess(true)
            setTimeout(() => {
              setisSuccess(false)
              navigate(`/profile/${user.iduser}`)
            }, 1000);      
          }
        })
        }
    }
    const handleCoverImg =()=>{
        const url = window.prompt('URL', usercoverimg)
        if(url){
            setUserCoverImg(url)
        }
    }
    const handleAvatar =()=>{
        const url = window.prompt("Nhập vào Url avatar của bạn!", useravatar);
        if(url){
            setUserAvatar(url)
        }
    }
    const handleUsername = (e)=>{
        setUserName(e.target.value)
    }

    const handleUserDesc = (e)=>{
        setUserDesc(e.target.value)
    }
    const handleErrAvatar= ()=>{
        setUserAvatar(icons.defaultAvatar)
    }

    const handleErrCover= ()=>{
        setUserCoverImg(icons.defaultCover)
    }
  return (
    <>
        {isSuccess? <SuccessToast text={'Cập nhật thành công'} /> :<></>}
        {isDanger? <DangerToast text={'Vui lòng nhập đầy đủ thông tin'} /> :<></>}
        {!isloading &&
        <main className='p-5 flex flex-col items-center'>
        <div className='max-w-7xl w-full h-fit'>
            <section className='relative block h-[500px] select-none'>
                <div className='hidden'><img src={usercoverimg} alt='' onError={()=>handleErrCover()} /></div>
                <div className="absolute top-0 w-full h-full bg-top bg-cover" style={
                    {backgroundImage: `url("${usercoverimg}")`}
                }>
                <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                </div>
                <div onClick={()=> handleCoverImg()}
                className='absolute flex justify-center items-center w-fit p-1 leading-none h-8 right-[-50px] md:right-0 translate-x-[-50%] top-[200px] rounded-full bg-black hover:bg-gray-600 text-gray-200 text-center'>Cài đặt ảnh bìa<AiFillCamera className='ml-1'/></div>
            </section>
            <section className="relative">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                        <div className="px-6 select-none">
                            <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                <div className="rounded-full w-[150px] h-[150px] absolute left-[50%] translate-x-[-50%] top-[-50px] lg:top-[-50px]">
                                    <img alt="..." src={useravatar} onError={()=>handleErrAvatar()} className="shadow-xl rounded-full w-full h-full object-cover"/>
                                    <div 
                                    onClick={()=> handleAvatar()}
                                    className='absolute flex justify-center items-center w-8 h-8 left-[50%] translate-x-[-50%] top-[130px] rounded-full bg-black hover:bg-gray-600 text-gray-200 text-center'><AiFillCamera/></div>
                                </div>
                                
                            </div>
                            <div className="w-full flex justify-center sm:mt-28 lg:mt-0 lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                <div className="py-6 px-3 mt-32 sm:mt-0">   
                                    <Link to={`/profile/${user.iduser}`} className="bg-pink-500 mr-2 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                    Trở lại Profile
                                    </Link>         
                                    <button onClick={()=>handleUpdate()} className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                    Đồng ý
                                    </button>    
                                </div>
                            </div>

                            
                            <div className="text-center mt-12">
                                <input onChange={(e)=>handleUsername(e)} type='text' value={username} required className="text-4xl text-center bg-slate-100 font-semibold leading-normal mb-2 text-gray-600"/>
                                <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                                {user.usertitle}
                                </div>
                                {user.userdesc===''? 
                                <textarea onChange={(e)=>handleUserDesc(e)} value={'Không có mô tả'}  required className="mb-2 p-1 text-gray-500 mt-10 bg-slate-100"/>:
                                <textarea onChange={(e)=>handleUserDesc(e)} value={userdesc} className="mb-2 p-1 text-center text-gray-500 mt-10 w-full bg-slate-100"/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    
        </div>
    </main>}
    </>
  )
}

export default EditProfile