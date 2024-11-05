import React from 'react'
import Icon, { IconProps } from './Icon'

const CircleUserFilled: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 25 24"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.125 2.25a9.75 9.75 0 1 0 0 19.5 9.75 9.75 0 0 0 0-19.5m0 4a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5m4.838 9.94a4.75 4.75 0 0 0-2.838-.94h-4a4.75 4.75 0 0 0-2.835.938.75.75 0 0 0-.09 1.124c.783.808 2.196 1.762 3.946 2.044 1.791.288 3.87-.143 5.88-2.015a.75.75 0 0 0-.063-1.15"
          fill="currentColor"
        />
      </svg>
    </Icon>
  )
}

export default CircleUserFilled
