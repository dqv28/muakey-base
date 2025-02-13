import { getMe } from '@/libs/data'
import { getTodos } from '@/libs/todos'
import React from 'react'
import PageHeader from './components/PageHeader'
import TodoFiltered from './components/todo-filtered'
import TodoTable from './components/todo-table'

const page: React.FC = async () => {
  const user = await getMe()
  const todos = await getTodos({
    account_id: user?.id,
  })

  return (
    <div>
      <PageHeader title="Công việc của tôi" extra={<TodoFiltered />} />
      <TodoTable
        dataSource={todos?.map((todo: any) => ({
          id: todo?.id,
          name: todo?.name,
          expired: todo?.expired,
          stage: todo?.stage_name || 'Không có',
          workflowName: todo?.workflow_name || 'Không có',
          workflowId: todo?.workflow_id,
          status: todo?.status,
          started_at: todo?.started_at,
        }))}
      />
    </div>
  )
}

export default page
