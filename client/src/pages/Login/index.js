import React, {useState, useEffect} from 'react'
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useStore, action } from '../../store';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [, dispatch] = useStore();
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
       await axios.post(`/api/login`, { email: email, password: password})
      .then(res => {
        if(res.data.message){
          setErr(res.data.message)
          console.log(res.data)
        } else {
          localStorage.setItem("userinfo", JSON.stringify(...res.data));
          dispatch(action.setUser(...res.data));
          navigate('/')
        }
      })
  }
  useEffect(() => {
    if(JSON.parse(localStorage.getItem("userinfo")) !== null){
        navigate('/')
    }
  }, [navigate])

  return (
    <div className='flex min-h-[625px] justify-center w-screen mt-10'>
      <div className="flex lg:max-w-[1200px] w-full min-h-full flex-col bg-[#84dc00] justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto"  src={require("../../assets/logo/bvmtLogo.png")} alt="Logo"/>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-green-900">Đăng nhập tài khoản của bạn</h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={(e)=>handleSubmit(e)} className="space-y-6" action="#" method="POST">
          <div>
            <div className='flex items-center justify-between'>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-green-900">Email</label>
              {err === ''? <React.Fragment/>:<label className="block text-sm font-semibold text-red-600 hover:text-red-500">{err}</label>}
            </div>
            <div className="mt-2">
              <input
              onChange={(e)=> setEmail(e.target.value)}
              value={email}
              id="email" name="email" type='email' autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-green-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>
    
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-green-900">Mật khẩu</label>
              <div className="text-sm">
                <Link  className="font-semibold text-indigo-600 hover:text-indigo-500">Quên mật khẩu?</Link>
              </div>
            </div>
            <div className="mt-2">
              <input
              onChange={(e)=> setPassword(e.target.value)}
              value={password}
              id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
            </div>
          </div>
    
          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Đăng nhập</button>
          </div>
        </form>
    
        <p className="mt-10 text-center text-sm text-green-600">
          Chưa có tài khoản?
          <Link to='/register' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
    </div>
  )
}

export default Login