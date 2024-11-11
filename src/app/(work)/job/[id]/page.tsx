import { BackButton } from '@/components'
import {
  getStagesByWorkflowId,
  getTaskById,
  getTaskFieldsByTaskId,
  getTaskHistories,
  getTimeStagesByTaskId,
  getWorkflowById,
} from '@/libs/data'
import { Col, Row } from '@/ui'
import { ArrowLeftOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import dayjs from 'dayjs'
import { Metadata } from 'next'
import React from 'react'
import JobComments from './components/JobComments'
import JobCustomFields from './components/JobCustomFields'
import JobDescription from './components/JobDescription'
import JobHistory from './components/JobHistory'
import JobOverView from './components/JobOverview'
import JobProgress from './components/JobProgress'
import JobProgressTime from './components/JobProgressTime'
import PageHeader from './components/PageHeader'
import PageHeaderAction from './components/PageHeaderAction'

export const generateMetadata = async (props: { params: any }) => {
  const params = await props.params

  const task = await getTaskById(params?.id)

  const metadata: Metadata = {
    title: `Job: ${task?.name}`,
  }

  return metadata
}

const generateStatus = (stage: any, stageIndex: number) => {
  if (stage?.index === stageIndex) {
    return 'pending'
  }

  if (stage?.index > stageIndex) {
    return 'completed'
  }

  return ''
}

const page: React.FC<any> = async (props: {
  params: any
  searchParams: any
}) => {
  const params = await props.params
  const searchParams = await props.searchParams

  const [task, stages, workflow] = await Promise.all([
    getTaskById(params?.id),
    getStagesByWorkflowId(searchParams?.wid),
    getWorkflowById(searchParams?.wid),
  ])

  const taskHistories = await getTaskHistories({
    task_id: task?.id,
  })
  const fields = await getTaskFieldsByTaskId(searchParams?.wid, {
    task_id: task?.id,
  })
  const timeStages = await getTimeStagesByTaskId(task?.id)

  const filteredStages = stages?.filter(
    (stage: any) => ![0, 1].includes(stage.index),
  )

  const failedStageId = stages?.find((stage: any) => stage.index === 0)?.['id']
  const currentStage = stages?.find((stage: any) => stage.id === task?.stage_id)

  let INDEX: number = 0

  return (
    <Row>
      <Col className="max-h-[100vh]" span={17}>
        <div className="flex h-full flex-col items-start px-[20px] py-[12px]">
          <PageHeader
            className="h-[58px] w-full"
            title={
              <div className="flex items-center gap-[8px] font-[500]">
                <BackButton>
                  <ArrowLeftOutlined className="cursor-pointer text-[20px] text-[#aaa]" />
                </BackButton>
                <span className="text-[20px] leading-none">{task?.name}</span>
              </div>
            }
            extra={
              <PageHeaderAction
                options={{
                  failedStageId,
                  taskId: task?.id,
                  taskName: task?.name,
                }}
              />
            }
          />
          <div className="w-full flex-1 overflow-auto">
            <h2 className="mt-[16px] text-[24px]">{task?.name}</h2>

            <div className="mt-[8px] flex items-center gap-[8px] text-[#999]">
              <ExclamationCircleFilled className="text-[14px]" />
              <span className="text-[13px]">
                Không có tổng quan ngắn về nhiệm vụ
              </span>
            </div>

            <div className="mt-[4px] flex items-center gap-[8px] text-[#999]">
              <ExclamationCircleFilled className="text-[14px]" />
              <span className="text-[13px]">
                Thời hạn trong giai đoạn:{' '}
                <span className="text-[#000]">
                  {task?.expired
                    ? dayjs(task?.expired).format('hh:mm DD/MM/YYYY')
                    : 'Không thời hạn'}
                </span>
              </span>
            </div>

            <JobProgress
              steps={filteredStages?.map((stage: any) => {
                const failedStage = stages?.find((s: any) => s?.index === 0)

                if (stage?.id === task?.stage_id) {
                  INDEX = stage?.index
                }

                return {
                  name: stage?.name,
                  status:
                    failedStage?.id === task?.stage_id
                      ? 'failed'
                      : generateStatus(stage, INDEX),
                }
              })}
            />

            <JobDescription
              value={task?.description}
              params={{
                taskId: task?.id,
                task,
              }}
            />

            <JobCustomFields
              fields={fields?.map((field: any) => ({
                ...field,
                task_id: task?.id,
              }))}
            />

            <JobComments />
          </div>
        </div>
      </Col>
      <Col className="h-[100vh] overflow-auto" span={7}>
        <div className="h-max min-h-[100vh] bg-[#eee] p-[16px]">
          <JobOverView
            task={task}
            members={workflow?.members}
            currentStage={currentStage?.name}
          />
          <JobProgressTime
            stages={timeStages?.map((stage: any) => {
              const failedStage = stages?.find((s: any) => s?.index === 0)

              if (stage?.id === task?.stage_id) {
                INDEX = stage?.index
              }

              return {
                ...stage,
                status:
                  failedStage?.id === task?.stage_id
                    ? 'failed'
                    : generateStatus(stage, INDEX),
              }
            })}
            total={timeStages.reduce(
              (total: number, current: any) =>
                Number(
                  (total += current?.hours + current?.minutes / 60),
                ).toFixed(2),
              0,
            )}
          />
          {taskHistories?.length > 0 && (
            <JobHistory dataSource={taskHistories} />
          )}
        </div>
      </Col>
    </Row>
  )
}

export default page
