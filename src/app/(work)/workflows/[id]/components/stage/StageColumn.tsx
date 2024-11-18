import { Col } from '@/ui'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'
import React from 'react'
import TaskList from '../task/TaskList'
import StageDropdownMenu from './StageDropdownMenu'
import StageHeader from './StageHeader'

type StageColumnProps = {
  stage?: any
}

const StageColumn: React.FC<StageColumnProps> = ({ stage }) => {
  const { attributes, setNodeRef, transform, transition } = useSortable({
    id: stage?.id,
    data: stage,
  })

  const StageColumnStyle: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  }

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
        title={stage.name}
        extra={
          ![0, 1].includes(stage?.index) && <StageDropdownMenu stage={stage} />
        }
      >
        <span
          className={clsx(
            'text-[12px] leading-none text-[#aaa]',
            stage.index === 0 && 'text-[#c3434399]',
          )}
        >
          0 Nhiệm vụ
        </span>
      </StageHeader>

      <TaskList stageId={stage?.id} />
    </Col>
  )
}

export default StageColumn
