import React,{useEffect, useState, memo} from 'react'
import axios from 'axios';
import Pagination from '../paginations';
import { Link } from 'react-router-dom';
import UserDetailModal from '../userdetailModal';
import icons from '../../assets/icons';

function FollowerTable({iduser}) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading]= useState(true);
    const [userdetail, setUserdetail]= useState(false);


    const [currentpage, setCurrentPage] = useState(1);
    const [postperpage, ] = useState(10);
    //lấy ra index của post cuối cùng của 1 trang = index trang hiện tại nhân số trang
    const indexOfLastPost = currentpage*postperpage;
    //lấy ra index của post đầu tiên bằng trang cuối trừ đi số trang mỗi page
    const indexOfFirstPost= indexOfLastPost - postperpage;
    //cắt mảng post ban đầu ra theo từng trang
    const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost)
    // Khi đổi trang trong paginate thì đổi current page = số trên pagi  
    const Paginate = (pageNumber)=> {setCurrentPage(pageNumber); window.scrollTo({top: 0, left: 0, behavior: 'smooth'});};
    useEffect(() => {
      axios(`/api/getfollower/${iduser}`).then(res=>{
        if(res.data.message){
            setUsers([])
            setLoading(false)
        } else {
            setUsers(res.data)
            setLoading(false)
        }
         })  
        .catch(e=>{})
    }, [iduser])

    const handleHover = (id)=>{
        setTimeout(() => {
            setUserdetail(id)
        }, 1000);
    }

    return (
      <>{loading?<div></div>:
      <>
          {users.length<=0?<div className='flex flex-col w-full min-h-[50vh] justify-center items-center text-xl font-semibold bg-[var(--sub-bg-color)] text-[var(--primary-text-color)]'>Không ai Follow bạn <img src={icons.pepeSad} alt='pepe'/></div>:
          <div className='flex flex-col'>
            {currentPosts.map((user, index)=>(
                <Link onMouseLeave={()=>setUserdetail(false)} to={`/profile/${user.iduser}`} key={index} className='flex flex-col items-start bg-[var(--sub-bg-color)] hover:bg-[var(--hover-bg-color)] md:flex-row relative md:items-center justify-between p-1 border-b-[1px]'>
                {userdetail===user.iduser&&
                <UserDetailModal user={user}/>
                }
                <div className='flex items-center flex-1 w-full'> 
                    <div onMouseEnter={()=>handleHover(user.iduser)} className='rounded-full h-14 w-14  mx-2  bg-[#e1ffb4] '>
                        <img 
                        className='rounded-full w-full h-full object-cover'
                        src={user.useravatar} alt='avatar'/>
                    </div>
                    <div className='flex items-center'>
                        <span className='flex items-center text-white h-fit capitalize text-base font-semibold py-1 px-2 bg-green-500 hover:bg-green-400 rounded mr-1'>{user.usertitle}</span>
                        <span className='flex items-center mr-1 text-base font-semibold text-[--primary-text-color]'>{user.username}</span>
                        <span className='hidden text-[--sub-text-color] sm:flex items-center flex-1 text-sm font-medium italic overflow-hidden text-ellipsis bg-slate-400 bg-opacity-30'>"{user.userdesc!==''?user.userdesc:'Không có mô tả.'}"</span>
                    </div>
                </div>
                <div className='flex w-fit px-2 py-2 md:py-0'>
                    <span className='ml-2 text-sm sm:text-base font-medium flex items-center text-[--primary-text-color]'>Posts: <p className='ml-1 text-end text-lg font-semibold text-[--sub-text-color]'>{user.postCount}</p></span>
                    <span className='ml-2 text-sm sm:text-base font-medium flex items-center text-[--primary-text-color]'>Follower: <p className='ml-1 text-end text-lg font-semibold text-[--sub-text-color]'>{user.followerCount}</p></span>
                    <span className='ml-2 text-sm sm:text-base font-medium flex items-center text-[--primary-text-color]'>Following: <p className='ml-1 text-end text-lg font-semibold text-[--sub-text-color]'>{user.followingCount}</p></span>
                </div>
            </Link>
            ))}
            {users.length>10&&<Pagination postPerPage={postperpage} currentPage={currentpage} totalPosts={users.length} Paginate={Paginate}/>}
          </div>}
      </>
      }</>
    )
}

export default memo(FollowerTable)