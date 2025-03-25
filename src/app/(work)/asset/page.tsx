import { PageHeader } from '@/components'
import { getAssets, getAssetsByStatus } from '@/libs/asset'
import PageContent from './components/PageContent'
import AssetFilter from './components/asset-filter'
import AssetTable from './components/asset-table'

interface AssetPageProps {
  searchParams: { status?: string }
}

const AssetPage = async ({ searchParams }: AssetPageProps) => {
  const status = searchParams.status || 'all'
  console.log('status from URL:', status)

  // Gọi API dựa vào status
  const assets =
    status === 'all' ? await getAssets() : await getAssetsByStatus(status)

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
