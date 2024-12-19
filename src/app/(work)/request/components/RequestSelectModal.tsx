import { withApp } from '@/hoc'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons'
import {
  App,
  Button,
  Form,
  Input,
  List,
  Modal,
  ModalProps,
  Popconfirm,
  Typography,
} from 'antd'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { addProposeCategoryAction, deleteProposeCategoryAction } from './action'

type RequestSelectModalProps = Omit<ModalProps, 'onCancel'> & {
  dataSource?: any[]
  onItemClick?: (id: number) => void
  onCancel?: () => void
}

const RequestSelectModal: React.FC<RequestSelectModalProps> = ({
  dataSource,
  onItemClick,
  onCancel,
  ...rest
}) => {
  const [loading, setLoading] = useState(false)
  const [editText, setEditText] = useState('')
  const [group, setGroup] = useState<{
    name: string
    description: string
  }>({
    name: '',
    description: '',
  })
  const { message } = App.useApp()
  const router = useRouter()

  const handleAddGroup = async (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    e.preventDefault()
    setLoading(true)

    if (group.name === '') {
      setLoading(false)
      message.error('Tên nhóm không được để trống')
      return
    }

    try {
      const { message: msg, errors } = await addProposeCategoryAction(group)

      if (errors) {
        message.error(msg)
        setLoading(false)
        return
      }

      setLoading(false)
      router.refresh()
    } catch (error) {
      setLoading(false)
      throw new Error(String(error))
    }
  }

  const handleDeleteGroup = async (id: number) => {
    try {
      const { message: msg, errors } = await deleteProposeCategoryAction(id)

      if (errors) {
        message.success(msg)
        return
      }

      message.success('Xóa thành công')
      router.refresh()
    } catch (error) {
      throw new Error(String(error))
    }
  }

  return (
    <Modal
      onCancel={onCancel}
      title="LỰA CHỌN NHÓM ĐỀ XUẤT"
      destroyOnClose
      modalRender={(dom) => <Form layout="vertical">{dom}</Form>}
      footer={<></>}
      {...rest}
    >
      <List
        itemLayout="horizontal"
        dataSource={dataSource}
        renderItem={(item) => (
          <List.Item
            className="group -mx-[24px] cursor-pointer hover:bg-[#fafafa]"
            onClick={() => {
              onCancel?.()
              onItemClick?.(item?.id)
            }}
          >
            <List.Item.Meta
              className="px-[24px]"
              title={
                <div className="flex items-start justify-between">
                  <Typography.Text
                    className="flex-1"
                    editable={{ onChange: setEditText }}
                    onClick={(e) => {
                      e.stopPropagation()
                      console.log('Click')
                    }}
                  >
                    {item?.name}
                  </Typography.Text>
                  <div className="flex items-center gap-[4px]">
                    {/* <EditOutlined
                      onClick={(e) => {
                        e.stopPropagation()
                      }}
                    /> */}
                    <Popconfirm
                      title="Xóa nhóm đề xuất?"
                      description="Xác nhận xóa nhóm đề xuất này?"
                      onConfirm={(e) => {
                        e?.stopPropagation()
                        handleDeleteGroup(item?.id)
                      }}
                      onCancel={(e) => e?.stopPropagation()}
                      okText="Xác nhận"
                      cancelText="Hủy bỏ"
                    >
                      <CloseOutlined
                        className="visible p-[6px] opacity-0 transition-all group-hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                      />
                    </Popconfirm>
                  </div>
                </div>
              }
              description={item.description}
            />
          </List.Item>
        )}
      />
      <div className="mt-[16px] flex items-center gap-[12px]">
        <Input
          placeholder="Tên nhóm đề xuất"
          onChange={(e) =>
            setGroup((prev) => ({
              ...prev,
              name: e.target.value || '',
            }))
          }
        />
        <Input
          placeholder="Mô tả"
          onChange={(e) =>
            setGroup((prev) => ({
              ...prev,
              description: e.target.value || '',
            }))
          }
        />
        <Button
          className="!w-[100px]"
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddGroup}
          loading={loading}
        />
      </div>
    </Modal>
  )
}

export default withApp(RequestSelectModal)
