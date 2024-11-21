'use client'

import dynamic from 'next/dynamic'
import React from 'react'

const WorkflowExtra = dynamic(() => import('./WorkflowExtra'), {
  ssr: false,
})

const Extra: React.FC = () => {
  return <WorkflowExtra />
}

export default Extra
