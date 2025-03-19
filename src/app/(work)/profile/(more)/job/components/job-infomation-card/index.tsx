import { EditOutlined, LinkOutlined } from '@ant-design/icons'
import { Badge, Button, Card, ListProps } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import JobInfomationList from './JobInfomationList'
import JobInfomationModalForm from './JobInfomationModalForm'

export type JobInfomationCardProps = {
  title?: string
  extra?: React.ReactNode
  job?: any
}

const JobInfomationCard: React.FC<JobInfomationCardProps> = ({
  title,
  job,
  extra,
}) => {
  const data: ListProps<any>['dataSource'] = [
    {
      label: 'Phòng ban',
      value: job?.department_name || '--',
    },
    {
      label: 'Chức danh',
      value: job?.position || '--',
    },
    {
      label: 'Trạng thái',
      value: (
        <Badge
          status="success"
          text={
            <span className="text-[14px] leading-[22px] font-[600]">
              {job?.status}
            </span>
          }
        />
      ),
    },
    {
      label: 'Phân loại nhân sự',
      value: job?.personnel_class || '--',
    },
    {
      label: 'Ngày bắt đầu làm việc',
      value: job?.start_trial_date
        ? dayjs(job?.start_trial_date).format('DD/MM/YYYY')
        : '--',
    },
    {
      label: 'Ngày chính thức',
      value: job?.start_work_date
        ? dayjs(job?.start_work_date).format('DD/MM/YYYY')
        : '--',
    },
    {
      label: 'Thông tin hợp đồng',
      value: (
        <div className="flex items-center gap-[8px]">
          <LinkOutlined className="!text-[#00000073]" />
          <span className="text-[14px] leading-[22px] font-[400] text-[#1890FF]">
            xxx.pdf
          </span>
        </div>
      ),
    },
    {
      label: 'Giấy tờ nhân sự',
      value: (
        <div className="flex items-center gap-[8px]">
          <LinkOutlined className="!text-[#00000073]" />
          <span className="text-[14px] leading-[22px] font-[400] text-[#1890FF]">
            xxx.pdf
          </span>
        </div>
      ),
    },
  ]

  return (
    <Card
      classNames={{
        body: 'space-y-[16px]!',
      }}
    >
      <div className="flex items-center justify-between">
        <div className="text-[20px] leading-[28px] font-[500]">{title}</div>
        {extra || (
          <JobInfomationModalForm initialValues={job}>
            <Button icon={<EditOutlined />}>Chỉnh sửa</Button>
          </JobInfomationModalForm>
        )}
      </div>

      <JobInfomationList dataSource={data} />
    </Card>
  )
}

export default JobInfomationCard
