'use client'

import { Input } from '@/ui'
import { SearchOutlined } from '@/ui/icons'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, useEffect, useState } from 'react'

const WorkflowSearch: React.FC = () => {
  const [searchValue, setSearchValue] = useState('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = new URLSearchParams(searchParams.toString())

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  useEffect(() => {
    if (searchValue) {
      query.set('q', String(searchValue))
    } else {
      query.delete('q')
    }

    router.push(`?${String(query)}`)
  }, [searchValue])

  return (
    <div className="flex items-center gap-[8px] overflow-hidden rounded-[4px] border border-[#ddd] pr-[8px]">
      <Input
        className="border-transparent"
        placeholder="Lọc nhanh"
        borderless
        size="middle"
        onChange={handleChange}
      />
      <SearchOutlined />
    </div>
  )
}

export default WorkflowSearch
