import React from 'react'
import { Icon, IconProps } from '.'

const CloseOutlined: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M18 6 6 18M6 6l12 12"
          stroke="currentColor"
          strokeWidth={1.5}
        />
      </svg>
    </Icon>
  )
}

export default CloseOutlined
