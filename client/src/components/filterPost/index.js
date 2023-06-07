import React,{ useState, useRef} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';


function FilterPost({setpost, postlist}) {
  const {idtopic} = useParams();
  const sortRef = useRef();
  const sortTypeRef = useRef();
  const searchInputRef = useRef();
  const [issearch, setIsSearch]= useState(true)
  
  const handleSort =()=>{
    axios.get(`/api/userpost`, 
    { params: { id: idtopic, orderby: `${sortRef.current.value} ${sortTypeRef.current.value}` } }
    ).then((res) => {
      setpost(res.data)
    });
  } 
  
  const handleSortType =()=>{
    axios.get(`/api/userpost`, 
    { params: { id: idtopic, orderby: `${sortRef.current.value} ${sortTypeRef.current.value}` } }
    ).then((res) => {
      setpost(res.data)
    });
  } 
  const handleEnterSearch=(e)=>{
    if(e.key ==='Enter'){
      const posts = postlist.filter(post=> post.posttitle.includes(searchInputRef.current.value)|| post.username.includes(searchInputRef.current.value))
      setpost(posts)
      setIsSearch(false)
    }
  }
  const handleSearch=()=>{
    const posts = postlist.filter(post=> post.posttitle.includes(searchInputRef.current.value)|| post.username.includes(searchInputRef.current.value))
    setpost(posts)
    setIsSearch(false)
  }
  const handleCancleSearch=()=>{
    axios.get(`/api/userpost`, 
    { params: { id: idtopic, orderby: `${sortRef.current.value} ${sortTypeRef.current.value}` } }
    ).then((res) => {
      setpost(res.data)
      setIsSearch(true)
    });
  }

  return (
    <>
    <section className='flex justify-between w-full md:justify-start lg:w-fit'>
      <span className='hidden md:block mr-1'>Sắp xếp theo:</span> 
      <div className='flex'>
        <select defaultValue={'ngaytao'} onChange={()=>handleSort()} ref={sortRef} className='flex mr-1 cursor-pointer select-none'>
          <option value='ngaytao' className='mr-1 bg-slate-500 rounded p-1'>Ngày đăng</option>
          <option value='postupdate' className='mr-1 bg-slate-500 rounded p-1'>Ngày Update</option>
          <option value='viewquantity' className='mr-1 bg-slate-500 rounded p-1'>Views</option>
          <option value='commentquantity' className='mr-1 bg-slate-500 rounded p-1'>Comments</option>
          <option value='likequantity' className='mr-1 bg-slate-500 rounded p-1'>Votes</option>
        </select>
        <select className='flex' defaultValue='desc' onChange={()=>handleSortType()} ref={sortTypeRef}>
          <option value='desc'>Giảm dần</option>
          <option value='asc'>Tăng dần</option>
        </select>
      </div>
    </section>
    <div className='flex w-full md:justify-end items-center lg:w-fit cursor-pointer select-none'> 
        <span className='hidden whitespace-nowrap md:block'>Quick Search:</span>
        <input type="search" onKeyDown={(e)=>handleEnterSearch(e)} ref={searchInputRef} className="mr-1 md:mx-1 px-2 py-2 h-8 w-52 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none hover:border-sky-500 focus:border-sky-500 focus:ring-sky-500 block md:rounded-3xl sm:text-sm focus:ring-1" placeholder="Tiêu đề/Tên User" />
        {
          issearch? 
          <button className='whitespace-nowrap border-l-[3px] border-[#cbff82] w-24 bg-[#b1f94c] hover:bg-[#a3f72f] hover:shadow-[#b9fb63] rounded p-1' onClick={()=>handleSearch()}>Search</button>
          :
          <button className='whitespace-nowrap border-l-[3px] border-[#cbff82] w-24 bg-[#b1f94c] rounded p-1' onClick={()=>handleCancleSearch()}>Hủy Search</button>
        }
    </div>
    </>
  )
}

export default FilterPost