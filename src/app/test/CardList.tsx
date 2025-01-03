import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import React from 'react'
import Card from './Card'

type CardListProps = {
  dataSource?: any[]
}

const CardList: React.FC<CardListProps> = ({ dataSource }) => {
  return (
    <SortableContext
      items={dataSource ? dataSource?.map((item) => item.id) : []}
      strategy={verticalListSortingStrategy}
    >
      {dataSource?.map((item: any, index: number) => (
        <Card key={index} item={item} />
      ))}
    </SortableContext>
  )
}

export default CardList
