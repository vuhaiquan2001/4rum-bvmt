import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './menuBar'
import ThumEditor from './thumbEditor'
import DangerToast from '../toast/dangerToast'

import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'

import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

import '../../styles/tiptap.scss';

const PostEditor = () => {
  const [user, setUser] = useState({});
  const [imgUrl, setImgUrl]=useState('');
  const [openPreview, setopenPreview]=useState(false);
  const [isupLoad, setisupLoad]=useState(false);
  const [title, setTitle]=useState('');
  const [tags, setTags]=useState('');
  const [obj, setObj]=useState({});
  const [html, sethtml]=useState();
  const [topics, setTopics] = useState([]);
  const [idtopic, setIdtopic]= useState()

  const [isDanger, setisDanger]= useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userinfo")))
    axios.get('/api/topics').then((response) => {
      setTopics(response.data);
    });
    setObj({
      title: title,
      imgUrl: imgUrl,
      tags: tags,
    })   
  }, [title, imgUrl, tags])

  const handleUpPost = async(e) =>{
    e.preventDefault();
    setisupLoad(true)
    if(title === '' || imgUrl ===''){
      setisDanger(true)
      setTimeout(() => {
        setisDanger(false)
        setisupLoad(false)
      }, 1000);   
    } else {
      const postdata = {
        posttitle: title,
        idtopic: idtopic,
        postdesc: html,
        postthumb: imgUrl,
        iduser: user.iduser,
        tags: tags,
      }
      await axios.post(`/api/uppost`, postdata)
        .then(res => {
          if(res.data.message){
            setisDanger(true)
            setTimeout(() => {
              setisDanger(false)
              setisupLoad(false)
            }, 1000);   
          } else {
              navigate(`/post/${res.data.insertId}`)
          }
        })
    }
  }
  
  const editor = useEditor({
    extensions: [StarterKit.configure({

      // Configure an included extension
      heading: {
        levels: [1, 2, 3, 4],
      },
    }), Color, TextStyle, Underline, Image, TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),Link, Youtube],
    content: '',
    
    onUpdate: ({ editor }) => {
      sethtml(editor.getHTML())
      // send the content to an API here
    },
  })
  return (
    <>
      {isDanger? <DangerToast text={'Vui lòng nhập đầy đủ thông tin'} /> :<></>}
      <div className='mb-2 mx-2 lg:mx-0 flex flex-col lg:flex-row items-center justify-between'>
          <div className='flex flex-col lg:flex-row'>
            <div className='mr-2 '><input type='text'  value={title} className=' rounded text-base p-1 bg-[#7cb526] border-[1px] border-green-300 text-gray-100 placeholder:text-gray-200' onChange={(e)=>setTitle(e.target.value)} placeholder='Nhập tiêu đề bài viết'/></div>
            <div className='mr-2'><input type='text' value={imgUrl} className='mt-1 lg:mt-0 rounded text-base p-1 bg-[#7cb526] border-[1px] border-green-300 text-gray-100 placeholder:text-gray-200' onChange={(e)=>setImgUrl(e.target.value)} placeholder='Nhập link ảnh thumbnail'/></div>
            <div className='mr-2'><input type='text' value={tags} className='mt-1 lg:mt-0 rounded text-base p-1 bg-[#7cb526] border-[1px] border-green-300 text-gray-100 placeholder:text-gray-200' onChange={(e)=>setTags(e.target.value)} placeholder='Tag bài viết Split by ,' /></div>
            {
              user.usertitle ==='admin' ? 
              <select defaultValue={'default'} onChange={(e)=>setIdtopic(e.target.value)} className='p-1 mt-1 lg:mt-0 text-base text-gray-100 rounded mr-2 bg-[#7cb526] border-[1px] border-green-300'>
              <option hidden disabled value={'default'}>Chọn chủ đề</option>
              {
                topics.map((topic)=>(
                  <option key={topic.idtopic} value={topic.idtopic}>{topic.topicname}</option>
                ))
              }
            </select> : 
            <select defaultValue={1} onChange={(e)=>setIdtopic(e.target.value)} className='p-1 mt-1 lg:mt-0 text-base text-gray-100 rounded mr-2 bg-[#7cb526] border-[1px] border-green-300'>
              <option hidden disabled value={1}>Chọn chủ đề</option>
            {
              topics.map((topic) => {
                if(topic.idtopic !== 1){
                  return <option key={topic.idtopic} value={topic.idtopic}>{topic.topicname}</option>
                } 
                return <React.Fragment key={topic.idtopic}></React.Fragment>
              })
            }
          </select>
            }
          </div>
          <div className='flex mt-1 lg:mt-0'>
            <button onClick={()=>setopenPreview(!openPreview)} className='p-1 mr-2 border-[1px] rounded border-green-300'>Preview</button>
            <button onClick={(e)=>handleUpPost(e)} disabled={isupLoad} className='p-1 border-[1px] rounded border-green-300'>Đăng bài</button>
          </div>
      </div>
      {openPreview? 
      <div>
        <ThumEditor thumbData={obj}/>
        <div dangerouslySetInnerHTML={{__html: html}} className='bg-[var(--sub-bg-color)] p-2'></div>
      </div> 
      :<div>
        <MenuBar editor={editor} className='bg-white '/>
        <EditorContent editor={editor} className='bg-gray-100 p-1'/>
      </div>}
      
    </>
  )
}

export default PostEditor