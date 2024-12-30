'use client'

import { withApp } from '@/hoc'
import { randomColor } from '@/libs/utils'
import { App, Avatar, Col, Dropdown, Row, Tooltip } from 'antd'
import { useRouter } from 'next/navigation'
import React from 'react'
import DepartmentModalForm from '../DepartmentModalForm'
import { deleteDepartmentAction } from './action'

const DepartmentList: React.FC<{
  dataSource?: any
  options?: any
}> = ({ dataSource, options }) => {
  const { message, modal } = App.useApp()
  const router = useRouter()

  const members = options?.accounts?.filter(
    (acc: any) => acc?.type !== 'department',
  )

  const handleDelete = async (id: number) => {
    try {
      const { message: msg, errors } = await deleteDepartmentAction(id)

      if (errors) {
        message.error(msg)
        return
      }

      message.success('Xóa thành công')
      router.refresh()
    } catch (error) {
      throw new Error(String(error))
    }
  }

  return (
    <Row gutter={[24, 24]}>
      {dataSource?.map((depart: any) => (
        <Col key={depart?.id} span={6}>
          <div className="space-y-[16px] rounded-[4px] bg-[#fff] p-[16px]">
            <div className="flex items-center justify-between gap-[16px] leading-none">
              <span className="text-[16px]">{depart?.name}</span>
              <Dropdown
                rootClassName="!z-50"
                trigger={['click']}
                dropdownRender={() => (
                  <div className="-[0_2px_6px_0_rgba(0,0,0,0.1)] mt-[4px] rounded-[4px] bg-[#fff] p-[2px]">
                    <DepartmentModalForm
                      action="edit"
                      options={{
                        id: depart?.id,
                        members,
                        initialValues: {
                          name: depart?.name,
                          members: depart?.members?.map(
                            (mem: any) => mem?.username,
                          ),
                        },
                      }}
                    >
                      <div className="cursor-pointer bg-transparent px-[16px] py-[12px] text-[14px] leading-none transition-all hover:bg-[#f8f8f8]">
                        Chỉnh sửa phòng ban
                      </div>
                    </DepartmentModalForm>
                    <div
                      className="cursor-pointer bg-transparent px-[16px] py-[12px] text-[14px] leading-none text-[#cc1111] transition-all hover:bg-[#f8f8f8]"
                      onClick={() => {
                        modal.confirm({
                          title: 'Xóa phòng ban?',
                          content: 'Xác nhận xóa phòng ban này?',
                          onOk: async () => {
                            await handleDelete(depart?.id)
                          },
                          okText: 'Xóa',
                        })
                      }}
                    >
                      Xóa phòng ban
                    </div>
                  </div>
                )}
              >
                <div className="cursor-pointer px-[6px] py-[2px] text-[20px] text-[#000]">
                  ··
                </div>
              </Dropdown>
            </div>
            <Avatar.Group>
              {depart?.members?.map((member: any) => (
                <Tooltip key={member?.id} title={member?.full_name}>
                  <Avatar
                    src={member?.avatar}
                    style={{
                      backgroundColor: randomColor(String(member?.full_name)),
                    }}
                  >
                    {String(member?.full_name).charAt(0).toUpperCase()}
                  </Avatar>
                </Tooltip>
              ))}
            </Avatar.Group>
          </div>
        </Col>
      ))}
    </Row>
  )
}

export default withApp(DepartmentList)
