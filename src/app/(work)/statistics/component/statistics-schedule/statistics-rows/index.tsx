import React from 'react'
import StatisticsRowsStaff from './StatisticsRowsStaff'
import StatisticsRowsWorkflow from './StatisticsRowsWorkflow'

type StatisticsRowsProps = {
  type: 'staff' | 'workflow'
  options: any
}

const StatisticsRows: React.FC<StatisticsRowsProps> = ({ type, options }) => {
  const { todosWithAccounts, todosWithWorkflows, ...rest } = options

  switch (type) {
    case 'staff':
      return <StatisticsRowsStaff todos={todosWithAccounts} options={rest} />
    case 'workflow':
      return (
        <StatisticsRowsWorkflow todos={todosWithWorkflows} options={rest} />
      )
    default:
      return <></>
  }
}

export default StatisticsRows
