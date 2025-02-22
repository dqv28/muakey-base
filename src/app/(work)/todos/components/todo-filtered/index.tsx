'use client'

import { Input, Segmented } from 'antd'
import dayjs from 'dayjs'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { TodoContext } from '../PageProvider'
import TodoFilteredDrawer from './TodoFilteredDrawer'

const TodoFiltered: React.FC = () => {
  const [filteredOpen, setFilteredOpen] = useState(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const { setLoading } = useContext(TodoContext)

  const query = new URLSearchParams(searchParams)

  const handleFilter = (values: any) => {
    setLoading(true)

    for (const key in values) {
      if (values[key]) {
        const isDate =
          !['number', 'string'].includes(typeof values[key]) &&
          !Array.isArray(values[key])

        const queryValue = isDate
          ? String(dayjs(values[key]).format('YYYY-MM-DD'))
          : values[key]

        query.set(key, queryValue)
      } else {
        query.delete(key)
      }
    }

    setFilteredOpen(false)
    router.push(`?${query.toString()}`)
  }
  return (
    <div className="flex items-center gap-[12px]">
      <Segmented<string>
        options={[
          {
            label: 'Giao cho tôi',
            value: 'assign_me',
          },
          {
            label: 'Tạo bởi tôi',
            value: 'created_by_me',
          },
        ]}
        onChange={(value) => {
          setLoading(true)
          query.set('type', value)
          router.push(`?${query.toString()}`)
        }}
      />
      <Input.Search placeholder="Tìm kiếm" style={{ width: 280 }} />
      <TodoFilteredDrawer
        onFilter={handleFilter}
        open={filteredOpen}
        onOpenChange={setFilteredOpen}
      />
    </div>
  )
}

export default TodoFiltered
