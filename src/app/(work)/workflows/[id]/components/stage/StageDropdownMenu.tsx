'use client'

import { CaretDownFilled } from '@ant-design/icons'
import { Dropdown, DropdownProps, Popconfirm } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { deleteStageByIdAction } from '../../../action'
import StageModalForm from './StageModalForm'

type StageDropdownMenuProps = DropdownProps & {
  stage?: any
}

const StageDropdownMenu: React.FC<StageDropdownMenuProps> = ({
  stage,
  ...rest
}) => {
  const router = useRouter()

  const handleDelete = async () => {
    try {
      const { error, success } = await deleteStageByIdAction(stage?.id || 0)

      if (error) {
        toast.error(error)

        return false
      }

      toast.success(success)
      router.refresh()
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return (
    <Dropdown
      rootClassName="!z-auto"
      placement="bottomRight"
      trigger={['click']}
      dropdownRender={() => (
        <div className="mt-[4px] w-[240px] rounded-[4px] bg-[#fff] p-[8px] shadow-[0_2px_6px_0_rgba(0,0,0,0.1)]">
          <StageModalForm
            title={`Chỉnh sửa giai đoạn ${stage?.name}`}
            initialValues={{
              name: stage?.name,
              description: stage?.description,
            }}
            query={{
              stage_id: stage?.id,
            }}
            action="edit"
          >
            <div className="cursor-pointer bg-transparent px-[10px] py-[6px] text-[14px] leading-[17px] transition-all hover:bg-[#f8f8f8]">
              Chỉnh sửa giai đoạn
            </div>
          </StageModalForm>
          <StageModalForm
            query={{
              left: 1,
              index: stage?.index,
            }}
          >
            <div className="cursor-pointer bg-transparent px-[10px] py-[6px] text-[14px] leading-[17px] transition-all hover:bg-[#f8f8f8]">
              Thêm 1 giai đoạn bên trái
            </div>
          </StageModalForm>
          <StageModalForm
            query={{
              right: 1,
              index: stage?.index,
            }}
          >
            <div className="cursor-pointer bg-transparent px-[10px] py-[6px] text-[14px] leading-[17px] transition-all hover:bg-[#f8f8f8]">
              Thêm 1 giai đoạn bên phải
            </div>
          </StageModalForm>
          <Popconfirm
            title={
              <div>
                Xác nhận xóa giai đoạn{' '}
                <span className="font-[500]">{stage?.name}</span>
              </div>
            }
            onConfirm={handleDelete}
          >
            <div className="cursor-pointer bg-transparent px-[10px] py-[6px] text-[14px] leading-[17px] text-[#cc1111] transition-all hover:bg-[#f8f8f8]">
              Xóa giai đoạn
            </div>
          </Popconfirm>
        </div>
      )}
      {...rest}
    >
      <CaretDownFilled className="text-[12px]" />
    </Dropdown>
  )
}

export default StageDropdownMenu
