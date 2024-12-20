'use client'

import MarkTaskFailedModalForm from '@/components/MarkTaskFailedModalForm'
import { Button } from '@/ui'
import { DownOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
import React from 'react'

type PageHeaderActionProps = {
  options?: any
}

const PageHeaderAction: React.FC<PageHeaderActionProps> = ({ options }) => {
  return (
    <div className="flex items-center gap-[8px]">
      <MarkTaskFailedModalForm options={options}>
        <Button className="text-nowrap !bg-[#F9ECEC] !pb-[12px] !text-[13px] font-[500] !text-[#c34343] hover:brightness-95">
          Đánh dấu thất bại
        </Button>
      </MarkTaskFailedModalForm>
      <Dropdown
        trigger={['click']}
        rootClassName="!z-auto"
        placement="bottomRight"
        dropdownRender={() => (
          <div className="mt-[4px] w-[240px] rounded-[4px] bg-[#fff] p-[8px] shadow-[0_2px_6px_0_rgba(0,0,0,0.1)]">
            <div className="cursor-pointer bg-transparent px-[10px] py-[6px] text-[14px] leading-[17px] transition-all hover:bg-[#f8f8f8]">
              Chỉnh sửa nhiệm vụ
            </div>
            <div className="cursor-pointer bg-transparent px-[10px] py-[6px] text-[14px] leading-[17px] transition-all hover:bg-[#f8f8f8]">
              Đánh dấu thất bại
            </div>
            <div className="cursor-pointer bg-transparent px-[10px] py-[6px] text-[14px] leading-[17px] transition-all hover:bg-[#f8f8f8]">
              Gỡ người thực thi
            </div>

            <div className="cursor-pointer bg-transparent px-[10px] py-[6px] text-[14px] leading-[17px] text-[#cc1111] transition-all hover:bg-[#f8f8f8]">
              Xóa nhiệm vụ
            </div>
          </div>
        )}
      >
        <Button
          className="!size-[32px]"
          icon={<DownOutlined className="text-[16px]" />}
        />
      </Dropdown>
    </div>
  )
}

export default PageHeaderAction
