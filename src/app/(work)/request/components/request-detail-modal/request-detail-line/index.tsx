import { Badge } from 'antd'
import clsx from 'clsx'
import React from 'react'

type RequestDetailLineProps = {
  label?: React.ReactNode
  children?: React.ReactNode
  labelWidth?: string | number
  className?: string
  status?: 'error' | 'success'
}

const RequestDetailLine: React.FC<RequestDetailLineProps> = ({
  label,
  children,
  labelWidth,
  className,
  status,
}) => {
  return (
    <div className={clsx('flex items-center', className)}>
      {status &&
        (status === 'error' ? (
          <Badge dot status="error" />
        ) : (
          <Badge dot status="success" />
        ))}
      <div className="text-[#00000073]" style={{ width: labelWidth }}>
        {label}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default RequestDetailLine
