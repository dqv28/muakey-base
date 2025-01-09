import { Col } from '@/ui'
import {
  CaretRightOutlined,
  ExclamationCircleOutlined,
  FilterFilled,
  ReloadOutlined,
} from '@ant-design/icons'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Checkbox, Collapse, Dropdown, Tooltip } from 'antd'
import clsx from 'clsx'
import { useParams } from 'next/navigation'
import React, { memo, useCallback, useMemo, useState } from 'react'
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

    const filteredOptions = [
      { label: '>1k views', value: 'views' },
      { label: '>7 days', value: 'days' },
    ]

    return (
      <Col
        className={clsx('w-[272px] overflow-hidden border-r border-[#eee]', {
          'bg-[#fff3f3]': stage.index === 0,
          'bg-[#fff]': stage.index === 1,
          'bg-[#f6f6f6]': ![0, 1].includes(stage.index),
        })}
        key={stage.id}
        ref={setNodeRef}
        style={StageColumnStyle}
        {...{
          ...attributes,
          role: 'article',
        }}
      >
        <StageHeader
          className={clsx({
            'bg-[#ffe8e8] text-[#c34343]': stage.index === 0,
            'bg-[#deffdb]': stage.index === 1,
            'bg-[#f6f6f6]': ![0, 1].includes(stage.index),
          })}
          title={
            <span>
              {stage.name}{' '}
              {![0, 1].includes(stage.index) && stage?.description && (
                <Tooltip
                  overlayInnerStyle={{ color: '#000' }}
                  color="#fff"
                  title={
                    <div
                      dangerouslySetInnerHTML={{ __html: stage?.description }}
                    />
                  }
                  destroyTooltipOnHide
                >
                  <ExclamationCircleOutlined className="text-[12px]" />
                </Tooltip>
              )}
            </span>
          }
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
              {stage.index === 1 && (
                <Dropdown
                  trigger={['click']}
                  dropdownRender={() => (
                    <div className="rounded-[8px] bg-[#fff] px-[16px] py-[12px] shadow-lg">
                      <Checkbox.Group
                        className="flex-col space-y-[8px]"
                        options={filteredOptions}
                      />
                    </div>
                  )}
                  placement="bottomRight"
                >
                  <FilterFilled className="ml-[8px] cursor-pointer text-[12px] text-[#00000099]" />
                </Dropdown>
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

        {![0, 1].includes(stage.index) && stage?.description && (
          <Collapse
            rootClassName="rounded-none border-l-0 border-r-0 border-t-0 border-b border-[#eee]"
            className="rounded-none bg-[#fff]"
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            items={[
              {
                key: '1',
                label: (
                  <div className="cursor-pointer leading-[22px]">
                    Mô tả giai đoạn
                  </div>
                ),
                children: (
                  <div
                    dangerouslySetInnerHTML={{ __html: stage?.description }}
                  />
                ),
              },
            ]}
          />
        )}

        <div className="no-scroll h-[calc(100vh-171px)] overflow-auto pb-[22px]">
          <TaskList
            tasks={stage?.tasks}
            stageId={stage?.id}
            loading={loading}
            userId={userId}
            options={options}
          />
        </div>
      </Col>
    )
  },
)

StageColumn.displayName = 'Stage column'

export default StageColumn
