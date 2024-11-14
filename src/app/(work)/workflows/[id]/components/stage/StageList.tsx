'use client'

import { Col, Row, toast } from '@/ui'
import { PlusOutlined } from '@/ui/icons'
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable'
import clsx from 'clsx'
import { cloneDeep } from 'lodash'
import { useRouter } from 'next/navigation'
import React, { createContext, useCallback, useState } from 'react'
import { addTaskReportAction, moveStageAction } from '../../../action'
import StageColumn from './StageColumn'
import StageModalForm from './StageModalForm'
import TaskReportsModalForm from './TaskReportsModalForm'

export type StageListProps = {
  dataSource?: any
  members?: any
  isEmpty?: boolean
}

export const StageContext = createContext<any>({})

const StageList: React.FC<StageListProps> = ({
  dataSource,
  isEmpty,
  members,
}) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier>()
  const [stageId, setStageId] = useState<number>(0)
  const [taskId, setTaskId] = useState<number>(0)
  const [stages, setStages] = useState(dataSource || [])
  const [open, setOpen] = useState(false)
  const [dragEvent, setDragEvent] = useState<DragEndEvent>()

  const router = useRouter()

  const failedStageId = stages?.find((stage: any) => stage.index === 0)?.['id']

  const mouseSensor = useSensor(MouseSensor)
  const touchSensor = useSensor(TouchSensor)

  const sensors = useSensors(mouseSensor, touchSensor)

  const handleDrag = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) return

    if (active.id !== over.id) {
      const {
        data: { current: overData },
      } = over
      const {
        id: activeTaskId,
        data: { current: activeData },
      } = active

      if (!overData || !activeData) return

      const overIndex = stages?.find(
        (stage: any) => stage.id === (overData.stage_id || overData.id),
      )?.index

      if (!activeData.account_id && [0, 1].includes(overIndex)) {
        toast.error('Nhiệm vụ chưa được giao.')
        return
      }

      setStages((prevStages: any) => {
        const newStages = cloneDeep(prevStages)

        const activeColumn = newStages.find(
          (s: any) => s.id === activeData.stage_id,
        )
        const overColumn = newStages.find(
          (s: any) => s.id === (overData.stage_id || overData.id),
        )

        if (activeColumn) {
          activeColumn.tasks = activeColumn.tasks.filter(
            (t: any) => t.id !== activeTaskId,
          )
        }

        if (overColumn) {
          overColumn.tasks = [
            {
              ...activeData,
              stage_id: overData.stage_id || overData.id,
            },
            ...overColumn.tasks,
          ]
        }

        return newStages
      })

      try {
        await moveStageAction(
          activeTaskId as number,
          overData.stage_id || overData.id,
        )

        router.refresh()
      } catch (error: any) {
        throw new Error(error)
      }
    }
  }

  const handleDragEnd = useCallback(async (e: DragEndEvent) => {
    setDragEvent(e)

    const { active, over } = e

    const {
      data: { current: activeData },
    } = active

    if (!over) return

    const {
      data: { current: overData },
    } = over

    if (!overData || !activeData) return

    const activeIndex = stages?.find(
      (stage: any) => stage.id === activeData.stage_id,
    )?.index
    const overIndex = stages?.find(
      (stage: any) => stage.id === (overData.stage_id || overData.id),
    )?.index

    if (activeData.account_id && activeIndex > overIndex) {
      setOpen(true)
      return
    }

    await handleDrag(e)
  }, [])

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e
    setActiveId(active.id)

    const {
      data: { current: activeData },
    } = active

    setStageId(activeData?.stage_id)
    setTaskId(activeData?.id)
  }

  const handleSubmit = async (values: any) => {
    if (!dragEvent) return

    try {
      const { success, error } = await addTaskReportAction(taskId, {
        ...values,
        account_id: 1,
      })

      if (error) {
        toast.error(error)
        return
      }

      await handleDrag(dragEvent)
      toast.success(success)
      setOpen(false)
    } catch (error) {
      throw new Error()
    }
  }

  return (
    <StageContext.Provider
      value={{ activeId, setActiveId, members, failedStageId }}
    >
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={dataSource?.map((item: any) => item.id)}
          strategy={horizontalListSortingStrategy}
        >
          <Row className="h-full w-max" wrap={false}>
            {isEmpty && (
              <Col
                className={clsx(
                  'group flex w-[272px] cursor-pointer items-center justify-center overflow-hidden border-r border-[#eee] bg-[#fff] transition-all hover:bg-[#f9f9f9]',
                )}
              >
                <StageModalForm>
                  <div className="flex flex-col items-center gap-[8px] text-[#aaa] transition-all group-hover:text-[#267cde]">
                    <PlusOutlined className="text-[40px] font-[500]" />
                    THÊM GIAI ĐOẠN
                  </div>
                </StageModalForm>
              </Col>
            )}
            {stages.map((stage: any) => (
              <>
                <StageColumn key={stage?.id} stage={stage} />
              </>
            ))}
          </Row>
          <TaskReportsModalForm
            open={open}
            onCancel={() => setOpen(false)}
            onSubmit={(values) => handleSubmit(values)}
            query={{
              stage_id: stageId,
              task_id: taskId,
            }}
          />
        </SortableContext>
      </DndContext>
    </StageContext.Provider>
  )
}

export default StageList
