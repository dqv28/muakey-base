import React from 'react'
import { Icon, IconProps } from '.'

const DownOutlined: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth={1.5} />
      </svg>
    </Icon>
  )
}

export default DownOutlined
