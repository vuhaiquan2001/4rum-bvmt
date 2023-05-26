import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios  from 'axios';
import Toast from '../../components/toast';
import { useStore, action } from '../../store';

function Register() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [err, setErr] = useState('');
  const [toast, setToast] = useState(false);
  const [, dispatch] = useStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(password.length <= 5){
      setErr('Mật khẩu phải nhiều hơn 5 kí tự')
    } else {
      if(password !== repassword){
        setErr('Nhập lại mật khẩu không khớp')
      } else{
        axios.post(`/api/register`, { email: username, password: password})
        .then(res => {
          if(res.data.message){
            setErr(res.data.message)
          } else {
            setToast(true);
            setTimeout(() => {
              localStorage.setItem("userinfo", JSON.stringify(...res.data));
              dispatch(action.setUser(...res.data));
              navigate('/')
            }, 1000);
          }
        })
      }   
    }
  }
  const handlePassword = (e)=>{
    const str = e.target.value.replace(/\s/g,'').normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    setPassword(str)
  }

  const handleRePassword = (e)=>{
    const str = e.target.value.replace(/\s/g,'').normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D');
    setRePassword(str)
  }
  return (
    <div className='flex justify-center w-screen mt-10'>
      <div className="flex lg:max-w-[1200px] w-full min-h-full flex-col bg-[#84dc00] justify-center px-6 py-12 lg:px-8">
        {toast? <Toast text={'Đăng ký thành công'}/>:<React.Fragment/>}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto"  src={require("../../assets/logo/bvmtLogo.png")} alt="Logo"/>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-green-900">Đăng ký tài khoản của bạn</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={(e)=>handleSubmit(e)} className="space-y-6" action="#" method="POST">
            <div>
              <div className='flex items-center justify-between'>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-green-900">Email hoặc username</label>
                {err === ''? <React.Fragment/>:<label className="block text-sm font-semibold text-red-600 hover:text-red-500">{err}</label>}
              </div>
              <div className="mt-2">
                <input
                onChange={(e)=> setUserName(e.target.value)}
                value={username}
                id="email" name="email" type='email' autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-green-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>
      
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-green-900">Mật khẩu</label>
              </div>
              <div className="mt-2">
                <input
                onChange={(e)=> handlePassword(e)}
                value={password}
                id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="repassword" className="block text-sm font-medium leading-6 text-green-900">Nhập lại mật khẩu</label>
              </div>
              <div className="mt-2">
                <input
                onChange={(e)=> handleRePassword(e)}
                value={repassword}
                id="repassword" name="repassword" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
              </div>
            </div>
      
            <div>
              <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Đăng ký</button>
            </div>
          </form>
      
          <p className="mt-10 text-center text-sm text-green-600">
            Đã có tài khoản?
            <Link to='/login' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Trở lại đăng nhập</Link>
          </p>
        </div>
    </div>
    </div>
  )
}

export default Register