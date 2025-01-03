import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Col } from 'antd'
import React from 'react'
import CardList from './CardList'

type ColumnProps = {
  col?: any
}

const Column: React.FC<ColumnProps> = ({ col }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: col.id, data: { ...col } })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <Col
      className="h-[100vh] border"
      span={4}
      ref={setNodeRef}
      style={style}
      {...attributes}
      // {...listeners}
    >
      <div className="flex items-center justify-center bg-[#1677ff] p-[16px] text-[#fff]">
        {col.name}
      </div>

      <div className="p-[8px]">
        <CardList dataSource={col.cards} />
      </div>
    </Col>
  )
}

export default Column
