'use client'

import MarkTaskFailedModalForm from '@/components/MarkTaskFailedModalForm'
import { withApp } from '@/hoc'
import { DoubleRightOutlined } from '@ant-design/icons'
import { App, Button, Dropdown } from 'antd'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { moveStageAction } from '../action'

type PageHeaderActionProps = {
  options?: any
}

const PageHeaderAction: React.FC<PageHeaderActionProps> = ({ options }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { message } = App.useApp()
  const router = useRouter()

  const { stages, user, ...rest } = options

  const handleStageClick = async (stage: any) => {
    if (rest?.task?.stage_id === stage?.id) return

    if (!rest?.task.account_id && [1].includes(stage?.index)) {
      message.error('Nhiệm vụ chưa được giao.')
      return
    }

    if (!String(user?.role).toLocaleLowerCase().includes('admin')) {
      if (rest?.task.account_id !== user?.id) {
        message.error(
          'Không thể kéo nhiệm vụ của người khác hoặc chưa được giao.',
        )
        return
      }
    }

    try {
      const { message: msg, errors } = await moveStageAction(
        rest?.task?.id,
        stage?.id,
      )

      if (errors) {
        message.error(msg)
        return
      }

      message.success('Chuyển giai đoạn thành công')
      router.refresh()
      setDropdownOpen(false)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return (
    <div className="flex items-center gap-[8px]">
      <MarkTaskFailedModalForm options={rest}>
        <Button className="font-[500]" color="danger" variant="filled">
          Đánh dấu thất bại
        </Button>
      </MarkTaskFailedModalForm>
      <Dropdown
        trigger={['click']}
        rootClassName="!z-auto"
        placement="bottomLeft"
        open={dropdownOpen}
        onOpenChange={setDropdownOpen}
        dropdownRender={() => (
          <div className="mt-[4px] w-[200px] rounded-[4px] bg-[#fff] p-[8px] shadow-[0_2px_6px_0_rgba(0,0,0,0.1)]">
            {stages?.map((stage: any) => (
              <div
                className={clsx(
                  'cursor-pointer bg-transparent px-[10px] py-[6px] text-[14px] leading-[17px] transition-all hover:bg-[#f8f8f8]',
                  {
                    'text-[#d96c6c]': stage?.index === 0,
                    'text-[#42bb14]': stage?.index === 1,
                  },
                )}
                key={stage?.id}
                onClick={() => handleStageClick(stage)}
              >
                {stage?.name}
              </div>
            ))}
          </div>
        )}
      >
        <Button icon={<DoubleRightOutlined className="text-[16px]" />} />
      </Dropdown>
    </div>
  )
}

export default withApp(PageHeaderAction)
