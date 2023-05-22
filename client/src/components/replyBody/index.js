import React, {useState, useEffect, memo} from 'react';
import {FaUser} from 'react-icons/fa';
import {BiTime, BiUpload} from 'react-icons/bi';
import {FaComment} from 'react-icons/fa'
import{MdFavorite, MdReport} from 'react-icons/md'

import { useParams } from 'react-router-dom';
import axios from "axios";

import Moment from 'moment';
import { firstLetterUppercase } from '../FirstLetterUppercase';
import Pagination from '../paginations';

function ReplyBody({setdata, myRef}) {
    const {idpost} = useParams();
    const [replys, setReplys] = useState([]);
    //pagination cho reply
    const [currentreplypage, setCurrentReplyPage] = useState(1);
    const [replyperpage, ] = useState(2);
    const indexOfLastReply = currentreplypage*replyperpage;
    const indexOfFirstReply= indexOfLastReply - replyperpage;
    const currentReplys = replys.slice(indexOfFirstReply, indexOfLastReply);
    const Paginate = (pageNumber)=> {setCurrentReplyPage(pageNumber)};

    //fetch data reply
    const [isLoading, setisLoading] = useState(true);
    const fetchreply = async (idpost) => {
        await axios.get(`/api/reply/${idpost}`).then((response) => {
          setReplys(response.data);
        });
        setisLoading(false)
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

  return (
    <div className=' w-full'>
        <div className='w-40 p-2 border-x-[1px] border-t-[1px] rounded-t text-lg font-semibold bg-[#83cc15] text-yellow-100'>Bình luận:</div>
        {replys.length ===0 || isLoading? <div className='flex items-center justify-center w-full min-h-[150px] bg-[#83cc15] border-[1px] text-xl font-medium'>Hiện Không có comment nào</div>:
        currentReplys.map((reply, index)=> {
            const ref = JSON.parse(reply.replyref)
            return (
                <div key={index} className='flex text-2xl w-full border-x-[1px] border-t-[1px] bg-[#83cc15] shadow-xl last:border-b-[1px]'>
                <div className='flex flex-col p-2 w-40 justify-center items-center border-r-[1px]'>
                    <div className='rounded-full h-16 w-16 bg-[#e1ffb4] border-[2px] border-green-800'>
                        <img 
                        className='rounded-full w-full h-full object-cover'
                        src={reply.useravatar} alt='avatar'/>
                    </div>
                    <div className='text-lg max-w-[130px] overflow-hidden text-ellipsis font-medium my-2 text-[#d9ffa0]'>{reply.username}</div>
                    <div className='flex items-center justify-center rounded  h-5 w-full bg-green-400 shadow-md text-yellow-100 text-base leading-none'>
                    <BiUpload className='mr-1'/>
                    Uploader
                    </div>
                    <div className='flex items-center justify-center rounded  h-5 w-full bg-green-400 shadow-md text-yellow-100 my-2 text-base leading-none'>
                    <FaUser className='mr-1'/>
                    {firstLetterUppercase(reply.usertitle)}
                    </div>
                    <div className='flex items-center justify-center rounded  h-5 w-full bg-green-400 shadow-md text-yellow-100 text-base leading-none'>
                    <BiTime className='mr-1'/>
                    {Moment(reply.joindate).format("DD-MM-YYYY")}
                    </div>
                </div>
        
                <div className='flex flex-col flex-1 justify-between items-center  p-2'>
                    <div className='flex justify-between items-center w-full my-1 text-sm text-[#e3e63f]'>
                        <div className='flex underline hover:text-[#fdff83]'>
                            <BiTime className='w-5 h-5 mr-1'/>
                            {Moment(reply.replydate).format("DD-MM-YYYY")}
                        </div>
                    </div>
                    {ref.iduserref?
                    <div className='w-full bg-[#6eb00b]  px-2 border-l-4 border-[#bdff5a]'>
                       <div className='flex'>
                       <div className='text-lg max-w-[130px] overflow-hidden text-ellipsis font-medium  text-[#d9ffa0]'>{ref.usernameref}</div>
                           <div className='flex items-center underline hover:text-[#fdff83] text-sm text-[#e3e63f]'>
                                <BiTime className='w-5 h-5 mr-1'/>
                                {Moment(ref.replydateref).format("DD-MM-YYYY")}
                            </div>
                       </div>
                       <div dangerouslySetInnerHTML={{__html: ref.contentref}}></div>
                    </div>
                    :<></>}
                    <div className='w-full mt-2 text-xl flex-1' dangerouslySetInnerHTML={{__html: reply.replydesc}}></div>
                    <div className='flex h-9 justify-start items-center w-full my-1 text-2xl leading-none text-[#e3e63f] bg-[#6eb00b] px-2 border-l-4 border-[#bdff5a]'>   
                        <div className='flex hover:text-[#fdff83] hover:text-4xl'>
                            <MdFavorite/>
                            <span className='text-lg'>{reply.replylike}</span>
                        </div>
                        <button className='flex ml-4 w-fit h-fit' onClick={(e)=>handleRef(e)} data-rep={JSON.stringify(reply)}>
                            <FaComment className='hover:text-[#fdff83] hover:text-4xl'/>
                        </button>
                        <div className='flex ml-4 hover:text-[#fdff83] hover:text-4xl'>
                            <MdReport/>
                        </div>
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