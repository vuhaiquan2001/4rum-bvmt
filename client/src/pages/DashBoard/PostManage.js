import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react'
import axios from "axios";
import { useTable, useSortBy, useGlobalFilter, useFilters , usePagination} from 'react-table';
import GlobalFilter from './GlobalFilter';
import ColumnFilter from './ColumnFilter';
import DashboardModal from './DashboardModal';
import DashboardTextEditor from './DashboardTextEditor';

import {AiOutlineLock,AiOutlineUnlock} from 'react-icons/ai';
import {BiSort} from 'react-icons/bi';
import {RiDeleteBin6Line,RiEditBoxLine} from 'react-icons/ri';
import Moment  from 'moment';

import DangerToast from '../../components/toast/dangerToast'
import SuccessToast from '../../components/toast/successToast'

function PostManager() {
  const [Posts, setPosts] = useState([])
  const [Post, setPost] = useState()
  const [postloading, setPostLoading] = useState(true)
  const [isOpen, setisOpen] = useState(false)
  const [SortAble, setSortAble] = useState(false)

  //edit post
  const [html, sethtml] = useState()
  const posttitleRef = useRef();
  const postthumbRef = useRef();
  const posttagRef = useRef();

  const [isSuccess, setisSuccess]= useState(false);
  const [isDanger, setisDanger]= useState(false);


  const data = useMemo(() => Posts.map((post)=> ({...post, ngaytao: Moment(post.ngaytao).format("DD-MM-YYYY"), postupdate:  post.postupdate?Moment(post.postupdate).format("DD-MM-YYYY"):''})), [Posts])

  const columns = useMemo(() => [{
    header: 'Khóa bài viết',
    accessor: 'postclose',
    Cell:({value})=>{ return <div className='min-w-[200px] line-clamp-2 text-ellipsis'>{value===0?'Không khóa':'Đã khóa'}</div> },
    Filter: ColumnFilter
  },{
    header: 'ID bài viết',
    accessor: 'idpost',
    Filter: ColumnFilter
  },{
    header: 'ID người đăng',
    accessor: 'iduser',
    Filter: ColumnFilter
  },{
    header: 'ID chủ đề',
    accessor: 'idtopic',
    Filter: ColumnFilter
  },{
    header: 'Tiêu đề',
    accessor: 'posttitle',
    Cell:({value})=>{ return <div className='min-w-[200px] line-clamp-2 text-ellipsis'>{value}</div> },
    Filter: ColumnFilter
  },{
    header: 'Nội dung bài viết',
    accessor: 'postdesc',
    Cell:({value})=>{ return <div dangerouslySetInnerHTML={{__html: value}} className='min-w-[500px] line-clamp-6 text-ellipsis max-h-[500px] overflow-hidden'></div> },
    Filter: ColumnFilter
  },{
    header: 'Ngày tạo bài viết',
    accessor: 'ngaytao',
    Filter: ColumnFilter,
  },
  {
    header: 'Bình luận',
    accessor: 'commentquantity',
    Cell:({value})=>{ return <div  className=''>{value}</div> },
    Filter: ColumnFilter,
    disableFilters: true
  },{
    header: 'Thẻ bài viết',
    accessor: 'tags',
    Filter: ColumnFilter,
    disableFilters: true,
    disableSortBy: true
  },{
    header: 'Ngày cập nhật bài viết',
    accessor: 'postupdate',
    Cell:({value})=>{ return <div className='min-w-[200px] line-clamp-2 text-ellipsis'>{value !== ''?value:'Bài viết chưa cập nhật'}</div> },
    Filter: ColumnFilter,
    disableFilters: true
  },{
    header: 'Lượt Xem',
    accessor: 'viewquantity',
    Filter: ColumnFilter,
    disableFilters: true
  },
  {
    header: 'Lượt Thích',
    accessor: 'likequantity',
    Filter: ColumnFilter,
    disableFilters: true
  },
  {
    header: 'Ảnh bìa bài viết',
    accessor: 'postthumb',
    Cell: ({value})=>{return <img className='w-full h-auto' src={value} alt=''/>},
    Filter: ColumnFilter,
    disableFilters: true,
    disableSortBy: true
  },
  ], [])
  const {getTableProps, getTableBodyProps, prepareRow, headerGroups , state, setGlobalFilter,
    page, nextPage, previousPage, canNextPage, canPreviousPage, setPageSize, pageOptions, gotoPage } = useTable(
    {columns, data}, useFilters, useGlobalFilter, useSortBy, usePagination
  );
  
  const {globalFilter, pageIndex, pageSize} = state;
  const fetchAllPost = useCallback(
    () => {
      axios.get(`/api/allpost`).then((res) => {
        setPosts(res.data)
        setPostLoading(false)
        setisOpen(false)
      })
      .catch(err=>{console.log(err)})
    },
    [],
  )
  
  useEffect(() => {
    fetchAllPost();
  }, [fetchAllPost])
  
  const hanldeDeletePost = (data) =>{
    const answer = window.confirm("Tất cả dữ liệu liên quan đến bài viết đều biến mất");
    if (answer) {
    axios.delete(`/api/deletepost/${data}`).then((res) => {
      fetchAllPost();
    })
    .catch(err=>console.log(err))}
  }
  const hanldeLockPost = (row) =>{
    const data = {idpost: row.idpost, bool: row.postclose}
    axios.patch(`/api/lockpost`, data).then((res) => {
      fetchAllPost();
    })
    .catch(err=>console.log(err))
  }

  const hanldeEditPost = (id) =>{
    console.log(id)
    if(posttitleRef.current.value === '' || postthumbRef.current.value ===''){
      setisDanger(true)
      setTimeout(() => {
        setisDanger(false)
      }, 1000); 
      console.log('vui lòng nhập đầy đủ')
    } else {
      const postdata = {
        posttitle: posttitleRef.current.value,
        idpost: id,
        postdesc: html,
        postthumb: postthumbRef.current.value,
        tags: posttagRef.current.value,
      }
      axios.patch(`/api/updatepost`, postdata)
        .then(res => {
          if(res.data.changedRows ===0){
          console.log(res)
            setisDanger(true)
            setTimeout(() => {
              setisDanger(false)
            }, 1000); 
          } else {
          console.log(res)
            setisSuccess(true)
            setTimeout(() => {
              setisSuccess(false)
            }, 1000); 
            fetchAllPost();
          }
        })
    }
  }
  const handleSort = (status) =>{
    setSortAble(status)
  }
  return (
  <>
    {isSuccess? <SuccessToast text={'Đăng bài thành công'} /> :<></>}
    {isDanger? <DangerToast text={'Vui lòng nhập đầy đủ thông tin'} /> :<></>}
    {isOpen&&<DashboardModal setOpen={setisOpen} content={
      <main className='h-full mt-16 flex flex-col items-center'>
        <article className='flex flex-col my-1 items-center text-xl font-semibold'>
        <label className='mb-3'>Cập nhật bài viết</label>
      </article>
        <div className='mb-2 flex flex-col lg:flex-row items-center justify-between'>
          <div className='flex flex-col lg:flex-row'>
            <div className='mr-2 '><input ref={posttitleRef} type='text' defaultValue={Post.posttitle} className='rounded text-base p-1 bg-[#7cb526] border-[1px] border-green-300 text-gray-100 placeholder:text-gray-200'  placeholder='Nhập tiêu đề bài viết'/></div>
            <div className='mr-2'><input ref={postthumbRef} type='text' defaultValue={Post.postthumb} className='mt-1 lg:mt-0 rounded text-base p-1 bg-[#7cb526] border-[1px] border-green-300 text-gray-100 placeholder:text-gray-200' placeholder='Nhập link ảnh thumbnail'/></div>
            <div className='mr-2'><input ref={posttagRef} type='text' defaultValue={Post.tags} className='mt-1 lg:mt-0 rounded text-base p-1 bg-[#7cb526] border-[1px] border-green-300 text-gray-100 placeholder:text-gray-200'  placeholder='Split by ,' /></div>
          </div>
        </div>
        <DashboardTextEditor gethtml={sethtml} post={Post}/>
        <button className='px-2 py-1 bg-green-500 hover:bg-green-400 mt-1 text-white font-medium' onClick={e=>hanldeEditPost(Post.idpost)}>Cập nhật bài viết</button>
      </main>
    }/>}

    {postloading?<div></div>
    :<>
      <div className='text-2xl w-full mb-4 p-2 border-y-[1px] border-r-[1px] border-l-8 border-[var(--sub-color)] bg-[var(--primary-color)] shadow-lg shadow-gray-300'>
          <div className='flex justify-between'>
            <span className='text-white font-semibold pl-2 '>Quản lý bài viết</span>
            <GlobalFilter  filter={globalFilter} setfilter={setGlobalFilter}/>
          </div>
      </div>

      <div className='max-w-full bg-[var(--sub-bg-color)]  overflow-x-scroll'>
        <table className='w-fit border-collapse' {...getTableProps()}>
          <thead className='select-none'>
            {
              headerGroups.map((headerGroup, idx)=>(
                <tr className='border-collapse' key={idx} {...headerGroups.getHeaderGroupProps}>
                  <th className='border-[1px] border-collapse h-full border-gray-500 p-1'>Action</th>
                  {headerGroup.headers.map((column, idx)=>(
                    <th className='border-[1px] whitespace-nowrap border-gray-500 p-1' key={idx} {...column.getHeaderProps(SortAble&&column.getSortByToggleProps())}>
                        <div className='flex items-center justify-center'>
                          {column.render('header')}
                          {!column.disableSortBy&&<span className='mx-2 font' onMouseEnter={()=>handleSort(true)} onMouseLeave={()=>handleSort(false)}>{column.isSorted?(column.isSortedDesc?'🔽':'🔼'):<BiSort/>}</span>}
                        </div>
                        <div >{column.canFilter ? column.render('Filter'): null}</div>
                    </th>
                  ))}
                </tr>
              ))
            }
          </thead>
          <tbody className='border-collapse' {...getTableBodyProps()}>
            {
              page.map((row,idx)=>{
                prepareRow(row)
                return (
                  <tr className='border-collapse' key={idx} {...row.getRowProps()}>
                    <td className='border-[1px] border-gray-500 p-1 '>
                      <span onClick={()=>hanldeDeletePost(row.original.idpost)} className='whitespace-nowrap block py-1'><RiDeleteBin6Line className='text-center text-red-600 m-auto'/></span>
                      {row.original.postclose === 0?<span onClick={()=>hanldeLockPost(row.original)} className='whitespace-nowrap block py-1'><AiOutlineLock className='text-center text-red-600 m-auto'/></span>
                      :<span onClick={()=>hanldeLockPost(row.original)} className='whitespace-nowrap block py-1'><AiOutlineUnlock className='text-center text-green-600 m-auto'/></span>
                      }
                      <span onClick={()=>{setisOpen(true)
                        setPost(row.original)
                      }} className='whitespace-nowrap block py-1'><RiEditBoxLine className='text-center text-blue-500 m-auto'/></span>
                    </td>
                    {row.cells.map((cell, idx)=>(
                      <td className='border-[1px] border-gray-500 border-collapse p-1 text-center' key={idx} {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                )

              })
            }
          </tbody>
        </table>
      </div>
      <div className='flex justify-center my-1'>
        <div className='flex items-center'>
          Số bài mỗi trang
          <select className='mx-1' value={pageSize} onChange={e=>setPageSize(e.target.value)}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className='flex items-center mx-1'>
              Đi tới trang
              <input 
              onChange={(e)=>{
                const pageNumber = e.target.value;
                pageNumber>0?(pageNumber>pageOptions.length-1?gotoPage(pageOptions.length-1):gotoPage(pageNumber-1)):(gotoPage(0))
              }}
              className='w-10 outline-none border-[1px]' type='number' value={pageIndex+1} />
        </div>
        <button className={`px-2 py-1 border-[1px] rounded mx-1 text-base font-medium ${canPreviousPage?'bg-[var(--primary-color)]  text-white':'bg-gray-200'} `} onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>First</button>
        <button className={`px-2 py-1 border-[1px] rounded mx-1 text-base font-medium ${canPreviousPage?'bg-[var(--primary-color)]  text-white':'bg-gray-200'} `} onClick={()=>previousPage()} disabled={!canPreviousPage}>Prev</button>
        <div className='flex items-center mx-1'>
            
            <strong>{'Trang số'} {Number(pageIndex)+1} Of {pageOptions.length}</strong>
        </div>
        <button className={`px-2 py-1 border-[1px] rounded mx-1 text-base font-medium ${canNextPage?'bg-[var(--primary-color)] text-white':'bg-gray-200'} `} onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
        <button className={`px-2 py-1 border-[1px] rounded mx-1 text-base font-medium ${canNextPage?'bg-[var(--primary-color)] text-white':'bg-gray-200'} `} onClick={()=>gotoPage(pageOptions.length-1)} disabled={!canNextPage}>Last</button>
      </div>
    </>}
  </>
  )
}

export default PostManager