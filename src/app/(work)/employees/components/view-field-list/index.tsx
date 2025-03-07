'use client'

import { ListProps } from 'antd'
import React from 'react'

type ViewFieldListProps = ListProps<any> & {
  title: string[]
}

const ViewFieldList: React.FC<ViewFieldListProps> = ({ title }) => {
  return <div>ViewFieldList</div>
}

export default ViewFieldList
