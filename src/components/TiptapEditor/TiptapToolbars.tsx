'use client'

import { CodeBlockOutlined, CodeOutlined } from '@/ui/icons'
import {
  BoldOutlined,
  DownOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { BubbleMenu, type Editor } from '@tiptap/react'
import { Button, Divider, Dropdown } from 'antd'
import clsx from 'clsx'
import React from 'react'
import TiptapEmbedYoutube from './TiptapEmbedYoutube'
import TiptapLinkAction from './TiptapLinkAction'
import TiptapLinkForm from './TiptapLinkForm'
import TiptapUploadImage from './TiptapUploadImage'

export type TiptapToolbarsProps = {
  editor?: Editor | null
}

type OptionType = {
  icon?: React.ReactNode
  onClick?: () => void
  active?: boolean
  [key: string]: any
}

const TiptapToolbars: React.FC<TiptapToolbarsProps> = ({ editor }) => {
  if (!editor) return <></>

  const setLink = (url: string) => {
    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()

      return
    }

    try {
      editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url, target: '_blank' })
        .run()
    } catch (e) {
      console.log(String(e))
    }
  }

  const options: OptionType[] = [
    {
      children: (
        <Dropdown
          trigger={['click']}
          dropdownRender={() => (
            <div className="mt-[4px] rounded-[4px] bg-[#fff] p-[2px] shadow-[0_2px_6px_0_rgba(0,0,0,0.1)]">
              <div
                className="cursor-pointer rounded-[4px] bg-[#fff] px-[16px] py-[9px] text-center leading-none transition-all hover:bg-[#0000000a]"
                onClick={() => editor.commands.setParagraph()}
              >
                Paragraph
              </div>
              <div
                className="cursor-pointer rounded-[4px] bg-[#fff] px-[16px] py-[9px] text-center leading-none transition-all hover:bg-[#0000000a]"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
              >
                Heading 1
              </div>
              <div
                className="cursor-pointer rounded-[4px] bg-[#fff] px-[16px] py-[9px] text-center leading-none transition-all hover:bg-[#0000000a]"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
              >
                Heading 2
              </div>
              <div
                className="cursor-pointer rounded-[4px] bg-[#fff] px-[16px] py-[9px] text-center leading-none transition-all hover:bg-[#0000000a]"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
              >
                Heading 3
              </div>
            </div>
          )}
        >
          <div className="flex cursor-pointer items-center gap-[4px]">
            <span className="leading-none">Paragraph</span>
            <DownOutlined className="text-[12px]" />
          </div>
        </Dropdown>
      ),
    },
    {
      children: (
        <Dropdown
          trigger={['click']}
          dropdownRender={() => (
            <div className="mt-[4px] rounded-[4px] bg-[#fff] p-[2px] shadow-[0_2px_6px_0_rgba(0,0,0,0.1)]">
              <div
                className="cursor-pointer rounded-[4px] bg-[#fff] px-[16px] py-[9px] text-center leading-none transition-all hover:bg-[#0000000a]"
                onClick={() => editor.commands.setFontFamily('Inter')}
              >
                Inter
              </div>
              <div
                className="cursor-pointer rounded-[4px] bg-[#fff] px-[16px] py-[9px] text-center leading-none transition-all hover:bg-[#0000000a]"
                onClick={() => editor.commands.setFontFamily('arial')}
              >
                Arial
              </div>
              <div
                className="cursor-pointer rounded-[4px] bg-[#fff] px-[16px] py-[9px] text-center leading-none transition-all hover:bg-[#0000000a]"
                onClick={() => editor.commands.setFontFamily('Helvetica')}
              >
                Helvetica
              </div>
              <div
                className="cursor-pointer rounded-[4px] bg-[#fff] px-[16px] py-[9px] text-center leading-none transition-all hover:bg-[#0000000a]"
                onClick={() => editor.commands.setFontFamily('serif')}
              >
                Serif
              </div>
              <div
                className="cursor-pointer rounded-[4px] bg-[#fff] px-[16px] py-[9px] text-center leading-none transition-all hover:bg-[#0000000a]"
                onClick={() => editor.commands.setFontFamily('Times New Roman')}
              >
                Times New Roman
              </div>
              <div
                className="cursor-pointer rounded-[4px] bg-[#fff] px-[16px] py-[9px] text-center leading-none transition-all hover:bg-[#0000000a]"
                onClick={() => editor.commands.setFontFamily('Garamond')}
              >
                Garamond
              </div>
              <div
                className="cursor-pointer rounded-[4px] bg-[#fff] px-[16px] py-[9px] text-center leading-none transition-all hover:bg-[#0000000a]"
                onClick={() => editor.commands.setFontFamily('Georgia')}
              >
                Georgia
              </div>
              <div
                className="cursor-pointer rounded-[4px] bg-[#fff] px-[16px] py-[9px] text-center leading-none transition-all hover:bg-[#0000000a]"
                onClick={() => editor.commands.setFontFamily('monospace')}
              >
                Monospace
              </div>
              <div
                className="cursor-pointer rounded-[4px] bg-[#fff] px-[16px] py-[9px] text-center leading-none transition-all hover:bg-[#0000000a]"
                onClick={() => editor.commands.setFontFamily('Courier')}
              >
                Courier
              </div>
            </div>
          )}
        >
          <div className="flex cursor-pointer items-center gap-[4px]">
            <span className="leading-none">Inter</span>
            <DownOutlined className="text-[12px]" />
          </div>
        </Dropdown>
      ),
    },
    {
      component: (
        <Divider className="h-[20px] border-s-[#cdced6]" type="vertical" />
      ),
    },
    {
      icon: <BoldOutlined className="cursor-pointer" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive('bold'),
    },
    {
      icon: <ItalicOutlined className="cursor-pointer" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive('italic'),
    },
    {
      icon: <UnderlineOutlined className="cursor-pointer" />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      active: editor.isActive('underline'),
    },
    {
      icon: <StrikethroughOutlined className="cursor-pointer" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      active: editor.isActive('strike'),
    },
    {
      icon: <CodeOutlined className="cursor-pointer" />,
      onClick: () => editor.chain().focus().toggleCode().run(),
      active: editor.isActive('code'),
    },
    {
      icon: <CodeBlockOutlined className="cursor-pointer" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      active: editor.isActive('codeBlock'),
    },
    {
      component: <TiptapLinkForm onAdd={setLink} />,
      active: editor.isActive('link'),
      isLink: true,
    },
    {
      icon: <OrderedListOutlined className="cursor-pointer" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive('orderedList'),
    },
    {
      icon: <UnorderedListOutlined className="cursor-pointer" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive('bulletList'),
    },
    {
      component: (
        <Divider className="h-[20px] border-s-[#cdced6]" type="vertical" />
      ),
    },
    {
      component: <TiptapUploadImage editor={editor} />,
      active: editor.isActive('image'),
    },
    {
      component: <TiptapEmbedYoutube editor={editor} />,
      active: editor.isActive('youtube'),
    },
  ]

  return (
    <div className="flex flex-wrap items-center gap-[2px] rounded-t-[8px] bg-[#f0f0f3] p-[4px]">
      {options.map((option, index) => (
        <div key={`tiptap-${index}`}>
          {!option?.icon && !option?.children ? (
            <div>{option?.component}</div>
          ) : (
            <Button
              className={clsx('!px-[12px]', {
                'bg-[#e0e1e6]': option?.active,
              })}
              type="text"
              onClick={() => option.onClick?.()}
              icon={option.icon}
            >
              {option.children}
            </Button>
          )}

          {option.isLink && (
            <BubbleMenu
              editor={editor}
              shouldShow={({ editor }) => editor.isActive('link')}
            >
              <div className="w-max rounded border bg-[#fff] p-[8px] shadow-lg">
                <TiptapLinkAction
                  editor={editor}
                  href={editor.getAttributes('link').href || ''}
                  onEdit={setLink}
                />
              </div>
            </BubbleMenu>
          )}
        </div>
      ))}
    </div>
  )
}

export default TiptapToolbars
