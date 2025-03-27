import { Timeline } from 'antd'
import React from 'react'

const AssetTimeline: React.FC<any> = ({ asset }) => {
  const items = asset?.history_assets?.map((item: any) => ({
    color: item?.status === 'created' ? 'red' : 'blue',
    key: item?.id,
    children: (
      <p>
        {item.status === 'created' ? 'Tạo lúc ' : 'Cập nhật lúc '}{' '}
        {item.created_at.split('T')[0]} bởi <b>{item?.account?.full_name}</b>
      </p>
    ),
  }))

  return (
    <div className="col-span-1 h-fit overflow-y-auto rounded-lg bg-[#fff] p-4">
      <p className="mb-4 text-[16px] font-medium">Lịch sử cập nhật</p>

      <Timeline mode="left" items={items} />
    </div>
  )
}

export default AssetTimeline
