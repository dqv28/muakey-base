import React from 'react'
import PageHeader from './components/PageHeader'
import ResourcesCategoryList from './components/resources-category-list'

const ResourcesPage: React.FC = async () => {
  return (
    <div className="h-[100vh] bg-[#f6f6f6]">
      <PageHeader />
      <ResourcesCategoryList suspense />
    </div>
  )
}

export default ResourcesPage
