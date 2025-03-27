import { PageHeader } from '@/components'
import { getAssets } from '@/libs/asset'
import PageContent from './components/PageContent'
import AssetFilter from './components/asset-filter'
import AssetTable from './components/asset-table'

const AssetPage: React.FC<any> = async () => {
  const assets = await getAssets()

  await new Promise((res) => setTimeout(res, 1000))
  return (
    <>
      <PageHeader title="Quản lý tài sản" />
      <PageContent className="flex flex-col gap-[16px]">
        <AssetFilter />
        <AssetTable dataSource={assets} />
      </PageContent>
    </>
  )
}

export default AssetPage
