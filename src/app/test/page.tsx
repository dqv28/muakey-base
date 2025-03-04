import React from 'react'
import TestForm from './TestForm'

const Page: React.FC = async () => {
  return (
    <div className="p-[12px]">
      <h1 className="text-2xl font-bold">Test Component Page</h1>
      <TestForm />
    </div>
  )
}

export default Page
