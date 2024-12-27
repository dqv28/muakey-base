import { getMe, getWorkflowCategories, getWorkflows } from '@/libs/data'
import { getDepartments } from '@/libs/department'
import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import PageHeader from './components/PageHeader'
import PageProvider from './components/PageProvider'
import WorkflowExtra from './components/workflow-extra'
import WorkflowList from './components/workflow-list'
import WorkflowSearch from './components/WorkflowSearch'
import WorkflowTabs from './components/WorkflowTabs'

const page: React.FC<any> = async (prop: { searchParams?: any }) => {
  const searchParams = await prop.searchParams
  const type = searchParams?.type

  const workflows = await getWorkflows({
    type: !type || type === 'all' ? '' : type || 'open',
    search: searchParams?.q || '',
  })

  const [workflowCategories, departments, user] = await Promise.all([
    getWorkflowCategories(),
    getDepartments(),
    getMe(),
  ])

  return (
    <PageProvider>
      <div className="flex h-full flex-col">
        <PageHeader
          className="h-[82px] bg-[#fff]"
          title={
            <h1 className="text-[24px] font-[600] leading-[28px]">Quy trình</h1>
          }
          extra={
            <div className="flex items-center gap-[12px]">
              <WorkflowSearch />
              <WorkflowExtra
                initialValues={{
                  workflowCategories,
                  departments,
                }}
              >
                <Button
                  className="!p-[10px] !text-[12px] text-[#fff]"
                  icon={<PlusOutlined className="text-[16px]" />}
                  type="primary"
                >
                  Tạo mới danh mục
                </Button>
              </WorkflowExtra>
            </div>
          }
        >
          <WorkflowTabs
            className="mt-[12px]"
            activeKey={type || 'open'}
            items={[
              {
                key: 'open',
                label: 'Đang khả dụng',
              },
              {
                key: 'close',
                label: 'Đã đóng',
              },
              {
                key: 'all',
                label: 'Tất cả workflows',
              },
            ]}
          />
        </PageHeader>
        <div className="flex-1 overflow-auto bg-[#eee] px-[24px] py-[8px]">
          <WorkflowList
            dataSource={
              workflowCategories?.length > 0
                ? workflowCategories?.map((cate: any) => ({
                    id: cate?.id,
                    label: cate?.name,
                    workflows: workflows.filter(
                      (w: any) => w.workflow_category_id === cate.id,
                    ),
                    members: cate?.members || [],
                  }))
                : []
            }
            options={{
              departments,
              user,
            }}
          />
        </div>
      </div>
    </PageProvider>
  )
}

export default page
