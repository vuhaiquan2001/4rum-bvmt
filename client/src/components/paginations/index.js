import React from 'react'

function Pagination({postPerPage, currentPage,totalPosts, Paginate}) {

    const pageNumber= [];

    for(let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++){
        pageNumber.push(i);
    }
  return (
    <div className='flex w-full justify-center mb-6 mt-2'>
        {
            pageNumber.map(number => (
                <div key={number} className={`mx-[2px] rounded ${number!==currentPage? 'bg-[#5e910c ]': 'bg-[#a3e635]'} hover:bg-[#b3ff50] hover:text-[#60961a] border-[1px]`}>
                    <span className='p-3' onClick={()=>Paginate(number)}>{number}</span>
                </div>
            ))
        }
    </div>
  )
}

export default Pagination