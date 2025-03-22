'use client'

import { AreaChart } from '@/components'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Card } from 'antd'
import React from 'react'
import JobProgressGuide from './JobProgressGuide'
import JobProgressTable from './JobProgressTable'
import JobProgressModalForm from './job-progress-modal-form'

export type JobProgressCardProps = {
  title?: string
  data?: any
  extra?: React.ReactNode
}

const JobProgressCard: React.FC<JobProgressCardProps> = ({
  title,
  data,
  extra,
}) => {
  const {
    job_position,
    full_name,
    position,
    personnel_class,
    department_name,
  } = data

  const guideItems = [
    {
      label: 'Lương khi tuyển',
      value: '5,000,000 đ',
    },
    {
      label: 'Mức lương hiện tại',
      value: '100,000,000 đ',
    },
    {
      label: 'Thâm niên',
      value: '3 năm 2 tháng 10 ngày',
    },
    {
      label: '% Tăng',
      value: '1000%',
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
          <JobProgressModalForm
            initialValues={{
              full_name,
              position,
              personnel_class,
              department_name,
            }}
          >
            <Button icon={<PlusOutlined />} type="primary">
              Tạo mới
            </Button>
          </JobProgressModalForm>
        )}
      </div>

      <div className="flex items-start gap-[16px]">
        <AreaChart />
        <JobProgressGuide items={guideItems} />
      </div>

      <JobProgressTable dataSource={job_position} />
    </Card>
  )
}

export default JobProgressCard
