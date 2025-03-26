'use client'

import { useUpdateStore } from '@/stores/updateStore'
import { ArrowLeftOutlined, EditOutlined } from '@ant-design/icons'
import type { DescriptionsProps } from 'antd'
import { Avatar, Button, Descriptions } from 'antd'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import AssetModalForm from '../components/asset-modal-form'
import { getAssetByIdAction } from './action'
import StatusTag from './components/status-tag/page'
import AssetTimeline from './components/time-line/page'
import Loading from './loadingPage'

interface Asset {
  id: string
  name: string
  brand: {
    name: string
  }
  status:
    | 'using'
    | 'unused'
    | 'warranty'
    | 'broken'
    | 'liquidated'
    | undefined
    | string
  asset_category: {
    name: string
  }
  buyer: {
    full_name: string
  }
  code: string
  price: number
  buy_date: string
  sell_price: number
  seller: {
    full_name: string
  }
  warranty_date: string
  account: {
    full_name: string
  }
  start_date: string
  sell_date: string
  description: string
  created_at: string
  updated_at: string
  history_assets: [
    {
      updated_at: string
      account: {
        full_name: string
      }
    },
  ]
  // Thêm các trường khác tùy theo API của bạn
}

const AssetDetailPage = ({ id }: { id: string }) => {
  const [asset, setAsset] = useState<Asset | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { updateResult } = useUpdateStore()
  console.log('updateResult', updateResult)

  const [loading, setLoading] = useState(true)
  // const [error, setError] = useState<string | null>(null)
  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleModalSuccess = () => {
    setIsModalOpen(false)
    // onAdd?.()
  }

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        setLoading(true)
        const data = updateResult
          ? updateResult
          : await getAssetByIdAction(Number(id))
        if (!data) {
          throw new Error('Không tìm thấy tài sản')
        }
        setAsset(data)
      } catch (err) {
        console.error('Error in fetchAsset:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAsset()
  }, [id, updateResult])

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Loại tài sản',
      children: (
        <span className="font-bold">{asset?.asset_category?.name}</span>
      ),
    },
    {
      key: '2',
      label: 'Nhà cung cấp',
      children: <span className="font-bold">{asset?.brand?.name}</span>,
    },
    {
      key: '3',
      label: 'Người mua',
      children: <span className="font-bold">{asset?.buyer?.full_name}</span>,
    },
    {
      key: '4',
      label: 'Số serial',
      children: <span className="font-bold">{asset?.code}</span>,
    },
    {
      key: '5',
      label: 'Giá mua',
      children: <span className="font-bold">{asset?.price}</span>,
    },
    {
      key: '6',
      label: 'Ngày thanh lý',
      children: <span className="font-bold">{asset?.buy_date}</span>,
    },
    {
      key: '7',
      label: 'Người sử dụng',
      children: <span className="font-bold">{asset?.account?.full_name}</span>,
    },
    {
      key: '8',
      label: 'Ngày mua',
      children: <span className="font-bold">{asset?.buy_date}</span>,
    },
    {
      key: '9',
      label: 'Giá thanh lí',
      children: <span className="font-bold">{asset?.sell_price}</span>,
    },
    {
      key: '10',
      label: 'Thời gian sử dụng',
      children: (
        <span className="font-bold">
          {asset?.start_date && asset?.sell_date
            ? (() => {
                const startDate = new Date(asset.start_date)
                const sellDate = new Date(asset.sell_date)
                const days =
                  Math.ceil(
                    (startDate.getTime() - sellDate.getTime()) /
                      (1000 * 60 * 60 * 24),
                  ) + 1
                return `${days} ngày`
              })()
            : 'Không xác định'}
        </span>
      ),
    },
    {
      key: '11',
      label: 'Hạn bảo hành',
      children: <span className="font-bold">{asset?.warranty_date}</span>,
    },
    {
      key: '12',
      label: 'Người thanh lý',
      children: <span className="font-bold">{asset?.seller?.full_name}</span>,
    },
    {
      key: '13',
      label: 'Ghi chú',
      children: <span className="font-bold">{asset?.description}</span>,
    },
  ]
  //bg-[#f6f6f6]
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex h-screen flex-col bg-[#f6f6f6]">
          <div className="flex w-full items-start bg-[#fff] px-6 py-3">
            <Button type="link" className="!p-0">
              <Link
                href="/asset"
                className="flex items-center gap-[8px] text-[#1677ff]"
              >
                <ArrowLeftOutlined className="text-[16px]" />
                <span className="text-[14px] font-medium">
                  Danh sách tài sản
                </span>
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-4 p-4">
            <div className="col-span-3 gap-4 rounded-lg bg-[#fff] p-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex gap-4">
                  <Avatar
                    style={{
                      backgroundColor: '#1677ff',
                      verticalAlign: 'middle',
                    }}
                    size="large"
                    gap={16}
                  >
                    {asset?.name}
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <p>{asset?.name}</p>
                    <div className="flex items-center gap-2">
                      <p>{asset?.brand?.name}</p>
                      <StatusTag
                        status={
                          asset?.status as
                            | 'using'
                            | 'unused'
                            | 'warranty'
                            | 'broken'
                            | 'liquidated'
                        }
                      />
                    </div>
                  </div>
                </div>
                <AssetModalForm
                  title="Chỉnh sửa tài sản"
                  open={isModalOpen}
                  onSuccess={handleModalSuccess}
                  onCancel={handleModalClose}
                  initialValues={asset}
                >
                  <Button onClick={() => setIsModalOpen(true)}>
                    <EditOutlined /> Chỉnh sửa
                  </Button>
                </AssetModalForm>
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
            <div className="col-span-1 ms-4 h-fit rounded-lg bg-[#fff] p-4">
              <p className="font-[SF Pro Text] text-[20px] leading-[28px] font-medium">
                Lịch sử cập nhật
              </p>
              <div className="mt-6 flex flex-col gap-2 pb-0!">
                <AssetTimeline asset={asset} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AssetDetailPage
