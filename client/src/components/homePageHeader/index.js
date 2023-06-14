import React from 'react'
import { Link } from 'react-router-dom'
import {MdForum} from 'react-icons/md';

function HeaderHomePage() {
  return (
    <div className="fixed w-full top-0 z-50">
      <div className="flex relative h-16 w-full items-center justify-between px-1 lg:px-5 bg-[var(--primary-bg-color)] shadow-md select-none drag-none ">
          <Link className="flex py-2 justify-center" to="/">
            <img
              src={require("../../assets/logo/bvmtLogo.png")}
              alt="logo"
              className="h-10"
            />
            <label className="text-xl hidden lg:flex font-medium text-center leading-10 text-[var(--primary-text-color)] cursor-pointer">Việt Nam Xanh</label>
          </Link>
          <Link className="flex py-2 justify-center items-center" to="/forum">
            <MdForum/>
            <label className="text-base hidden lg:flex font-medium text-center leading-10 text-[var(--primary-text-color)] cursor-pointer">Tham gia diễn đàn</label>
          </Link>
      </div>
    </div>
  )
}

export default HeaderHomePage