'use client'

import { getTaskHistoriesAction } from '@/components/action'
import { useAsyncEffect } from '@/libs/hook'
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
import { useParams } from 'next/navigation'
import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'
import { addTaskReportAction, moveStageAction } from '../../../action'
import { StageContext as WorkflowStageContext } from '../WorkflowPageLayout'
import { getReportFieldsByWorkflowIdAction } from './action'
import StageColumn from './StageColumn'
import StageModalForm from './StageModalForm'
import TaskReportsModalForm from './TaskReportsModalForm'

export type StageListProps = {
  members?: any
  isEmpty?: boolean
  options?: any
}

export const StageContext = createContext<any>({})

const StageList: React.FC<StageListProps> = ({ isEmpty, members, options }) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier>()
  const [open, setOpen] = useState(false)
  const [reports, setReports] = useState<any[]>([])
  const [history, setHistory] = useState<any>()
  const [dragEvent, setDragEvent] = useState<DragEndEvent>()
  const activeRef = useRef<any>(null)

  const { stages, setStages } = useContext(WorkflowStageContext)
  const params = useParams()

  const failedStageId =
    stages?.length > 0
      ? stages?.find((stage: any) => stage.index === 0)?.['id']
      : []
  const mouseSensor = useSensor(MouseSensor)
  const touchSensor = useSensor(TouchSensor)

  const sensors = useSensors(mouseSensor, touchSensor)

  useAsyncEffect(async () => {
    if (!dragEvent) return

    const { active } = dragEvent

    const {
      data: { current: activeData },
    } = active

    if (!activeData) return

    const data = await getReportFieldsByWorkflowIdAction(Number(params?.id), {
      stage_id: activeData.stage_id,
      task_id: activeData.id,
    })

    setReports(data)
    activeRef.current = activeId
  }, [dragEvent])

  const handleDrag = useCallback(
    async (event: DragEndEvent) => {
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

        if (!activeData.account_id && [0, 1].includes(overData?.index)) {
          toast.error('Nhiệm vụ chưa được giao.')
          return
        }

        const taskHistory = await getTaskHistoriesAction({
          task_id: activeData.id,
          stage_id: overData.stage_id || overData.id,
        })

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
                account_id: taskHistory?.worker || null,
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
        } catch (error: any) {
          throw new Error(error)
        }
      }
    },
    [setStages],
  )

  const handleDragStart = async (e: DragStartEvent) => {
    const { active } = e
    setActiveId(active.id)
  }

  const handleDragEnd = async (e: DragEndEvent) => {
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

    const data = await getReportFieldsByWorkflowIdAction(Number(params?.id), {
      stage_id: activeData.stage_id,
      task_id: activeData.id,
    })

    if (data?.length > 0 && activeData.account_id && activeIndex > overIndex) {
      setOpen(true)
      return
    }

    await handleDrag(e)
  }

  const handleSubmit = async (values: any) => {
    if (!dragEvent) return

    const { active } = dragEvent

    const {
      data: { current: activeData },
    } = active

    if (!activeData) return

    try {
      const { success, error } = await addTaskReportAction(activeData.id, {
        ...values,
        account_id: options?.accountId,
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

  const sortItems =
    stages?.length > 0 ? stages?.map((item: any) => item.id) : []

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
          items={sortItems}
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
            {stages?.length > 0 &&
              stages.map((stage: any) => (
                <>
                  <StageColumn key={stage?.id} stage={stage} />
                </>
              ))}
          </Row>
          {reports?.length > 0 && activeRef.current === activeId && (
            <TaskReportsModalForm
              open={open}
              onCancel={() => setOpen(false)}
              onSubmit={(values) => handleSubmit(values)}
              reports={reports}
            />
          )}
        </SortableContext>
      </DndContext>
    </StageContext.Provider>
  )
}

export default StageList
