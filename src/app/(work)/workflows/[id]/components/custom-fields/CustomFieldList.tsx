'use client'

import { EditOutlined } from '@ant-design/icons'
import { List } from 'antd'
import React from 'react'
import CustomFieldDeleteButton from './CustomFieldDeleteButton'
import CustomFieldsModalForm from './CustomFieldsModalForm'

type CustomFieldListProps = {
  dataSource?: any
  options?: any
}

const CustomFieldList: React.FC<CustomFieldListProps> = ({
  dataSource,
  options,
}) => {
  const { stages } = options as any
  const stageIds = Array.from(new Set(dataSource?.map((d: any) => d.stage_id)))

  return (
    <div>
      {stageIds?.map((id) => {
        const title = stages?.find((s: any) => s.id === id)?.name
        const filteredFields = dataSource?.filter((d: any) => d.stage_id === id)

        return (
          <>
            <div className="-mx-[24px] border-y border-[#eee] bg-[#f9f9f9] px-[24px] py-[12px] text-[11px] font-[500] text-[#17C286]">
              {title}
            </div>
            <List
              dataSource={filteredFields}
              renderItem={(item: any) => {
                return (
                  <>
                    <List.Item className="group">
                      <div>{item?.name}</div>
                      <div className="flex items-center gap-[12px]">
                        <div className="flex items-center gap-[12px]">
                          <CustomFieldsModalForm
                            action="edit"
                            options={{
                              initialValues: {
                                ...item,
                                require: item?.require === 1 ? true : false,
                              },
                              stages,
                              fieldId: item?.id,
                            }}
                          >
                            <EditOutlined className="hidden cursor-pointer text-[14px] text-[#aaa] group-hover:block" />
                          </CustomFieldsModalForm>
                          <CustomFieldDeleteButton fieldId={item?.id} />
                          {item?.require === 1 ? (
                            <span className="inline-block w-[110px] text-right text-[12px] text-[#c34343]">
                              * BẮT BUỘC
                            </span>
                          ) : (
                            <span className="inline-block w-[110px] text-right text-[12px] text-[#aaa]">
                              KHÔNG BẮT BUỘC
                            </span>
                          )}
                        </div>
                        <div className="ml-[12px] min-w-[90px] rounded-[3px] bg-[#e5ecf3] p-[6px] text-center leading-[20px]">
                          {item?.type}
                        </div>
                      </div>
                    </List.Item>
                  </>
                )
              }}
            />
          </>
        )
      })}
    </div>
  )
}

export default CustomFieldList
