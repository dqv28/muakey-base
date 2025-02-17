import { randomColor } from '@/libs/utils'
import { Avatar, Col, Row, Tooltip } from 'antd'
import Link from 'next/link'
import React from 'react'
import StatisticsCard from '../statistics-card'

type StatisticsRowsWorkflowProps = {
  todos: any[]
  options: any
}

const StatisticsRowsWorkflow: React.FC<StatisticsRowsWorkflowProps> = ({
  todos,
  options,
}) => {
  const { accounts, days, currentDate } = options

  return (
    <>
      {todos &&
        todos?.map((t: any) => {
          const tasksOfDay = t?.tasks?.[currentDate]

          const totalSuccessTasks = tasksOfDay?.filter(
            (task: any) => task?.status === 'completed',
          )?.length

          const totalFailedTasks = tasksOfDay?.filter(
            (task: any) => task?.status === 'failed',
          )?.length

          return (
            <Row key={t?.name} className="w-max">
              <Col
                className="sticky left-0 z-10 w-[400px] border-r bg-[#0000000F]"
                span={3}
              >
                <div className="h-full w-[296px] bg-[#fff] p-[16px]">
                  <div className="flex items-center gap-[8px]">
                    <Avatar
                      size={32}
                      style={{
                        backgroundColor: randomColor(String(t?.workflow?.name)),
                      }}
                    >
                      {String(t?.workflow?.name).charAt(0).toUpperCase()}
                    </Avatar>
                    <span className="line-clamp-2 inline-block flex-1">
                      {String(t?.workflow?.name)}
                    </span>
                  </div>

                  <div className="mt-[12px] flex items-center gap-[8px] leading-[22px]">
                    <span>Hoàn thành:</span>
                    <span>{Number(totalSuccessTasks)}</span>
                  </div>

                  <div className="mt-[12px] flex items-center gap-[8px] leading-[22px]">
                    <span>Thất bại:</span>
                    <span>{Number(totalFailedTasks)}</span>
                  </div>
                </div>
              </Col>
              {days?.map((day: string) => {
                const tasksOfDay = t?.tasks?.[day]

                return (
                  <Col
                    className="w-[400px] space-y-[8px] border-r bg-[#f5f5f5] p-[8px]"
                    key={day}
                    span={3}
                  >
                    {tasksOfDay?.map((task: any, index: number) => (
                      <Link
                        className="block rounded-[8px] bg-[#fff] hover:text-[#000]"
                        key={`${task?.name_task}_${index}`}
                        href={`/job/${task?.task_id}`}
                      >
                        <StatisticsCard
                          title={
                            <>
                              <span className="font-[500]">
                                {task?.stage_name
                                  ? `${String(task?.stage_name).toUpperCase()}: `
                                  : ''}
                              </span>
                              <span>{task?.name_task}</span>
                            </>
                          }
                          extra={
                            <Tooltip title={task?.user?.fullName}>
                              <Avatar
                                size="small"
                                src={task?.user?.avatar}
                                style={{
                                  backgroundColor: randomColor(
                                    String(task?.user?.fullName),
                                  ),
                                }}
                              >
                                {String(task?.user?.fullName)
                                  .charAt(0)
                                  .toUpperCase()}
                              </Avatar>
                            </Tooltip>
                          }
                          status={task?.status}
                        />
                      </Link>
                    ))}
                  </Col>
                )
              })}
            </Row>
          )
        })}
    </>
  )
}

export default StatisticsRowsWorkflow
