'use client'

import { DndContext, DragEndEvent } from '@dnd-kit/core'
import { Row } from 'antd'
import React from 'react'
import ColumnList from './ColumnList'

type BoxContentProps = {
  items?: any[]
}

const BoxContent: React.FC<BoxContentProps> = ({ items }) => {
  const handleDragEnd = (event: DragEndEvent) => {
    console.log(event)
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Row>
        <ColumnList dataSource={items} />
      </Row>
    </DndContext>
  )
}

export default BoxContent
