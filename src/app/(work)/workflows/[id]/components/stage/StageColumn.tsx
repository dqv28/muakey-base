import { Col } from '@/ui'
import { ReloadOutlined } from '@ant-design/icons'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'
import { useParams } from 'next/navigation'
import React, { memo, useState } from 'react'
import TaskList from '../task/TaskList'
import StageDropdownMenu from './StageDropdownMenu'
import StageHeader from './StageHeader'
import { refreshDataAction } from './action'

type StageColumnProps = {
  stage?: any
  userId?: number
  options?: any
}

const StageColumn: React.FC<StageColumnProps> = memo(
  ({ stage, userId, options }) => {
    const [loading, setLoading] = useState(false)

    const params = useParams()
    const { attributes, setNodeRef, transform, transition } = useSortable({
      id: stage?.id,
      data: stage,
    })

    const StageColumnStyle: React.CSSProperties = {
      transform: CSS.Translate.toString(transform),
      transition,
    }

    const handleRefresh = async () => {
      setLoading(true)

      try {
        await refreshDataAction({
          workflow_id: params?.id,
        })
        setLoading(false)

        if (typeof window !== undefined) {
          window.location.reload()
        }
      } catch (error) {
        setLoading(false)
        throw new Error(String(error))
      }
    }

    return (
      <div
        ref={setNodeRef}
        style={StageColumnStyle}
        {...{
          ...attributes,
          role: 'article',
        }}
      >
        <Col
          className={clsx('w-[272px] overflow-hidden border-r border-[#eee]', {
            'bg-[#fff3f3]': stage.index === 0,
            'bg-[#fff]': stage.index === 1,
            'bg-[#f6f6f6]': ![0, 1].includes(stage.index),
          })}
          key={stage.id}
        >
          <StageHeader
            className={clsx({
              'bg-[#ffe8e8] text-[#c34343]': stage.index === 0,
              'bg-[#deffdb]': stage.index === 1,
              'bg-[#f6f6f6]': ![0, 1].includes(stage.index),
            })}
            title={stage.name}
            extra={
              <>
                {![0, 1].includes(stage?.index) && (
                  <StageDropdownMenu stage={stage} />
                )}
                {[1].includes(stage?.index) && (
                  <ReloadOutlined
                    className="cursor-pointer text-[10px]"
                    onClick={handleRefresh}
                  />
                )}
              </>
            }
          >
            <div className="flex items-center justify-between">
              <span
                className={clsx(
                  'text-[12px] leading-none text-[#aaa]',
                  stage.index === 0 && 'text-[#c3434399]',
                )}
              >
                {stage?.tasks?.length} Nhiệm vụ
              </span>

              {![0, 1].includes(stage.index) && (
                <span className="text-[12px] leading-none text-[#aaa]">
                  {!!stage?.expired_after_hours
                    ? `Thời hạn: ${stage?.expired_after_hours}h`
                    : 'Không thời hạn'}
                </span>
              )}
            </div>
          </StageHeader>

          <TaskList
            stageId={stage?.id}
            loading={loading}
            userId={userId}
            options={options}
          />
        </Col>
      </div>
    )
  },
)

StageColumn.displayName = 'Stage column'

export default StageColumn
