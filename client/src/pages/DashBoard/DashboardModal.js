import React from 'react'
import ReactDOM from 'react-dom';

function DashboardModal({setOpen, content}) {

  const handleOpenModal = (e)=>{
    e.stopPropagation();
    setOpen(true)
  }
  const handleCloseModal = (e)=>{
    e.stopPropagation();
    setOpen(false)
  }
  return (ReactDOM.createPortal(
    <div onClick={()=>setOpen(false)} className='fixed top-0 flex justify-center items-center w-full h-full bg-slate-500 bg-opacity-50'>
      <div onClick={(e)=>handleOpenModal(e)} className='w-fit min-w-[50%] overflow-y-scroll h-4/5 flex justify-center items-center relative  bg-[var(--primary-bg-color)]'>
        <span onClick={(e)=>handleCloseModal(e)} className='absolute top-0 right-0'>☒</span>
        {content}
      </div>
    </div>
  , document.getElementById('root')
  )
  )
}

export default DashboardModal

