'use client'

import { getAssetById } from '@/libs/asset'
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons'
import type { DescriptionsProps } from 'antd'
import { Avatar, Button, Descriptions, Tag } from 'antd'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Asset {
  id: string
  name: string
  // Thêm các trường khác tùy theo API của bạn
}
const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Loại tài sản',
    children: <span className="font-bold">Máy tính</span>,
  },
  {
    key: '2',
    label: 'Nhà cung cấp',
    children: <span className="font-bold">MT1</span>,
  },
  {
    key: '3',
    label: 'Người mua',
    children: <span className="font-bold">Quý</span>,
  },
  {
    key: '4',
    label: 'Số serial',
    children: <span className="font-bold">Máy tính</span>,
  },
  {
    key: '5',
    label: 'Giá mua',
    children: <span className="font-bold">MT1</span>,
  },
  {
    key: '6',
    label: 'Ngày thanh lý',
    children: <span className="font-bold">Quý</span>,
  },
  {
    key: '7',
    label: 'Người sử dụng',
    children: <span className="font-bold">Máy tính</span>,
  },
  {
    key: '8',
    label: 'Ngày mua',
    children: <span className="font-bold">MT1</span>,
  },
  {
    key: '9',
    label: 'Giá thanh lí',
    children: <span className="font-bold">Quý</span>,
  },
  {
    key: '10',
    label: 'Thời gian sử dụng',
    children: <span className="font-bold">Thời gian sử dụng</span>,
  },
  {
    key: '11',
    label: 'Hạn bảo hành',
    children: <span className="font-bold">MT1</span>,
  },
  {
    key: '12',
    label: 'Người thanh lý',
    children: <span className="font-bold">Quý</span>,
  },
  {
    key: '13',
    label: 'Ghi chú',
    children: <span className="font-bold">Quý</span>,
  },
]

const AssetDetailPage = ({ params }: { params: { id: string } }) => {
  const [asset, setAsset] = useState<Asset | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        setLoading(true)
        const data = await getAssetById(Number(params.id))
        if (!data) {
          throw new Error('Không tìm thấy tài sản')
        }
        setAsset(data)
      } catch (err) {
        console.error('Error in fetchAsset:', err)
        setError(err instanceof Error ? err.message : 'Có lỗi xảy ra')
      } finally {
        setLoading(false)
      }
    }

    fetchAsset()
  }, [])


  //bg-[#f6f6f6]
  return (
    <div className="flex flex-col">
      <div className="flex w-full items-start bg-[#fff] px-6 py-3">
        <Button type="link" className="!p-0">
          <Link
            href="/asset"
            className="flex items-center gap-[8px] text-[#1677ff]"
          >
            <ArrowLeftOutlined className="text-[16px]" />
            <span className="text-[14px] font-medium">Danh sách tài sản</span>
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-4 bg-[#f6f6f6] p-4">
        <div className="col-span-3 gap-4 rounded-lg bg-[#fff] p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-4">
              <Avatar
                style={{ backgroundColor: '#1677ff', verticalAlign: 'middle' }}
                size="large"
                gap={16}
              >
                {asset?.name}
              </Avatar>
              <div className="flex flex-col gap-2">
                <p>Máy tính Dell 5340</p>
                <div className="flex items-center gap-2">
                  <p>MT1</p>
                  <Tag color="success">Đang sử dụng</Tag>
                </div>
              </div>
            </div>
            <Button>
              <EditOutlined /> Chỉnh sửa
            </Button>
          </div>

          <div className="mt-4">
            <Descriptions
              layout="vertical"
              items={items}
              column={4}
              colon={false}
            />
          </div>
        </div>
        <div className="col-span-1"></div>
      </div>
    </div>
  )
}

export default AssetDetailPage
