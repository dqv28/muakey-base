import React from 'react'

type SidebarProps = {}

const Sidebar: React.FC<SidebarProps> = (props) => {
  return (
    <div className="h-[calc(100vh-48px)] rounded-[16px] bg-[#f0f3f4] p-[24px] shadow-lg">
      Sidebar
    </div>
  )
}

export default Sidebar
