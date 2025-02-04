import { getMe } from '@/libs/data'
import { getProposeById } from '@/libs/propose'
import { randomColor } from '@/libs/utils'
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Avatar, Badge, Button, Divider } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import PageHeader from './components/PageHeader'
import RequestInfo from './components/RequestInfo'

const generateStatus = (status: string) => {
  switch (status) {
    case 'pending':
      return (
        <div className="flex items-center gap-[8px] text-[#FAAD14]">
          <Badge dot color="#FAAD14" />
          <span>Đang chờ duyệt</span>
        </div>
      )

    case 'approved':
      return (
        <div className="flex items-center gap-[8px] text-[#389e0d]">
          <Badge dot color="#389e0d" />
          <span>Đã duyệt</span>
        </div>
      )

    case 'canceled':
      return (
        <div className="flex items-center gap-[8px] text-[#cf1322]">
          <Badge dot color="#cf1322" />
          <span>Đã hủy</span>
        </div>
      )

    case 'rejected':
      return (
        <div className="flex items-center gap-[8px] text-[#cf1322]">
          <Badge dot color="#cf1322" />
          <span>Từ chối</span>
        </div>
      )

    default:
      return <></>
  }
}

const page: React.FC<any> = async (props) => {
  const params = await props?.params
  const id = await params?.id

  const user = await getMe()
  const propose = await getProposeById(id)

  console.log(propose)

  const isAdmin = user?.role === 'Admin lv2'

  // const totalTime = propose?.date_holidays?.reduce(
  //   (total: number, current: any) => {
  //     const t =
  //       new Date(current?.start_date || '').getTime() -
  //       new Date(current?.end_date || '').getTime()

  //     const time = dayjs.duration(Math.abs(t))

  //     return (total += time.asSeconds())
  //   },
  //   0,
  // )

  const items: any[] = [
    [
      {
        key: '1',
        label: 'Mã yêu cầu',
        children: propose?.id,
      },
      {
        key: '2',
        label: 'Loại yêu cầu',
        children: propose?.propose_category?.name,
      },
      {
        key: '3',
        label: 'Thời gian gửi yêu cầu',
        children: dayjs(propose?.created_at).format('HH:mm - DD/MM/YYYY'),
      },
      {
        key: '6',
        label: 'Trạng thái',
        children: generateStatus(propose?.status),
      },
      {
        key: '8',
        label: 'Người yêu cầu',
        children: (
          <div className="flex items-center gap-[8px]">
            <Avatar
              shape="circle"
              src={propose?.account?.avatar}
              style={{
                backgroundColor: randomColor(propose?.account?.full_name),
              }}
            >
              {String(propose?.account?.full_name).charAt(0).toUpperCase()}
            </Avatar>
            <span>{propose?.account?.full_name}</span>
          </div>
        ),
      },
    ],
    [
      {
        key: 'component',
        component: <Divider />,
      },
    ],
    [
      {
        key: '5',
        label: 'Ngày yêu cầu',
        children: (
          <div>
            {propose?.date_holidays?.map((d: any, index: number) => {
              const start = dayjs(d?.start_date).format('DD/MM/YYYY HH:mm')
              const end = dayjs(d?.end_date).format('DD/MM/YYYY HH:mm')

              return (
                <div
                  key={index}
                  className="flex w-max items-center justify-center rounded-full bg-[#f6f6f6] px-[12px] py-[4px]"
                >{`${start} - ${end}`}</div>
              )
            })}
          </div>
        ),
      },
      {
        key: '4',
        label: 'Tổng thời gian',
        children: '',
      },
      {
        key: '7',
        label: 'Lý do đăng ký nghỉ',
        children: propose?.description,
      },
    ],
  ]

  return (
    <div className="h-[100vh] bg-[#f6f6f6]">
      <PageHeader title="Chi tiết yêu cầu" />

      <div className="p-[24px]">
        <div className="rounded-[16px] bg-[#fff] p-[24px]">
          <RequestInfo info={items} />

          <div className="mt-[24px] flex items-center gap-[12px]">
            {isAdmin ? (
              <>
                <Button
                  icon={<CheckOutlined />}
                  type="primary"
                  style={{ backgroundColor: '#389E0D' }}
                >
                  Duyệt
                </Button>
                <Button icon={<CloseOutlined />} type="primary" danger>
                  TỪ chối
                </Button>
              </>
            ) : (
              <>
                <Button icon={<EditOutlined />} type="primary">
                  Sửa yêu cầu
                </Button>
                <Button icon={<DeleteOutlined />} danger>
                  Hủy yêu cầu
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
