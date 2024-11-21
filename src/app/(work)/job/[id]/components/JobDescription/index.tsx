'use client'

import dynamic from 'next/dynamic'
import React from 'react'

type DescriptionProps = {
  value?: any
  params?: any
}

const JobDescription = dynamic(() => import('./JobDescription'), {
  ssr: false,
})

const Description: React.FC<DescriptionProps> = (props) => {
  return <JobDescription {...props} />
}

export default Description
