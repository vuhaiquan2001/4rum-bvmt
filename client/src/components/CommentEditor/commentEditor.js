import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import CommentMenuBar from './menuBar'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import React,{memo} from 'react'
import '../../styles/tiptap.scss';

const CommentEditor = ({setdata, initdata}) => {
  const cmteditor = useEditor({
    extensions: [StarterKit.configure({

      // Configure an included extension
      heading: {
        levels: [1, 2, 3, 4],
      },
    }), Color, TextStyle, Underline, Image, TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),Link, Youtube],
    content: initdata? initdata: '',
    
    onUpdate: ({ editor }) => {
      // send the content to an API here
      const html = editor.getHTML();
      setdata(html)
    },
  })
  return (
    <>
        <CommentMenuBar editor={cmteditor} className='bg-white '/>
        <EditorContent editor={cmteditor} className='bg-gray-100 p-1'/>
    </>
  )
}

export default memo(CommentEditor)