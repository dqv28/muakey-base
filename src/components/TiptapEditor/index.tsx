'use client'

import BulletList from '@tiptap/extension-bullet-list'
import CodeBlock from '@tiptap/extension-code-block'
import FontFamily from '@tiptap/extension-font-family'
import Link from '@tiptap/extension-link'
import OrderedList from '@tiptap/extension-ordered-list'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
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
      Underline.configure({
        HTMLAttributes: {
          class: 'underline',
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class:
            'bg-[#2E2B29] px-[16px] py-[12px] rounded-[8px] text-[#fff] my-[24px] font-mono',
        },
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`)

            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false
            }

            const disallowedProtocols = ['ftp', 'file', 'mailto']
            const protocol = parsedUrl.protocol.replace(':', '')

            if (disallowedProtocols.includes(protocol)) {
              return false
            }

            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === 'string' ? p : p.scheme,
            )

            if (!allowedProtocols.includes(protocol)) {
              return false
            }

            const disallowedDomains = [
              'example-phishing.com',
              'malicious-site.net',
            ]
            const domain = parsedUrl.hostname

            if (disallowedDomains.includes(domain)) {
              return false
            }

            return true
          } catch {
            return false
          }
        },
        shouldAutoLink: (url) => {
          try {
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`https://${url}`)

            const disallowedDomains = [
              'example-no-autolink.com',
              'another-no-autolink.com',
            ]
            const domain = parsedUrl.hostname

            return !disallowedDomains.includes(domain)
          } catch {
            return false
          }
        },
        HTMLAttributes: {
          class: 'text-[#1677ff] underline font-[500]',
        },
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      // console.log(editor.getHTML())
      onChange?.(editor.getHTML())
    },
    onSelectionUpdate: ({ editor, transaction }) => {
      const childNodes = editor.view.dom.children[0].childNodes

      console.log(transaction.selection)

      // editor.chain().focus().insertContent(<></>).run()
    },

    editorProps: {
      attributes: {
        class: 'min-h-[150px] p-[8px] border rounded-[12px] focus:outline-none',
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
