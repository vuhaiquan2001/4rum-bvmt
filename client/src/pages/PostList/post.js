import React,{ memo} from 'react'
import { Link } from 'react-router-dom'
import { firstLetterUppercase } from '../../components/FirstLetterUppercase';
import Moment from "moment";

function PostOfPostList({post}) {
  return (
    <Link
    className='flex justify-between items-center border-[1px] mt-[-1px]  bg-[#a3e635] hover:bg-[#b3ff50] hover:text-[#60961a]' 
    to={`/post/${post.idpost}`}>
      <div className='flex py-4 w-[75%] border-r-[1px] text-ellipsis max-h-24'>
        <div className='rounded-full h-14 w-14  mx-2  bg-[#e1ffb4] '>
          <img 
          className='rounded-full w-full h-full object-cover'
          src={post.useravatar} alt='avatar'/>
        </div>
        <div className='flex flex-1 flex-col px-2'>
          <div className='h-8 max-w-[800px] whitespace-nowrap overflow-hidden text-ellipsis'>
            <span className='text-xl font-medium text-[var(--text-color)] hover:underline
           hover:text-[#851210] text-ellipsis'>{post.posttitle}</span></div>
          <div className='flex'>
            <span className='text-sm text-[var(--sub-text-color)] hover:underline'>{firstLetterUppercase(post.username)}</span>
            <span className='text-sm text-[var(--sub-text-color)] mx-1'>.</span>
            <span className='text-sm text-[var(--sub-text-color)] hover:underline'>{Moment(post.ngaytao).format("DD-MM-YYYY")}</span>
          </div>
        </div>
        </div>
            <div className='flex justify-between items-center py-4 w-[25%]'>
            <div className='pl-2'>
                <span className='text-base font-medium hover:text-green-700 text-[var(--sub-text-color)] hover:underline'>Votes: {post.likequantity}</span>
            </div>
            <div className='flex flex-col pr-2 text-end'>
                <span className='text-base font-medium hover:text-green-700 text-[var(--sub-text-color)] hover:underline pb-1'>Views: {post.viewquantity}</span>
                <span className='text-base font-medium hover:text-green-700 text-[var(--sub-text-color)] hover:underline'>Comments: {post.commentquantity}</span>
            </div>
        </div>
    </Link>
  )
}

export default memo(PostOfPostList)