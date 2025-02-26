'use client'

import { DAYS } from '@/libs/constant'
import { Col, Row } from 'antd'
import dayjs from 'dayjs'
import { times } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'

type Schedule = {
  date: Date
}

export type StatisticsScheduleCompProps = {}

const StatisticsScheduleComp: React.FC<StatisticsScheduleCompProps> = (
  props,
) => {
  const today = new Date()
  const dateL = new Date(today)
  const dateR = new Date(today)

  const l: Schedule[] = times(15, () => ({
    date: new Date(dateL.setDate(dateL.getDate() - 1)),
  }))

  const r: Schedule[] = times(15, () => ({
    date: new Date(dateR.setDate(dateR.getDate() + 1)),
  }))

  const [schedule, setSchedule] = useState<Schedule[]>([
    ...l.reverse(),
    {
      date: today,
    },
    ...r,
  ])

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    ref.current.scrollIntoView({
      block: 'center',
      inline: 'center',
    })
  }, [])

  return (
    <div className="w-[calc(100vw-317px)] overflow-x-auto">
      <Row className="w-max" wrap={false} ref={ref}>
        {schedule?.map((s: Schedule, i: number) => (
          <Col key={i} className="w-[400px] border text-center">
            <div>{DAYS[String(dayjs(s?.date).format('ddd'))]}</div>
            <div>{String(dayjs(s?.date).format('DD/MM'))}</div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default StatisticsScheduleComp
