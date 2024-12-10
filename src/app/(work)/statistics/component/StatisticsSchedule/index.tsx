import { getAccounts } from '@/libs/data'
import { getSchedule } from '@/libs/statistics'
import { getWeek, randomColor } from '@/libs/utils'
import { PlusOutlined } from '@ant-design/icons'
import { Avatar, Button, Col, Row } from 'antd'
import React from 'react'
import StatisticsCard from './StatisticsCard'
import StatisticsColHeader from './StatisticsColHeader'

type StatisticsScheduleProps = {}

const StatisticsSchedule: React.FC<StatisticsScheduleProps> = async (props) => {
  const week = getWeek(new Date())

  const schedule = await getSchedule()
  const accounts = await getAccounts()

  return (
    <Row className="h-full">
      <Col span={3} className="h-full border-r">
        <StatisticsColHeader className="min-h-[82px]" title="Thành viên" />
        <div className="flex items-center justify-center">
          <Button
            className="my-[8px]"
            type="text"
            icon={<PlusOutlined className="text-[10px]" />}
          >
            Thêm công việc
          </Button>
        </div>
        <div className="space-y-[12px] px-[8px]">
          {accounts?.map((acc: any) => (
            <div key={acc?.id} className="flex items-center gap-[8px]">
              <Avatar
                src={acc?.avatar}
                style={{ backgroundColor: randomColor(String(acc?.full_name)) }}
              >
                {String(acc?.full_name).charAt(0).toUpperCase()}
              </Avatar>
              <span>{String(acc?.full_name)}</span>
            </div>
          ))}
        </div>
      </Col>
      {week.map((date) => {
        const tasks = schedule?.[date.date]
        const filteredTasks = accounts
          ?.map((acc: any) => [
            ...tasks.filter(
              (task: any) => task?.account_name === acc?.full_name,
            ),
          ])
          .flat()

        return (
          <Col key={date.day} span={3} className="h-full border-r">
            <StatisticsColHeader
              title={date.day}
              subTitle={String(new Date(date.date).getDate())}
            />
            <div className="flex items-center justify-center">
              <Button
                className="my-[8px]"
                type="text"
                icon={<PlusOutlined className="text-[10px]" />}
              >
                Thêm công việc
              </Button>
            </div>
            <div className="flex flex-col gap-[8px] px-[8px]">
              {filteredTasks &&
                filteredTasks?.map((t: any) => {
                  return (
                    <StatisticsCard
                      key={t?.name_task}
                      title={`${t?.name_task} - ${t?.stage_name}`}
                      user={{
                        fullName: t?.account_name,
                        avatar: t?.avatar,
                      }}
                      expire={t?.expired || t?.started_at}
                      status={t?.status}
                    />
                  )
                })}
            </div>
          </Col>
        )
      })}
    </Row>
  )
}

export default StatisticsSchedule
