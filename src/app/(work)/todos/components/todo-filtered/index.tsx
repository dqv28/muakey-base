'use client'

import { Input, Segmented } from 'antd'
import React from 'react'

const TodoFiltered: React.FC = () => {
  return (
    <div className="flex items-center gap-[12px]">
      <Segmented<string> options={['Giao cho tôi', 'Tạo bởi tôi']} />
      <Input.Search placeholder="Tìm kiếm" style={{ width: 280 }} />
    </div>
  )
}

export default TodoFiltered
