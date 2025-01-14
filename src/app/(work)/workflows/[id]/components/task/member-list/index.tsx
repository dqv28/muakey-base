'use client'

import { withApp } from '@/hoc'
import { randomColor } from '@/libs/utils'
import { App, Avatar } from 'antd'
import React, { useContext } from 'react'
import { StageContext } from '../../WorkflowPageLayout'
import { editTaskAction } from '../action'

type MemberListProps = {
  members?: any[]
  options?: any
  onCompleted?: () => void
}

const MemberList: React.FC<MemberListProps> = ({
  members,
  options,
  onCompleted,
}) => {
  const { setStages } = useContext(StageContext)

  const { taskId, stageId } = options
  const { message } = App.useApp()

  const handleAssign = async (id: number) => {
    try {
      const { message: msg, errors } = await editTaskAction(taskId, {
        account_id: id,
      })

      setStages((prevStages: any[]) => {
        const newStages = [...prevStages]

        return newStages?.map((stage: any) => {
          if (stage?.id === `stage_${stageId}`) {
            return {
              ...stage,
              tasks: stage?.tasks?.map((t: any) => {
                if (t?.id === taskId) {
                  return {
                    ...t,
                    account_id: id,
                    expired: stage.expired_after_hours
                      ? new Date().setHours(
                          new Date().getHours() + stage.expired_after_hours,
                        )
                      : null,
                  }
                }

                return t
              }),
            }
          }

          return stage
        })
      })

      if (errors) {
        message.error(msg)
        return
      }

      message.success('Nhiệm vụ đã được giao.')
      onCompleted?.()
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return (
    members &&
    members.map((mem: any) => (
      <div
        className="flex cursor-pointer items-center gap-[12px] px-[20px] py-[16px] leading-[20px] hover:bg-[#f6f6f6]"
        key={mem?.id}
        onClick={() => handleAssign(mem?.id)}
      >
        <Avatar
          src={mem?.avatar}
          size={32}
          shape="circle"
          style={{ backgroundColor: randomColor(mem?.full_name) }}
        >
          {String(mem?.full_name).charAt(0).toLocaleUpperCase()}
        </Avatar>
        <div>
          <div className="text-[14px] text-[#111]">{mem?.full_name}</div>
          <div className="text-[13px]">
            {mem?.username} {mem?.position ? `· ${mem?.position}` : ''}
          </div>
        </div>
      </div>
    ))
  )
}

export default withApp(MemberList)
