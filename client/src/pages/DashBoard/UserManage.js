import React, {useState, useEffect, useMemo, useCallback, useRef} from 'react'
import axios from "axios";
import { useTable, useSortBy, useGlobalFilter, useFilters , usePagination} from 'react-table';
import GlobalFilter from './GlobalFilter';
import ColumnFilter from './ColumnFilter';
import DashboardModal from './DashboardModal';
import icons from '../../assets/icons';

import {RiChatDeleteLine, RiDeleteBin6Line,RiEditBoxLine} from 'react-icons/ri';
import {AiOutlineLoading3Quarters, AiFillCamera} from 'react-icons/ai'
import {FaBan} from 'react-icons/fa';
import {BiSort} from 'react-icons/bi';
import Moment  from 'moment';

function UserManager() {
  const [users, setUsers] = useState([])
  const [userloading, setUserLoading] = useState(true);
  const [actionLoading, setactionLoading] = useState(false);
  const [SortAble, setSortAble] = useState(false)

  const [isOpen, setisOpen] = useState(false)
  const [User, setUser] = useState({})
  const usernameRef = useRef();
  const usertitleRef = useRef();
  const userdescref = useRef();



  const data = useMemo(() => users.map((user)=> ({...user, joindate: Moment(user.joindate).format("DD-MM-YYYY") })), [users])

  const columns = useMemo(() => [
    {
      header: 'Cấm tài khoản',
      accessor: 'isban',
      Cell: ({value})=>{return <span>{value===0?'Không cấm': 'Cấm'}</span>},
      Filter: ColumnFilter,
      disableFilters: true
    },{
    header: 'Mã người dùng',
    accessor: 'iduser',
    Filter: ColumnFilter
  },{
    header: 'Tên người dùng',
    accessor: 'username',
    Filter: ColumnFilter
  },{
    header: 'Chức vụ người dùng',
    accessor: 'usertitle',
    Filter: ColumnFilter
  },{
    header: 'Email',
    accessor: 'useremail',
    Filter: ColumnFilter
  },{
    header: 'Ngày tham gia',
    accessor: 'joindate',
    Filter: ColumnFilter
  },{
    header: 'Password',
    accessor: 'password',
    Filter: ColumnFilter,
    disableFilters: true,
    disableSortBy: true
  },{
    header: 'User Description',
    accessor: 'userdesc',
    Filter: ColumnFilter,
    disableFilters: true
  },{
    header: 'Cấm bình luận',
    accessor: 'ischatban',
    Cell: ({value})=>{return <span className='whitespace-nowrap'>{value===0?'Không cấm': 'Cấm'}</span>},
    Filter: ColumnFilter,
    disableFilters: true
  },
  {
    header: 'User Avatar',
    accessor: 'useravatar',
    Cell: ({value})=>{return <img className='w-full h-auto ' src={value} alt=''/>},
    Filter: ColumnFilter,
    disableFilters: true,
    disableSortBy: true
  },
  {
    header: 'User Cover Img',
    accessor: 'usercoverimg',
    Cell: ({value})=>{return <img className='w-full h-auto' src={value} alt=''/>},
    Filter: ColumnFilter,
    disableFilters: true,
    disableSortBy: true
  },
  ], [])
  const {getTableProps, getTableBodyProps, headerGroups,prepareRow, state, setGlobalFilter,
    page, nextPage, previousPage, canNextPage, canPreviousPage, setPageSize, pageOptions, gotoPage  } = useTable(
    {columns, data}, useFilters, useGlobalFilter, useSortBy, usePagination
  );

  const {globalFilter,pageIndex, pageSize} = state;
  const fetchAllUser = useCallback(
    () => {
      axios.get(`/api/alluser`).then((res) => {
        setUsers(res.data)
        setUserLoading(false)
        setisOpen(false)
      })
      .catch(err=>{console.log(err)})
    },
    [],
  )
  
  useEffect(() => {
   fetchAllUser();
  }, [fetchAllUser])

  const handleSort = (status) =>{
    setSortAble(status)
  }
  const hanldeChatBan=(row)=>{
    setactionLoading(true)
    const data = {iduser: row.iduser, bool: row.ischatban}
    axios.patch(`/api/chatbanuser`, data).then((res) => {
      fetchAllUser()
      setactionLoading(false) 
    })
    .catch(err=>console.log(err))
  }

  const hanldeBan=(row)=>{
    setactionLoading(true)
    const data = {iduser: row.iduser, bool: row.isban}
    axios.patch(`/api/banuser`, data).then((res) => {
      fetchAllUser()
      setactionLoading(false) 
    })
    .catch(err=>console.log(err))
  }

  const handleDeleteUser = (id) =>{
    setactionLoading(true)
    const answer = window.confirm(`Xóa người dùng có Id:${id}? Tất cả dữ liệu liên quan đến người dùng đều biến mất!`);
    if (answer) {
      axios.delete(`/api/deleteuser/${id}`).then((res) => {
        fetchAllUser()
        setactionLoading(false) 
      })
      .catch(err=>console.log(err))
    } else{
      setactionLoading(false) 
    }
  }

  const hanldeEditUser = () =>{
    setactionLoading(true)
    const data = {iduser: User.iduser, username: usernameRef.current.value,
       userdesc: userdescref.current.value, useravatar: User.useravatar, usertitle: usertitleRef.current.value,
        usercoverimg: User.usercoverimg}
    axios.patch(`/api/updateuserdetail`, data).then((res) => {
      fetchAllUser()
      setactionLoading(false) 
    })
    .catch(err=>console.log(err))
    
  }

  const handleCoverImg =()=>{
    const url = window.prompt('URL', User.usercoverimg)
    if(url){
      setUser({...User, usercoverimg: url})
    }
  }
  const handleAvatar =()=>{
      const url = window.prompt("Nhập vào Url avatar của bạn!", User.useravatar);
      if(url){
          setUser({...User, useravatar: url})
      }
  }

  const handleErrAvatar= ()=>{
    setUser({...User, useravatar: icons.defaultAvatar})
}

const handleErrCover= ()=>{
    setUser({...User, usercoverimg: icons.defaultCover})
}

  return (
  <>
    {isOpen&&<DashboardModal setOpen={setisOpen} content={
      <main className='h-fit w-1/2 min-w-1/2 mt-16 flex flex-col items-center'>
        <article className='flex relative flex-col mb-8 w-full'>
          <div className='w-full max-h-[250px]'><img className='object-cover w-full h-full' onError={()=>handleErrCover()} src={User.usercoverimg} alt=''/></div>
          <div className='absolute rounded-full w-[100px] h-[100px] aspect-square -bottom-5 right-1/2 translate-x-1/2'>
            <img className='shadow-xl rounded-full w-full h-full object-cover' onError={()=>handleErrAvatar()} src={User.useravatar} alt=''/>
            <div onClick={handleAvatar} className='absolute flex justify-center items-center w-6 h-6 left-[50%] translate-x-[-50%] bottom-0 translate-y-1/2 rounded-full bg-black hover:bg-gray-600 text-gray-200 text-center'>
              <AiFillCamera/>
            </div>
          </div>
          <div onClick={handleCoverImg} className='absolute flex justify-center items-center w-fit p-1 leading-none h-6 right-2 md:right-2  bottom-0 -translate-y-1/2 rounded-full bg-black hover:bg-gray-600 text-gray-200 text-center'>
            <span className='hidden md:flex'>Cài đặt ảnh bìa</span><AiFillCamera className='ml-1'/></div>
        </article>
        <article className='flex flex-col my-1 w-full'>
          <label className='mb-1'>Tên người dùng</label>
          <input ref={usernameRef} defaultValue={User.username} className='border-[1px] border-slate-400 outline-none p-1'/>
        </article>
        <article className='flex flex-col my-1 w-full'>
          <label className='mb-1'>Chức vụ người dùng</label>
          <select ref={usertitleRef} defaultValue={User.usertitle} className='border-[1px] p-1 border-slate-300'>
            <option value={'user'}>User</option>
            <option value={'admin'}>Admin</option>
          </select>
        </article>
        <article className='flex flex-col my-1 w-full'>
          <label className='mb-1'>Mô tả người dùng</label>
          <textarea ref={userdescref} defaultValue={User.userdesc} className='border-[1px] border-slate-400 outline-none p-1'/>
        </article>
        <button className='px-2 py-1 bg-green-500 hover:bg-green-400 mt-1 mb-3 text-white font-medium' onClick={e=>hanldeEditUser(User.idpost)}>Cập nhật</button>
      </main>
    }/>}
    {userloading?<div></div>
    :<>
      <div className='text-2xl max-w-7xl mb-4 p-2 w-full border-y-[1px] border-r-[1px] border-l-8 border-[var(--sub-color)] bg-[var(--primary-color)] shadow-lg shadow-gray-300'>
          <div className='flex justify-between'>
          <span className='text-white font-semibold pl-2 '>Quản lý người dùng</span>
          <GlobalFilter  filter={globalFilter} setfilter={setGlobalFilter}/>
          </div>
      </div>

      <div className='w-full overflow-x-scroll bg-[var(--sub-bg-color)]'>
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
                    {!actionLoading?
                    <td className='border-[1px] border-gray-500 p-1 '>
                      {row.original.ischatban === 0?<span onClick={()=>hanldeChatBan(row.original)} className='whitespace-nowrap block py-1'><RiChatDeleteLine className='text-center text-yellow-400 m-auto'/></span>
                      :<span onClick={()=>hanldeChatBan(row.original)} className='whitespace-nowrap block py-1'><RiChatDeleteLine className='text-center text-green-400 m-auto'/></span>
                      }
                      {row.original.isban === 0?<span onClick={()=>hanldeBan(row.original)} className='whitespace-nowrap block py-1'><FaBan className='text-center text-red-600 m-auto'/></span>
                      :<span onClick={()=>hanldeBan(row.original)} className='whitespace-nowrap block py-1'><FaBan className='text-center text-green-400 m-auto'/></span>
                      }
                        <span onClick={()=>handleDeleteUser(row.original.iduser)} className='whitespace-nowrap block py-1'><RiDeleteBin6Line className='text-center text-red-600 m-auto'/></span>
                        <span onClick={()=>{setisOpen(true); setUser(row.original)}} className='whitespace-nowrap block py-1'><RiEditBoxLine className='text-center text-blue-500 m-auto'/></span>   
                    </td>:
                    <td className='border-[1px] relative border-gray-500 bg-slate-400 opacity-50  p-1 animate-pulse'>
                      <span className='whitespace-nowrap opacity-50 block py-1'><RiChatDeleteLine className='text-center text-yellow-400 m-auto'/></span>
                      <span className='whitespace-nowrap opacity-50 block py-1'><FaBan className='text-center text-red-600 m-auto'/></span>
                      <span className='whitespace-nowrap opacity-50 block py-1'><RiDeleteBin6Line className='text-center text-red-600 m-auto'/></span>
                      <span className='whitespace-nowrap opacity-50 block py-1'><RiEditBoxLine className='text-center text-blue-500 m-auto'/></span>   
                      <div className='absolute w-full h-full top-0 right-0 flex justify-center items-center'><AiOutlineLoading3Quarters className='text-white text-lg animate-spin text-center'/></div>
                    </td>
                    }
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
          Số người dùng mỗi trang
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

export default UserManager