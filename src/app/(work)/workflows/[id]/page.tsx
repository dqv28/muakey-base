import {
  getCustomFieldsByWorkflowId,
  getReportFieldsByWorkflowId,
  getStagesByWorkflowId,
  getWorkflowById,
} from '@/libs/data'
import { Metadata } from 'next'
import React from 'react'
import WorkflowContent from './components/WorkflowContent'
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

  const [workflow, stages, customFields, reportFields] = await Promise.all([
    getWorkflowById(workflowId),
    getStagesByWorkflowId(workflowId),
    getCustomFieldsByWorkflowId(workflowId),
    getReportFieldsByWorkflowId(workflowId),
  ])

  const filteredStages =
    stages?.length >= 0
      ? stages?.filter((stage: any) => ![0, 1].includes(stage.index))
      : []

  return (
    <WorkflowPageLayout
      workflow={workflow}
      type={searchParams?.type || 'table'}
    >
      <WorkflowContent
        options={{
          type: searchParams?.type,
          filteredStages,
          customFields,
          reportFields,
          stages,
          workflowMembers: workflow?.members,
          workflowId,
        }}
      />
    </WorkflowPageLayout>
  )
}

export default Page
