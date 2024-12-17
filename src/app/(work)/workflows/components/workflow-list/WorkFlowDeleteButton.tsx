import { ExclamationCircleFilled } from '@ant-design/icons'
import { Modal } from 'antd'
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
      <div className="text-[#cc1111]" onClick={() => setOpen(true)}>
        Xóa danh mục
      </div>
      <Modal open={open} onCancel={() => setOpen(false)} onOk={onDelete}>
        <div className="flex items-center gap-[12px] text-[#000]">
          <ExclamationCircleFilled className="text-[36px] text-[#c65144]" />
          Xác nhận muốn xóa danh mục này?
        </div>
      </Modal>
    </>
  )
}

export default WorkFlowDeleteButton
