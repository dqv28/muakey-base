import React from 'react'
import WorkflowDocsTable from './WorkflowDocsTable'

type WorkflowDocsProps = {
  stages?: any
}

const WorkflowDocs: React.FC<WorkflowDocsProps> = ({ stages }) => {
  return (
    <>
      {stages?.map((stage: any) => (
          <WorkflowDocsTable key={stage?.id} stageId={stage?.id} stageName={stage?.name} />
      ))}
    </>
  )
}

export default WorkflowDocs
