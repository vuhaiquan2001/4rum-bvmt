import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useStore } from './../../store/hooks';

import { Link } from 'react-router-dom';
import ProfilePost from '../../components/profilePost';
import FollowerTable from '../../components/FollowTable/Follower';
import FollowingTable from '../../components/FollowTable/Following';

function Profile() {
    const {iduser} = useParams();
    const [state,] = useStore();
    const [user, setUser] = useState();
    const [isloading, setIsLoading] = useState(true);
    const [table, setTable] = useState('post');

    const [follow, setFollow ] = useState(false);
    const [follower, setFollower ] = useState();
    const [following, setFollowing ] = useState();

    
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
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [iduser])
  
    useEffect(()=>{
        const controller = new AbortController();
          const checkfollow=(idfollower, idfollowing)=>{
              axios.post(`/api/isfollow`,{idfollower, idfollowing},{
                  signal: controller.signal
                }).then((res)=>{
                  if(res.data.message==='follow'){
                    setFollow(true)    
                  } else {
                    setFollow(false)
                  }
              })
              .catch(e => {
              });
          }
          checkfollow(state.users.iduser, iduser)
          return ()=>{
              if (controller) {
                controller.abort();
              }
            }
      },[state.users, iduser])

      const handleFollow =()=>{
        axios.post(`/api/follow`,{idfollower: state.users.iduser, idfollowing: iduser}).then((res)=>{
            if(res.data.message === 'follow'){
                setFollower(res.data.follower)
                setFollowing(res.data.following)
                setFollow(true)
            } else{
                setFollower(res.data.follower)
                setFollowing(res.data.following)
                setFollow(false)
            }
        })
        .catch(e => {
            console.log(e);
        });
    }
    
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
                        <div className="px-6 select-none min-h-[600px] h-fit">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                <div className="rounded-full w-[150px] h-[150px] absolute left-[50%] translate-x-[-50%] top-[-50px] lg:top-[-50px]">
                                    <img alt="..." src={user.useravatar} className="shadow-xl rounded-full w-full h-full object-cover"/>
                                </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                    <div className="py-6 flex justify-center px-3 mt-32 lg:mt-0">
                                        {state.users.iduser !== user.iduser? 
                                        (follow?
                                        <div onClick={()=>handleFollow()} className="bg-[var(--danger-color)] active:bg-[var(--sub-danger-color)] hover:bg-[var(--sub-danger-color)] uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 w-28 text-center rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150">
                                            UnFollow
                                        </div>
                                        :<div onClick={()=>handleFollow()} className="bg-[var(--primary-color)] active:[var(--sub-color)] hover:bg-[var(--sub-color)] uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 w-28 text-center rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150">
                                            Follow
                                        </div>)
                                        :<Link to={`/editprofile/${user.iduser}`} className="bg-[var(--primary-color)] active:[var(--sub-color)] hover:bg-[var(--sub-color)] uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150">
                                            Chỉnh sửa
                                        </Link>
                                        }      
                                    </div>
                                </div>
                                <div className="w-full mt-2 sm:mt-6 lg:mt-0 lg:w-4/12 px-4 lg:order-1">
                                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                        <div className="mr-4 p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{follower?follower:user.followerCount}</span><span className="text-sm text-blueGray-400">Follower</span>
                                        </div>
                                        <div className="mr-4 p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{following?following:user.followingCount}</span><span className="text-sm text-blueGray-400">Following</span>
                                        </div>
                                        <div className="lg:mr-4 p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{user.postCount}</span><span className="text-sm text-blueGray-400">Posts</span>
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
                            <div className='flex flex-col my-2 bg-[var(--sub-color)]'>
                                <div className='flex border-b-[1px] bg-[var(--primary-color)] text-lg font-semibold text-white'>
                                    <span onClick={()=>setTable('post')} className={`px-2 ${table==='post'?'bg-[var(--sub-color)]':''}  flex hover:bg-[var(--sub-color)] cursor-pointer`}>Posts</span>
                                    <span onClick={()=>setTable('follower')} className={`px-2 ${table==='follower'?'bg-[var(--sub-color)]':''} border-r-[1px] flex hover:bg-[var(--sub-color)] cursor-pointer`}>Follower</span>
                                    <span onClick={()=>setTable('following')} className={`px-2 ${table==='following'?'bg-[var(--sub-color)]':''} border-r-[1px] flex hover:bg-[var(--sub-color)] cursor-pointer`}>Following</span>
                                </div>
                                {table==='post'?<ProfilePost iduser={user.iduser}/>:(table==='follower'?
                                <FollowerTable iduser={user.iduser}/>:
                                <FollowingTable iduser={user.iduser}/>)}
                            </div>
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

export default Profile