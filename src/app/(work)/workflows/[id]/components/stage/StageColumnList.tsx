import { PlusOutlined } from '@ant-design/icons'
import {
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable'
import { Col, Row } from 'antd'
import clsx from 'clsx'
import React, { useMemo } from 'react'
import StageColumn from './StageColumn'
import StageModalForm from './StageModalForm'

type StageColumnListProps = {
  items?: any[]
  options?: any
}

const StageColumnList: React.FC<StageColumnListProps> = ({
  items,
  options,
}) => {
  const { user, activeItem } = options

  const sortItems =
    items && items?.length > 0 ? items?.map((item: any) => item.id) : []

  const filteredStages = items?.filter(
    (stage: any) => ![0, 1].includes(stage?.index),
  )

  const renderStageColumn = useMemo(() => {
    return items?.map((stage: any) => (
      <StageColumn
        key={stage?.id}
        stage={stage}
        userId={user?.id}
        options={{
          role: user?.role,
          activeItem,
        }}
      />
    ))
  }, [items, user, activeItem])

  return (
    <SortableContext items={sortItems} strategy={horizontalListSortingStrategy}>
      <Row className="h-full w-max" wrap={false}>
        {filteredStages && filteredStages?.length <= 0 && (
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
        {items && items?.length > 0 && renderStageColumn}
      </Row>
    </SortableContext>
  )
}

export default StageColumnList
