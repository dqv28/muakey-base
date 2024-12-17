import { getAccounts } from '@/libs/data'
import { getSchedule } from '@/libs/statistics'
import { getWeek, randomColor } from '@/libs/utils'
import { Avatar, Col, Row } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { times } from 'lodash'
import Link from 'next/link'
import React from 'react'
import StatisticsCard from './StatisticsCard'
import StatisticsColHeader from './StatisticsColHeader'
import StatisticsModalForm from './StatisticsModalForm'

type StatisticsScheduleProps = {
  options?: any
}

const StatisticsSchedule: React.FC<StatisticsScheduleProps> = async ({
  options,
}) => {
  const today = new Date()
  const week = getWeek(options?.dw ? new Date(options?.dw) : today)

  const [schedule, accounts] = await Promise.all([
    getSchedule({
      start: week[0].date,
      end: week[6].date,
    }),
    getAccounts(),
  ])

  const days = week?.map((w: any) => w?.date)
  const todos = accounts
    ?.filter(
      (acc: any) =>
        (!options?.account_id ||
          String(options?.account_id || '')
            .split(',')
            .includes(String(acc?.id))) &&
        acc?.type !== 'department',
    )
    ?.map((acc: any) => {
      const days = week?.map((w: any) => {
        const tasks = schedule[w?.date] || []

        return [
          w?.date,
          [
            ...tasks?.filter(
              (task: any) => task?.account_name === acc?.full_name,
            ),
          ],
        ]
      })

      return {
        name: acc?.full_name,
        tasks: Object.fromEntries(days),
      }
    })

  return (
    <>
      <Row>
        <Col span={3} className="border-r">
          <StatisticsColHeader className="min-h-[82px]" title="Thành viên" />
        </Col>
        {week.map((date) => (
          <Col
            key={date.day}
            span={3}
            className={clsx('border-r', {
              'bg-[#f5f5f5]':
                date.date === String(dayjs(today).format('YYYY-MM-DD')),
            })}
          >
            <StatisticsColHeader
              title={date.day}
              subTitle={String(new Date(date.date).getDate())}
            />
          </Col>
        ))}
      </Row>
      <Row>
        {times(8, (num) =>
          num <= 0 ? (
            <Col key={num} className="border-r" span={3}></Col>
          ) : (
            <Col key={num} className="border-r" span={3}>
              <div className="flex items-center justify-center">
                <StatisticsModalForm
                  options={{
                    accounts,
                  }}
                />
              </div>
            </Col>
          ),
        )}
      </Row>
      <div className="no-scroll h-[calc(100vh-199px)] w-full overflow-auto">
        {todos &&
          todos?.map((t: any) => (
            <Row key={t?.name} className="w-full">
              <Col className="border-r p-[8px]" span={3}>
                <div className="flex items-center gap-[8px]">
                  <Avatar
                    style={{ backgroundColor: randomColor(String(t?.name)) }}
                  >
                    {String(t?.name).charAt(0).toUpperCase()}
                  </Avatar>
                  <span>{String(t?.name)}</span>
                </div>
              </Col>
              {days?.map((day: string) => {
                const tasksOfDay = t?.tasks?.[day]

                return (
                  <Col
                    className="space-y-[8px] border-r p-[8px]"
                    key={day}
                    span={3}
                  >
                    {tasksOfDay?.map((task: any) => (
                      <Link
                        className="block hover:text-[#000]"
                        key={task?.name_task}
                        href={`/job/${task?.code}`}
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
                          user={{
                            fullName: task?.account_name,
                            avatar: task?.avatar,
                          }}
                          expire={task?.expired_at}
                          status={task?.status}
                        />
                      </Link>
                    ))}
                  </Col>
                )
              })}
            </Row>
          ))}
      </div>
    </>
  )
}

export default StatisticsSchedule
