import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useStore, action} from '../../store';
import {FaUserEdit,FaUserAlt,FaBook,FaUser} from 'react-icons/fa';
import {AiOutlineSearch,AiOutlineMenu} from 'react-icons/ai';

import {IoCreate} from 'react-icons/io5';
import { useNavigate } from "react-router-dom";

import { firstLetterUppercase } from '../FirstLetterUppercase';

export default function Header() {
  const [state, dispatch] = useStore();
  const [user, setUser] = useState({});
  const [inputselect, setInputSelect] = useState(false);
  const [openSideMenu, setopenSideMenu] = useState(false);
  const [opensearch, setopensearch] = useState(false);
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const handleSelectSearch = () => {
    setInputSelect(!inputselect);
  };
  const handleSearch = () => {
    if(keyword.trim() === '') return;
    navigate(`/search/${keyword}`)
    setKeyword('')
    setopensearch(false)
  };
  const handleEnterSearch = (e)=>{
    if(e.key ==='Enter'){
      navigate(`/search/${keyword}`)
      setKeyword('')
    }
  }
  const handleKeyWord =(e)=>{
    setKeyword(e.target.value)
  }
  const handleLogout = () => {
    const answer = window.confirm("Bạn có chắc muốn đăng xuất");
    if (answer) {
      setopenSideMenu(false)
      dispatch(action.setUser({}));
      localStorage.removeItem("userinfo"); 
      navigate('/login')
    }
  };
  
  useEffect(() => {
    if(state.users.iduser){
      setUser(state.users)
    } else {
      setUser({})
    }
  }, [state])

  return (
    <div className="fixed w-full top-0 z-50">
      <div className="flex relative h-16 w-full items-center justify-between px-1 lg:px-5 bg-[var(--primary-header-color)] shadow-md select-none drag-none ">
        
        {openSideMenu&&
        <div
        onClick={()=>setopenSideMenu(false)}
        className="flex justify-end absolute lg:hidden bg-[#3537336e] w-full h-screen right-0 top-0 shadow-xl shadow-[#bef966] ">
          <div
          onClick={(e)=>{e.stopPropagation()}}
          className="bg-[#99ff00] w-2/3 h-full flex flex-col justify-start items-center">
            <Link to={`/profile/${user.iduser}`} onClick={()=>setopenSideMenu(false)} className="mt-2 flex w-full justify-center">
              <div className='flex flex-col p-2 w-40 rounded justify-center items-center bg-[#9dff0a] border-[1px]'>
                <div className='rounded-full h-16 w-16 bg-[#e1ffb4] border-[2px] border-green-800'>
                    <img 
                    className='rounded-full w-full h-full object-cover'
                    src={user.useravatar} alt='avatar'/>
                </div>
                <div className='text-lg max-w-[130px] overflow-hidden text-ellipsis font-medium my-2 text-[#d9ffa0]'>{user.username}</div>
                <div className='flex items-center justify-center rounded  h-5 w-full bg-green-400 shadow-md text-yellow-100 text-base leading-none'>
                <FaUser className='mr-1'/>
                {firstLetterUppercase(user.usertitle)}
                </div>
              </div>
            </Link>
            <Link onClick={()=>setopenSideMenu(false)} to={`/profile/${user.iduser}`} className="p-2 mt-2 flex justify-center item-center leading-none whitespace-nowrap text-lg font-semibold text-yellow-50 border-b-[1px] hover:bg-[#a7e944]"><FaUserAlt className='mr-1'/> Trang cá nhân</Link>
            <Link onClick={()=>setopenSideMenu(false)}  to={`/editprofile/${user.iduser}`} className="p-2  w-full flex justify-center item-center leading-none whitespace-nowrap text-lg font-semibold text-yellow-50 border-y-[1px] hover:bg-[#a7e944]"><FaUserEdit  className='mr-1 text-2xl'/>Sửa thông tin</Link>
            <Link onClick={()=>setopenSideMenu(false)}  to={`/storage`} className="p-2 w-full flex justify-center item-center leading-none whitespace-nowrap text-lg font-semibold text-yellow-50 border-b-[1px] hover:bg-[#a7e944]"><FaBook  className='mr-1'/>Kho của bạn</Link>      
            <div onClick={()=>handleLogout()} className="p-2 flex justify-center w-full whitespace-nowrap text-lg font-semibold text-red-500 border-b-[1px] hover:bg-[#a7e944]">Đăng xuất</div>
          </div>  
        </div>}

        <div className="flex flex-1 w-full items-center justify-between">
          <Link className="flex py-2 justify-center" to="/">
            <img
              src={require("../../assets/logo/bvmtLogo.png")}
              alt="logo"
              className="h-10"
            />
            <label className="text-xl hidden lg:flex font-medium text-center leading-10 text-[var(--text-color)] cursor-pointer">Việt Nam Xanh</label>
          </Link>
          <div
            className={`hidden md:flex flex-1 h-10 max-w-[750px] bg-white justify-center md:ml-1 items-center rounded-[50px] border-[1px] hover:border-slate-500 ${
            inputselect ? "border-slate-500" : ""}`}
            onSelect={() => handleSelectSearch()}
            onBlur={() => handleSelectSearch()}>
            <AiOutlineSearch className="text-2xl ml-2"/>
            <input
              value={keyword}
              onChange={(e)=>handleKeyWord(e)}
              onKeyDown={(e)=>handleEnterSearch(e)}
              className="w-full outline-none mx-2 text-sm leading-[14px]"
              type="search"
              placeholder="Tìm kiếm"/>
              <button onClick={()=>handleSearch()} className="mx-2 py-[2px] px-2 bg-[#8acd26] rounded">Search</button>
          </div>
          <div></div>
          <div onClick={()=>setopensearch(!opensearch)} className="md:hidden border-[1px] rounded py-2 px-4">
            <AiOutlineSearch className="text-xl"/>
          </div>
        </div>
  
        {user.iduser &&<Link to='/createpost' className="flex ml-2 justify-between">
          <div className="flex group flex-1 py-2 px-3 border-[1px] justify-between border-slate-200 rounded">   
              <IoCreate className="text-xl font-bold text-green-900 ml-1 group-hover:text-[#f2ffde] group-hover:text-2xl"/>
          </div>
        </Link>}
        <div className="ml-2 justify-end w-fit">
          {user.iduser ? 
            <div className="hidden lg:flex group/all py-2 px-1 justify-between items-center">
              <span className="text-xl text-end max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis font-bold text-[#ddffab] ml-1 group-hover/all:text-[#f2ffde]"> {user.username}</span>
              <div className='relative group/drop rounded-full h-11 w-11  mx-2 bg-[#e1ffb4] border-2 border-green-900 group-hover/all:border-[#e1ffb4]'>
                <img className='rounded-full w-full h-full object-cover pointer-events-none' src={user.useravatar} alt="avatar"/>
                <div className="absolute hidden group-hover/drop:flex flex-col top-[45px] right-0 w-fit bg-[#8acd26] shadow-sm shadow-slate-500">
                  <div className="absolute w-full h-6 top-[-22px] "></div>
                  <Link to={`/profile/${user.iduser}`} className="p-2 flex item-center leading-none whitespace-nowrap text-lg font-semibold text-yellow-50 border-b-[1px] hover:bg-[#a7e944]"><FaUserAlt className='mr-1'/> Trang cá nhân</Link>
                  <Link to={`/editprofile/${user.iduser}`} className="p-2 flex item-center leading-none whitespace-nowrap text-lg font-semibold text-yellow-50 border-b-[1px] hover:bg-[#a7e944]"><FaUserEdit  className='mr-1 text-2xl'/>Sửa thông tin</Link>
                  <Link to={`/storage`} className="p-2 flex item-center leading-none whitespace-nowrap text-lg font-semibold text-yellow-50 border-b-[1px] hover:bg-[#a7e944]"><FaBook  className='mr-1'/>Kho của bạn</Link>      
                  <div onClick={()=>handleLogout()} className="p-2 whitespace-nowrap text-lg font-semibold text-red-500 border-b-[1px] hover:bg-[#a7e944]">Đăng xuất</div>
                </div>            
              </div>
            </div>
          :<div className="text-base mr-2 lg:mr-0 lg:text-xl font-bold text-[#ddffab] hover:text-[#f2ffde]">
              <Link to='/login' className=" border-[1px] rounded p-2">Đăng nhập</Link>
              <Link to='/register' className="border-[1px] ml-1 rounded p-2">Đăng Ký</Link>
            </div>}
        </div>
        {state.users.iduser&&<div
        onClick={()=>setopenSideMenu(true)}
        className="flex lg:hidden group py-2 mr-2 px-3 border-[1px] justify-between border-slate-200 rounded">   
              <AiOutlineMenu className="text-xl font-bold text-green-900 ml-1 group-hover:text-[#f2ffde]"/> 
        </div>}

        {opensearch&&
        <div
            className={`md:hidden flex absolute flex-1 h-10 w-screen top-[100%] right-1/2 translate-x-1/2 bg-white justify-center items-center rounded-[50px] border-[1px] hover:border-slate-500 ${
            inputselect ? "border-slate-500" : ""}`}
            onSelect={() => handleSelectSearch()}
            onBlur={() => handleSelectSearch()}>
            <AiOutlineSearch className="text-2xl ml-2"/>
            <input
            value={keyword}
            onChange={(e)=>handleKeyWord(e)}
              onKeyDown={(e)=>handleEnterSearch(e)}
              className="w-full outline-none mx-2 text-sm leading-[14px]"
              type="search"
              placeholder="Tìm kiếm"/>
              <button onClick={()=>handleSearch()} className="mx-2 py-[2px] px-2 bg-[#8acd26] rounded">Search</button>
          </div>}
      </div>
    </div>
  );
}
