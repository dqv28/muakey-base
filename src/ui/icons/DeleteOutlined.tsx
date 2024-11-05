import React from 'react'
import Icon, { IconProps } from './Icon'

const DeleteOutlined: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M3.334 5.833h13.333M8.334 9.167v5m3.332-5v5m-7.5-8.334.833 10A1.667 1.667 0 0 0 6.666 17.5h6.667a1.667 1.667 0 0 0 1.666-1.667l.834-10m-8.333 0v-2.5a.833.833 0 0 1 .833-.833h3.334a.833.833 0 0 1 .833.833v2.5"
          stroke="currentColor"
          strokeWidth={1.5}
        />
      </svg>
    </Icon>
  )
}

export default DeleteOutlined
