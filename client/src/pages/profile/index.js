import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useStore } from './../../store/hooks';

import { Link } from 'react-router-dom';

function Profile() {
    const {iduser} = useParams();
    const [state,] = useStore();
    const [user, setUser] = useState();
    const [isloading, setIsLoading] = useState(true);

    useEffect(() => {
      async function fetchUser(iduser) {
        await axios.get(`/api/user/${iduser}`).then((res)=>{
            if(res.data.message){

            } else {
                setUser(...res.data)
            }
        })
        setIsLoading(false)
      }
      fetchUser(iduser)
    }, [iduser])
  
  return (
    <>
        {!isloading ?
        <main className='p-5 flex flex-col items-center'>
        <div className='max-w-7xl w-full h-fit'>
            <section className='relative block h-[500px]'>
                <div className="absolute top-0 w-full h-full bg-top bg-cover" style={
                    {backgroundImage: `url("${user.usercoverimg}")`}
                }>
                <span id="blackOverlay" className="w-full h-full absolute opacity-50 bg-black"></span>
                </div>
            </section>
            <section className="relative">
                <div className="container mx-auto px-4">
                    <div className="relative min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                        <div className="px-6 select-none min-h-[600px]">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                <div className="rounded-full w-[150px] h-[150px] absolute left-[50%] translate-x-[-50%] top-[-50px] lg:top-[-50px]">
                                    <img alt="..." src={user.useravatar} className="shadow-xl rounded-full w-full h-full object-cover"/>
                                </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                    <div className="py-6 px-3 mt-32 sm:mt-0">
                                        {state.users.iduser !== user.iduser? <></>:
                                        <Link to={`/editprofile/${user.iduser}`} className="bg-green-500 active:bg-green-600 hover:bg-green-300 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150" type="button">
                                        Chỉnh sửa
                                        </Link>
                                        }      
                                    </div>
                                </div>
                                <div className="w-full mt-2 sm:mt-6 lg:mt-0 lg:w-4/12 px-4 lg:order-1">
                                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                        <div className="mr-4 p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span className="text-sm text-blueGray-400">Friends</span>
                                        </div>
                                        <div className="mr-4 p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Photos</span>
                                        </div>
                                        <div className="lg:mr-4 p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Comments</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-12">
                                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
                                {user.username}
                                </h3>
                                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                {user.usertitle}
                                </div>
                                {user.userdesc===''? 
                                <div className="mb-2 text-blueGray-600 mt-10">
                                Không có mô tả
                                </div>:
                                <div className="mb-2 text-blueGray-600 mt-10">
                                {user.userdesc}
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    
        </div>
    </main>:
    <div> Đang tải</div>}
    </>
  )
}

export default Profile