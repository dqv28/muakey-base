'use client'

import React, { createContext, useState } from 'react'

export const WorkflowContext = createContext<any>({})

const WorkflowProvider: React.FC<{
  children?: React.ReactNode
  initContext?: any[]
}> = ({ children, initContext }) => {
  const [workflows, setWorkflows] = useState(initContext || [])

  return (
    <WorkflowContext.Provider value={{ workflows, setWorkflows }}>
      {children}
    </WorkflowContext.Provider>
  )
}

export default WorkflowProvider
