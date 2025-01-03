import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable'
import React from 'react'
import Column from './Column'

type ColumnListProps = {
  dataSource?: any
}

const ColumnList: React.FC<ColumnListProps> = ({ dataSource }) => {
  return (
    <SortableContext
      items={dataSource.map((item: any) => item.id)}
      strategy={horizontalListSortingStrategy}
    >
      {dataSource.map((item: any, index: number) => (
        <Column key={index} col={item} />
      ))}
    </SortableContext>
  )
}

export default ColumnList
