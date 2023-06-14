import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { useStore } from './../../store/hooks';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import { firstLetterUppercase } from '../../components/FirstLetterUppercase';

function Storage() {
    const [select, setSelect] = useState('bookmark');
    const [isLoading, setisLoading] = useState(true);
    const [posts, setPosts] = useState();
    const [state,] = useStore();

    useEffect(() => {
        switch (select) {
            case 'bookmark':
                 axios.get(`/api/userbookmarkpost/${state.users.iduser}`).then(res=>{
                        setPosts(res.data)
                        setisLoading(false)
                    })
                    .catch(e => {
                        console.log(e);
                    });
                break;
            case 'votepost':
                    axios.get(`/api/uservotepost/${state.users.iduser}`).then(res=>{
                        setPosts(res.data)
                        setisLoading(false)
                    })
                    .catch(e => {
                        console.log(e);
                    });
                break;
            default:
                break;
        }
      
    }, [state.users, select])
  return (
    <main className='flex justify-center w-full mt-5 '>
        <div className='max-w-7xl w-full shadow-lg-around'>
            <div className="flex bg-[var(--primary-color)] text-white text-lg font-medium">
                <div className={`p-2 ${select === 'bookmark'? ' bg-[var(--sub-color)]':''}`} onClick={()=>setSelect('bookmark')}>
                    Đã Bookmark
                </div>    
                <div className={`p-2 ${select === 'votepost'? 'bg-[var(--sub-color)]':''}`} onClick={()=>setSelect('votepost')}>
                    Đã thích
                </div>     
            </div>
            {isLoading?
                <div className='w-full bg-[var(--sub-bg-color)]  rounded-b min-h-screen animate-pulse'></div>
                :
                <section className='flex flex-col  bg-[var(--sub-bg-color)] rounded-b min-h-screen'>
                {
                posts.map((post,index)=>(
                    <Link key={index}
                        className='flex flex-col md:flex-row justify-between items-center border-[2px] md:border-[1px] border-[var(--sub-text-color)] mt-[-1px]  bg-[var(--sub-bg-color)] hover:bg-[var(--hover-bg-color)]' 
                        to={`/post/${post.idpost}`}>
                        <div className='flex flex-row py-4 w-full md:w-[75%] border-b-[1px] md:border-r-[1px] text-ellipsis max-h-24'>
                            <div className='rounded-full h-14 w-14  mx-2  bg-[#e1ffb4] '>
                                <img 
                                className='rounded-full w-full h-full object-cover'
                                src={post.useravatar} alt='avatar'/>
                            </div>
                            <div className='flex flex-1 flex-col px-2'>
                                <div className='h-8 max-w-[200px] md:max-w-[450px] lg:max-w-[800px] whitespace-nowrap overflow-hidden text-ellipsis'>
                                <span className='text-base md:text-xl font-medium text-[var(--text-color)] hover:underline
                                hover:text-[#851210] text-ellipsis'>{post.posttitle}</span>
                                </div>
                                <div className='flex'>
                                <span className='text-sm text-[var(--sub-text-color)] hover:underline'>{firstLetterUppercase(post.username)}</span>
                                <span className='text-sm text-[var(--sub-text-color)] mx-1'>.</span>
                                <span className='text-sm text-[var(--sub-text-color)] hover:underline'>{Moment(post.ngaytao).format("DD-MM-YYYY")}</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between items-center py-4 w-full md:w-[25%]'>
                            <div className='pl-2'>
                                <span className='text-base font-medium hover:text-green-700 text-[var(--sub-text-color)] hover:underline'>Votes: {post.likequantity}</span>
                            </div>
                            <div className='flex flex-col pr-2 text-end'>
                                <span className='text-base font-medium hover:text-green-700 text-[var(--sub-text-color)] hover:underline pb-1'>Views: {post.viewquantity}</span>
                                <span className='text-base font-medium hover:text-green-700 text-[var(--sub-text-color)] hover:underline'>Comments: {post.commentquantity}</span>
                            </div>
                        </div>
                    </Link>
                ))
                }
            </section>}
        </div>
    </main>
  )
}

export default Storage