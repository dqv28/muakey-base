'use client'

import { useAsyncEffect } from '@/libs/hook'
import { Avatar, List, ListProps, toast } from '@/ui'
import { DownOutlined } from '@/ui/icons'
import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useContext, useState } from 'react'
import {
  deleteWorkflowCategoryByIdAction,
  getWorkflowCategoriesAction,
  getWorkflowsAction,
} from '../../action'
import { PageContext } from '../PageProvider'
import WorkflowCardList from '../workflow-card-list'
import WorkFlowDeleteButton from './WorkFlowDeleteButton'
import WorkflowModalForm from './WorkflowModalForm'

export type WorkflowListProps = ListProps

const WorkflowList: React.FC<WorkflowListProps> = ({ dataSource, ...rest }) => {
  const [expand, setExpand] = useState(true)
  const [workflows, setWorkflows] = useState(dataSource || [])
  const [ids, setIds] = useState(dataSource?.map((w) => w.id) || [])
  const router = useRouter()
  const searchParams = useSearchParams()
  const param = searchParams.get('type')
  const { search } = useContext(PageContext)

  const handleDelete = async (id: number) => {
    try {
      await deleteWorkflowCategoryByIdAction(id)

      router.refresh()
      toast.success('Xóa thành công.')
    } catch (error) {
      console.log(error)
    }
  }

  useAsyncEffect(async () => {
    const workflowCategories = await getWorkflowCategoriesAction()
    const workflows = await getWorkflowsAction({
      type: param === 'all' ? '' : param || 'open',
      search: search || '',
    })

    setWorkflows(
      workflowCategories.map((cate: any) => ({
        id: cate?.id,
        label: cate?.name,
        workflows: workflows.filter(
          (w: any) => w.workflow_category_id === cate.id,
        ),
        members: cate?.members || [],
      })),
    )
  }, [search, param, dataSource])

  return (
    <List
      className="divide-y divide-[#DDDDDD] pb-[40px]"
      dataSource={workflows}
      renderItem={(cate) => {
        return (
          <>
            <div className="flex cursor-pointer items-center justify-between gap-[24px] py-[16px]">
              <div
                className="flex items-center gap-[12px]"
                onClick={() => {
                  setExpand(!expand)
                  setIds((prev) => {
                    if (prev.includes(cate.id)) {
                      return prev?.filter((i) => i !== cate.id)
                    }

                    return [...prev, cate.id]
                  })
                }}
              >
                <DownOutlined
                  className={clsx(
                    'text-[16px] text-[#000]',
                    !ids.includes(cate.id) && '-rotate-90',
                  )}
                />
                <Avatar size={36} shape="circle">
                  {cate.label}
                </Avatar>
                <span className="text-[18px] font-[400] leading-[42px] text-[#000]">
                  {cate.label} ({cate.workflows.length})
                </span>
              </div>
              <div
                className="flex items-center gap-[8px]"
                onClick={(e) => e.preventDefault()}
              >
                <WorkflowModalForm
                  initialValues={{
                    workflow_category_id: cate.id,
                    manager: cate.members
                      ?.map((m: any) => m?.username)
                      .join(' '),
                  }}
                />
                <WorkFlowDeleteButton onDelete={() => handleDelete(cate.id)} />
              </div>
            </div>
            {ids.includes(cate.id) && (
              <WorkflowCardList items={cate?.workflows} />
            )}
          </>
        )
      }}
      {...rest}
    />
  )
}

export default WorkflowList
