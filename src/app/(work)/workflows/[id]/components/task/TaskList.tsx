'use client'

import { DragOverlay } from '@dnd-kit/core'
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable'
import { ConfigProvider, List, ListProps } from 'antd'
import { cloneDeep } from 'lodash'
import React, { useCallback, useContext, useMemo } from 'react'
import toast from 'react-hot-toast'
import { deleteTaskAction } from '../../../action'
import { StageContext } from '../stage/StageList'
import { StageContext as WorkflowContext } from '../WorkflowPageLayout'
import TaskItem from './TaskItem'

type TaskListProps = ListProps<any> & {
  stageId?: number
  userId?: number
  options?: any
}

const TaskList: React.FC<TaskListProps> = ({
  stageId,
  userId,
  options,
  ...rest
}) => {
  const { activeId, members } = useContext(StageContext)
  const { stages, setStages } = useContext(WorkflowContext)

  const currentStage = useMemo(
    () => stages?.find((s: any) => s?.id === stageId),
    [stageId, stages],
  )

  const sortItems = useMemo(
    () =>
      currentStage?.tasks?.length > 0
        ? currentStage?.tasks.map((t: any) => t.id)
        : [],
    [currentStage?.tasks],
  )

  const handleDelete = useCallback(
    async (id: number) => {
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
      } catch (error: any) {
        throw new Error(error)
      }
    },
    [setStages, stageId],
  )

  return (
    <SortableContext items={sortItems} strategy={horizontalListSortingStrategy}>
      <div className="no-scroll h-[calc(100vh-171px)] overflow-auto pb-[22px]">
        <ConfigProvider
          theme={{
            components: {
              List: {
                emptyTextPadding: 0,
              },
            },
          }}
        >
          <List
            dataSource={currentStage?.tasks}
            renderItem={(task: any) => (
              <>
                <TaskItem
                  task={task}
                  isCompleted={currentStage?.index === 1}
                  isFailed={currentStage?.index === 0}
                  members={members}
                  expired={currentStage?.expired_after_hours}
                  onDelete={() => handleDelete(task?.id)}
                  userId={userId}
                  options={options}
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
            )}
            locale={{
              emptyText: <></>,
            }}
            {...rest}
          />
        </ConfigProvider>
      </div>
    </SortableContext>
  )
}

export default TaskList
