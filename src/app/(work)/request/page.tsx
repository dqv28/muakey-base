import { getProposeCategories, getProposes } from '@/libs/propose'
import React from 'react'
import PageHeader from './components/PageHeader'
import RequestTable from './components/RequestTable'

const Page: React.FC = async () => {
  const proposes = await getProposes()
  const proposeCategories = await getProposeCategories()

  return (
    <div className="h-[100vh] bg-[#f6f6f6]">
      <PageHeader
        options={{
          groups: proposeCategories,
        }}
      />

      <div className="h-[calc(100vh-69px)] overflow-auto p-[16px]">
        <RequestTable dataSource={proposes} />
      </div>
    </div>
  )
}

export default Page
