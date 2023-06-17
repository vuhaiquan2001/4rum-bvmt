import React from 'react'

function ColumnFilter({column}) {
    const {filterValue, setFilter} = column;
  return (
    <div className='text-white text-lg font-medium flex w-full mx-auto'>
        <input className="mr-1 text-[var(--primary-text-color)] md:mx-1 px-2 py-2 h-8 w-full bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none hover:border-sky-500 focus:border-sky-500 focus:ring-sky-500 block md:rounded-3xl sm:text-sm focus:ring-1" 
        placeholder='Tìm kiếm Theo' 
        value={filterValue||''}
        onChange={e=>setFilter(e.target.value)}
        />
    </div>
  )
}

export default ColumnFilter