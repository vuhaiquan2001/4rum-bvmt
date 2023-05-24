import React, {useState, useEffect, memo} from 'react'
import { firstLetterUppercase } from '../../components/FirstLetterUppercase';
import Moment from "moment";
import { Link } from 'react-router-dom';
import {BiTime} from 'react-icons/bi';
import icons from '../../assets/icons';

function PostThumb({post}) {
    const [tags, setTags] = useState([]);  
    useEffect(() => {
       post.tags ? setTags(post.tags.split(',')) : setTags(['Không có tag'])
    }, [post.tags])
    console.log(post.postthumb)
    const onerrImg = (e)=>{
        e.target.src = icons.defaultImg
    }
  return (
    <div className='h-48 relative text-2xl mb-4 rounded w-full border-[1px] bg-[#74ac21] shadow-xl'>
        {post.postthumb !== ''?<img 
                
                className='w-full h-full object-cover object-center rounded blur-[2px] opacity-60'
                src={post.postthumb} onError={(e)=>onerrImg(e)} alt='thumnail'/>:<React.Fragment/>}
        <div className='absolute top-2 left-2'>
            <div className='flex flex-1 flex-col px-2'>
                <div className='h-8 max-w-full overflow-hidden text-ellipsis'>
                    <span className='text-xl font-medium text-gray-100 hover:underline hover:text-white text-ellipsis'>{post.posttitle}</span>
                </div>
                <div className='flex text-base text-gray-100'>
                    <span className='hover:underline max-w-[150px] overflow-hidden text-ellipsis'>{firstLetterUppercase(post.username)}</span>
                    <span className='mx-1'>.</span>
                    <span className='hover:underline flex items-center'><BiTime/>{Moment(post.ngaytao).format("DD-MM-YYYY")}</span>
                </div>
                <div className='flex mt-2'>
                    <div className='mr-2 text-lg font-medium text-gray-100'>Tag:</div>
                    {tags.map((tag, index)=> (
                        <Link key={index} className='text-base font-medium leading-none p-2 mr-2 border-[1px] text-green-200 bg-green-600 rounded hover:bg-green-400'>#{tag}</Link>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default memo(PostThumb)