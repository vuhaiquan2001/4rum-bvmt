import React,{useEffect, useState} from 'react'

function FilterPost({setpost}) {
  const [sort, setSort] = useState('increase')
  

  console.log(sort)
  return (
    <>
    <div className='flex cursor-pointer select-none'><span>Sắp xếp theo:</span> 
      <button className='mr-1 bg-slate-500 rounded p-1'>Mặc định</button>
      <button className='mr-1 bg-slate-500 rounded p-1'>Views</button>
      <button className='mr-1 bg-slate-500 rounded p-1'>Comments</button>
      <button className='mr-1 bg-slate-500 rounded p-1'>Votes</button>
      <div className='flex'>Thứ tự: 
        <div onClick={()=>setSort('increase')}>Tăng dần</div>
        <div onClick={()=>setSort('decrease')}>Giảm dần</div>
      </div>
    </div>
    <div className='flex cursor-pointer select-none'> 
        Quick Search:
        <input type='text'/>
        <button>Search</button>
    </div>
    </>
  )
}

export default FilterPost