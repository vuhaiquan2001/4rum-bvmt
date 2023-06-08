import React, {useState, useEffect} from 'react'
import Pagination from '../../components/paginations';
import axios from "axios";
import { useParams } from 'react-router-dom';
import PostOfPostList from './post';

import FilterPost from '../../components/filterPost';
import icons from '../../assets/icons';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);
  const {idtopic} = useParams();
  //navigation
  const [currentpage, setCurrentPage] = useState(1);
  const [postperpage, ] = useState(10);
  //lấy ra index của post cuối cùng của 1 trang = index trang hiện tại nhân số trang
  const indexOfLastPost = currentpage*postperpage;
  //lấy ra index của post đầu tiên bằng trang cuối trừ đi số trang mỗi page
  const indexOfFirstPost= indexOfLastPost - postperpage;
  //cắt mảng post ban đầu ra theo từng trang
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // Khi đổi trang trong paginate thì đổi current page = số trên pagi  
  const Paginate = (pageNumber)=> {setCurrentPage(pageNumber); window.scrollTo({top: 0, left: 0, behavior: 'smooth'});};

  useEffect(() => {
      axios.get(`/api/userpost`, 
      { params: { id: idtopic, orderby: 'ngaytao desc' } }
      ).then((response) => {
        setPosts(response.data);
      });
  }, [idtopic])

  useEffect(() => {
    axios.get(`/api/topics/${idtopic}`).then((response) => {
      setTopics(...response.data);
    });
  }, [idtopic])
    
  return (
    <div className='p-5 flex flex-col items-center'>
      <div className='text-2xl max-w-7xl mb-4 p-2 w-full border-y-[1px] border-r-[1px] border-l-8 border-[#94e619] bg-[#56870c] shadow-lg shadow-[#8cd124]'>
          <span className='text-[#d9ffba] pl-2'>{topics.topicname}</span>
      </div>
      <div className='w-full max-w-7xl min-h-[100vh] bg-[#84cc16] h-auto flex flex-col rounded overflow-hidden'> 
        <div className='flex items-center my-1 md:my-0 justify-between flex-wrap sm:flex-nowrap px-2 w-full min-h-[60px] bg-[#8fdf20] shadow-xl'>
          <FilterPost setpost={setPosts} postlist={posts}/>
        </div>
        <div className='flex flex-col justify-between flex-1'>
          <div className='flex flex-col w-full px-2 my-4 select-none'>
           {posts.length<=0?
           <div className='flex flex-col w-full min-h-[50vh] justify-center items-center text-xl font-semibold text-yellow-50'>
            Không có bài viết nào cả <img src={icons.pepeSad} alt='pepe'/>
           </div>
           :<>
              {currentPosts.map((post, index) => (
                <PostOfPostList post={post} key={index}/>
              ))}
            </>}
          </div>
          <Pagination postPerPage={postperpage} currentPage={currentpage} totalPosts={posts.length} Paginate={Paginate}/>
        </div>
      </div>
   </div>
  )
}

export default PostList