'use client'

import { CaretRightOutlined } from '@ant-design/icons'
import { Collapse } from 'antd'
import clsx from 'clsx'
import React from 'react'
import JobCustomFieldModalForm from '../JobCustomFieldModalForm'
import dayjs from 'dayjs'

type JobCustomFieldsProps = {
  fields?: any
}

const JobCustomFields: React.FC<JobCustomFieldsProps> = ({ fields }) => {
  return (
    <div className="mt-[24px]">
      <div className="text-[12px] font-[500] text-[#42b814]">
        TRƯỜNG TÙY CHỈNH
      </div>

      <Collapse
        className="mt-[16px] !rounded-[4px] bg-[#fff]"
        expandIcon={({ isActive }) => (
          <CaretRightOutlined
            className={clsx(isActive ? 'rotate-90' : 'rotate-0')}
          />
        )}
        items={fields?.map((field: any) => {
          return {
            label: (
              <div className="group flex items-center justify-between gap-[16px]">
                <span className="text-[12px] font-[500] text-[#888]">
                  {String(field?.name).toLocaleUpperCase()}
                </span>
                <JobCustomFieldModalForm
                  initialValues={{
                    ...field,
                    require: field?.require === 1 ? true : false,
                    taskId: field?.task_id,
                  }}
                >
                  <span className="hidden cursor-pointer text-[13px] text-[#267cde] hover:underline group-hover:inline-block">
                    Chỉnh sửa
                  </span>
                </JobCustomFieldModalForm>
              </div>
            ),
            children: <span className="pl-[24px]">{field?.type === 'date' ? dayjs(field?.value).format('DD-MM-YYYY') : field?.value}</span>,
            style: {
              marginBottom: 4,
              borderRadius: 4,
              backgroundColor: '#f6f6f6',
              border: 'none',
            },
          }
        })}
        bordered={false}
      />
    </div>
  )
}

export default JobCustomFields
