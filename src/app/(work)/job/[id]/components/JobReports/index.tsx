'use client'

import { generateUrl, randomColor } from '@/libs/utils'
import { OpenOutlined } from '@/ui/icons'
import { Avatar, List, Modal, Table, Tooltip } from 'antd'
import clsx from 'clsx'
import Link from 'next/link'
import React, { useState } from 'react'

type JobReportsProps = {
  reports?: any
}

const urlRegex =
  /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/

const JobReports: React.FC<JobReportsProps> = ({ reports }) => {
  const [urlListOpen, setUrlListOpen] = useState(false)
  const [urlList, setUrlList] = useState<string[]>([])

  return (
    <div className="mb-[16px] w-full space-y-[6px] overflow-hidden rounded-[6px] bg-[#fff] px-[20px] py-[16px]">
      <div className="text-[13px] font-[600] text-[#888]">BÁO CÁO</div>

      <List
        dataSource={reports}
        loading={reports?.length <= 0}
        renderItem={(item: any) =>
          item?.fields?.length > 0 && (
            <>
              <List.Item>
                <div className="flex w-full items-start gap-[12px]">
                  <div className="w-[32px]">
                    <Avatar
                      style={{
                        backgroundColor: randomColor(String(item?.stage_name)),
                      }}
                      size={32}
                    >
                      {String(item?.name_stage).charAt(0).toLocaleUpperCase()}
                    </Avatar>
                  </div>
                  <div className="w-full flex-1 space-y-[8px] divide-y divide-[#eee]">
                    {item?.fields?.map((i: any, index: number) => {
                      const urlSeparates = generateUrl(i?.value)

                      return (
                        <div
                          key={i?.value}
                          className={clsx(index !== 0 && 'pt-[6px]')}
                        >
                          <div className="flex items-center gap-[8px] text-[16px]">
                            <span className="font-[500]">{i?.name_field}</span>
                            {urlRegex.test(i?.value) && (
                              <Tooltip title="Mở link">
                                <OpenOutlined
                                  className="cursor-pointer text-[#267cde]"
                                  onClick={() => {
                                    console.log(urlSeparates)
                                    if (
                                      urlSeparates &&
                                      urlSeparates?.length <= 1
                                    ) {
                                      if (typeof window !== 'undefined') {
                                        window.open(urlSeparates[0], '_blank')
                                      }
                                    } else {
                                      setUrlListOpen(true)
                                      setUrlList(urlSeparates || [])
                                    }
                                  }}
                                />
                              </Tooltip>
                            )}
                          </div>
                          {urlRegex.test(i?.value) &&
                          urlSeparates &&
                          urlSeparates?.length <= 1 ? (
                            <Link href={urlSeparates[0]} target="_blank">
                              {i?.value}
                            </Link>
                          ) : (
                            <div className="line-clamp-2 text-[14px] text-[#00000073]">
                              {i?.value}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </List.Item>
              <Modal
                title="Danh sách đường dẫn"
                open={urlListOpen}
                onCancel={() => setUrlListOpen(false)}
                width={760}
                footer={<></>}
              >
                <Table
                  dataSource={urlList.map((url: string, index: number) => ({
                    index: `Link ${index + 1}`,
                    url,
                  }))}
                  columns={[
                    {
                      title: 'STT',
                      dataIndex: 'index',
                      width: 100,
                    },
                    {
                      title: 'Đường dẫn',
                      dataIndex: 'url',
                      render: (url) => (
                        <Link href={url} target="_blank">
                          {url}
                        </Link>
                      ),
                    },
                    {
                      title: 'Hành động',
                      dataIndex: 'action',
                      width: 120,
                      render: (_, record) => (
                        <Link
                          className="text-[20px]"
                          href={record?.url}
                          target="_blank"
                        >
                          <OpenOutlined />
                        </Link>
                      ),
                    },
                  ]}
                />
              </Modal>
            </>
          )
        }
      />
    </div>
  )
}

export default JobReports
