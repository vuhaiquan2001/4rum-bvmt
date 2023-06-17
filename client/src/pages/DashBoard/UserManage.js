import React, {useState, useEffect, useMemo} from 'react'
import axios from "axios";
import { useTable, useSortBy, useGlobalFilter, useFilters , usePagination} from 'react-table';
import GlobalFilter from './GlobalFilter';
import ColumnFilter from './ColumnFilter';

import {RiChatDeleteLine, RiDeleteBin6Line,RiEditBoxLine} from 'react-icons/ri';
import {FaBan} from 'react-icons/fa';
import Moment  from 'moment';

function UserManager() {
  const [users, setUsers] = useState([])
  const [userloading, setUserLoading] = useState(true)

  const data = useMemo(() => users.map((user)=> ({...user, joindate: Moment(user.joindate).format("DD-MM-YYYY") })), [users])

  const columns = useMemo(() => [{
    header: 'User ID',
    accessor: 'iduser',
    Filter: ColumnFilter
  },{
    header: 'User Name',
    accessor: 'username',
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
    header: 'Cấm chat',
    accessor: 'ischatban',
    Cell: ({value})=>{return <span className='whitespace-nowrap'>{value===0?'Không cấm': 'Cấm'}</span>},
    Filter: ColumnFilter,
    disableFilters: true
  },{
    header: 'Cấm tài khoản',
    accessor: 'isban',
    Cell: ({value})=>{return <span>{value===0?'Không cấm': 'Cấm'}</span>},
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

  useEffect(() => {
    axios.get(`/api/alluser`).then((res) => {
      setUsers(res.data)
      setUserLoading(false)
    })
    .catch(err=>{console.log(err)})
  }, [])

  const hanldeChatBan=(data)=>{
    console.log(data)
  }

  return (
  <>
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
                    <th className='border-[1px] whitespace-nowrap border-gray-500 p-1' key={idx} {...column.getHeaderProps(column.getSortByToggleProps())}>
                      
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
                      <span onClick={()=>hanldeChatBan(row.original)} className='whitespace-nowrap block py-1'><RiChatDeleteLine className='text-center text-yellow-400 m-auto'/></span>
                      <span className='whitespace-nowrap block py-1'><FaBan className='text-center text-red-600 m-auto'/></span>
                      <span className='whitespace-nowrap block py-1'><RiDeleteBin6Line className='text-center text-red-600 m-auto'/></span>
                      <span className='whitespace-nowrap block py-1'><RiEditBoxLine className='text-center text-blue-500 m-auto'/></span>
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