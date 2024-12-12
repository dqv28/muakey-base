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

type StatisticsScheduleProps = {}

const StatisticsSchedule: React.FC<StatisticsScheduleProps> = async (props) => {
  const today = new Date()
  const week = getWeek(today)

  const [schedule, accounts] = await Promise.all([getSchedule(), getAccounts()])

  const days = week?.map((w: any) => w?.date)
  const todos = accounts?.map((acc: any) => {
    const days = week?.map((w: any) => {
      const tasks = schedule[w?.date]

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
        {times(8, (num) => (
          <Col key={num} className="border-r" span={3}>
            <div className="flex items-center justify-center">
              <StatisticsModalForm
                options={{
                  accounts,
                }}
              />
            </div>
          </Col>
        ))}
      </Row>
      {todos &&
        todos?.map((t: any) => (
          <Row key={t?.name}>
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
                        title={`${task?.stage_name ? `${task?.stage_name}: ` : ''} ${task?.name_task}`}
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
    </>
  )
}

export default StatisticsSchedule
