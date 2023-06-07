import React,{useEffect, useState, useRef} from 'react'
import { useParams } from 'react-router-dom'
import Pagination from '../../components/paginations';
import axios from 'axios';
import PostOfPostList from '../../pages/PostList/post';
import {FaUser} from 'react-icons/fa';
import {BiTime} from 'react-icons/bi';

import Moment from 'moment';
import { firstLetterUppercase } from '../../components/FirstLetterUppercase';
import { Link } from 'react-router-dom';
import UserDetailModal from '../../components/userdetailModal';

function Search() {
    const {keyword} = useParams();
    const [posts, setPosts] = useState([]);
    const [postsearch, setPostSearch] = useState(true);
    const [users, setUsers] = useState([]);
    const sortTypeRef = useRef();
    const sortRef = useRef();

    const [userdetail, setUserdetail]= useState(false);


  const [currentpage, setCurrentPage] = useState(1);
  const [postperpage, ] = useState(10);
  //lấy ra index của post cuối cùng của 1 trang = index trang hiện tại nhân số trang
  const indexOfLastPost = currentpage*postperpage;
  //lấy ra index của post đầu tiên bằng trang cuối trừ đi số trang mỗi page
  const indexOfFirstPost= indexOfLastPost - postperpage;
  //cắt mảng post ban đầu ra theo từng trang
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const currentUsers = users.slice(indexOfFirstPost, indexOfLastPost);
  // Khi đổi trang trong paginate thì đổi current page = số trên pagi  
  const Paginate = (pageNumber)=> {setCurrentPage(pageNumber); window.scrollTo({top: 0, left: 0, behavior: 'smooth'});};

    useEffect(() => {
      if(postsearch){
        const fetchPost = async (idpost) => {
          await axios.get(`/api/searchpost/${idpost}`).then((response) => {
            setPosts(response.data);   
          })
        }   
        fetchPost(keyword);
      } else{
        const fetchPost = async (idpost) => {
          await axios.get(`/api/searchuser/${idpost}`).then((response) => {
            setUsers(response.data);   
          })
        }   
        fetchPost(keyword);
      }
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }, [keyword, postsearch])

    const handleSort =()=>{
      sort()
    } 
    
    const handleSortType =()=>{
      sort();
    } 
    const sort = ()=>{
      //cach viet ngan gon hơn (a,b)=>a-b (sap xep tang dan) (a,b)=>b-a (sap xep giam gian)
      if(sortTypeRef.current.value === 'desc'){
         //giảm dần
        function compare( a, b ) {
          //nếu a>b thì giảm index của a xuống(đang xắp xếp giảm dần, a lớn thì phải đưa a lên đầu mảng)
          if ( a[sortRef.current.value] > b[sortRef.current.value]){
            return -1;
          }
          //nếu a<b thì tăng index của a lên
          if (a[sortRef.current.value] < b[sortRef.current.value]){
            return 1;
          }
          //nếu không thỏa mãn 2 đk trên index a đứng nguyên
          return 0;
        }
        console.log( posts.sort( compare ))
        const copy = Array.from(new Set( posts.sort( compare )));
        setPosts(copy)
      } else {        
      //tăng dần
        function compare( a, b ) {
          //nếu a<b thì giảm index của a xuống
          if ( a[sortRef.current.value] < b[sortRef.current.value]){
            return -1;
          }
          //nếu a lớn hơn b tăng index của a lên
          if (a[sortRef.current.value] > b[sortRef.current.value]){
            return 1;
          }
          //nếu không thỏa mãn 2 đk trên a đứng nguyên
          return 0;
        }
        //sort quét qua mảng và sắp xếp theo quy định đặt ra
        const copy = Array.from(new Set( posts.sort( compare )));
        setPosts(copy)
      }
    }
    const handleHover = (id)=>{
      setTimeout(() => {
          setUserdetail(id)
      }, 1000);
  }

  return (
    <>
    {postsearch?  
    <div className='p-5 flex  flex-col  items-center select-none'>
      <div className='text-2xl max-w-7xl mb-4 p-2 w-full border-y-[1px] border-r-[1px] border-l-8 border-[#94e619] bg-[#56870c] shadow-lg shadow-[#8cd124]'>
          <span className='text-[#d9ffba] pl-2'>Kết quả tìm kiếm bài viết cho: {keyword}</span>
      </div>
      <div className='w-full max-w-7xl min-h-[100vh] bg-[#84cc16] h-auto flex flex-col rounded overflow-hidden'> 
        <div className='flex items-center justify-between flex-wrap sm:flex-nowrap px-2 w-full min-h-[60px] bg-[#8fdf20] shadow-xl'>
          <div className='cursor-pointer rounded border-[1px] p-1 hover:bg-green-500' onClick={()=>setPostSearch(false)}>Search: Users</div>
          <section className='flex justify-between w-full md:justify-start lg:w-fit '>
            <span className='hidden md:block mr-1'>Sắp xếp theo:</span> 
            <div className='flex'>
              <select defaultValue={'ngaytao'} onChange={()=>handleSort()} ref={sortRef} className='flex mr-1 cursor-pointer select-none'>
                <option value='ngaytao' className='mr-1 bg-slate-500 rounded p-1'>Ngày đăng</option>
                <option value='postupdate' className='mr-1 bg-slate-500 rounded p-1'>Ngày Update</option>
                <option value='viewquantity' className='mr-1 bg-slate-500 rounded p-1'>Views</option>
                <option value='commentquantity' className='mr-1 bg-slate-500 rounded p-1'>Comments</option>
                <option value='likequantity' className='mr-1 bg-slate-500 rounded p-1'>Votes</option>
              </select>
              <select className='cursor-pointer' defaultValue='desc' onChange={()=>handleSortType()} ref={sortTypeRef}>
                <option value='desc'>Giảm dần</option>
                <option value='asc'>Tăng dần</option>
              </select>
            </div>
          </section>
        </div>
        <div className='flex flex-col justify-between flex-1'>
          <div className='flex flex-col w-full px-2 my-4 select-none'>
            {currentPosts.map((post, index) => (
                <PostOfPostList post={post} key={index}/>
            ))}
          </div>
          <Pagination postPerPage={postperpage} currentPage={currentpage} totalPosts={posts.length} Paginate={Paginate}/>
        </div>
      </div>
    </div>
  :
    <div className='p-5 flex  flex-col  items-center'>
      <div className='text-2xl max-w-7xl mb-4 p-2 w-full border-y-[1px] border-r-[1px] border-l-8 border-[#94e619] bg-[#56870c] shadow-lg shadow-[#8cd124]'>
          <span className='text-[#d9ffba] pl-2'>Kết quả tìm kiếm người dùng cho: {keyword}</span>
      </div>
      <div className='w-full max-w-7xl min-h-[100vh] bg-[#84cc16] h-auto flex flex-col rounded overflow-hidden'> 
        <div className='flex items-center justify-between flex-wrap sm:flex-nowrap px-2 w-full min-h-[60px] bg-[#8fdf20] shadow-xl'>
          <div className='cursor-pointer rounded border-[1px] p-1 hover:bg-green-500' onClick={()=>setPostSearch(true)}>Search: Post</div>
        </div>
        <div className='flex flex-col justify-between flex-1'>
          <div className='flex flex-col w-full px-2 my-4 select-none'>
            {currentUsers.map((post, index) => (
                <Link style={{backgroundImage: `url("${post.usercoverimg}")`}} to={`/profile/${post.iduser}`} key={index} 
                className='flex w-full h-56 justify-start items-center border-[1px] bg-top bg-cover bg-[#8fdf20] backdrop-opacity-10 mb-2 hover:bg-blend-darken'>
                  <div onMouseLeave={()=>setUserdetail(false)} className='flex relative flex-col ml-2 items-center p-2 border-r-[1px]'>
                      {userdetail===post.iduser&&
                      <UserDetailModal user={post}/>
                      }
                    <div onMouseEnter={()=>handleHover(post.iduser)} className='rounded-full h-24 w-24 bg-[#e1ffb4] border-[2px] border-green-800'>
                        <img 
                        className='rounded-full w-full h-full object-cover'
                        src={post.useravatar} alt='avatar'/>
                    </div>
                    <div className='text-lg max-w-[130px] text-center overflow-hidden text-ellipsis font-medium bg-green-400 rounded my-2 px-1 text-[#d9ffa0]'>{firstLetterUppercase(post.username)}</div>
                    <div className='flex items-center justify-center rounded mb-2 h-7 w-32 bg-green-400 shadow-md text-yellow-100 text-base leading-none'>
                      <FaUser className='mr-1'/>
                      {firstLetterUppercase(post.usertitle)}
                    </div>
                    <div className='flex items-center justify-center rounded  h-7 w-32 bg-green-400 shadow-md text-yellow-100 text-base leading-none'>
                      <BiTime className='mr-1'/>
                      {Moment(post.joindate).format("DD-MM-YYYY")}
                    </div>
                  </div>
                  {post.userdesc !== ""?
                  <div className='flex flex-col text-lg font-semibold text-yellow-100 w-full h-40 mx-2 p-2 rounded hover:bg-green-300 bg-green-400'>
                    {post.userdesc}
                  </div>:
                  <div className='flex flex-col text-lg font-semibold text-yellow-100 w-full h-40 mx-2 p-2 rounded hover:bg-green-300 bg-green-400'>
                    Không có mô tả!
                  </div>  
                  } 
                  <div  className='flex flex-col h-full ml-2 items-center justify-center p-2 border-l-[1px]'>
                    <div className='flex items-center justify-center rounded mb-2 h-7 w-32 bg-green-400 shadow-md text-yellow-100 text-base leading-none'>
                      <FaUser className='mr-1'/>
                      Follower: {post.followerCount}
                    </div>
                    <div className='flex items-center justify-center rounded mb-2 h-7 w-32 bg-green-400 shadow-md text-yellow-100 text-base leading-none'>
                      <FaUser className='mr-1'/>
                      Following: {post.followingCount}
                    </div>
                    <div className='flex items-center justify-center rounded  h-7 w-32 bg-green-400 shadow-md text-yellow-100 text-base leading-none'>
                      <BiTime className='mr-1'/>
                      Bài viết: {post.postCount}
                    </div>
                  </div>
              </Link>
            ))}
          </div>
          <Pagination postPerPage={postperpage} currentPage={currentpage} totalPosts={posts.length} Paginate={Paginate}/>
        </div>
      </div>
    </div>}
    </>
  )
}

export default Search