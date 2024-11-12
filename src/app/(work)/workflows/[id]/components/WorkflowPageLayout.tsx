import { Avatars } from '@/components'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import PageHeader from '../../components/PageHeader'
import WorkflowTabs from '../../components/WorkflowTabs'
import StageModalForm from './stage/StageModalForm'
import TaskModalForm from './task/TaskModalForm'

type WorkflowPageLayoutProps = {
  workflow?: any
  type?: string
  children?: React.ReactNode
}

const WorkflowPageLayout: React.FC<WorkflowPageLayoutProps> = ({
  workflow,
  type,
  children,
}) => {
  return (
    <div className="flex h-full flex-col">
      <PageHeader
        className="h-[82px] bg-[#fff]"
        title={
          <div className="flex items-center gap-[8px] text-[24px] font-[600] leading-[28px]">
            <span>{workflow?.name}</span>
            <Avatars
              avatars={workflow?.members?.map((mem: any) => mem.full_name)}
            />
          </div>
        }
        extra={
          <div className="flex items-center gap-[8px]">
            <TaskModalForm
              initialValues={{
                workflow_id: workflow?.id,
                members: workflow?.members,
              }}
            >
              <Button
                className="!p-[10px] !text-[12px] text-[#fff]"
                icon={<PlusOutlined className="text-[16px]" />}
                type="primary"
              >
                Tạo nhiệm vụ
              </Button>
            </TaskModalForm>
            <StageModalForm
              initialValues={{
                workflow_id: workflow?.id,
              }}
            >
              <Button
                className="!p-[10px] !text-[12px] text-[#fff]"
                icon={<PlusOutlined className="text-[16px]" />}
                type="primary"
              >
                Thêm giai đoạn
              </Button>
            </StageModalForm>
          </div>
        }
      >
        <WorkflowTabs
          className="mt-[12px]"
          activeKey={type}
          items={[
            {
              key: 'table',
              label: 'Dạng bảng',
            },
            {
              key: 'list',
              label: 'Danh sách',
            },
            {
              key: 'docs',
              label: 'Báo cáo',
            },
            {
              key: 'custom-field',
              label: 'Trường tùy chỉnh',
            },
            {
              key: 'report-field',
              label: 'Trường báo cáo',
            },
          ]}
        />
      </PageHeader>
      {children}
    </div>
  )
}

export default WorkflowPageLayout
