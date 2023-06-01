import React,{useEffect, useState} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from '../paginations';

function ProfilePost({iduser}) {
    const [posts, setPosts] = useState([])
    const [isLoading, setisLoading] = useState(true)

    const [currentpage, setCurrentPage] = useState(1);
    const [postperpage, ] = useState(10);
    //lấy ra index của post cuối cùng của 1 trang = index trang hiện tại nhân số trang
    const indexOfLastPost = currentpage*postperpage;
    //lấy ra index của post đầu tiên bằng trang cuối trừ đi số trang mỗi page
    const indexOfFirstPost= indexOfLastPost - postperpage;
    //cắt mảng post ban đầu ra theo từng trang
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
    // Khi đổi trang trong paginate thì đổi current page = số trên pagi  
    const Paginate = (pageNumber)=> {setCurrentPage(pageNumber); window.scrollTo({top: 0, left: 0, behavior: 'smooth'});};

    useEffect(() => {
       axios(`/api/profilepost/${iduser}`).then(res=>{
            setPosts(res.data)
            setisLoading(false)
       })  
    }, [iduser])
  return (
    <>
    {
    isLoading?<div className='h-12 animate-bounce'>Loading</div>:
    <div className='flex flex-col border-b-[1px]'>
        {currentPosts.map((post,index)=>(
            <Link
            key={index}
            className='flex justify-between items-center border-[1px] mt-[-1px]  bg-[#a3e635] hover:bg-[#b3ff50] hover:text-[#60961a]' 
            to={`/post/${post.idpost}`}>
                <div className='flex py-4 w-[75%] lg:border-r-[1px] text-ellipsis max-h-24'>
                    <div className='flex justify-between flex-1 px-2'>
                        <div className='h-8 max-w-[800px] whitespace-nowrap overflow-hidden text-ellipsis'>
                            <span className='text-lg font-medium text-[var(--text-color)] hover:underline hover:text-[#851210] text-ellipsis'>
                            {post.posttitle}
                            </span>
                        </div>
                        <div className='hidden lg:flex'>
                            {post.tags.split(',').map((tag, index)=> (
                                <div key={index} className='text-base font-medium leading-none p-2 mr-2 border-[1px] text-green-200 bg-green-600 rounded hover:bg-green-400'>#{tag}</div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='hidden lg:flex justify-between items-center py-4 w-[25%]'>
                    <div className='pl-2'>
                        <span className='text-base font-medium hover:text-green-700 text-[var(--sub-text-color)] hover:underline'>Votes: {post.likequantity}</span>
                    </div>
                    <div className='flex flex-col pr-2 text-end'>
                        <span className='text-base font-medium hover:text-green-700 text-[var(--sub-text-color)] hover:underline pb-1'>Views: {post.viewquantity}</span>
                        <span className='text-base font-medium hover:text-green-700 text-[var(--sub-text-color)] hover:underline'>Comments: {post.commentquantity}</span>
                    </div>
                </div>
            </Link>
        ))}
          {posts.length>10&&<Pagination postPerPage={postperpage} currentPage={currentpage} totalPosts={posts.length} Paginate={Paginate}/>}
    </div>
    }
    </>
  )
}

export default ProfilePost