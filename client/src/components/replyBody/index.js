import React, {useState, useEffect, memo} from 'react';
import {FaUser,FaEllipsisV,FaComment} from 'react-icons/fa';
import {BiTime, BiUpload} from 'react-icons/bi';
import{MdFavorite} from 'react-icons/md'

import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import { useStore } from '../../store';

import Moment from 'moment';
import { firstLetterUppercase } from '../FirstLetterUppercase';
import Pagination from '../paginations';
import UserDetailModal from '../userdetailModal';

function ReplyBody({setdata, myRef, setrerender, setreplyupdate, iduserpost}) {
    const {idpost} = useParams();
    const [replys, setReplys] = useState([]);
    const [state, ] = useStore();

    const [userdetail, setUserdetail]= useState(false);

    //pagination cho reply
    const [currentreplypage, setCurrentReplyPage] = useState(1);
    const [replyperpage, ] = useState(10);
    const indexOfLastReply = currentreplypage*replyperpage;
    const indexOfFirstReply= indexOfLastReply - replyperpage;
    const currentReplys = replys.slice(indexOfFirstReply, indexOfLastReply);
    const Paginate = (pageNumber)=> {setCurrentReplyPage(pageNumber)};

    //
    //fetch data reply
    const [isLoading, setisLoading] = useState(true);
    const fetchreply = async (idpost) => {
        await axios.get(`/api/reply/${idpost}`).then((response) => {
          setReplys(response.data)
          setisLoading(false)
        })
        .catch(e => {
          console.log(e);
        });
      }
      useEffect(() => {
        fetchreply(idpost); 
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, [idpost])

      const handleRef = (e)=> {
        e.preventDefault();
        myRef.current.scrollIntoView()   
        setdata(e.currentTarget.getAttribute('data-rep'))
      }

      const handleReplyUpdate = (e)=> {
        e.preventDefault();
        myRef.current.scrollIntoView()   
        setreplyupdate(e.currentTarget.getAttribute('data-update'))
      }

      const handleDeleteReply = async(id)=>{
        const answer = window.confirm("Bạn có chắc muốn xóa bài chứ? Mọi dữ liệu, comment của bài viết sẽ biến mất!");
        if (answer) {
            await axios.get(`/api/deletereply`,{
                params: {
                  id: id,
                  idpost: idpost,
                }
                }).then((response) => {
                setrerender(Math.floor(Math.random() * 100))
              })
        }
    }

    const handleHover = (id)=>{
      setTimeout(() => {
          setUserdetail(id)
      }, 1000);
  }
  return (
    <div className=' w-full'>
        <div className='w-40 p-2 border-x-[1px] border-t-[1px] border-[var(--sub-text-color)] rounded-t text-lg font-semibold bg-[var(--sub-bg-color)] text-[var(--primary-text-color)]'>Bình luận:</div>
        {replys.length ===0 || isLoading? 
        <div className='flex items-center justify-center w-full min-h-[150px] bg-[var(--sub-bg-color)] border-[1px] border-[var(--sub-text-color)] text-xl font-medium'>Hiện Không có comment nào</div>
        :currentReplys.map((reply, index)=> {
            const ref = JSON.parse(reply.replyref)
            return (
                <div key={index} className='flex flex-col md:flex-row text-2xl w-full border-x-[1px] border-t-[1px] bg-[var(--sub-bg-color)] shadow-xl border-[var(--sub-text-color)] last:border-b-[1px] '>
                    <div onMouseLeave={()=>setUserdetail(false)}  className='flex relative h-fit md:flex-col w-full p-2 md:w-40 justify-start items-center border-b-[1px] md:border-r-[1px] border-[var(--sub-text-color)] md:border-b-0'>
                      {userdetail===reply.idreply&&reply.iduser!==state.users.iduser&&
                      <UserDetailModal user={reply}/>
                      }
                      <Link onMouseEnter={()=>handleHover(reply.idreply)}  to={`/profile/${reply.iduser}`} className='rounded-full cursor-pointer h-16 w-16 bg-[#e1ffb4] border-[2px] border-green-800 hover:border-green-500'>
                          <img 
                          className='rounded-full w-full h-full object-cover'
                          src={reply.useravatar} alt='avatar'/>
                      </Link>
                      
                      <div className='flex flex-col ml-2'>
                          <div className='text-lg w-fit md:max-w-[130px] md:text-center overflow-hidden text-ellipsis font-medium mb-1 text-[var(--primary-text-color)]'>
                              {firstLetterUppercase(reply.username)} 
                              {iduserpost===reply.iduser&&<span className='md:hidden text-xs text-[var(--sub-text-color)] ml-1'>Uploader</span>}
                          </div>
                          <span className='md:hidden text-xs text-[var(--sub-text-color)]'>{firstLetterUppercase(reply.usertitle)}.{Moment(reply.joindate).format("DD-MM-YYYY")}</span>
                      </div>
                     {iduserpost===reply.iduser&&<div className='md:flex hidden items-center justify-center rounded  h-5 md:w-full bg-[var(--primary-color)] shadow-md text-white text-base leading-none'>
                      <BiUpload className='mr-1'/>
                      Uploader
                      </div>}
                      <div className='md:flex hidden items-center justify-center rounded  h-5 md:w-full bg-[var(--primary-color)] shadow-md text-white my-2 text-base leading-none'>
                      <FaUser className='mr-1'/>
                      {firstLetterUppercase(reply.usertitle)}
                      </div>
                      <div className='md:flex hidden items-center justify-center rounded  h-5 md:w-full bg-[var(--primary-color)] shadow-md text-white text-base leading-none'>
                      <BiTime className='mr-1'/>
                      {Moment(reply.joindate).format("DD-MM-YYYY")}
                      </div>
                  </div>
        
                  <div className='flex flex-col flex-1 justify-between items-center  p-2'>
                    <div className='flex justify-between items-center w-full my-1 text-sm text-[var(--sub-text-color)]'>
                          <div className='flex underline hover:text-[var(--primary-text-color)]'>
                              <BiTime className='w-5 h-5 mr-1'/>
                              {Moment(reply.replydate).format("DD-MM-YYYY")}
                          </div>
                        
                          {reply.iduser === state.users.iduser || state.users.usertitle === 'admin'?
                          <div className={`relative cursor-pointer px-2 group hover:text-[var(--primary-text-color)]`}>
                              <FaEllipsisV/>
                              <div className={`absolute text-gray-600 top-5 after:top-[-10px] after:absolute after:content-[''] after:h-3 after:w-full right-0 lg:right-1/2 lg:translate-x-1/2 bg-[#a4ea3c]  w-28 group-hover:flex hidden flex-col`} >
                              <div onClick={()=>handleDeleteReply(reply.idreply)}  className='border-b-[1px] p-2 hover:bg-[#c3fa70] text-center rounded-t'>Xóa</div>
                              <button onClick={(e)=>handleReplyUpdate(e)} data-update={JSON.stringify(reply)} className='p-2 hover:bg-[#c3fa70] text-center rounded-b'>Sửa</button>
                              </div>
                          </div>:<></>}
                    </div>
                    {ref.iduserref?
                    <div className='w-full bg-[var(--hover-bg-color)]  px-2 border-l-4 border-[var(--sub-color)]'>
                       <div className='flex'>
                       <div className='text-lg max-w-[130px] overflow-hidden text-ellipsis font-medium  text-[var(--primary-text-color)]'>{ref.usernameref}</div>
                           <div className='flex items-center underline text-[var(--sub-text-color) text-sm'>
                                <BiTime className='w-5 h-5 mr-1'/>
                                {Moment(ref.replydateref).format("DD-MM-YYYY")}
                            </div>
                       </div>
                       <div dangerouslySetInnerHTML={{__html: ref.contentref}}></div>
                    </div>
                    :<></>}
                    <div className='w-full mt-2 text-xl flex-1' dangerouslySetInnerHTML={{__html: reply.replydesc}}></div>
                    <div className='flex h-9 justify-start items-center w-full my-1 text-2xl leading-none text-white bg-[var(--primary-color)]  px-2 border-l-4 border-[var(--sub-color)]'>   
                        <div className='flex hover:text-[#fdff83] hover:text-4xl'>
                            <MdFavorite/>
                            <span className='text-lg'>{reply.replylike}</span>
                        </div>
                        <button className='flex ml-4 w-fit h-fit' onClick={(e)=>handleRef(e)} data-rep={JSON.stringify(reply)}>
                            <FaComment className='hover:text-[#fdff83] hover:text-4xl'/>
                        </button>
                        
                    </div>
                </div>  
            </div>
            )
        })}
        <Pagination postPerPage={replyperpage} currentPage={currentreplypage} totalPosts={replys.length} Paginate={Paginate}/>
    </div>
  )
}

export default memo(ReplyBody)