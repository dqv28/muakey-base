import pdf from '@/assets/images/pdf.png'
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import dayjs from 'dayjs'
import Image from 'next/image'
import React from 'react'
import ContractDocumentDetailModal from './ContractDocumentDetailModal'

export type ContractDocumentItemCardProps = {
  item?: any
}

const ContractDocumentItemCard: React.FC<ContractDocumentItemCardProps> = ({
  item,
}) => {
  return (
    <Card
      classNames={{
        body: '!py-[8px] !pl-[8px] !pr-[24px]',
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[8px]">
          <Image
            className="aspect-[39/48]"
            src={pdf.src}
            alt="pdf"
            width={39}
            height={48}
          />
          <div className="flex flex-col gap-[4px]">
            <div className="text-[16px] leading-[24px] font-[500]">
              {item?.name}
            </div>
            <div className="flex items-center gap-[4px] text-[12px] leading-[20px] font-[400] text-[#000000A6]">
              <span>{item?.size}</span>{' '}
              {item?.size && (
                <div className="size-[2px] rounded-full bg-[#000000A6]" />
              )}{' '}
              <span>{dayjs(item?.time).format('HH:mm - DD/MM/YYYY')}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-[16px] text-[16px] text-[#00000073]">
          <ContractDocumentDetailModal item={item}>
            <EyeOutlined />
          </ContractDocumentDetailModal>
          <DownloadOutlined />
        </div>
      </div>
    </Card>
  )
}

export default ContractDocumentItemCard
