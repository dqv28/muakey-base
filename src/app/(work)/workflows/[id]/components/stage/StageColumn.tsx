import { Col } from '@/ui'
import { ReloadOutlined } from '@ant-design/icons'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
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
    console.log('render')
    const [loading, setLoading] = useState(false)

    const params = useParams()
    const { attributes, setNodeRef, transform, transition } = useSortable({
      id: stage?.id,
      data: stage,
    })

    const StageColumnStyle: React.CSSProperties = useMemo(
      () => ({
        transform: CSS.Translate.toString(transform),
        transition,
      }),
      [transform, transition],
    )

    const handleRefresh = useCallback(async () => {
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
    }, [params?.id])

    const stageTasksLength = useMemo(() => stage?.tasks?.length, [stage?.tasks])
    const stageExpiredAfterHours = useMemo(
      () => stage?.expired_after_hours,
      [stage?.expired_after_hours],
    )

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
                {stageTasksLength} Nhiệm vụ
              </span>

              {![0, 1].includes(stage.index) && (
                <span className="text-[12px] leading-none text-[#aaa]">
                  {!!stageExpiredAfterHours
                    ? `Thời hạn: ${stageExpiredAfterHours}h`
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
