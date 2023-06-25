import React, {memo} from 'react'
import { useNavigate } from 'react-router-dom';
function BannedPage({dispatch, action}) {
  const navigate = useNavigate();
  const handlelogout = ()=>{
    const answer = window.confirm("Bạn có chắc muốn đăng xuất");
    if (answer) {
      dispatch(action.setUser({}));
      localStorage.removeItem("userinfo"); 
      navigate('/login')
    }
  }
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-[var(--sub-bg-color)]">
        <h1 className="text-9xl font-extrabold text-[var(--danger-color)] tracking-widest">BANNED</h1>
        <div className="bg-[var(--sub-danger-color)] text-lg font-semibold p-2 rounded top-1/2  absolute text-white shadow-xl">
            Tài khoản củ bạn đã bị ban!
        </div>
        <button className="mt-5 rounded">
        <div onClick={()=>handlelogout()} className="relative inline-block text-sm font-medium text-[#405e19] group active:text-[#8ac53c] focus:outline-none focus:ring">
            <span
            className="absolute rounded inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#e4ffc1] group-hover:translate-y-0 group-hover:translate-x-0"
            ></span>

            <span className="relative text-lg block px-8 py-3 text-white bg-[var(--danger-color)] border border-[#e4ffc1] shadow-lg rounded">
            <span>Đăng xuất</span>
            </span>
        </div>
        </button>
    </div>
  )
}

export default memo(BannedPage)