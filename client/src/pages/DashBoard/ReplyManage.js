import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react'
import axios from "axios";
import { useTable, useSortBy, useGlobalFilter, useFilters , usePagination} from 'react-table';
import GlobalFilter from './GlobalFilter';
import ColumnFilter from './ColumnFilter';
import DashboardModal from './DashboardModal';
import DashboardTextEditor from './DashboardTextEditor';

import {RiDeleteBin6Line,RiEditBoxLine} from 'react-icons/ri';
import {BiSort} from 'react-icons/bi';
import Moment  from 'moment';
import DangerToast from '../../components/toast/dangerToast'
import SuccessToast from '../../components/toast/successToast'

function ReplyManager() {
  const [replys, setPosts] = useState([])
  const [postloading, setPostLoading] = useState(true)
  const [SortAble, setSortAble] = useState(false)

  const [isOpen, setisOpen] = useState(false)
  const [Reply, setReply] = useState()
  const [html, sethtml] = useState()
  const [isSuccess, setisSuccess]= useState(false);
  const [isDanger, setisDanger]= useState(false);

  const data = useMemo(() => replys.map((reply)=> ({...reply, replyref: JSON.parse(reply.replyref), replydate: Moment(reply.replydate).format("DD-MM-YYYY"), replyupdate:  reply.replyupdate?Moment(reply.replyupdate).format("DD-MM-YYYY"):''})), [replys])
  const columns = useMemo(() => [{
    header: 'ID bình luận',
    accessor: 'idreply',
    Filter: ColumnFilter
  },{
    header: 'ID bài viết',
    accessor: 'idpost',
    Filter: ColumnFilter
  },{
    header: 'ID người bình luận',
    accessor: 'iduser',
    Filter: ColumnFilter
  },{
    header: 'Nội dung bình luận',
    accessor: 'replydesc',
    Cell:({value})=>{ return <div dangerouslySetInnerHTML={{__html: value}} className='min-w-[500px] line-clamp-6 text-ellipsis max-h-[500px] overflow-hidden'></div> },
    Filter: ColumnFilter
  },{
    header: 'Ngày tạo bình luận',
    accessor: 'replydate',
    Filter: ColumnFilter,
  },
  {
    header: 'Trả lời bình luận',
    accessor: 'replyref',
    Cell:({value})=>{ return <div  className=''>
        {value.usernameref?
        <>
            <span className='whitespace-nowrap block'>{`Bình luận của: ${value.usernameref}.Id: ${value.iduserref}`}</span>
            <span className='whitespace-nowrap block'>Ngày bình luận: {Moment(value.replydateref).format("DD-MM-YYYY")}</span>
            Nội dung: 
            <span dangerouslySetInnerHTML={{__html: value.contentref}}></span>
        </>
        :'Không trả lời ai'}
        </div> },
    Filter: ColumnFilter,
    disableFilters: true
  },{
    header: 'Ngày cập nhật bình luận',
    accessor: 'replyupdate',
    Cell:({value})=>{ return <div className='min-w-[200px] line-clamp-2 text-ellipsis'>{value !== ''?value:'Bình luận chưa cập nhật'}</div> },
    Filter: ColumnFilter,
    disableFilters: true
  }
  ], [])
  const {getTableProps, getTableBodyProps, prepareRow, headerGroups , state, setGlobalFilter,
    page, nextPage, previousPage, canNextPage, canPreviousPage, setPageSize, pageOptions, gotoPage } = useTable(
    {columns, data}, useFilters, useGlobalFilter, useSortBy, usePagination
  );
  
  const {globalFilter, pageIndex, pageSize} = state;
  const fetchAllReply = useCallback(
    () => {
      axios.get(`/api/allreply`).then((res) => {
        setPosts(res.data)
        setPostLoading(false)
        setisOpen(false)
      })
      .catch(err=>{console.log(err)})
    },
    [],
  )
  
  useEffect(() => {
    fetchAllReply();
  }, [fetchAllReply])
  
  const hanldeDeleteReply = (data) =>{
    const answer = window.confirm("Tất cả dữ liệu liên quan đến bình luận đều biến mất");
    if (answer) {
    axios.delete(`/api/deletereply/${data}`).then((res) => {
      fetchAllReply();
    })
    .catch(err=>console.log(err))}
  }

  const hanldeEditReply = (row) =>{
    const data = {idreply: row.idreply, replydesc: html}
    axios.patch(`/api/updatereply`, data).then((res) => {
      if(res.data.message === 'OK'){
        setisSuccess(true)
        setTimeout(() => {
          setisSuccess(false)
          fetchAllReply();
        }, 1000);
      } else {
        setisDanger(true)
        setTimeout(() => {
          setisDanger(false)
        }, 1000);
      }
    })
    .catch(err=>console.log(err))
  }

  const handleSort = (status) =>{
    setSortAble(status)
  }
  return (
  <>
    {isSuccess? <SuccessToast text={'Cập nhật bình luận thành công'} /> :<></>}
    {isDanger? <DangerToast text={'Vui lòng nhập đầy đủ thông tin'} /> :<></>}
    {isOpen&&<DashboardModal setOpen={setisOpen} content={
      <main className='h-full mt-16 flex flex-col items-center'>
        <article className='flex flex-col my-1 items-center text-xl font-semibold'>
        <label className='mb-3'>Cập nhật bình luận ID:{Reply.idreply}</label>
      </article>
        
        <DashboardTextEditor gethtml={sethtml} post={Reply}/>
        <button className='px-2 py-1 bg-green-500 hover:bg-green-400 mt-1 text-white font-medium' onClick={e=>hanldeEditReply(Reply)}>Cập nhật bài viết</button>
      </main>
    }/>}
    {postloading?<div></div>
    :<>
      <div className='text-2xl w-full mb-4 p-2 border-y-[1px] border-r-[1px] border-l-8 border-[var(--sub-color)] bg-[var(--primary-color)] shadow-lg shadow-gray-300'>
          <div className='flex justify-between'>
            <span className='text-white font-semibold pl-2 '>Quản lý bình luận</span>
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
                      <span onClick={()=>hanldeDeleteReply(row.original.idreply)} className='whitespace-nowrap block py-1'><RiDeleteBin6Line className='text-center text-red-600 m-auto'/></span>
                     
                      <span onClick={()=>{setisOpen(true); setReply(row.original)}} className='whitespace-nowrap block py-1'><RiEditBoxLine className='text-center text-blue-500 m-auto'/></span>
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

export default ReplyManager