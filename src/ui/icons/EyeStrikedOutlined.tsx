import React from 'react'
import Icon, { IconProps } from './Icon'

const EyeStrikedOutlined: React.FC<IconProps> = (props) => {
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
          d="M7.557 7.058a1.333 1.333 0 0 0 1.886 1.885"
          stroke="currentColor"
          strokeWidth={1.5}
        />
        <path
          d="M11.62 11.115A5.8 5.8 0 0 1 8.5 12q-3.6 0-6-4 1.272-2.12 2.88-3.116m1.907-.764A6 6 0 0 1 8.5 4q3.6 0 6 4-.667 1.11-1.425 1.913M2.5 2l12 12"
          stroke="currentColor"
          strokeWidth={1.5}
        />
      </svg>
    </Icon>
  )
}

export default EyeStrikedOutlined
