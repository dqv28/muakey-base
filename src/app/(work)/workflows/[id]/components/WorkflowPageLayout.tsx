'use client'

import { randomColor } from '@/libs/utils'
import { PlusOutlined } from '@ant-design/icons'
import { Avatar, Button } from 'antd'
import clsx from 'clsx'
import React, { createContext, useState } from 'react'
import PageHeader from '../../components/PageHeader'
import WorkflowTabs from '../../components/WorkflowTabs'
import StageModalForm from './stage/StageModalForm'
import TaskModalForm from './task/TaskModalForm'

type WorkflowPageLayoutProps = {
  workflow?: any
  type?: string
  children?: React.ReactNode
  options?: any
}

export const StageContext = createContext<any>([])

const WorkflowPageLayout: React.FC<WorkflowPageLayoutProps> = ({
  workflow,
  type,
  children,
  options,
}) => {
  const [stages, setStages] = useState<any>(options?.stages || [])

  return (
    <StageContext.Provider value={{ stages, setStages }}>
      <div className="flex h-full flex-col">
        <PageHeader
          className="h-[82px] bg-[#fff]"
          title={
            <div className="flex items-center gap-[8px] text-[24px] font-[600] leading-[28px]">
              <span>{workflow?.name}</span>
              <Avatar.Group>
                {workflow?.members &&
                  workflow?.members?.map((mem: any) => (
                    <Avatar
                      key={mem?.username}
                      src={mem?.avatar}
                      style={{ backgroundColor: randomColor(mem?.full_name) }}
                    >
                      {String(mem?.full_name).charAt(0).toLocaleUpperCase()}
                    </Avatar>
                  ))}
              </Avatar.Group>
            </div>
          }
          extra={
            <div className="flex items-center gap-[8px]">
              <TaskModalForm
                initialValues={{
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
        <div
          className={clsx(!type || type !== 'table') || 'flex-1 overflow-auto'}
        >
          {children}
        </div>
      </div>
    </StageContext.Provider>
  )
}

export default WorkflowPageLayout
