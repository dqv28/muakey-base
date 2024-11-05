'use client'

import { useDebounce } from '@/libs/hook'
import { Input } from '@/ui'
import { SearchOutlined } from '@/ui/icons'
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { PageContext } from './PageProvider'

const WorkflowSearch: React.FC = () => {
  const { setSearch } = useContext(PageContext)
  const [searchValue, setSearchValue] = useState('')

  const debouncedSearchValue = useDebounce(searchValue, 200)

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }, [])

  useEffect(() => {
    setSearch(debouncedSearchValue)
  }, [debouncedSearchValue, setSearch])

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
