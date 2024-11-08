import { Avatars } from '@/components'
import {
  getCustomFieldsByWorkflowId,
  getStagesByWorkflowId,
  getWorkflowById,
} from '@/libs/data'
import { Button } from '@/ui'
import { PlusOutlined } from '@/ui/icons'
import { Metadata } from 'next'
import React from 'react'
import PageHeader from '../components/PageHeader'
import WorkflowTabs from '../components/WorkflowTabs'
import CustomFields from './components/custom-fields'
import StageList from './components/stage/StageList'
import StageModalForm from './components/stage/StageModalForm'
import TaskModalForm from './components/task/TaskModalForm'

export const generateMetadata = async (props: { params: any }) => {
  const params = await props.params
  const workflowId = params?.id

  const workflow = await getWorkflowById(workflowId)

  const metadata: Metadata = {
    title: `Muakey | ${workflow?.name}`,
  }

  return metadata
}

const Page: React.FC<any> = async (prop: {
  params: any
  searchParams: any
}) => {
  const params = await prop.params
  const searchParams = await prop.searchParams
  const workflowId = params?.id

  const [workflow, stages, fields] = await Promise.all([
    getWorkflowById(workflowId),
    getStagesByWorkflowId(workflowId),
    getCustomFieldsByWorkflowId(workflowId),
  ])

  const filteredStages = stages?.filter(
    (stage: any) => ![0, 1].includes(stage.index),
  )

  switch (searchParams?.type) {
    case 'custom-field':
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
                    workflow_id: workflowId,
                    members: workflow?.members,
                  }}
                >
                  <Button
                    className="!p-[10px] !text-[12px] text-[#fff]"
                    icon={<PlusOutlined className="text-[16px]" />}
                    color="primary"
                  >
                    Tạo nhiệm vụ
                  </Button>
                </TaskModalForm>
              </div>
            }
          >
            <WorkflowTabs
              className="mt-[12px]"
              activeKey={searchParams?.type || 'table'}
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
              ]}
            />
          </PageHeader>
          <CustomFields stages={filteredStages} fields={fields} />
        </div>
      )

    default:
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
                    workflow_id: workflowId,
                    members: workflow?.members,
                  }}
                >
                  <Button
                    className="!p-[10px] !text-[12px] text-[#fff]"
                    icon={<PlusOutlined className="text-[16px]" />}
                    color="primary"
                  >
                    Tạo nhiệm vụ
                  </Button>
                </TaskModalForm>
                <StageModalForm
                  initialValues={{
                    workflow_id: workflowId,
                  }}
                >
                  <Button
                    className="!p-[10px] !text-[12px] text-[#fff]"
                    icon={<PlusOutlined className="text-[16px]" />}
                    color="primary"
                  >
                    Thêm giai đoạn
                  </Button>
                </StageModalForm>
              </div>
            }
          >
            <WorkflowTabs
              className="mt-[12px]"
              activeKey={searchParams?.type || 'table'}
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
              ]}
            />
          </PageHeader>
          <div className="flex-1 overflow-auto">
            <StageList
              dataSource={stages}
              isEmpty={filteredStages.length <= 0}
              members={workflow?.members}
            />
          </div>
        </div>
      )
  }
}

export default Page
