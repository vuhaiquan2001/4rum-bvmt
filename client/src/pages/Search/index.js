import React,{useEffect, useState, useRef} from 'react'
import { useParams } from 'react-router-dom'
import Pagination from '../../components/paginations';
import axios from 'axios';
import PostOfPostList from '../../pages/PostList/post';

import { Link } from 'react-router-dom';
import UserDetailModal from '../../components/userdetailModal';
import icons from '../../assets/icons';

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
      <div className='text-2xl max-w-7xl mb-4 p-2 w-full border-y-[1px] border-r-[1px] border-l-8 border-[var(--sub-color)] bg-[var(--primary-color)] shadow-lg-around'>
          <span className='text-white pl-2'>Kết quả tìm kiếm bài viết cho: {keyword}</span>
      </div>
      <div className='w-full max-w-7xl min-h-[100vh] bg-[var(--sub-bg-color)] shadow-lg-around h-auto flex flex-col rounded overflow-hidden'> 
        <div className='flex items-center justify-between flex-wrap sm:flex-nowrap px-2 w-full min-h-[60px] bg-[var(--sub-text-color)] text-white shadow-xl'>
          <div className='cursor-pointer rounded border-[1px] p-1 hover:bg-[var(--primary-text-color)]' onClick={()=>setPostSearch(false)}>Search: Users</div>
          <section className='flex justify-between w-full md:justify-start lg:w-fit '>
            <span className='hidden md:block mr-1'>Sắp xếp theo:</span> 
            <div className='flex'>
              <select defaultValue={'ngaytao'} onChange={()=>handleSort()} ref={sortRef} className='flex text-[var(--primary-text-color)] mr-1 cursor-pointer select-none'>
                <option value='ngaytao' className='mr-1 bg-slate-500 rounded p-1'>Ngày đăng</option>
                <option value='postupdate' className='mr-1 bg-slate-500 rounded p-1'>Ngày Update</option>
                <option value='viewquantity' className='mr-1 bg-slate-500 rounded p-1'>Views</option>
                <option value='commentquantity' className='mr-1 bg-slate-500 rounded p-1'>Comments</option>
                <option value='likequantity' className='mr-1 bg-slate-500 rounded p-1'>Votes</option>
              </select>
              <select className='cursor-pointer text-[var(--primary-text-color)]' defaultValue='desc' onChange={()=>handleSortType()} ref={sortTypeRef}>
                <option value='desc'>Giảm dần</option>
                <option value='asc'>Tăng dần</option>
              </select>
            </div>
          </section>
        </div>
        <div className='flex flex-col justify-between flex-1'>
          <div className='flex flex-col w-full px-2 my-4 select-none'>
            {posts.length<=0?
           <div className='flex flex-col w-full min-h-[50vh] justify-center items-center text-xl font-semibold text-yellow-50'>
            Bài viết không tồn tại <img src={icons.pepeSad} alt='pepe'/>
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
  :
    <div className='p-5 flex  flex-col  items-center'>
      <div className='text-2xl max-w-7xl mb-4 p-2 w-full border-y-[1px] border-r-[1px] border-l-8 border-[var(--sub-color)] bg-[var(--primary-color)] shadow-lg-around'>
          <span className='text-white pl-2'>Kết quả tìm kiếm người dùng cho: {keyword}</span>
      </div>
      <div className='w-full max-w-7xl min-h-[100vh] bg-[var(--sub-bg-color)] shadow-lg-around  h-auto flex flex-col rounded overflow-hidden'> 
        <div className='flex items-center justify-between flex-wrap sm:flex-nowrap px-2 w-full min-h-[60px] bg-[var(--sub-text-color)] text-white shadow-xl'>
          <div className='cursor-pointer rounded border-[1px] p-1 hover:bg-[var(--primary-text-color)]' onClick={()=>setPostSearch(true)}>Search: Post</div>
        </div>
        <div className='flex flex-col justify-between flex-1'>
          <div className='flex flex-col w-full px-2 my-4 select-none'>
            {posts.length<=0?
            <div className='flex flex-col w-full min-h-[50vh] justify-center items-center text-xl font-semibold text-yellow-50'>
              Người dùng này không tồn tại <img src={icons.pepeSad} alt='pepe'/>
            </div>:
           <>
              {currentUsers.map((user, index) => (
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
            </>}
          </div>
          <Pagination postPerPage={postperpage} currentPage={currentpage} totalPosts={posts.length} Paginate={Paginate}/>
        </div>
      </div>
    </div>}
    </>
  )
}

export default Search