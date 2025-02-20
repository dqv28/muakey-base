import { Col, Divider, List, Row, Skeleton } from 'antd'
import { times } from 'lodash'

export type StageColumnListSkeletonProps = {
  length?: number
}

const StageColumnListSkeleton: React.FC<StageColumnListSkeletonProps> = ({
  length = 6,
}) => {
  return (
    <Row className="!flex h-full w-max min-w-[calc(100vw-285px)]" wrap={false}>
      {times(length, (index) => (
        <Col className="w-[272px] border-r border-[#eee]" key={index}>
          <div className="w-full border-b bg-[#f6f6f6] px-[16px] py-[12px]">
            <div className="flex items-center justify-between leading-none">
              <Skeleton.Node active className="!h-[22px] !w-[90px]" />
              <Skeleton.Node active className="!size-[22px]" />
            </div>
            <Divider className="!my-[10px] border-t-[4px] border-[#0003]" />
            <div className="flex items-center justify-between leading-none">
              <Skeleton.Node active className="!h-[12px] !w-[60px]" />
              <Skeleton.Node active className="!h-[12px] !w-[80px]" />
            </div>
          </div>

          <List
            dataSource={times(5, () => String)}
            renderItem={() => (
              <Skeleton
                active
                className="border-b border-[#f6f6f6] px-[16px] py-[12px]"
              />
            )}
          />
        </Col>
      ))}
    </Row>
  )
}

export default StageColumnListSkeleton
