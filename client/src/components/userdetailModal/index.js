import React,{memo, useState, useEffect} from 'react'
import { firstLetterUppercase } from '../FirstLetterUppercase';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {FaUser} from 'react-icons/fa'
import {BiTime, BiUpload} from 'react-icons/bi';
import {RiUserFollowLine,RiUserUnfollowLine} from 'react-icons/ri';
import Moment from 'moment';
import { useStore } from '../../store';

import axios from 'axios';

function UserDetailModal({user}) {
    const [follow, setFollow ] = useState(false);
    const [follower, setFollower ] = useState();
    const [following, setFollowing ] = useState();
    const [state, ] = useStore();
    const navigate = useNavigate();

    useEffect(()=>{
        const controller = new AbortController();
          const checkfollow=(idfollower, idfollowing)=>{
              axios.post(`/api/isfollow`,{idfollower, idfollowing},{
                  signal: controller.signal
                }).then((res)=>{
                  if(res.data.message==='follow'){
                    setFollow(true)
                    setFollower(res.data.follower)
                    setFollowing(res.data.following)
                  } else {
                    setFollow(false)
                    setFollower(res.data.follower)
                    setFollowing(res.data.following)
                  }
              })
              .catch(e => {
              });
          }
          checkfollow(state.users.iduser, user.iduser)
          return ()=>{
              if (controller) {
                controller.abort();
              }
            }
      },[state.users, user.iduser])

    const handleFollow =()=>{
        axios.post(`/api/follow`,{idfollower: state.users.iduser, idfollowing: user.iduser}).then((res)=>{
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
    <div className='absolute select-none top-0 left-1 w-[400px] h-fit bg-[#86d510] rounded overflow-hidden shadow-md z-10 bg-top bg-cover bg-blend-color bg-opacity-50' style={{backgroundImage: `url("${user.usercoverimg}")`}}>
        <div className="w-full flex items-center px-1 py-2 h-fit " >
            <div className='rounded-full cursor-pointer h-16 w-16 bg-[#e1ffb4] border-[2px] border-green-800 hover:border-green-500'>
                <img 
                className='rounded-full w-full h-full object-cover'
                src={user.useravatar} alt='avatar'/>
            </div>
            <div className='flex flex-col flex-1 ml-1'>
                <span className='text-lg w-fit md:max-w-[130px] md:text-center overflow-hidden text-ellipsis font-medium text-[#d9ffa0]'>{firstLetterUppercase(user.username)} </span>
                <div className='bg-slate-500 bg-opacity-50 px-1 max-h-14 w-full rounded text-base overflow-hidden text-ellipsis font-normal text-[#d9ffa0]'>{user.userdesc}</div>
                <div className='flex my-1'>
                    <div className='md:flex mr-1 hidden items-center justify-center rounded  h-5 md:w-full bg-green-400 shadow-md text-yellow-100 text-base leading-none'>
                    <BiUpload className='mr-1'/>
                    Uploader
                    </div>
                    <div className='md:flex hidden items-center justify-center rounded  h-5 md:w-full bg-green-400 shadow-md text-yellow-100 text-base leading-none'>
                    <FaUser className='mr-1'/>
                    {firstLetterUppercase(user.usertitle)}
                    </div>
                </div>
                <div className='md:flex hidden items-center justify-center rounded  h-5 md:w-full bg-green-400 shadow-md text-yellow-100 text-base leading-none'>
                    <BiTime />
                    <span className='mr-1'>Join at: </span>
                    {Moment(user.joindate).format("DD-MM-YYYY")}
                </div>
            </div>
        </div>
        <div className="flex flex-col">
            <div className='flex justify-center py-2 bg-slate-500 bg-opacity-70'>
                <div className="mr-4 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-yellow-100">{follower?follower:user.followerCount}</span><span className="text-sm text-yellow-50">Follower</span>
                </div>
                <div className="mr-4 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-yellow-100">{following?following:user.followingCount}</span><span className="text-sm text-yellow-50">Following</span>
                </div>
                <div className="lg:mr-4 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-yellow-100">{user.postCount?user.postCount:0}</span><span className="text-sm text-yellow-50">Posts</span>
                </div>
            </div>
            <div className="flex justify-end py-2 bg-slate-500 bg-opacity-70">
                {follow?
                <div onClick={()=>handleFollow()} className='md:flex hidden items-center justify-center rounded  h-fit md:w-fit p-2 mr-2 bg-green-400 hover:bg-green-300 cursor-pointer shadow-md text-yellow-100 text-base leading-none'>
                    <RiUserFollowLine />
                    <span className='mr-1'>Đã Follow</span>
                </div>:
                <div onClick={()=>handleFollow()} className='md:flex hidden items-center justify-center rounded  h-fit md:w-fit p-2 mr-2 bg-green-400 hover:bg-green-300 cursor-pointer shadow-md text-yellow-100 text-base leading-none'>
                    <RiUserUnfollowLine />
                    <span className='mr-1'>Follow</span>
                 </div>
                }
                <div onClick={()=>navigate(`/profile/${user.iduser}`)} className='md:flex hidden items-center justify-center rounded  h-fit md:w-fit p-2 mr-2 bg-green-400 hover:bg-green-300 cursor-pointer shadow-md text-yellow-100 text-base leading-none'>
                        <FaUser />
                        <span className='mr-1'>Profile</span>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default memo(UserDetailModal)