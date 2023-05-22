import React, {useState, useEffect, memo} from 'react'
import { Link } from 'react-router-dom';
import Moment from 'moment'

function ThumEditor({...thumb}) {
    const [tags, setTags] = useState([]); 
    const [data, setData] = useState({});
    const [user, setUser] = useState({});
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("userinfo")))
        setData(thumb.thumbData)
        thumb.thumbData.tags  ? setTags(thumb.thumbData.tags.split(',')) : setTags(['Không có tag'])
     }, [thumb.thumbData.tags, thumb.thumbData])
     
  return (
    <div className='h-48 relative text-2xl mb-4 rounded w-full border-[1px] bg-[#598319] shadow-xl'>
        {data.imgUrl ?<img 
                className='w-full h-full object-cover object-center rounded blur-[2px] opacity-60'
                src={data.imgUrl} alt='thumnail'/>:<React.Fragment/>}
        <div className='absolute top-2 left-2'>
            <div className='flex flex-1 flex-col px-2'>
                <div className='h-8 max-w-full overflow-hidden text-ellipsis'>
                    <span className='text-xl font-medium text-gray-100 hover:underline hover:text-white text-ellipsis'>{data.title}</span>
                </div>
                <div className='flex text-base text-gray-100'>
                    <span className='hover:underline'>{user.username}</span>
                    <span className='mx-1'>.</span>
                    <span className='hover:underline'>{Moment().format("DD-MM-YYYY")}</span>
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

export default memo(ThumEditor) 