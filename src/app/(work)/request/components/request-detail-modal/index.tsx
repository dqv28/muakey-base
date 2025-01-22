'use client'

import { Modal, ModalProps } from 'antd'
import React, { useState } from 'react'

type RequestDetailModalProps = ModalProps & {
  children?: React.ReactNode
  initialValues?: any
}

const RequestDetailModal: React.FC<RequestDetailModalProps> = ({
  children,
  initialValues,
}) => {
  const [open, setOpen] = useState(false)
  const [request, setRequest] = useState<any>({})

  console.log(initialValues?.request)

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title="Chi tiết đề xuất"
        footer={null}
        width={760}
      >
        Request Detail
      </Modal>
    </>
  )
}

export default RequestDetailModal
