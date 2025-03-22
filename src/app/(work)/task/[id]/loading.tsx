import { LoadingOutlined } from '@ant-design/icons'
import React from 'react'

const Loading: React.FC = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <LoadingOutlined className="text-[40px]" />
    </div>
  )
}

export default Loading
