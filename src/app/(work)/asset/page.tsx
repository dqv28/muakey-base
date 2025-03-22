import { PageHeader } from '@/components'
import { getAssets } from '@/libs/asset'
import PageContent from './components/PageContent'
import AssetFilter from './components/asset-filter'
import AssetTable from './components/asset-table'

const AssetPage = async () => {
  const assets = await getAssets()

  console.log(assets)

  return (
    <>
      <PageHeader title="Tài sản" />
      <PageContent className="flex flex-col gap-[16px]">
        <AssetFilter />
        <AssetTable dataSource={assets} />
      </PageContent>
    </>
  )
}

export default AssetPage
