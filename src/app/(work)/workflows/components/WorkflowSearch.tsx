'use client'

import { SearchOutlined } from '@/ui/icons'
import { Input } from 'antd'
import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useEffect, useMemo, useState } from 'react'

type WorkflowSearchProps = {
  className?: string
}

const WorkflowSearch: React.FC<WorkflowSearchProps> = ({ className }) => {
  const [searchValue, setSearchValue] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams],
  )

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    if (searchValue) {
      query.set('q', String(searchValue))
      router.push(`?${String(query)}`)
    } else {
      query.delete('q')
    }
  }, [searchValue, query, router])

  return (
    <div
      className={clsx(
        'flex items-center gap-[8px] overflow-hidden rounded-[4px] border border-[#ddd] pr-[8px]',
        className,
      )}
    >
      <Input
        className="border-transparent"
        placeholder="Lọc nhanh"
        size="middle"
        onChange={handleChange}
      />
      <SearchOutlined />
    </div>
  )
}

export default WorkflowSearch
