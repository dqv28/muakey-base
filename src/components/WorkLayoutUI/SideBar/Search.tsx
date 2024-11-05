import { SearchOutlined } from '@/ui/icons'
import React from 'react'

const Search: React.FC = (props) => {
  return (
    <div className="flex h-[32px] w-full rounded-full bg-[#ffffff1a] px-[12px]">
      <SearchOutlined className="text-[16px]" />
      <input
        type="text"
        className="bg-transparent pl-[16px] text-[12px] text-[#fffc] placeholder:text-[#fffc] focus-visible:outline-none"
        placeholder="Tìm nhanh"
      />
    </div>
  )
}

export default Search
