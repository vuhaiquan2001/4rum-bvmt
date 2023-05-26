import React from 'react'

function FilterPost({setpost}) {
  return (
    <>
    <div className='flex'>Sắp xếp theo: 
        <div>Mới nhất</div>
        <div>Ngày đăng tải.</div>
        <div>Ngày đăng tải.</div>
    </div>
    <div className='flex'>Thứ tự: 
        <div>Mới nhất</div>
        <div>Ngày đăng tải.</div>
        <div>Ngày đăng tải.</div>
    </div>
    <div className='flex'> 
        Quick Search:
        <input type='text'/>
        <button>Search</button>
    </div>
    </>
  )
}

export default FilterPost