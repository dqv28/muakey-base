import React from 'react'
import Icon, { IconProps } from './Icon'

const PlusOutlined: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path
          d="M8 3.333v9.334M3.334 8h9.333"
          stroke="currentColor"
          strokeWidth={1.5}
        />
      </svg>
    </Icon>
  )
}

export default PlusOutlined
