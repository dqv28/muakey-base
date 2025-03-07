import { PageHeader } from '@/components'
import {
  MenuOutlined,
  MoreOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { Button, TabsProps } from 'antd'
import React from 'react'
import ViewModalForm from './view-modal-form'

export type EmployeePageHeaderProps = {
  tabs?: any[]
}

const EmployeePageHeader: React.FC<EmployeePageHeaderProps> = ({ tabs }) => {
  console.log(tabs)

  const tabItems: TabsProps['items'] = [
    {
      label: (
        <div className="flex items-center gap-[8px]">
          <span>Tổng quan</span>
          <MoreOutlined />
        </div>
      ),
      key: 'all',
    },
    {
      label: 'Bảng lương & Phúc lợi',
      key: 'salary',
    },
    {
      label: 'Thuế, Bảo hiểm & Hành chính',
      key: 'tax',
    },
    {
      label: 'Lịch làm việc & Nghỉ',
      key: 'schedule',
    },
  ]

  return (
    <PageHeader
      title="Danh sách nhân sự"
      extra={
        <Button icon={<PlusOutlined />} type="primary">
          Thêm nhân sự
        </Button>
      }
      tab={{
        items: tabItems,
        extra: (
          <div className="flex items-center gap-[32px]">
            <div className="flex cursor-pointer items-center gap-[8px]">
              <MenuOutlined className="text-[#00000073]" />
              <span className="text-[14px] leading-[22px]">Tất cả views</span>
            </div>
            <ViewModalForm>
              <div className="flex cursor-pointer items-center gap-[8px]">
                <PlusCircleOutlined className="text-[#00000073]" />
                <span className="text-[14px] leading-[22px]">Thêm views</span>
              </div>
            </ViewModalForm>
          </div>
        ),
      }}
    />
  )
}

export default EmployeePageHeader
