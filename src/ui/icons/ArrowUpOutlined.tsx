import React from 'react'
import Icon, { IconProps } from './Icon'

const ArrowUpOutlined: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path d="m4 10 4-4 4 4" stroke="currentColor" />
      </svg>
    </Icon>
  )
}

export default ArrowUpOutlined
