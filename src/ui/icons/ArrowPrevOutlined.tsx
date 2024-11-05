import React from 'react'
import Icon, { IconProps } from './Icon'

const ArrowPrevOutlined: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path d="m15 6-6 6 6 6" stroke="currentColor" strokeWidth={2} />
      </svg>
    </Icon>
  )
}

export default ArrowPrevOutlined
