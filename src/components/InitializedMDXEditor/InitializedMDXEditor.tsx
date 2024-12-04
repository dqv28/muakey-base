'use client'

import { uploadImageAction } from '@/app/(work)/job/actions'
import {
  CheckListOutlined,
  CodeOutlined,
  OpenOutlined,
  SubScriptOutlined,
  SuperScriptOutlined,
} from '@/ui/icons'
import {
  BoldOutlined,
  CaretDownOutlined,
  CheckOutlined,
  CopyOutlined,
  DeleteOutlined,
  DisconnectOutlined,
  EditOutlined,
  ItalicOutlined,
  LinkOutlined,
  OrderedListOutlined,
  PictureOutlined,
  SettingOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  codeBlockPlugin,
  CodeToggle,
  CreateLink,
  headingsPlugin,
  IconKey,
  imagePlugin,
  InsertImage,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  MDXEditor,
  type MDXEditorMethods,
  type MDXEditorProps,
  StrikeThroughSupSubToggles,
  toolbarPlugin,
} from '@mdxeditor/editor'
import { Divider } from 'antd'
import type { ForwardedRef } from 'react'
import toast from 'react-hot-toast'

type InitializedMDXEditorProps = MDXEditorProps & {
  editorRef: ForwardedRef<MDXEditorMethods> | null
}

const renderIconComponentFor = (name: IconKey) => {
  switch (name) {
    case 'format_bold':
      return <BoldOutlined />

    case 'format_italic':
      return <ItalicOutlined />

    case 'format_underlined':
      return <UnderlineOutlined />

    case 'code':
      return <CodeOutlined className="text-[20px]" />

    case 'arrow_drop_down':
      return <CaretDownOutlined />

    case 'format_list_bulleted':
      return <UnorderedListOutlined className="text-[18px]" />

    case 'format_list_numbered':
      return <OrderedListOutlined className="text-[18px]" />

    case 'format_list_checked':
      return <CheckListOutlined className="text-[20px]" />

    case 'strikeThrough':
      return <StrikethroughOutlined />

    case 'superscript':
      return <SuperScriptOutlined className="text-[20px]" />

    case 'subscript':
      return <SubScriptOutlined className="text-[20px]" />

    case 'link':
      return <LinkOutlined className="text-[18px]" />

    case 'add_photo':
      return <PictureOutlined className="text-[16px]" />

    case 'open_in_new':
      return <OpenOutlined className="text-[20px]" />

    case 'edit':
      return <EditOutlined /> 

    case 'content_copy':
      return <CopyOutlined />

    case 'link_off':
      return <DisconnectOutlined />

    case 'check':
      return <CheckOutlined className='text-[#42b814]' />

    case 'delete_small':
      return <DeleteOutlined />

    case 'settings':
      return <SettingOutlined />

    default:
      return <>{name}</>
  }
}

const InitializedMDXEditor: React.FC<InitializedMDXEditorProps> = ({
  editorRef,
  ...props
}) => {
  const imageUploadHandler = async (image: File) => {
    const formData = new FormData()
    formData.append('image', image)

    try {
      const { url, error } = await uploadImageAction(formData)

      if (error) {
        toast.error(error)
        return
      }

      return url
    } catch (error: any) {
      throw new Error(error)
    }
  }

  const plugins = [
    toolbarPlugin({
      toolbarContents: () => (
        <>
          <BoldItalicUnderlineToggles />
          <CodeToggle />

          <Divider type="vertical" />
          <StrikeThroughSupSubToggles />

          <Divider type="vertical" />
          <ListsToggle />

          <Divider type="vertical" />
          <BlockTypeSelect />
          <CreateLink />
          <InsertImage />
        </>
      ),
    }),
    listsPlugin(),
    headingsPlugin(),
    linkPlugin(),
    linkDialogPlugin(),
    imagePlugin({
      imageUploadHandler,
    }),
    codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
  ]

  return (
    <MDXEditor
      plugins={plugins}
      iconComponentFor={renderIconComponentFor}
      {...props}
      ref={editorRef}
    />
  )
}

export default InitializedMDXEditor
