import { Button, Modal } from '@/ui'
import { DeleteOutlined } from '@/ui/icons'
import { ExclamationCircleFilled } from '@ant-design/icons'
import React, { useState } from 'react'

type WorkFlowDeleteButtonProps = {
  onDelete?: () => void
}

const WorkFlowDeleteButton: React.FC<WorkFlowDeleteButtonProps> = ({
  onDelete,
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        icon={<DeleteOutlined />}
        shape="circle"
        variant="outline"
        onClick={() => setOpen(true)}
      />
      <Modal
        headerClassName="bg-[#fff] !pb-0"
        open={open}
        onOpenChange={setOpen}
        okButtonProps={{
          onClick: () => {
            onDelete?.()
          },
          size: 'large',
        }}
        cancelButtonProps={{
          onClick: () => setOpen(false),
          size: 'large',
        }}
      >
        <div className="-mt-[20px] flex items-center justify-center gap-[12px] text-[#000]">
          <ExclamationCircleFilled className="text-[36px] text-[#c65144]" />
          Xác nhận muốn xóa quy trình này?
        </div>
      </Modal>
    </>
  )
}

export default WorkFlowDeleteButton
