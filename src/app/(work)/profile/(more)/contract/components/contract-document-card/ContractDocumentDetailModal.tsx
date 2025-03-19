'use client'

import { randomColor } from '@/libs/utils'
import { LinkOutlined } from '@ant-design/icons'
import { Avatar, Modal, ModalProps } from 'antd'
import React, { useState } from 'react'
import Detail from '../Detail'

type ContractDocumentDetailModalProps = ModalProps & {
  children?: React.ReactNode
  item?: any
}

const ContractDocumentDetailModal: React.FC<
  ContractDocumentDetailModalProps
> = ({ children, item, ...props }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
        {children}
      </div>

      <Modal
        title="Xem giấy tờ nhân sự"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={846}
        classNames={{
          body: '!space-y-[16px]',
        }}
        {...props}
      >
        <Detail
          className="flex-1"
          label="Loại giấy tờ"
          value={'Giấy khám sức khoẻ'}
        />

        <div className="flex items-start gap-[16px]">
          <Detail className="flex-1" label="Ngày cấp" value={'18/07/2022'} />
          <Detail
            className="flex-1"
            label="Ngày hết hạn"
            value={'18/07/2022'}
          />
        </div>

        <Detail
          className="flex-1"
          label="Nơi cấp"
          value={'Bệnh viện đa khoa Hồng Ngọc'}
        />

        <div className="flex items-start gap-[16px]">
          <Detail className="flex-1" label="Ngày tạo" value={'18/07/2022'} />
          <Detail
            className="flex-1"
            label="Tạo bởi"
            value={
              <div className="flex items-center gap-[8px]">
                <Avatar
                  style={{ backgroundColor: randomColor('Lê Song Trúc') }}
                  size="small"
                >
                  L
                </Avatar>
                <span>Lê Song Trúc</span>
              </div>
            }
          />
        </div>

        <Detail
          label="Tệp đính kèm"
          value={
            <div className="flex items-center gap-[8px]">
              <LinkOutlined className="!text-[#00000073]" />
              <span className="text-[14px] leading-[22px] font-[400] text-[#1890FF]">
                {item?.name}
              </span>
            </div>
          }
        />

        <Detail
          label="Ghi chú"
          value={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
          }
        />
      </Modal>
    </>
  )
}

export default ContractDocumentDetailModal
