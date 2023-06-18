import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import MenuBar from './menuBar'
import ThumEditor from './thumbEditor'
import DangerToast from '../toast/dangerToast'
import SuccessToast from '../toast/successToast'

import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'

import React, {useState, useEffect, memo} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../../styles/tiptap.scss';

const UpdatePostEditor = ({post}) => {
  const [openPreview, setopenPreview]=useState(false);
  const [title, setTitle]=useState(post.posttitle);
  const [imgUrl, setImgUrl]=useState(post.postthumb);
  const [tags, setTags]=useState(post.tags);
  const [html, sethtml]=useState(post.postdesc);
  const [obj, setObj]=useState({});

  const [isSuccess, setisSuccess]= useState(false);
  const [isupLoad, setisupLoad]=useState(false);
  const [isDanger, setisDanger]= useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setObj({
      title: title,
      imgUrl: imgUrl,
      tags: tags,
    })   
  }, [title, imgUrl, tags])
 
  const handleUpdate = async(e) =>{
    e.preventDefault();
    setisupLoad(true)
    if(title === '' || imgUrl ===''){
      console.log('vui lòng nhập đầy đủ')
      setisDanger(true)
      setTimeout(() => {
        setisDanger(false)
       setisupLoad(false)
      }, 1000);   
    } else {
      const postdata = {
        posttitle: title,
        idpost: post.idpost,
        postdesc: html,
        postthumb: imgUrl,
        tags: tags,
      }
      axios.patch(`/api/updatepost`, postdata)
        .then(res => {
          if(res.data.changedRows ===0){
            setisDanger(true)
            setTimeout(() => {
              setisDanger(false)
              setisupLoad(false)
            }, 1000);   
          } else {
            setisSuccess(true)
            setisupLoad(true)
            setTimeout(() => {
              setisSuccess(false)
              navigate(`/post/${post.idpost}`)
              setisupLoad(false)
            }, 1000);   
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
    content: post.postdesc,
    
    onUpdate: ({ editor }) => {
      sethtml(editor.getHTML())
      // send the content to an API here
    },
  })

  return (
    <>
      {isSuccess? <SuccessToast text={'Đăng bài thành công'} /> :<></>}
      {isDanger? <DangerToast text={'Vui lòng nhập đầy đủ thông tin'} /> :<></>}
      <div className='mb-2 flex flex-col lg:flex-row items-center justify-between'>
          <div className='flex flex-col lg:flex-row'>
            <div className='mr-2 '><input type='text'  value={title} className='rounded text-base p-1 bg-[#7cb526] border-[1px] border-green-300 text-gray-100 placeholder:text-gray-200' onChange={(e)=>setTitle(e.target.value)} placeholder='Nhập tiêu đề bài viết'/></div>
            <div className='mr-2'><input type='text' value={imgUrl} className='mt-1 lg:mt-0 rounded text-base p-1 bg-[#7cb526] border-[1px] border-green-300 text-gray-100 placeholder:text-gray-200' onChange={(e)=>setImgUrl(e.target.value)} placeholder='Nhập link ảnh thumbnail'/></div>
            <div className='mr-2'><input type='text' value={tags} className='mt-1 lg:mt-0 rounded text-base p-1 bg-[#7cb526] border-[1px] border-green-300 text-gray-100 placeholder:text-gray-200' onChange={(e)=>setTags(e.target.value)} placeholder='Split by ,' /></div>
          </div>
          <div className='flex mt-1 lg:mt-0'>
            <button onClick={()=>setopenPreview(!openPreview)} className='p-1 mr-2 border-[1px] rounded border-green-300'>Preview</button>
            <button onClick={(e)=>handleUpdate(e)} disabled={isupLoad} className='p-1 border-[1px] rounded border-green-300'>Cập nhật</button>
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

export default memo(UpdatePostEditor)