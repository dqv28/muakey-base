import { LinkOutlined } from '@ant-design/icons'
import { Modal, ModalProps } from 'antd'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import Detail from '../Detail'

export type ContractDetailModalProps = ModalProps & {
  children?: React.ReactNode
  item?: any
}

const ContractDetailModal: React.FC<ContractDetailModalProps> = ({
  children,
  item,
  ...props
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
        {children}
      </div>

      <Modal
        title="Xem hợp đồng"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={846}
        classNames={{
          body: '!space-y-[16px]',
        }}
        {...props}
      >
        <div className="flex items-start gap-[16px]">
          <Detail
            className="flex-1"
            label="Loại hợp đồng"
            value={item?.category?.name}
          />
          <Detail className="flex-1" label="Trạng thái" value={item?.status} />
        </div>

        <div className="flex items-start gap-[16px]">
          <Detail
            className="flex-1"
            label="Ngày bắt đầu"
            value={dayjs(item?.start_date).format('DD/MM/YYYY')}
          />
          <Detail
            className="flex-1"
            label="Ngày kết thúc"
            value={dayjs(item?.end_date).format('DD/MM/YYYY')}
          />
        </div>

        <div className="flex items-start gap-[16px]">
          <Detail
            className="flex-1"
            label="Ngày tạo"
            value={dayjs(item?.created_at).format('DD/MM/YYYY')}
          />
          <Detail className="flex-1" label="Tạo bởi" value={item?.account_id} />
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

        <Detail label="Ghi chú" value={item?.note} />
      </Modal>
    </>
  )
}

export default ContractDetailModal
