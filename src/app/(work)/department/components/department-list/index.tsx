import { withSuspense } from '@/hoc'
import { getDepartments } from '@/libs/department'
import { Col, Row } from 'antd'
import React from 'react'
import DepartmentItem from '../department-item'
import DepartmentListSkeleton from './DepartmentListSkeleton'

const DepartmentList: React.FC<{
  options?: any
}> = async ({ options }) => {
  const departments = await getDepartments()

  return (
    <Row className="flex items-center" gutter={[24, 24]}>
      {departments?.map((depart: any) => (
        <Col key={depart?.id} span={6}>
          <DepartmentItem item={depart} options={options} />
        </Col>
      ))}
    </Row>
  )
}

export default withSuspense(DepartmentList, {
  fallback: () => <DepartmentListSkeleton />,
})
