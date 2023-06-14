import React from 'react'

function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[var(--sub-bg-color)]">
        <h1 className="text-9xl font-extrabold text-[var(--primary-color)] tracking-widest">404</h1>
        <div className="bg-[#84d41a] px-2 text-base rounded rotate-12 absolute text-white shadow-xl">
            Trang không tồn tại !
        </div>
        <button className="mt-5 rounded">
        <a href='/forum' className="relative inline-block text-sm font-medium text-[#405e19] group active:text-[#8ac53c] focus:outline-none focus:ring">
            <span
            className="absolute rounded inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#e4ffc1] group-hover:translate-y-0 group-hover:translate-x-0"
            ></span>

            <span className="relative text-lg block px-8 py-3 text-white bg-[#8be415] border border-[#e4ffc1] shadow-lg rounded">
            <router-link to="/forum">Về trang chủ</router-link>
            </span>
        </a>
        </button>
    </div>
  )
}

export default NotFound