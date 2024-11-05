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

  return (
    <SortableContext
      items={dataSource.map((t: any) => t.id)}
      strategy={verticalListSortingStrategy}
    >
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
