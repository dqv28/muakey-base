import { YoutubeOutlined } from '@ant-design/icons'
import { Editor } from '@tiptap/react'
import { Button } from 'antd'
import React from 'react'

type TiptapEmbedYoutubeProps = {
  editor: Editor
}

const TiptapEmbedYoutube: React.FC<TiptapEmbedYoutubeProps> = ({ editor }) => {
  return (
    <>
      <Button type="text" icon={<YoutubeOutlined />} />
    </>
  )
}

export default TiptapEmbedYoutube
