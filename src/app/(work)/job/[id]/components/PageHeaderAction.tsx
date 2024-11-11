'use client'

import MarkTaskFailedModalForm from '@/components/MarkTaskFailedModalForm'
import { Button } from '@/ui'
import React from 'react'

type PageHeaderActionProps = {
  options?: any
}

const PageHeaderAction: React.FC<PageHeaderActionProps> = ({ options }) => {
  return (
    <div className="flex items-center gap-[8px]">
      {/* <Button
        className="!pb-[12px] !text-[13px] font-[500] text-[#fff]"
        color="primary"
      >
        Chuyển tiếp
      </Button> */}
      <MarkTaskFailedModalForm options={options}>
        <Button className="!bg-[#F9ECEC] !pb-[12px] !text-[13px] font-[500] !text-[#c34343] hover:brightness-95">
          Đánh dấu thất bại
        </Button>
      </MarkTaskFailedModalForm>
    </div>
  )
}

export default PageHeaderAction
