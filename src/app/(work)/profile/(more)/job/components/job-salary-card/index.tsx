import { EditOutlined } from '@ant-design/icons'
import { Button, Card, ListProps } from 'antd'
import React from 'react'
import JobSalaryList from './JobSalaryList'
import JobSalaryModalForm from './JobSalaryModalForm'

export type JobSalaryCardProps = {
  title?: React.ReactNode
  extra?: React.ReactNode
  data?: any
}

const JobSalaryCard: React.FC<JobSalaryCardProps> = ({
  title,
  extra,
  data: externalData,
}) => {
  const { salary } = externalData

  const data: ListProps<any>['dataSource'] = [
    {
      label: 'Lương Gross',
      value: salary?.gross_salary,
    },
    {
      label: 'Lương Net',
      value: salary?.net_salary,
    },
    {
      label: 'Lương cơ bản',
      value: salary?.basic_salary,
    },
    {
      label: 'Phụ cấp đi lại',
      value: salary?.travel_allowance,
    },
    {
      label: 'Phụ cấp ăn uống',
      value: salary?.eat_allowance,
    },
    {
      label: 'Thưởng KPI',
      value: salary?.kpi,
    },
  ]

  return (
    <Card
      classNames={{
        body: 'space-y-[16px]!',
      }}
    >
      <div className="mt-[16px] flex items-center justify-between">
        <div className="text-[20px] leading-[28px] font-[500]">{title}</div>
        {extra || (
          <JobSalaryModalForm initialValues={externalData}>
            <Button icon={<EditOutlined />}>Chỉnh sửa</Button>
          </JobSalaryModalForm>
        )}
      </div>

      <JobSalaryList dataSource={data} />
    </Card>
  )
}

export default JobSalaryCard
