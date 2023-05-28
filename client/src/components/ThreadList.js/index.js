import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import Moment from "moment";
import { firstLetterUppercase } from "../FirstLetterUppercase";

function ThreadList(topic) {
  const [posts, setPosts] = useState([]);

  const handlePosts = () => {
  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
};
  const fetchPost = async (id)  => {
    await axios.get(`/api/homepost/${id}`).then((response) => {
      setPosts(response.data)
    })
  }

  useEffect(() => {
    fetchPost(topic.topic.idtopic)
  }, [topic.topic.idtopic])


  return (
    <div className="flex flex-col justify-between min-w-[800px] min-h-[350px] bg-lime-500 mb-5 shadow-xl">
      <div className="bg-lime-600 relative py-2 pl-5  flex justify-between w-[70%] ml-2 my-1">
        <span className="text-center mx-1 font-medium text-lg leading-[1.56rem]">{
        topic.topic.topicname}</span>
        <div className="absolute top-0 right-[-41px] border-[21px] border-l-lime-600 border-y-[transparent] border-r-transparent"></div>
        <div className="absolute top-0 left-[0px] border-[20px] border-l-lime-500 border-y-[transparent] border-r-transparent"></div>
      </div>
      <div className="mx-2 h-auto w-[900px] cursor-pointer overflow-hidden">
        {posts.map((post, index) => 
        {
          const formatDate = Moment(post.ngaytao).format("DD-MM-YYYY");
          return post.idtopic !==topic.topic.idtopic? <React.Fragment key={index}/>:
          <Link key={index} 
            className='flex justify-between items-center border-[1px]  bg-[#a3e635] hover:bg-[#b3ff50] hover:text-[#60961a]' 
            to={`/post/${post.idpost}`}>
                <div className='flex py-4 text-ellipsis max-h-24'>
                  <div className='rounded-full h-14 w-14  mx-2  bg-[#e1ffb4] '>
                    <img 
                    className='rounded-full w-full h-full object-cover'
                    src={post.useravatar} alt='avatar'/>
                  </div>
                  <div className='flex flex-1 flex-col px-2'>
                    <div className='h-8 max-w-[800px] whitespace-nowrap overflow-hidden text-ellipsis'>
                      <span className='text-xl font-medium text-[var(--text-color)] hover:underline
                     hover:text-[#851210] text-ellipsis'>{post.posttitle}
                     </span>
                    </div>
                    <div className='flex'>
                      <span className='text-sm text-[var(--sub-text-color)] hover:underline'>{firstLetterUppercase(post.username)}</span>
                      <span className='text-sm text-[var(--sub-text-color)] mx-1'>.</span>
                      <span className='text-sm text-[var(--sub-text-color)] hover:underline'>{formatDate}</span>
                    </div>
                  </div>
                </div>
              </Link>
        })}
      </div>

      <Link
      onClick={() => handlePosts()}
      className="bg-lime-500 flex justify-end mr-2 py-2 hover:text-[#d9ffa8]" to={`/postlist/${topic.topic.idtopic}`}>
        Xem thêm....
      </Link>
    </div>
  );
}

export default ThreadList;
