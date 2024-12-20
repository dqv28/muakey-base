'use client'

import { AppProgressBar } from 'next-nprogress-bar'
import React from 'react'

const ProgressProviders: React.FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  return (
    <>
      {children}
      <AppProgressBar
        height="3px"
        color="#2bbf3d"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </>
  )
}

export default ProgressProviders
