import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload } from 'antd'
import React from 'react'

export type EmployeeResumeFormItemBoxProps = {
  className?: string
}

const EmployeeResumeFormItemBox: React.FC<EmployeeResumeFormItemBoxProps> = ({
  className,
}) => {
  return (
    <div className={className}>
      <div className="mb-[16px] text-[16px] font-[600] leading-[24px]">
        Hồ sơ xin việc
      </div>

      <Upload>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </div>
  )
}

export default EmployeeResumeFormItemBox
