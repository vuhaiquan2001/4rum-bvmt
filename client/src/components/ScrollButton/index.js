import React from 'react'
import {IoIosArrowUp} from 'react-icons/io'

function ScrollToTopBtn() {
    const ScrollToTop = ()=>{
        window.scrollTo(0, 0)
    }
  return (
    <div className='fixed rounded text-white border-x-[2px] border-b-4 hover:border-b-2 hover:bg-lime-400 border-[var(--sub-color)] text-lg p-2  bg-[var(--primary-color)] z-50 right-4 bottom-4' onClick={()=> ScrollToTop()}><IoIosArrowUp/></div>
  )
}

export default ScrollToTopBtn