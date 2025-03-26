import { useUpdateStore } from '@/stores/updateStore'
import { Timeline } from 'antd'
import { useEffect, useState } from 'react'

const AssetTimeline = ({ asset }: { asset: any }) => {
  const [timelineItems, setTimelineItems] = useState<any[]>([])
  const { updateResult } = useUpdateStore()
  console.log('updateResult', updateResult)
  useEffect(() => {
    if (!asset) return

    const items = [
      {
        key: 'created',
        color: 'green',
        children: (
          <p>
            Tạo lúc{' '}
            {asset?.created_at
              ? asset.created_at.split('T')[0]
              : 'Không xác định'}{' '}
            bởi <b>Nguyễn Văn A</b>
          </p>
        ),
        className: 'font-inter text-[14px]! font-normal leading-[22px]',
      },
      ...(asset?.history_assets?.map((history: any, index: number) => ({
        key: `update-${index + 1}`,
        color: 'blue',
        children: (
          <p>
            Cập nhật lúc{' '}
            {history.updated_at ? history.updated_at.split('T')[0] : ''} bởi{' '}
            <b>{history.account?.full_name || 'Không xác định'}</b>
          </p>
        ),
        className: 'font-inter text-[14px]! font-normal leading-[22px]',
      })) || []),
      {
        key: 'deleted',
        color: 'red',
        children: (
          <p>
            Xóa lúc 25/03/2025 bởi <b>Nguyễn Văn A</b>
          </p>
        ),
        className: 'font-inter text-[14px]! font-normal leading-[22px]',
      },
    ]

    setTimelineItems(items)
  }, [updateResult?.history_assets?.length])

  return <Timeline items={timelineItems} />
}

export default AssetTimeline
