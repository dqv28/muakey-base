import { Col, Row } from 'antd'
import clsx from 'clsx'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type ItemType = {
  label?: string
  value?: string
}

export type CheckInFormOptionsProps = {
  items?: ItemType[]
  params?: any
}

const CheckInFormOptions: React.FC<CheckInFormOptionsProps> = ({
  items,
  params,
}) => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const query = (p: string) => {
    const url = new URLSearchParams(searchParams.toString())

    url.set('form', String(p))

    router.push(`?${url.toString()}`)
  }

  return (
    <Row gutter={20}>
      {items?.map((item: ItemType) => (
        <Col span={6}>
          <div
            className={clsx(
              'flex !h-[40px] w-full cursor-pointer items-center justify-center rounded-[4px] p-[16px] transition-all',
              {
                'bg-[#fff]': item?.value !== params?.search,
                'bg-[#1677ff] text-[#fff]': item?.value === params?.search,
              },
            )}
            onClick={() => query(item?.value || '')}
          >
            {item?.label}
          </div>
        </Col>
      ))}
    </Row>
  )
}

export default CheckInFormOptions
