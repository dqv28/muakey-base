import { Col } from '@/ui'
import { ReloadOutlined } from '@ant-design/icons'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import TaskList from '../task/TaskList'
import StageDropdownMenu from './StageDropdownMenu'
import StageHeader from './StageHeader'
import { refreshDataAction } from './action'

type StageColumnProps = {
  stage?: any
}

const StageColumn: React.FC<StageColumnProps> = ({ stage }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { attributes, setNodeRef, transform, transition } = useSortable({
    id: stage?.id,
    data: stage,
  })

  const StageColumnStyle: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    transition,
  }

  const handleRefresh = async () => {
    setLoading(true)

    try {
      await refreshDataAction()
      setLoading(false)

      if (typeof window !== undefined) {
        window.location.reload()
      }
    } catch (error) {
      setLoading(false)
      throw new Error(String(error))
    }
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
          </>
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

      <TaskList stageId={stage?.id} loading={loading} />
    </Col>
  )
}

export default StageColumn
