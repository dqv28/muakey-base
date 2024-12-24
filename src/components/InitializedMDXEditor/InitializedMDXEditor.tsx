'use client'

import { uploadImageAction } from '@/app/(work)/job/actions'
import { withApp } from '@/hoc'
import { EDITOR_ICON_KEYS } from '@/libs/constant'
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  codeBlockPlugin,
  CodeToggle,
  CreateLink,
  DirectiveDescriptor,
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
import { YouTubeEmbed } from '@next/third-parties/google'
import { Divider } from 'antd'
import type { ForwardedRef } from 'react'
import toast from 'react-hot-toast'

type InitializedMDXEditorProps = MDXEditorProps & {
  editorRef: ForwardedRef<MDXEditorMethods> | null
}

const renderIconComponentFor = (name: IconKey) => {
  return EDITOR_ICON_KEYS[name] || <>{name}</>
}

const YoutubeDirectiveDescriptor: DirectiveDescriptor = {
  name: 'youtube',
  type: 'leafDirective',
  testNode: (node) => node.type === 'leafDirective' && node.name === 'youtube',
  attributes: [],
  hasChildren: true,
  Editor: ({ mdastNode }: any) => {
    const { id } = mdastNode.attributes

    return <YouTubeEmbed videoid={id} />
  },
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
          <ListsToggle options={['bullet', 'number']} />

          <Divider type="vertical" />
          <BlockTypeSelect />
          <CreateLink />
          <InsertImage />
          {/* <YouTubeButton /> */}
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
    // directivesPlugin({
    //   directiveDescriptors: [YoutubeDirectiveDescriptor],
    // }),
  ]

  return (
    <MDXEditor
      plugins={plugins}
      iconComponentFor={renderIconComponentFor}
      ref={editorRef}
      {...props}
    />
  )
}

export default withApp(InitializedMDXEditor)
