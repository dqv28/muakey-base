'use client'

import { DragOverlay } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import React, { useContext } from 'react'
import { StageContext } from '../stage/StageList'
import TaskItem from './TaskItem'

type TaskListProps = {
  dataSource?: any
  stage?: any
}

const TaskList: React.FC<TaskListProps> = ({ dataSource, stage }) => {
  const { activeId, members } = useContext(StageContext)

  const sortItems =
    dataSource?.length > 0 ? dataSource.map((t: any) => t.id) : []

  return (
    <SortableContext items={sortItems} strategy={verticalListSortingStrategy}>
      <div className="h-full">
        {dataSource &&
          dataSource.map((task: any) => (
            <>
              <TaskItem
                task={task}
                isCompleted={stage?.index === 1}
                isFailed={stage?.index === 0}
                members={members}
              />

              {activeId === task.id && (
                <DragOverlay>
                  <TaskItem
                    task={task}
                    isCompleted={stage?.index === 1}
                    isFailed={stage?.index === 0}
                    members={members}
                    expired={stage?.expired_after_hours}
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
