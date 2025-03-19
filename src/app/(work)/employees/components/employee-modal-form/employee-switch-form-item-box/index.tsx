import clsx from 'clsx'
import React from 'react'
import EmployeeContactSwitchFormItem from './EmployeeContactSwitchFormItem'
import EmployeeEduInformationSwitchFormItem from './EmployeeEduInformationSwitchFormItem'
import EmployeeHistorySwitchFormItem from './EmployeeHistorySwitchFormItem'
import EmployeeLegalInformationSwitchFormItem from './EmployeeLegalInformationSwitchFormItem'
import EmploySalarySwitchFormItem from './EmploySalarySwitchFormItem'

export type EmployeeSwitchFormItemBoxProps = {
  className?: string
}

const EmployeeSwitchFormItemBox: React.FC<EmployeeSwitchFormItemBoxProps> = ({
  className,
}) => {
  return (
    <div className={clsx('space-y-[16px]', className)}>
      <EmploySalarySwitchFormItem />
      <EmployeeLegalInformationSwitchFormItem />
      <EmployeeEduInformationSwitchFormItem />
      <EmployeeHistorySwitchFormItem />
      <EmployeeContactSwitchFormItem />
    </div>
  )
}

export default EmployeeSwitchFormItemBox
