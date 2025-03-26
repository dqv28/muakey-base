import { PageHeader } from '@/components'
import PageContent from './components/PageContent'
import AssetFilter from './components/asset-filter'
import AssetTable from './components/asset-table'
import { getAssets } from '@/libs/asset'

const AssetPage: React.FC<any> = async () => {
  const assets = await getAssets()

  return (
    <>
      <PageHeader title="Quản lý tài sản" />
      <PageContent className="flex flex-col gap-[16px]">
        <AssetFilter />
        <AssetTable dataSource={assets}  />
      </PageContent>
    </>
  )
}

export default AssetPage
