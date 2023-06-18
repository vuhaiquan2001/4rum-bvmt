import React, {useState, useEffect, memo, useCallback} from 'react'
//tiptap
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
//menubar
import {AiOutlineBold, AiOutlineItalic,AiOutlineStrikethrough, AiOutlineUnderline,AiOutlineYoutube, AiOutlineAlignLeft, AiOutlineAlignRight, AiOutlineAlignCenter,AiOutlineOrderedList, AiOutlineUnorderedList} from 'react-icons/ai';
import {BiUndo, BiRedo} from 'react-icons/bi';
import {BsParagraph} from 'react-icons/bs'
import {MdOutlineKeyboardArrowDown, MdOutlineFormatAlignJustify,MdPlaylistRemove} from 'react-icons/md';
import {ImImages} from 'react-icons/im'
import {TbLink, TbUnlink} from 'react-icons/tb';
import { SketchPicker } from 'react-color'


function MenuBar({editor}) {
  //ADD LINK
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink()
        .run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url })
      .run()
  }, [editor])
  //ADD IMG
  const addImage = useCallback(() => {
    const url = window.prompt('URL')

    if (url) {
      editor.chain().focus().setImage({ src: url}).run()
    }
  }, [editor])
  //Youtube
  const addYoutubeVideo = () => {
    const url = prompt('Enter YouTube URL')

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      })
    }
  }

  const selectHeading = (e) => {
    console.log(typeof Number(e.target.value))
      editor.chain().focus().toggleHeading({level: Number(e.target.value)}).run()
  }
  const [color, setColor]= useState('#000000');
  const [colorpick, setColorpick]= useState(false);
    if (!editor) {
        return null
    }
  return (
    <div className='bg-slate-50 p-1 border-b-[1px] border-gray-300 flex flex-wrap'>
    <button
      onClick={() => editor.chain().focus().toggleBold().run()}
      disabled={
        !editor.can()
          .chain()
          .focus()
          .toggleBold()
          .run()
      }
      className={`${editor.isActive('bold') ? 'bg-gray-500' : ''} border-[1px] p-1 hover:bg-gray-300 mr-1`}
    >
      <AiOutlineBold/>
    </button>
    <button
      onClick={() => editor.chain().focus().toggleItalic().run()}
      disabled={
        !editor.can()
          .chain()
          .focus()
          .toggleItalic()
          .run()
      }
      className={`${editor.isActive('italic') ? 'bg-gray-500' : ''} border-[1px] p-1 hover:bg-gray-300 mr-1`}
    >
      <AiOutlineItalic/>
    </button>
    <button
      onClick={() => editor.chain().focus().toggleStrike().run()}
      disabled={
        !editor.can()
          .chain()
          .focus()
          .toggleStrike()
          .run()
      }
      className={`${editor.isActive('strike') ? 'bg-gray-500' : ''} border-[1px] p-1 hover:bg-gray-300 mr-1`}
    >
      <AiOutlineStrikethrough/>
    </button>

    <button
      onClick={() => editor.chain().focus().toggleUnderline().run()}
      disabled={
        !editor.can()
          .chain()
          .focus()
          .toggleUnderline()
          .run()
      }
      className={`${editor.isActive('underline') ? 'bg-gray-500' : ''} border-[1px] p-1 hover:bg-gray-300 mr-1`}
    >
      <AiOutlineUnderline/>
    </button>

    <select name="heading" id="heading" defaultValue={4}
      onChange={(e)=>selectHeading(e)}
      className={`${editor.isActive('heading', { level: 1 }) ? 'is-active' : ''} border-[1px] p-1 hover:bg-gray-300 mr-1`}
    >
      <option value={1}>H1</option>
      <option value={2}>H2</option>
      <option value={3}>H3</option>
      <option value={4}>H4</option>
    </select>

    <button
      onClick={() => editor.commands.setParagraph()}
      className={`border-[1px] p-1 hover:bg-gray-300 mr-1`}
    >
      <BsParagraph/>
    </button>

    <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`${editor.isActive({ textAlign: 'left' }) ? 'is-active bg-gray-500' : ''} border-[1px] p-1 hover:bg-gray-300 mr-1`}
      >
        <AiOutlineAlignLeft/>
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`${editor.isActive({ textAlign: 'center' }) ? 'is-active bg-gray-500' : ''} border-[1px] p-1 hover:bg-gray-300 mr-1`}
      >
        <AiOutlineAlignCenter/>
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`${editor.isActive({ textAlign: 'right' }) ? 'is-active bg-gray-500' : ''} border-[1px] p-1 hover:bg-gray-300 mr-1`}
      >
        <AiOutlineAlignRight/>
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={`${editor.isActive({ textAlign: 'justify' }) ? 'is-active bg-gray-500' : ''} border-[1px] p-1 hover:bg-gray-300 mr-1`}
      >
        <MdOutlineFormatAlignJustify/>
      </button>
      <button onClick={() => editor.chain().focus().unsetTextAlign().run()}
      className={`active:bg-gray-500 border-[1px] p-1 hover:bg-gray-300 mr-1`}
      ><MdPlaylistRemove/></button>
      
    
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${editor.isActive('orderedList') ? 'is-active bg-gray-500' : ''} border-[1px] p-1 hover:bg-gray-300 mr-1`}
      >
        <AiOutlineOrderedList/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${editor.isActive('bulletList') ? 'is-active bg-gray-500' : ''} border-[1px] p-1 hover:bg-gray-300 mr-1`}
      >
        <AiOutlineUnorderedList/>
      </button>

    <button
      onClick={() => editor.chain().focus().undo().run()}
      disabled={
        !editor.can()
          .chain()
          .focus()
          .undo()
          .run()
      }
      className={` border-[1px] p-1 hover:bg-gray-300 mr-1`}
    >
      <BiUndo/>
    </button>
    <button
      onClick={() => editor.chain().focus().redo().run()}
      disabled={
        !editor.can()
          .chain()
          .focus()
          .redo()
          .run()
      }
      className={` border-[1px] p-1 hover:bg-gray-300 mr-1`}
    >
        <BiRedo/>
    </button>

    <button
        onClick={() => editor.chain().focus().setColor(color).run()}
        disabled={
          !editor.can()
            .chain()
            .focus()
            .unsetColor()
            .run()
        }
        className={`${editor.isActive('textStyle', { color: color }) ? '' : ''} relative mr-1 hover:bg-gray-300 flex w-fit items-center bg-[${color}] border-[1px] border-gray-300`}
    >
    <div className={`w-5 h-5 mx-1`} style={{backgroundColor: color}}></div>
    <div className='border-l-[1px] h-full border-gray-400'
      onClick={()=>setColorpick(!colorpick)}>
      <MdOutlineKeyboardArrowDown/>
      </div>
      {colorpick?<SketchPicker className='absolute z-50 left-1/2 translate-x-[-50%] top-[30px]' 
      color={color}
      onChangeComplete={(color)=>setColor(color.hex)}/>:<></>}
    </button>

    <button onClick={setLink} 
      className={`${editor.isActive('link') ? 'is-active' : ''} mr-1 p-1 hover:bg-gray-300 border-[1px] border-gray-300`}
      >
        <TbLink/>
      </button>
      <button
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive('link')}
        className='mr-1 p-1 hover:bg-gray-300 border-[1px] border-gray-300'
      >
      <TbUnlink/>
      </button>

    <button
      onClick={() => addImage()}
      className={` border-[1px] p-1 hover:bg-gray-300 mr-1`}
    >
      <ImImages/>
    </button>

    <button className={` border-[1px] p-1 hover:bg-gray-300 mr-1`}
      onClick={()=>addYoutubeVideo()}
    >
        <AiOutlineYoutube/>
    </button>
  </div>
  )
}

function DashboardTextEditor({post, gethtml}) {
    const editor = useEditor({
        extensions: [StarterKit.configure({
    
          // Configure an included extension
          heading: {
            levels: [1, 2, 3, 4],
          },
        }), Color, TextStyle, Underline, Image, TextAlign.configure({
          types: ['heading', 'paragraph'],
        }),Link, Youtube],
        content: post.postdesc?post.postdesc:post.replydesc,
        
        onUpdate: ({ editor }) => {
          gethtml(editor.getHTML())
          // send the content to an API here
        },
      })
  return (
    <div>
    <MenuBar editor={editor} className='bg-white '/>
    <EditorContent editor={editor} className='bg-gray-100 p-1'/>
    </div>
  )
}

export default memo(DashboardTextEditor)