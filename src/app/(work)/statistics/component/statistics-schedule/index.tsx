'use client'

import { GLOBAL_BAN } from '@/libs/constant'
import { getWeek, randomColor } from '@/libs/utils'
import { Avatar, Col, Row } from 'antd'
import clsx from 'clsx'
import dayjs from 'dayjs'
import Link from 'next/link'
import React from 'react'
import StatisticsCard from './statistics-card'
import StatisticsColHeader from './statistics-col-header'
import StatisticsModalForm from './statistics-modal-form'

type StatisticsScheduleProps = {
  options?: any
}

const StatisticsSchedule: React.FC<StatisticsScheduleProps> = ({ options }) => {
  const today = new Date()
  const week = getWeek(options?.dw ? new Date(options?.dw) : today)
  const { schedule, accounts, account_id } = options

  const days = week?.map((w: any) => w?.date)
  const todos = accounts
    ?.filter(
      (acc: any) =>
        (!account_id ||
          String(account_id || '')
            .split(',')
            .includes(String(acc?.id))) &&
        acc?.type !== 'department',
    )
    ?.filter((m: any) => !GLOBAL_BAN.includes(m?.full_name))
    ?.map((acc: any) => {
      const days = week?.map((w: any) => {
        const tasks = schedule[w?.date] || []

        return [
          w?.date,
          [...tasks?.filter((task: any) => task?.account_id === acc?.id)],
        ]
      })

      return {
        user: {
          id: acc?.id,
          fullName: acc?.full_name,
          avatar: acc?.avatar,
        },
        tasks: Object.fromEntries(days),
      }
    })

  return (
    <div className="">
      <Row wrap={false} className="sticky top-0 z-50 w-max">
        <Col className="sticky left-0 z-10 w-[400px] border-r border-t bg-[#fff]">
          <StatisticsColHeader title="Thành viên" />
        </Col>
        {week.map((date) => (
          <Col
            key={date.day}
            className={clsx('w-[400px] border-r border-t bg-[#fff]', {
              'border-t-[#096DD9] text-[#1677ff]':
                date.date === String(dayjs(today).format('YYYY-MM-DD')),
            })}
          >
            <StatisticsColHeader
              title={date.day}
              subTitle={String(dayjs(date.date).format('DD/MM'))}
            />
          </Col>
        ))}
      </Row>
      <div className="no-scroll h-[calc(100vh-244px)] w-full divide-y">
        {todos &&
          todos?.map((t: any) => (
            <Row key={t?.name} className="w-max">
              <Col
                className="sticky left-0 z-10 w-[400px] border-r bg-[#0000000F]"
                span={3}
              >
                <div className="h-full w-[296px] bg-[#fff] p-[16px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-[8px]">
                      <Avatar
                        src={t?.user?.avatar}
                        style={{
                          backgroundColor: randomColor(
                            String(t?.user?.fullName),
                          ),
                        }}
                      >
                        {String(t?.user?.fullName).charAt(0).toUpperCase()}
                      </Avatar>
                      <span>{String(t?.user?.fullName)}</span>
                    </div>
                    <StatisticsModalForm
                      options={{
                        accounts,
                        accountId: t?.user?.id,
                      }}
                    />
                  </div>

                  <div className="mt-[12px] flex items-center gap-[8px] leading-[22px]">
                    <span>Tổng thời gian:</span>
                    <span className="text-[#CF1322]">5.5h</span>
                  </div>
                </div>
              </Col>
              {days?.map((day: string) => {
                const tasksOfDay = t?.tasks?.[day]

                console.log('TASK OF DAY ->', tasksOfDay)

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
                          timestamps={task?.hours_work}
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
    </div>
  )
}

export default StatisticsSchedule
