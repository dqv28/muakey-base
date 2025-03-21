import { getMe, getStagesByWorkflowId, getWorkflowById } from '@/libs/data'
import { Metadata } from 'next'
import React from 'react'
import WorkflowPageLayout from './components/WorkflowPageLayout'

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
  const date = searchParams?.date
  const tag = searchParams?.tag

  const [workflow, stages, user] = await Promise.all([
    getWorkflowById(workflowId),
    getStagesByWorkflowId({
      workflow_id: workflowId,
    }),
    getMe(),
  ])

  return (
    <WorkflowPageLayout
      workflow={workflow}
      type={searchParams?.type || 'table'}
      options={{
        stages,
        user,
        date,
        tag,
      }}
    />
  )
}

export default Page
