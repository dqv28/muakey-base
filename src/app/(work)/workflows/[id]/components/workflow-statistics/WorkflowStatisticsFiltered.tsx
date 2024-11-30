'use client'

import { useAsyncEffect } from '@/libs/hook'
import { DatePicker, Select, SelectProps, Tag } from 'antd'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { getTagsAction } from '../task/action'
import { randomColor } from '@/libs/utils'
import { getKpiAction } from './action'
import toast from 'react-hot-toast'

const WorkflowStatisticsFiltered: React.FC = () => {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const [tags, setTags] = useState<any[]>([])

  useAsyncEffect(async () => {
    const res = await getTagsAction({
      workflow_id: params?.id,
    })

    setTags(res)
  }, [])
  
  const query = new URLSearchParams(searchParams.toString())
  const handleMonthChange = (_: any, date: string | string[]) => {
    if (date) {
      query.set('date', String(date))
    } else {
      query.delete('date')
    }

    router.push(`?${query.toString()}`)
  }

  const handleSelect = useCallback(async (value: any) => {
    try {
      const { message, errors } = await getKpiAction({
        tag_id: value.join(',')
      })

      if (errors) {
        toast.error(message)
        return
      }
    } catch (error) {
      throw new Error(String(error))
    }
  }, [])

  const optionRender: SelectProps['optionRender'] = (option) => (
    <div className="flex items-center gap-[8px]">
      <div
        className="size-[20px] rounded-[4px]"
        style={{
          backgroundColor: randomColor(String(option?.label || '')),
        }}
      />
      <span>{option?.label}</span>
    </div>
  )

  const tagRender: SelectProps['tagRender'] = (props) => {
    const { label, closable, onClose } = props
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault()
      event.stopPropagation()
    }
    return (
      <Tag
        color={randomColor(String(label || ''))}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginInlineEnd: 4 }}
      >
        {label}
      </Tag>
    )
  }

  return (
    <div className='flex items-center gap-[12px]'>
      <Select 
        style={{ minWidth: 160 }}
        placeholder='Lọc theo nhãn'
        options={tags?.map((t: any) => ({
          label: t?.title,
          value: t?.id
        }))}
        onChange={handleSelect}
        mode='multiple'
        optionRender={optionRender}
        tagRender={tagRender}
      />
      <DatePicker
        style={{ width: 160 }}
        picker="month"
        placeholder="Chọn tháng"
        onChange={handleMonthChange}
      />
    </div>
  )
}

export default WorkflowStatisticsFiltered
