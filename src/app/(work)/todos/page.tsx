import { getMe } from '@/libs/data'
import { getTodos } from '@/libs/todos'
import { TabsProps } from 'antd'
import React from 'react'
import PageHeader from './components/PageHeader'
import PageProvider from './components/PageProvider'
import TodoFiltered from './components/todo-filtered'
import TodoTable from './components/todo-table'

const page: React.FC = async () => {
  const user = await getMe()
  const todos = await getTodos({
    account_id: user?.id,
  })

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Tất cả',
    },
    {
      key: '2',
      label: 'Đang làm',
    },
    {
      key: '3',
      label: 'Hoàn thành',
    },
    {
      key: '4',
      label: 'Thất bại',
    },
  ]

  return (
    <PageProvider>
      <div>
        <PageHeader
          title="Công việc của tôi"
          extra={<TodoFiltered />}
          tab={{ items }}
        />
        <div className="h-[calc(100vh-99px)] bg-[#f6f6f6] p-[16px]">
          <TodoTable dataSource={todos} options={{ userId: user?.id }} />
        </div>
      </div>
    </PageProvider>
  )
}

export default page
