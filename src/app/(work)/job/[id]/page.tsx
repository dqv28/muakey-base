import { BackButton } from '@/components'
import { getStagesByWorkflowId, getTaskById } from '@/libs/data'
import { Col, Row } from '@/ui'
import { ArrowLeftOutlined, ExclamationCircleFilled } from '@ant-design/icons'
import dayjs from 'dayjs'
import { Metadata } from 'next'
import React from 'react'
import JobComments from './components/JobComments'
import JobCustomFields from './components/JobCustomFields'
import JobDescription from './components/JobDescription'
import JobProgress from './components/JobProgress'
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

  const task = await getTaskById(params?.id)
  const stages = await getStagesByWorkflowId(searchParams?.wid)

  const filteredStages = stages?.filter(
    (stage: any) => ![0, 1].includes(stage.index),
  )

  const failedStageId = stages?.find((stage: any) => stage.index === 0)?.['id']

  let INDEX: number = 0

  return (
    <Row>
      <Col className="min-h-[100vh]" span={17}>
        <div className="flex size-full flex-col items-start px-[20px] py-[12px]">
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
          <div className="flex-1 overflow-auto">
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

            <JobDescription value={task?.description} />

            <JobCustomFields />

            <JobComments />
          </div>
        </div>
      </Col>
      <Col className="min-h-[100vh]" span={7}>
        <div className="h-full bg-[#eee] p-[16px]">
          <div className="space-y-[6px] rounded-[6px] bg-[#fff] px-[20px] py-[16px] text-[13px]">
            <div className="mb-[12px] font-[600] text-[#888]">
              THÔNG TIN NHIỆM VỤ
            </div>
            <div>
              Mã nhiệm vụ: <span className="font-[700]">{task?.code}</span>
            </div>
            <div>
              <span>
                Tạo bởi <span className="font-[700]">Đỗ Quốc Vương</span> lúc
                09:04 01/11/2024
              </span>
            </div>
            <div>Cập nhật gần nhất lúc 02/11/2024</div>
            <div>
              Giai đoạn hiện tại: <span className="font-[700]">Nghĩ</span>
            </div>
            <div>Chuyển giai đoạn lúc 16:43 02/11/2024</div>
            <div>
              Người quản trị giai đoạn:{' '}
              <span className="font-[700]">@minhtri204dz</span>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default page
