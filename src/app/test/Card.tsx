import { randomColor } from '@/libs/utils'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React from 'react'

type CardProps = {
  item?: any
}

const Card: React.FC<CardProps> = ({ item }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item?.id,
    data: { ...item },
  })

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 9999 : undefined,
  }

  return (
    <div
      className="mt-[4px] rounded p-[8px] text-white"
      style={{ backgroundColor: randomColor(item?.name), ...style }}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      {item?.name}
    </div>
  )
}

export default Card
