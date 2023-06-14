import React from 'react'

function Home() {
 

  return (
    <div  className="p-5 min-h-screen flex flex-col w-full bg-[var(--primary-bg-color)] ">
      <div className='flex flex-col lg:flex-row w-full h-full'>
        <div className="flex flex-1 flex-col">
          RecommentPost
        </div>
        <div className="flex flex-col w-full h-fit mb-3 lg:mb-0  lg:w-[300px] lg:h-auto shadow-xl lg:ml-5">
         Xem nhanh
        </div>
      </div>
      <div className='w-full'>
        Bài viết tiêu biểu của diễn đàn
      </div>
    </div>
  )
}

export default Home