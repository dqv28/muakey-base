'use client'

import BulletList from '@tiptap/extension-bullet-list'
import FontFamily from '@tiptap/extension-font-family'
import OrderedList from '@tiptap/extension-ordered-list'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import { Content, EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import ImageResize from 'tiptap-extension-resize-image'
import TiptapToolbars from './TiptapToolbars'

type TiptapEditorProps = {
  content?: Content
  onChange?: (content: string) => void
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      ImageResize,
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal ml-3',
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc ml-4',
        },
      }),
      FontFamily.configure({
        types: ['textStyle'],
      }),
      TextStyle.configure({ mergeNestedSpanStyles: true }),
    ],
    content,
    onUpdate: ({ editor }) => {
      // console.log(editor.getHTML())
      onChange?.(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'min-h-[150px] p-[8px] border rounded-[12px]',
      },
    },
    immediatelyRender: false,
  })

  return (
    <div>
      <TiptapToolbars editor={editor} />
      <EditorContent editor={editor} placeholder="Mô tả" />
    </div>
  )
}

export default TiptapEditor
