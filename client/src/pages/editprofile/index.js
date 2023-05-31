import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore, action } from './../../store';
import {AiFillCamera} from 'react-icons/ai';
import icons from '../../assets/icons';

import DangerToast from './../../components/toast/dangerToast';
import SuccessToast from './../../components/toast/successToast';

function EditProfile() {
    const {iduser} = useParams();
    const navigate = useNavigate();
    const [state, dispatch] = useStore();
    const [user, setUser] = useState();
    const [username, setUserName] = useState('');
    const [userdesc, setUserDesc] = useState('');
    const [useravatar, setUserAvatar] = useState('');
    const [usercoverimg, setUserCoverImg] = useState('');
    const [userpassword, setUserPassword] = useState('');
    const [usernewpassword, setUserNewPassword] = useState('');
    const [userrepassword, setUserRePassword] = useState('');
    const [isloading, setIsLoading] = useState(true);
    const [issetpassword, setIsSetPassword] = useState(false);
    const [showpass, setShowPass] = useState(false);

    const [isSuccess, setisSuccess]= useState(false);
    const [isDanger, setisDanger]= useState(false);
    const [err, setErr]= useState('');
    
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
                setUserCoverImg(res.data[0].usercoverimg)
            }
        })
        setIsLoading(false)
      }
      fetchUser(iduser)
    }, [iduser])
  
    const handleUpdate =(e)=>{
        e.preventDefault();
        if(issetpassword){
            if((userpassword.length<6 || userrepassword.length<6|| usernewpassword.length<6) || usernewpassword !== userrepassword){
                setErr('Mật khẩu phải nhiều hơn 6 ký tự/mật khẩu nhập lại không đúng')
                setisDanger(true)
                    setTimeout(() => {
                        setisDanger(false)
                    }, 2000);
            } else{
                const userdata ={
                    iduser: user.iduser,
                    password: userpassword,
                    newpassword: usernewpassword
                }
                axios.patch(`/api/updateaccount`, userdata).then(res=>{
                    if(res.data.changedRows === 0){
                        setErr(res.data.message)
                        setisDanger(true)
                        setTimeout(() => {
                            setisDanger(false)
                        }, 1000);            
                    } else {
                        console.log('oke')
                        setisSuccess(true)
                        setTimeout(() => {
                        setisSuccess(false)
                        navigate(`/profile/${user.iduser}`)
                        }, 1000);      
                    }
                })
            }
        }
        else {
            if(username.length <6){
                setErr('UserName phải nhiều hơn 6 ký tự!')
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
                if(res.data.message){
                    setErr('Không thể cập nhật!')
                    setisDanger(true)
                    setTimeout(() => {
                        setisDanger(false)
                    }, 1000);            
                } else {
                    setisSuccess(true)
                    dispatch(action.setUser(...res.data));
                    localStorage.setItem("userinfo", JSON.stringify(...res.data));
                    setTimeout(() => {
                    setisSuccess(false)
                    navigate(`/profile/${user.iduser}`)
                    }, 1000);      
                }
                })
            }    
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

    const handleChangePassword = (e)=>{
        const str = e.target.value.replace(/\s/g,'').normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');;
        setUserPassword(str)
    }
    const handleChangeRePassword = (e)=>{
        const str = e.target.value.replace(/\s/g,'').normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');;
        setUserRePassword(str)
    }

    const handleChangeNewPassword = (e)=>{
        const str = e.target.value.replace(/\s/g,'').normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');;
        setUserNewPassword(str)
    }

  return (
    <>
        {isSuccess? <SuccessToast text={'Cập nhật thành công'} /> :<></>}
        {isDanger? <DangerToast text={err} /> :<></>}
        {!isloading ?
        <main className='p-5 flex flex-col items-center'>
        <div className='max-w-7xl w-full h-fit'>
            <section className='relative block h-[500px] select-none'>
                <div className='hidden'><img src={usercoverimg} alt='' onError={()=>handleErrCover()} /></div>
                <div className="absolute top-0 w-full h-full bg-top bg-cover" style={
                    {backgroundImage: `url("${usercoverimg}")`}
                }>
                <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                </div>
                {issetpassword?<></>:
                <div onClick={()=> handleCoverImg()}
                className='absolute flex justify-center items-center w-fit p-1 leading-none h-8 right-[-50px] md:right-0 translate-x-[-50%] top-[200px] rounded-full bg-black hover:bg-gray-600 text-gray-200 text-center'>Cài đặt ảnh bìa<AiFillCamera className='ml-1'/></div>}
            </section>
            <section className="relative">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                        <div className="px-6 select-none min-h-[600px]">
                            <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                <div className="rounded-full w-[150px] h-[150px] absolute left-[50%] translate-x-[-50%] top-[-50px] lg:top-[-50px]">
                                    <img alt="..." src={useravatar} onError={()=>handleErrAvatar()} className="shadow-xl rounded-full w-full h-full object-cover"/>
                                    {issetpassword?<></>:
                                    <div 
                                    onClick={()=> handleAvatar()}
                                    className='absolute flex justify-center items-center w-8 h-8 left-[50%] translate-x-[-50%] top-[130px] rounded-full bg-black hover:bg-gray-600 text-gray-200 text-center'><AiFillCamera/></div>
                                    }
                                </div>
                                
                            </div>
                            <div className="w-full flex justify-center sm:mt-28 lg:mt-0 lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                <div className="py-6 px-3 mt-32 sm:mt-0">   
                                    <button onClick={()=>setIsSetPassword(!issetpassword)} className="bg-green-500 w-32 mr-2 active:bg-green-600 hover:bg-green-400 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                    {issetpassword? 'User ': 'Password'}
                                    </button>         
                                    <button onClick={(e)=>handleUpdate(e)} className="bg-green-500 w-32 active:bg-green-600 hover:bg-green-400 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                    Đồng ý
                                    </button>    
                                </div>
                            </div>
                            {
                            issetpassword?
                            <div className="text-center mt-12 flex flex-col">
                                <label htmlFor='password' className='text-xl text-start font-semibold text-gray-700'>Mật khẩu cũ:</label>
                                <input onChange={(e)=>handleChangePassword(e)} type={showpass?'text':'password'} name='password' value={userpassword} required className="text-xl text-center bg-slate-100 font-semibold leading-normal mb-2 text-gray-600"/>
                                <label htmlFor='newpassword' className='text-xl text-start font-semibold text-gray-700'>Mật khẩu mới:</label>
                                <input onChange={(e)=>handleChangeNewPassword(e)} type={showpass?'text':'password'} name='newpassword' value={usernewpassword} required className="text-xl text-center bg-slate-100 font-semibold leading-normal mb-2 text-gray-600"/>
                                <label htmlFor='newpassword' className='text-xl text-start font-semibold text-gray-700'>Nhập lại mật khẩu mới:</label>
                                <input onChange={(e)=>handleChangeRePassword(e)} type={showpass?'text':'password'} name='newpassword' value={userrepassword} required className="text-xl text-center bg-slate-100 font-semibold leading-normal mb-2 text-gray-600"/>
                                <div className='text-start'>Hiện mật khẩu: <input  onChange={()=>setShowPass(!showpass)} type='checkbox'/></div>
                            </div>
                            :<div className="text-center mt-12 flex flex-col">
                                <label htmlFor='username' className='text-2xl text-start font-bold text-gray-700'>User Name:</label>
                                <input onChange={(e)=>handleUsername(e)} type='text' name='username' value={username} required className="text-4xl text-center bg-slate-100 font-semibold leading-normal mb-2 mt-4 text-gray-600"/>
                                <label htmlFor='userdesc' className='text-2xl text-start font-bold text-gray-700'>User Description:</label>
                                {user.userdesc===''? 
                                <textarea onChange={(e)=>handleUserDesc(e)} value={userdesc} name='userdesc'  required className="mb-2 p-1 text-gray-500 mt-4 w-full bg-slate-100"/>:
                                <textarea onChange={(e)=>handleUserDesc(e)} value={userdesc} name='userdesc' className="mb-2 p-1 text-center text-gray-500 mt-4 w-full bg-slate-100"/>
                                }
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
    
        </div>
    </main>:
    <div className='min-h-screen animate-pulse'>
        
    </div>}
    </>
  )
}

export default EditProfile