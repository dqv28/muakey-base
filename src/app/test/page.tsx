import React from 'react'
import Group from './Group'
import TestForm from './TestForm'

const Page: React.FC = () => {
  return (
    <div className="p-[12px]">
      <h1>Re-test Deploy</h1>
      <Group />
      <TestForm />
    </div>
  )
}

export default Page
