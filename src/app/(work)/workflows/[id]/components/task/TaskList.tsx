'use client'

import { DragOverlay } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { cloneDeep } from 'lodash'
import { useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import { deleteTaskAction } from '../../../action'
import { StageContext } from '../stage/StageList'
import { StageContext as WorkflowContext } from '../WorkflowPageLayout'
import TaskItem from './TaskItem'

type TaskListProps = {
  stageId?: number
}

const TaskList: React.FC<TaskListProps> = ({ stageId }) => {
  const { activeId, members } = useContext(StageContext)
  const { stages, setStages } = useContext(WorkflowContext)
  const router = useRouter()

  const currentStage = stages?.find((s: any) => s?.id === stageId)

  const sortItems =
    currentStage?.tasks?.length > 0
      ? currentStage?.tasks.map((t: any) => t.id)
      : []

  const handleDelete = async (id: number) => {
    try {
      const { error, success } = await deleteTaskAction(id || 0)

      if (error) {
        toast.error(error)

        return
      }

      setStages((prevStages: any[]) => {
        const newStages = cloneDeep(prevStages)

        return newStages?.map((s: any) => {
          if (s?.id === stageId) {
            return {
              ...s,
              tasks: s?.tasks?.filter((task: any) => task?.id !== id),
            }
          }

          return s
        })
      })
      toast.success(success)
      router.refresh()
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return (
    <SortableContext items={sortItems} strategy={verticalListSortingStrategy}>
      <div className="h-full">
        {currentStage?.tasks?.length > 0 &&
          currentStage?.tasks.map((task: any) => (
            <>
              <TaskItem
                task={task}
                isCompleted={currentStage?.index === 1}
                isFailed={currentStage?.index === 0}
                members={members}
                expired={currentStage?.expired_after_hours}
                onDelete={() => handleDelete(task?.id)}
              />

              {activeId === task?.id && (
                <DragOverlay>
                  <TaskItem
                    task={task}
                    isCompleted={currentStage?.index === 1}
                    isFailed={currentStage?.index === 0}
                    members={members}
                    expired={currentStage?.expired_after_hours}
                  />
                </DragOverlay>
              )}
            </>
          ))}
      </div>
    </SortableContext>
  )
}

export default TaskList
