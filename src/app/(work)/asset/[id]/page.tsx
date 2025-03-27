import { getAssetById } from '@/libs/asset'
import React from 'react'
import AssetDetail from './components/asset-detail'
import AssetTimeline from './components/time-line'

const AssetDeail: React.FC<any> = async ({ params }) => {
  const { id } = await params

  await new Promise((res) => setTimeout(res, 1000))

  const asset = await getAssetById(Number(id))


  return (
    <>
      <AssetDetail asset={asset} />
      <AssetTimeline asset={asset} />
    </>
  )
}

export default AssetDeail
