import React from 'react'
import Icon, { IconProps } from './Icon'

const EyeOutlined: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.167 8a1.333 1.333 0 1 0 2.667 0 1.333 1.333 0 0 0-2.667 0Z"
          stroke="currentColor"
          strokeWidth={1.5}
        />
        <path
          d="M14.5 8q-2.4 4-6 4t-6-4q2.4-4 6-4t6 4Z"
          stroke="currentColor"
          strokeWidth={1.5}
        />
      </svg>
    </Icon>
  )
}

export default EyeOutlined
