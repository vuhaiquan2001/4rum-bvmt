import React, {useState, useEffect, useMemo, useRef, useCallback} from 'react'
import axios from "axios";
import { useTable, useSortBy, useGlobalFilter, useFilters , usePagination} from 'react-table';
import GlobalFilter from './GlobalFilter';
import ColumnFilter from './ColumnFilter';
import DashboardModal from './DashboardModal';

import {IoMdAddCircleOutline} from 'react-icons/io'
import {RiDeleteBin6Line,RiEditBoxLine} from 'react-icons/ri';
import Moment  from 'moment';

function TopicManage() {
  const [users, setUsers] = useState([])
  const [userloading, setUserLoading] = useState(true)
  const [openModal, setopenModal] = useState(false)
  const [isUpdate, setisUpdate] = useState(false)
  const topicnameRef = useRef();
  const topicforRef = useRef();

  const data = useMemo(() => users.map((user)=> ({...user, joindate: Moment(user.joindate).format("DD-MM-YYYY") })), [users])

  const columns = useMemo(() => [{
    header: 'ID chủ đề',
    accessor: 'idtopic',
    Filter: ColumnFilter
  },{
    header: 'Tên chủ đề',
    accessor: 'topicname',
    Filter: ColumnFilter
  },{
    header: 'Chủ đề dành cho',
    accessor: 'topicfor',
    Filter: ColumnFilter
  }
  ], [])
  const {getTableProps, getTableBodyProps, headerGroups,prepareRow, state, setGlobalFilter,
    page, nextPage, previousPage, canNextPage, canPreviousPage, setPageSize, pageOptions, gotoPage  } = useTable(
    {columns, data}, useFilters, useGlobalFilter, useSortBy, usePagination
  );

  const {globalFilter,pageIndex, pageSize} = state;

  const fetchTopic = useCallback(
    () => {
      axios.get(`/api/topics`).then((res) => {
        setUsers(res.data)
        setUserLoading(false)
      })
      .catch(err=>{console.log(err)})
    },
    [],
  )
  
  useEffect(() => {
    fetchTopic();
  }, [fetchTopic])

  const handleAddTopic = ()=>{
    const data = {topicname: topicnameRef.current.value, topicfor: topicforRef.current.value}
    axios.post(`/api/addtopic`, data).then(res=>{
      setUserLoading(true)
      fetchTopic();
      setopenModal(false);
    })
    .catch(err=>{console.log(err)})
  }

  const handleDeleteTopic = (id)=>{
    const answer = window.confirm("Tất cả dữ liệu thuộc topic đều biến mất bạn có chắc chứ?");
    if (answer) {
    axios.delete(`/api/deletetopic/${id}`).then((res) => {
      setUserLoading(true)
      fetchTopic();
    })
    .catch(err=>{console.log(err)})}
  }

  const handleUpdateTopic = (topic)=>{
    const data = {topicname: topicnameRef.current.value, topicfor: topicforRef.current.value, idtopic: topic.idtopic}
    axios.patch(`/api/updatetopic`, data).then(res=>{
      setUserLoading(true)
      console.log(res)
      fetchTopic();
      setopenModal(false);
    })
    .catch(err=>{console.log(err)})
  }

  return (
  <>
    {openModal&&<DashboardModal setOpen={setopenModal}
    content={
    isUpdate?
    <div className='flex flex-col'>
      <article className='flex flex-col my-1'>
        <label className='mb-1'>Tên chủ đề</label>
        <input ref={topicnameRef} defaultValue={isUpdate.topicname} className='border-[1px] border-slate-400 outline-none p-1'/>
      </article>
      <article className='flex flex-col my-1'>
        <label className='mb-1'>Chủ đề dành cho</label>
        <select ref={topicforRef} defaultValue={isUpdate.topicfor} className='border-[1px] p-1 border-slate-300'>
          <option value={'user'}>User</option>
          <option value={'admin'}>Admin</option>
        </select>
      </article>
      <button onClick={()=>handleUpdateTopic(isUpdate)}>Cập nhật</button>
   </div>
    :
    <div className='flex flex-col'>
      <article className='flex flex-col my-1'>
        <label className='mb-1'>Tên chủ đề</label>
        <input ref={topicnameRef} className='border-[1px] border-slate-400 outline-none p-1'/>
      </article>
      <article className='flex flex-col my-1'>
        <label className='mb-1'>Chủ đề dành cho</label>
        <select ref={topicforRef} defaultValue={'user'} className='border-[1px] p-1 border-slate-300'>
          <option value={'user'}>User</option>
          <option value={'admin'}>Admin</option>
        </select>
      </article>
      <button onClick={handleAddTopic}>Thêm</button>
  </div>}
    />}
    {userloading?<div className='w-full h-full animate-pulse'></div>
    :<>
      <div className='text-2xl max-w-7xl mb-4 p-2 w-full border-y-[1px] border-r-[1px] border-l-8 border-[var(--sub-color)] bg-[var(--primary-color)] shadow-lg shadow-gray-300'>
          <div className='flex justify-between'>
          <span className='text-white font-semibold pl-2 '>Quản lý chủ đề</span>
          <GlobalFilter  filter={globalFilter} setfilter={setGlobalFilter}/>
          </div>
      </div>

      <div className='w-full overflow-x-scroll bg-[var(--sub-bg-color)]'>
        <table className='w-fit min-w-full border-collapse' {...getTableProps()}>
          <thead className='select-none'>
            {
              headerGroups.map((headerGroup, idx)=>(
                <tr className='border-collapse' key={idx} {...headerGroups.getHeaderGroupProps}>
                  <th className='border-[1px] border-collapse h-full border-gray-500 p-1 '>
                    <span className='block'>Action</span>
                    <span onClick={()=>setopenModal(true)} className='block '><IoMdAddCircleOutline className='text-center text-green-500 m-auto'/></span>
                  </th>
                  {headerGroup.headers.map((column, idx)=>(
                    <th className='border-[1px] whitespace-nowrap border-gray-500 p-1 text-center' key={idx} {...column.getHeaderProps(column.getSortByToggleProps())}>
                      
                        {column.render('header')}
                        <span className='ml-2'>
                          {column.isSorted?(column.isSortedDesc? '🔽':'🔼'):''}
                        </span>
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
                      <span onClick={()=>{handleDeleteTopic(row.original.idtopic)}} className='whitespace-nowrap block py-1'><RiDeleteBin6Line className='text-center text-red-600 m-auto'/></span>
                      <span onClick={()=>{
                        setopenModal(true)
                        setisUpdate(row.original)}} className='whitespace-nowrap block py-1'><RiEditBoxLine className='text-center text-blue-500 m-auto'/></span>
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
          Số dòng mỗi trang
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

export default TopicManage