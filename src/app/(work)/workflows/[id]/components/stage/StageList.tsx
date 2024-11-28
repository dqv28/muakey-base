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
import TaskDoneModalForm from './TaskDoneModalForm'
import TaskReportsModalForm from './TaskReportsModalForm'

export type StageListProps = {
  members?: any
}

export const StageContext = createContext<any>({})

const StageList: React.FC<StageListProps> = ({ members }) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier>()
  const [open, setOpen] = useState(false)
  const [doneOpen, setDoneOpen] = useState(false)
  const [reports, setReports] = useState<any[]>([])
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

    const data = await getReportFieldsByWorkflowIdAction({
      workflow_id: Number(params?.id),
      stage_id: activeData.stage_id,
      task_id: activeData.id,
    })

    setReports(data)
    activeRef.current = activeId
  }, [dragEvent])

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
              expired: taskHistory?.worker
                ? taskHistory?.expired_at
                  ? taskHistory?.expired_at
                  : overColumn.expired_after_hours
                    ? new Date().setHours(
                        new Date().getHours() + overColumn.expired_after_hours,
                      )
                    : null
                : null,
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
  }

  const handleDragStart = useCallback((e: DragStartEvent) => {
    const { active } = e
    setActiveId(active.id)
  }, [])

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

    const data = await getReportFieldsByWorkflowIdAction({
      workflow_id: Number(params?.id),
      stage_id: activeData.stage_id,
      task_id: activeData.id,
    })

    if (!activeData.account_id && [0, 1].includes(overIndex)) {
      toast.error('Nhiệm vụ chưa được giao.')
      return
    }

    if (data?.length > 0 && activeData.account_id && activeIndex > overIndex) {
      setOpen(true)
      return
    }

    if (overIndex === 1) {
      setDoneOpen(true)
      return
    }

    await handleDrag(e)
  }, [])

  const handleSubmit = async (values: any) => {
    if (!dragEvent) return

    const { active } = dragEvent

    const {
      data: { current: activeData },
    } = active

    if (!activeData) return

    try {
      const { message, errors } = await addTaskReportAction(
        {
          ...values,
        },
        {
          task_id: activeData.id,
        },
      )

      if (errors) {
        toast.error(message)
        return
      }

      await handleDrag(dragEvent)
      setOpen(false)
    } catch (error) {
      throw new Error()
    }
  }

  const sortItems =
    stages?.length > 0 ? stages?.map((item: any) => item.id) : []

  const generateInitialValues = () => {
    if (!dragEvent) return {}

    const { active } = dragEvent

    const {
      data: { current: activeData },
    } = active

    return {
      link_youtube: activeData?.link_youtube,
    }
  }

  const filteredStages = stages?.filter(
    (stage: any) => ![0, 1].includes(stage?.index),
  )

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
            {filteredStages?.length <= 0 && (
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
        </SortableContext>
      </DndContext>

      {reports?.length > 0 && activeRef.current === activeId && (
        <TaskReportsModalForm
          open={open}
          onCancel={() => setOpen(false)}
          onSubmit={(values) => handleSubmit(values)}
          reports={reports}
        />
      )}
      <TaskDoneModalForm
        open={doneOpen}
        onCancel={() => setDoneOpen(false)}
        taskId={Number(activeId)}
        onSubmit={async () => {
          if (!dragEvent) return

          await handleDrag(dragEvent)
        }}
        onOk={() => setDoneOpen(false)}
        initialValues={generateInitialValues()}
      />
    </StageContext.Provider>
  )
}

export default StageList
