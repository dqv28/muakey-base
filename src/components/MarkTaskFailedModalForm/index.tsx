import { editTaskAction } from '@/app/(work)/workflows/action'
import { Form, FormInstance, Input, Modal, toast } from '@/ui'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'

type MarkTaskFailedModalFormProps = {
  children?: React.ReactNode
  options?: any
}

const MarkTaskFailedModalForm: React.FC<MarkTaskFailedModalFormProps> = ({
  children,
  options,
}) => {
  const [markOpen, setMarkOpen] = useState(false)
  const formRef = useRef<FormInstance>(null)
  const { failedStageId, task } = options
  const router = useRouter()

  const handleSubmit = async (formData: any) => {
    if (!formData?.reason) {
      formRef.current?.setError('reason', {
        message: 'Nhập lý do thất bại.',
      })

      return
    }

    try {
      const { error } = await editTaskAction(task?.id, {
        stageId: failedStageId,
        data: {
          reason: formData?.reason,
        },
      })

      if (error) {
        toast.error(error)
        setMarkOpen(false)
        return
      }

      setMarkOpen(false)
      router.refresh()
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return (
    <>
      <div onClick={() => setMarkOpen(true)}>{children}</div>
      <Modal
        title="ĐÁNH DẤU NHIỆM VỤ THẤT BẠI"
        open={markOpen}
        onOpenChange={(o) => setMarkOpen(o)}
        width={590}
        okButtonProps={{
          children: 'Đánh dấu thất bại',
          size: 'large',
          onClick: () => {
            formRef.current?.submit()
          },
        }}
        cancelButtonProps={{
          children: 'Bỏ qua',
          size: 'large',
          onClick: () => setMarkOpen(false),
        }}
      >
        <Form
          onSubmit={handleSubmit}
          formRef={formRef}
          values={{
            name: task?.name,
          }}
        >
          <Form.Item
            name="name"
            label={
              <span className="inline-block w-[130px]">
                Tên luồng công việc
              </span>
            }
            type="horizontal"
            disabled
          >
            <Input placeholder="Tên luồng công việc" />
          </Form.Item>
          <Form.Item
            name="reason"
            label={
              <span className="inline-block w-[130px]">Lý do thất bại *</span>
            }
            type="horizontal"
            rules={{
              required: 'Nhập lý do thất bại.',
            }}
          >
            <Input placeholder="Lý do thất bại" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default MarkTaskFailedModalForm
