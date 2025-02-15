'use client'

import { Input, Segmented } from 'antd'
import React from 'react'
import TodoFilteredDrawer from './TodoFilteredDrawer'

const TodoFiltered: React.FC = () => {
  return (
    <div className="flex items-center gap-[12px]">
      <Segmented<string> options={['Giao cho tôi', 'Tạo bởi tôi']} />
      <Input.Search placeholder="Tìm kiếm" style={{ width: 280 }} />
      <TodoFilteredDrawer />
    </div>
  )
}

export default TodoFiltered
