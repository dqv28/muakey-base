import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Badge, Button, Descriptions, DescriptionsProps } from 'antd'
import React from 'react'
import PageHeader from './components/PageHeader'

const page: React.FC = () => {
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Mã yêu cầu',
      children: '123456',
    },
    {
      key: '2',
      label: 'Loại yêu cầu',
      children: 'Nghỉ không lương',
    },
    {
      key: '3',
      label: 'Thời gian gửi yêu cầu',
      children: '16:34 - 27/12/2024 ',
    },
    {
      key: '4',
      label: 'Tổng thời gian',
      children: '2 ngày',
    },
    {
      key: '5',
      label: 'Ngày yêu cầu',
      children: '22/12/2024 - 23/12/2024',
    },
    {
      key: '6',
      label: 'Trạng thái',
      children: (
        <div className="flex items-center gap-[8px] text-[#FAAD14]">
          <Badge dot color="#FAAD14" />
          <span>Chưa duyệt</span>
        </div>
      ),
    },
    {
      key: '7',
      label: 'Lý do đăng ký nghỉ',
      children:
        'In most states, the legal limit in blood alcohol to not be considered DUI is 500 to 1,000 mg/L. Ther',
    },
  ]

  return (
    <div className="h-[100vh] bg-[#f6f6f6]">
      <PageHeader />

      <div className="p-[24px]">
        <div className="rounded-[16px] bg-[#fff] p-[24px]">
          <Descriptions column={2} layout="vertical" items={items} />

          <div className="mt-[24px] flex items-center gap-[12px]">
            <Button icon={<EditOutlined />} type="primary">
              Sửa yêu cầu
            </Button>
            <Button icon={<DeleteOutlined />} danger>
              Xóa yêu cầu
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
