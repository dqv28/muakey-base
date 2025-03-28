import { PageHeader } from '@/components'
import { getAssets, getAssetsByPagnition } from '@/libs/asset'
import PageContent from './components/PageContent'
import AssetFilter from './components/asset-filter'
import AssetTable from './components/asset-table'

const AssetPage: React.FC<any> = async ({ searchParams }: { searchParams: { page: string } }) => {
  const page = searchParams.page || 1
  const assets = await getAssetsByPagnition(page.toString())
  console.log('assets', assets)

  await new Promise((res) => setTimeout(res, 1000))
  return (
    <>
      <PageHeader title="Quản lý tài sản" />
      <PageContent className="flex flex-col gap-[16px]">
        <AssetFilter />
        <AssetTable dataSource={assets.data} total={assets.total} per_page={assets.per_page} />
      </PageContent>
    </>
  )
}

export default AssetPage
