'use client'

import { useAsyncEffect } from '@/libs/hook'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Empty, List, ListProps } from 'antd'
import dayjs from 'dayjs'
import Link from 'next/link'
import React, { useState } from 'react'
import { getNotificationsAction } from './action'

type NotificationsListProps = ListProps<any> & {}

const NotificationsList: React.FC<NotificationsListProps> = (props) => {
  const [notifications, setNotifications] = useState<any[]>([])

  useAsyncEffect(async () => {
    const res = await getNotificationsAction()

    setNotifications(res)
  }, [])

  return (
    <List
      dataSource={notifications}
      renderItem={(item: any) => (
        <List.Item className="!p-0">
          <Link
            className="flex w-full items-start gap-[24px] p-[16px] hover:bg-[#F5FCFF] hover:text-[#000]"
            href={item?.link}
          >
            <Avatar className="w-[40px]" icon={<UserOutlined />} size={40} />
            <div className="flex-1">
              <h3 className="text-[16px]">{item?.title}</h3>
              <p
                className="text-[12px] text-[#555]"
                dangerouslySetInnerHTML={{ __html: item?.message }}
              />
              <div>{dayjs(item?.created_at).format('HH:mm DD/MM/YYYY')}</div>
            </div>
          </Link>
        </List.Item>
      )}
      locale={{
        emptyText: (
          <Empty className="py-[100px]" description="Không có thông báo." />
        ),
      }}
      {...props}
    />
  )
}

export default NotificationsList
