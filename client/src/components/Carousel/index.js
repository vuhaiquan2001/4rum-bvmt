import React,{useEffect, useState, useCallback} from 'react'
import {MdKeyboardArrowLeft,MdKeyboardArrowRight} from 'react-icons/md'

function Carousel({slide, content, autoslide}) {
    const[curr, setCurr] = useState(0);
    const next = useCallback(
      () => {setCurr(curr===slide.length-1? 0:curr+1)},
      [curr, slide],
    )
    
    
    const prev =()=>{
        setCurr(curr===0? slide.length-1:curr-1)
    }
    useEffect(() => {
      if(!autoslide) return;
        const slideinterval = setInterval(() => {
            next()
        }, 2000);

      return () => {
        clearInterval(slideinterval);
      }
    }, [autoslide, next])
    
    return (
    <div className='relative overflow-hidden w-full'>
       <div className='flex w-full transition-transform ease-linear duration-500' style={{transform: `translateX(-${curr*100}%)`}}>
            {slide.map(((slide,i)=>(
            <img key={i} src={slide.url} alt='' className='min-w-full h-auto object-cover'/>
            )))}
       </div>
        <div className='absolute max-w-[50%] left-1/4 top-1/3 md:top-1/2 bg-gray-500 p-2 rounded bg-opacity-70 '>
            <span className='hidden sm:flex'>{content?content:''}</span>
            <div>
            {slide.map(((slide,i)=>(
                <span className={`${curr===i? 'flex':'hidden'} text-base font-medium text-gray-50`} key={i}>
                    {slide.title}
                </span>
            )))}
            </div>
        </div>
       <div className='absolute w-full flex justify-between px-2 top-1/2'>
            <div onClick={prev} className='bg-slate-200 hover:bg-opacity-40 bg-opacity-80 p-2 rounded-full'>
                <MdKeyboardArrowLeft className='text-lg text-[var(--primary-text-color)] '/>
            </div>
            <div onClick={next} className='bg-slate-200 hover:bg-opacity-40 bg-opacity-80 p-2 rounded-full'>
                <MdKeyboardArrowRight className='text-lg text-[var(--primary-text-color)] '/>
            </div>
       </div>

       <div className='flex absolute bottom-2 right-1/2 translate-x-1/2 '>
       {slide.map(((_,i)=>(
        <div onClick={()=>setCurr(i)} key={i} className={`mx-2 ${curr===i?'w-4 bg-opacity-100':'w-2 bg-opacity-70'} transition-all h-2 bg-slate-100 rounded-full`}></div>
       )))}
       </div>
    </div>
  )
}

export default Carousel