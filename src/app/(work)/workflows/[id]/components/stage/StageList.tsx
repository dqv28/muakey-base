'use client'

import { getTaskHistoriesAction } from '@/components/action'
import { withApp } from '@/hoc'
import { useAsyncEffect } from '@/libs/hook'
import { toast } from '@/ui'
import {
  defaultDropAnimationSideEffects,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragOverlayProps,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { App, Row } from 'antd'
import { cloneDeep } from 'lodash'
import { useParams } from 'next/navigation'
import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'
import { Converter } from 'showdown'
import { addTaskReportAction, moveStageAction } from '../../../action'
import TaskItem from '../task/TaskItem'
import { StageContext as WorkflowStageContext } from '../WorkflowPageLayout'
import { getReportFieldsByWorkflowIdAction } from './action'
import StageColumnList from './StageColumnList'
import TaskDoneModalForm from './TaskDoneModalForm'
import TaskReportsModalForm from './TaskReportsModalForm'

export type StageListProps = {
  members?: any
  options?: any
}

export const StageContext = createContext<any>({})

const StageList: React.FC<StageListProps> = ({ members, options }) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier>()
  const [currentStage, setCurrentStage] = useState<any>()
  const [activeItem, setActiveItem] = useState<any>()
  const [open, setOpen] = useState(false)
  const [doneOpen, setDoneOpen] = useState(false)
  const [dragInsideColumn, setDragInsideColumn] = useState(false)
  const [reports, setReports] = useState<any[]>([])
  const [dragEvent, setDragEvent] = useState<DragEndEvent>()
  const activeRef = useRef<any>(null)
  const converter = new Converter()

  const { message } = App.useApp()
  const { user, stages } = options

  const { setStages } = useContext(WorkflowStageContext)
  const params = useParams()

  const failedStageId = Number(
    stages?.length > 0
      ? stages
          ?.find((stage: any) => stage.index === 0)
          ?.['id'].split('_')
          .pop()
      : 0,
  )

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  })
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  })

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

      const stageId = Number(
        String(overData.stage_id || overData.id)
          .split('_')
          .pop(),
      )

      const taskHistory = await getTaskHistoriesAction({
        task_id: activeData.id,
        stage_id: stageId,
      })

      setStages((prevStages: any) => {
        const newStages = cloneDeep(prevStages)

        const activeColumn = newStages.find(
          (s: any) => s.id === `stage_${activeData.stage_id}`,
        )
        const overColumn = newStages.find(
          (s: any) => s.id === `stage_${stageId}`,
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
              stage_id: stageId,
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
        const { message: msg, errors } = await moveStageAction(
          activeTaskId as number,
          stageId,
        )

        if (errors) {
          message.error(msg)
          return
        }
      } catch (error: any) {
        throw new Error(error)
      }
    }
  }

  const handleDragStart = (e: DragStartEvent) => {
    const {
      active: {
        id: activeId,
        data: { current },
      },
    } = e

    const stage = stages?.find(
      (s: any) => s.id === current?.stage_id || activeId,
    )

    setCurrentStage(stage)
    setActiveId(activeId)
    setActiveItem(current)
  }

  const handleDragEnd = async (e: DragEndEvent) => {
    setDragEvent(e)

    const { active, over } = e

    if (!over) return

    const {
      data: { current: activeData },
    } = active

    const {
      data: { current: overData },
    } = over

    if (!overData || !activeData) return

    if (
      `stage_${activeData.stage_id}` ===
      (overData.stage_id ? `stage_${overData.stage_id}` : overData.id)
    ) {
      setDragInsideColumn(true)
      return
    }

    setDragInsideColumn(false)

    const activeIndex = stages?.find(
      (stage: any) => stage.id === `stage_${activeData.stage_id}`,
    )?.index
    const overIndex = stages?.find(
      (stage: any) =>
        stage.id ===
        (overData.stage_id ? `stage_${overData.stage_id}` : overData.id),
    )?.index

    const data = await getReportFieldsByWorkflowIdAction({
      workflow_id: Number(params?.id),
      stage_id: activeData.stage_id,
      task_id: activeData.id,
    })

    if (!activeData.account_id && [1].includes(overIndex)) {
      toast.error('Nhiệm vụ chưa được giao.')
      return
    }
    if (!String(user?.role).toLocaleLowerCase().includes('admin')) {
      if (activeData.account_id !== user?.id) {
        message.error(
          'Không thể kéo nhiệm vụ của người khác hoặc chưa được giao.',
        )
        return
      }
    }

    if (overIndex === 1) {
      setDoneOpen(true)
      return
    }

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

    const formData = Object.fromEntries(
      Object.keys(values).map((key: string) => [
        key,
        converter.makeHtml(values[key]),
      ]),
    )

    try {
      const { message, errors } = await addTaskReportAction(
        {
          ...formData,
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

  const generateInitialValues = useCallback(() => {
    if (!dragEvent) return {}

    const { active } = dragEvent

    const {
      data: { current: activeData },
    } = active

    return {
      link_youtube: activeData?.link_youtube,
    }
  }, [dragEvent])

  useAsyncEffect(async () => {
    if (!dragEvent) return

    const { active } = dragEvent

    const {
      data: { current: activeData },
    } = active

    if (!activeData) return

    if (dragInsideColumn) return

    const data = await getReportFieldsByWorkflowIdAction({
      workflow_id: Number(params?.id),
      stage_id: activeData.stage_id,
      task_id: activeData.id,
    })

    setReports([...data])
    activeRef.current = activeId
  }, [dragEvent, params?.id, activeId, dragInsideColumn])

  const dropAnimation: DragOverlayProps['dropAnimation'] = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <StageContext.Provider
        value={{ activeId, setActiveId, members, failedStageId }}
      >
        <Row className="h-full w-max" wrap={false}>
          <StageColumnList
            items={stages}
            options={{
              user,
              activeItem,
            }}
          />
        </Row>

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

        <DragOverlay dropAnimation={dropAnimation}>
          {activeItem && activeItem?.id && (
            <TaskItem
              key={activeItem?.id}
              task={activeItem}
              isCompleted={currentStage?.index === 1}
              isFailed={currentStage?.index === 0}
              members={members}
              expired={currentStage?.expired_after_hours}
              userId={user?.id}
              options={{
                role: user?.role,
              }}
            />
          )}
        </DragOverlay>
      </StageContext.Provider>
    </DndContext>
  )
}

export default memo(withApp(StageList))
