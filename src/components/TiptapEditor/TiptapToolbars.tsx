import {
  DownOutlined,
  ItalicOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import { type Editor } from '@tiptap/react'
import { Dropdown } from 'antd'
import React from 'react'

export type TiptapToolbarsProps = {
  editor?: Editor | null
}

type OptionType = {
  icon?: React.ReactNode
  onClick?: () => void
  active?: boolean
}

const TiptapToolbars: React.FC<TiptapToolbarsProps> = ({ editor }) => {
  if (!editor) return <></>

  const options: OptionType[] = [
    {
      icon: (
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
      icon: (
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
                onClick={() => editor.commands.setFontFamily('courier')}
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
      icon: <ItalicOutlined className="cursor-pointer" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive('italic'),
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
  ]

  return (
    <div className="flex items-center gap-[8px] rounded-[8px] border p-[4px]">
      {options.map((option, index) => (
        <div key={index} onClick={() => option.onClick?.()}>
          {option.icon}
        </div>
      ))}
    </div>
  )
}

export default TiptapToolbars
