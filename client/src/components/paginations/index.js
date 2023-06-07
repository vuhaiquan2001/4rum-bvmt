import React from 'react'

function Pagination({postPerPage, currentPage,totalPosts, Paginate}) {
    const pageNumber= [];
    for(let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++){
        pageNumber.push(i);
    }
    function handlePre(){
        if(currentPage===1) return;
        Paginate(currentPage-1)
    }
    function handleNext(){
        if(currentPage===Math.ceil(totalPosts / postPerPage)) return;
        Paginate(currentPage+1)
    }
  return (
    <div className='flex flex-wrap w-full justify-center mb-6 mt-2 select-none cursor-pointer'>
        <div className={`mx-[2px] rounded bg-[#a3e635] hover:bg-[#b3ff50] hover:text-[#60961a] border-[1px]`}>
            <span className='p-3' onClick={()=>{if(currentPage===1) return; Paginate(1)}}>&laquo;</span>
        </div>
        <div className={`mx-[2px] rounded bg-[#a3e635] hover:bg-[#b3ff50] hover:text-[#60961a] border-[1px]`}>
                    <span className='p-3' onClick={()=>handlePre()}>&lsaquo;</span>
        </div>
        {
            pageNumber.map(number => {
                if(number<currentPage-3 || number>currentPage+3){
                    return <div key={number}></div>
                } else{
                return (
                    <div key={number} className={`mx-[2px] rounded ${number!==currentPage? 'bg-[#a3e635]': 'bg-[#5e910c]'} hover:bg-[#b3ff50] hover:text-[#60961a] border-[1px]`}>
                        <span className='p-3' onClick={()=>Paginate(number)}>{number}</span>
                    </div>
                    )
                }  
            })
        }
        <div className={`mx-[2px] rounded bg-[#a3e635] hover:bg-[#b3ff50] hover:text-[#60961a] border-[1px]`}>
            <span className='p-3' onClick={()=>handleNext()}>&rsaquo;</span>
        </div>
        <div className={`mx-[2px] rounded bg-[#a3e635] hover:bg-[#b3ff50] hover:text-[#60961a] border-[1px]`}>
            <span className='p-3' onClick={()=>{if(currentPage===Math.ceil(totalPosts / postPerPage)) return; Paginate(Math.ceil(totalPosts / postPerPage))}}>&raquo;</span>
        </div>
    </div>
  )
}

export default Pagination