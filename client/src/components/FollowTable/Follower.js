import React,{useEffect, useState, memo} from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from '../paginations';

function FollowerTable({iduser}) {
  const [users, setUsers] = useState([]);
    const [loading, setLoading]= useState(true);

    const [currentpage, setCurrentPage] = useState(1);
    const [postperpage, ] = useState(10);
    //lấy ra index của post cuối cùng của 1 trang = index trang hiện tại nhân số trang
    const indexOfLastPost = currentpage*postperpage;
    //lấy ra index của post đầu tiên bằng trang cuối trừ đi số trang mỗi page
    const indexOfFirstPost= indexOfLastPost - postperpage;
    //cắt mảng post ban đầu ra theo từng trang
    const currentPosts = users.slice(indexOfFirstPost, indexOfLastPost)
    // Khi đổi trang trong paginate thì đổi current page = số trên pagi  
    const Paginate = (pageNumber)=> {setCurrentPage(pageNumber); window.scrollTo({top: 0, left: 0, behavior: 'smooth'});};
    useEffect(() => {
      axios(`/api/getfollower/${iduser}`).then(res=>{
        if(res.data.message){
            setUsers([])
            setLoading(false)
        } else {
            setUsers(res.data)
            setLoading(false)
        }
         })  
        .catch(e=>{})
    }, [iduser])
    return (
      <>{loading?<div></div>:
      <>
          {users.length<=0?<div className='flex text-lg font-semibold text-yellow-50 w-full min-h-[50vh] justify-center items-center'>Bạn không ai Follow bạn {':('}</div>:
          <div className='flex flex-col'>
            {currentPosts.map((user, index)=>(
                <Link to={`/profile/${user.iduser}`} key={index} className=''>
                    {user.username}
                </Link>
            ))}
            {users.length>10&&<Pagination postPerPage={postperpage} currentPage={currentpage} totalPosts={users.length} Paginate={Paginate}/>}
          </div>}
      </>
      }</>
    )
}

export default memo(FollowerTable)