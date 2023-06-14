import React, {useState, useEffect, useRef} from 'react'
import Pagination from '../../components/paginations';

import axios from "axios";
import { useStore } from '../../store';
import { useParams } from 'react-router-dom';
import PostOfPostList from '../PostList/post';
import icons from '../../assets/icons/'

function News() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [postType, setpostType] = useState('');
  const {keyword} = useParams();
  const[state,] = useStore();
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


  //api lấy posts
  useEffect(() => {
      switch (keyword) {
        case 'newest':
          axios.get(`/api/newestpost`).then((res)=>{
           if(res.data.message){
            setPosts([])
            setLoading(false);
            setpostType('Bài viết mới nhất!')
           } else {
            setPosts(res.data)
            setLoading(false);
            setpostType('Bài viết mới nhất!')
           }
          })
          .catch(e=>{})
          break;
        case 'follower':
          axios.get(`/api/followingpost/${state.users.iduser}`).then((res)=>{
           if(res.data.message){
            setPosts([])
            setLoading(false);
            setpostType('Bài viết bạn theo dõi!')
           } else {
            setPosts(res.data)
            setLoading(false);
            setpostType('Bài viết bạn theo dõi!')
           }
          })
          .catch(e=>{})
          break;
        case 'mostview':
          axios.get(`/api/themostviews`).then((res)=>{
           if(res.data.message){
            setPosts([])
            setLoading(false);
            setpostType('Bài viết nhiều lượt xem nhất!')
           } else {
            setPosts(res.data)
            setLoading(false);
            setpostType('Bài viết nhiều lượt xem nhất!')
           } 
          })
          .catch(e=>{})
          break;
        case 'mostvote':
          axios.get(`/api/themostvotes`).then((res)=>{
           if(res.data.message){
            setPosts([])
            setLoading(false);
            setpostType('Bài viết nhiều Vote nhất!')
           } else {
            setPosts(res.data)
            setpostType('Bài viết nhiều Vote nhất!')
            setLoading(false);
           }
          })
          .catch(e=>{})
          break;
        case 'mostcomment':
          axios.get(`/api/themostreplys`).then((res)=>{
           if(res.data.message){
            setPosts([])
            setLoading(false);
            setpostType('Bài viết sôi nổi nhất!')
           } else {
            setPosts(res.data)
            setpostType('Bài viết sôi nổi nhất!')
            setLoading(false);
           }
          })
          .catch(e=>{})
          break;
        default:
          break;
      }

      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, [keyword, state.users])
  //filter
  const sortTypeRef = useRef();
  const sortRef = useRef();

  const handleSort =()=>{
    sort()
  } 
  console.log(posts)
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

  return (
    <div className='p-5 flex flex-col items-center'>
      <div className='text-2xl max-w-7xl mb-4 p-2 w-full border-y-[1px] border-r-[1px] border-l-8 border-[#94e619] bg-[#56870c] shadow-lg shadow-[#8cd124]'>
          <span className='text-[#d9ffba] pl-2'>{postType}</span>
      </div>
      {loading?
      <div className='min-h-screen max-w-7xl w-full bg-slate-400 text-center text-lg animate-pulse'>Loading</div>
      :<>
      {posts.length<=0?
      <div className='flex flex-col max-w-7xl w-full min-h-[100vh] justify-center items-center text-xl font-semibold text-[var(--primary-text-color)]'>
      Bài viết không tồn tại <img src={icons.pepeSad} alt='pepe'/>
     </div>
      :<div className='w-full max-w-7xl min-h-[100vh] bg-[#84cc16] h-auto flex flex-col rounded overflow-hidden'> 
          {keyword==='follower'&&<div className='flex items-center my-1 md:my-0 justify-between flex-wrap sm:flex-nowrap px-2 w-full min-h-[60px] bg-[#8fdf20] shadow-xl'>
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
          </div>}
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
        </div>}
      </>}
   </div>
  )
}

export default News