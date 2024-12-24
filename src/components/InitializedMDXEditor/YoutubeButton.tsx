import getYoutubeVideoId from '@/libs/utils'
import { YoutubeOutlined } from '@ant-design/icons'
import { DialogButton, insertDirective$, usePublisher } from '@mdxeditor/editor'
import { App } from 'antd'
import React from 'react'

const YouTubeButton: React.FC = () => {
  const insertDirective = usePublisher(insertDirective$)
  const { message } = App.useApp()

  return (
    <DialogButton
      tooltipTitle="Insert Youtube video"
      submitButtonTitle="Thêm"
      dialogInputPlaceholder="Dán URL video youtube"
      buttonContent={<YoutubeOutlined className="text-[16px]" />}
      onSubmit={(url) => {
        const videoId = getYoutubeVideoId(url)
        if (videoId) {
          insertDirective({
            name: 'youtube',
            type: 'leafDirective',
            attributes: { id: videoId },
            children: [],
          } as any)
        } else {
          message.error('Youtube URL không hợp lệ')
        }
      }}
    />
  )
}

export default YouTubeButton
