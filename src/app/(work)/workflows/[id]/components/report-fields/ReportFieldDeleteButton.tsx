'use client'

import { CloseOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import { Modal } from 'antd'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { deleteReportFieldAction } from '../../../action'

const ReportFieldDeleteButton: React.FC<{
  fieldId: number
}> = ({ fieldId }) => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)

  const handleDelete = async () => {
    try {
      const { success, error } = await deleteReportFieldAction(fieldId)

      if (error) {
        toast.error(error)
        return
      }

      toast.success(success)
      setConfirmModalOpen(false)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return (
    <>
      <CloseOutlined
        className="hidden cursor-pointer text-[14px] text-[#aaa] group-hover:block"
        onClick={() => setConfirmModalOpen(true)}
      />
      <Modal
        open={confirmModalOpen}
        onOk={() => handleDelete()}
        onCancel={() => setConfirmModalOpen(false)}
        bodyProps={{
          className: 'pt-[24px]',
        }}
      >
        <div className="flex items-center gap-[24px]">
          <ExclamationCircleFilled className="text-[42px] text-[#c65144]" />
          <span>
            Bạn có chắc chắn muốn xoá trường dữ liệu tuỳ chỉnh này không? Bạn
            không thể khôi phục!
          </span>
        </div>
      </Modal>
    </>
  )
}

export default ReportFieldDeleteButton
