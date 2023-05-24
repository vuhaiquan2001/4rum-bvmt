import React, {useState, useEffect} from 'react'
import { useStore} from '../../store';
import Pagination from '../../components/paginations';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useParams } from 'react-router-dom';
import Moment from "moment";
import { firstLetterUppercase } from '../../components/FirstLetterUppercase';

function PostList() {
  const [state, ] = useStore();
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [currentpage, setCurrentPage] = useState(1);
  const [postperpage, ] = useState(10);
  const {idtopic} = useParams();
  
  useEffect(() => {
    if(state.posts.length !==0){
      setPosts(state.posts)
    }else {
      axios.get(`/api/userpost/${idtopic}`).then((response) => {
        setPosts(response.data);
      });
    }
  }, [state, idtopic])
  useEffect(() => {
    axios.get(`/api/topics/${idtopic}`).then((response) => {
      setTopics(...response.data);
    });
  }, [idtopic])
  
  const indexOfLastPost = currentpage*postperpage;
  const indexOfFirstPost= indexOfLastPost - postperpage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
  const Paginate = (pageNumber)=> {setCurrentPage(pageNumber); window.scrollTo(0, 0);};
  return (
    <div className='p-5 flex  flex-col  items-center'>
      <div className='text-2xl max-w-7xl mb-4 p-2 w-full border-y-[1px] border-r-[1px] border-l-8 border-[#94e619] bg-[#56870c] shadow-lg shadow-[#8cd124]'>
          <span className='text-[#d9ffba] pl-2'>{topics.topicname}</span>
      </div>
      <div className='w-full max-w-7xl min-h-[100vh] bg-[#84cc16] h-auto flex flex-col rounded overflow-hidden'> 
        <div className='text-2xl px-2 w-full min-h-[60px] bg-[#8fdf20] shadow-xl'>
          Đây là thanh nav
        </div>
        <div className='flex flex-col justify-between flex-1'>
          <div className='flex flex-col w-full px-2 my-4 '>
            {currentPosts.map((post, index) => (
              <Link key={index} 
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
                        <span className='text-sm text-[var(--sub-text-color)] hover:underline'>Lượt Thích: {post.likequantity}</span>
                  </div>
                  <div className='flex flex-col pr-2 text-end'>
                      <span className='text-sm text-[var(--sub-text-color)] hover:underline pb-1'>Lượt xem: {post.viewquantity}</span>
                      <span className='text-sm text-[var(--sub-text-color)] hover:underline'>Lượt bình luận: {post.commentquantity }</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Pagination postPerPage={postperpage} currentPage={currentpage} totalPosts={posts.length} Paginate={Paginate}/>
        </div>
      </div>
   </div>
  )
}

export default PostList