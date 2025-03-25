'use client'

import { PageHeader } from '@/components'
import { useFilterStore } from '@/stores/filterStore'
import { useEffect, useState } from 'react'
import PageContent from './components/PageContent'
import { getAssetsAction } from './components/action'
import AssetFilter from './components/asset-filter'
import AssetTable from './components/asset-table'
interface AssetPageProps {
  searchParams: { status?: string }
}

const AssetPage = ({ searchParams }: AssetPageProps) => {
  const status = searchParams.status || 'all'
  const { filterResults } = useFilterStore()
  console.log('filterResults', filterResults)
  const [assets, setAssets] = useState<any[]>([])

  useEffect(() => {
    const fetchAssets = async () => {
      console.log('status from URL:', status)

      let assetsData = await getAssetsAction()

      if (filterResults.length > 0) {
        assetsData = filterResults
      }

      setAssets(assetsData)
    }

    fetchAssets()
  }, [status, filterResults]) // Chạy lại khi status hoặc filterResults thay đổi

  return (
    <>
      <PageHeader title="Quản lý tài sản" />
      <PageContent className="flex flex-col gap-[16px]">
        <AssetFilter />
        <AssetTable dataSource={assets} defaultActiveKey={status} />
      </PageContent>
    </>
  )
}

export default AssetPage
