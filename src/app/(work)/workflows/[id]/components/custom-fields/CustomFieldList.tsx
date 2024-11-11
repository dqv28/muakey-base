'use client'

import {
  CloseOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons'
import { List, Modal } from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { deleteCustomFieldByIdAction } from '../../../action'
import CustomFieldsModalForm from './CustomFieldsModalForm'

type CustomFieldListProps = {
  dataSource?: any
  options?: any
}

const CustomFieldList: React.FC<CustomFieldListProps> = ({
  dataSource,
  options,
}) => {
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)
  const router = useRouter()

  const { stages } = options as any
  const stageIds = Array.from(new Set(dataSource?.map((d: any) => d.stage_id)))

  const handleDelete = async (id: number) => {
    try {
      const { success, error } = await deleteCustomFieldByIdAction(id)

      if (error) {
        toast.error(error)

        return
      }

      toast.success(success)
      setConfirmModalOpen(false)
      router.refresh()
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return (
    <div>
      {stageIds?.map((id) => {
        const title = stages?.find((s: any) => s.id === id)?.name
        const filteredFields = dataSource?.filter((d: any) => d.stage_id === id)

        return (
          <>
            <div className="-mx-[24px] border-y border-[#eee] bg-[#f9f9f9] px-[24px] py-[12px] text-[11px] font-[500] text-[#17C286]">
              {title}
            </div>
            <List
              dataSource={filteredFields}
              renderItem={(item: any) => {
                return (
                  <>
                    <List.Item className="group">
                      <div>{item?.name}</div>
                      <div className="flex items-center gap-[12px]">
                        <div className="flex items-center gap-[12px]">
                          <CustomFieldsModalForm
                            action="edit"
                            options={{
                              initialValues: {
                                ...item,
                                require: item?.require === 1 ? true : false,
                              },
                              stages,
                              fieldId: item?.id,
                            }}
                          >
                            <EditOutlined className="hidden cursor-pointer text-[14px] text-[#aaa] group-hover:block" />
                          </CustomFieldsModalForm>
                          <CloseOutlined
                            className="hidden cursor-pointer text-[14px] text-[#aaa] group-hover:block"
                            onClick={() => setConfirmModalOpen(true)}
                          />
                          {item?.require === 1 ? (
                            <span className="inline-block w-[110px] text-right text-[12px] text-[#c34343]">
                              * BẮT BUỘC
                            </span>
                          ) : (
                            <span className="inline-block w-[110px] text-right text-[12px] text-[#aaa]">
                              KHÔNG BẮT BUỘC
                            </span>
                          )}
                        </div>
                        <div className="ml-[12px] min-w-[90px] rounded-[3px] bg-[#e5ecf3] p-[6px] text-center leading-[20px]">
                          {item?.type}
                        </div>
                      </div>

                      <Modal
                        open={confirmModalOpen}
                        onOk={() => handleDelete(item?.id)}
                        onCancel={() => setConfirmModalOpen(false)}
                        bodyProps={{
                          className: 'pt-[24px]',
                        }}
                      >
                        <div className="flex items-center gap-[24px]">
                          <ExclamationCircleFilled className="text-[42px] text-[#c65144]" />
                          <span>
                            Bạn có chắc chắn muốn xoá trường dữ liệu tuỳ chỉnh
                            này không? Bạn không thể khôi phục!
                          </span>
                        </div>
                      </Modal>
                    </List.Item>
                  </>
                )
              }}
            />
          </>
        )
      })}
    </div>
  )
}

export default CustomFieldList
