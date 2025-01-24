import { ArrowRightOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import React from 'react'
import RequestDetailLine from '../request-detail-line'

type RequestDetailChangesProps = {
  type?: string
  request?: any
}

const RequestDetailChanges: React.FC<RequestDetailChangesProps> = ({
  type,
  request,
}) => {
  switch (type) {
    case 'Sửa giờ vào ra':
      return (
        <div className="flex items-center justify-between gap-[24px]">
          <div className="flex-1">
            <RequestDetailLine
              className="flex-1 gap-[16px]"
              label="Từ"
              labelWidth={80}
              status="error"
            >
              {request.old_check_in || 'Không có'}
            </RequestDetailLine>
            <RequestDetailLine
              className="flex-1 gap-[16px]"
              label="Đến"
              labelWidth={80}
              status="error"
            >
              {request.old_check_out || 'Không có'}
            </RequestDetailLine>
          </div>

          <ArrowRightOutlined className="flex w-[120px] items-center justify-center" />

          <div className="flex-1">
            <RequestDetailLine
              className="flex-1 gap-[16px]"
              label="Từ"
              labelWidth={80}
              status="success"
            >
              {request.start_time || 'Không có'}
            </RequestDetailLine>
            <RequestDetailLine
              className="flex-1 gap-[16px]"
              label="Đến"
              labelWidth={80}
              status="success"
            >
              {request.end_time || 'Không có'}
            </RequestDetailLine>
          </div>
        </div>
      )

    default:
      return (
        <div>
          {request?.date?.map((d: any, index: number) => (
            <div className="flex items-center" key={index}>
              <RequestDetailLine className="flex-1" label="Từ" labelWidth={80}>
                {dayjs(d?.start_date).format('DD/MM/YYYY HH:mm:ss')}
              </RequestDetailLine>
              <RequestDetailLine className="flex-1" label="Đến" labelWidth={80}>
                {dayjs(d?.end_date).format('DD/MM/YYYY HH:mm:ss')}
              </RequestDetailLine>
            </div>
          ))}
        </div>
      )
  }
}

export default RequestDetailChanges
