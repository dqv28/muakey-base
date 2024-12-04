import React from 'react'
import Icon, { IconProps } from './Icon'

const CodeOutlined: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.99994 17.6537L2.34619 11.9999L7.99994 6.34619L9.06919 7.41544L4.46919 12.0154L9.05369 16.5999L7.99994 17.6537ZM15.9999 17.6537L14.9307 16.5844L19.5307 11.9844L14.9462 7.39994L15.9999 6.34619L21.6537 11.9999L15.9999 17.6537Z"
          fill="currentColor"
        />
      </svg>
    </Icon>
  )
}

export default CodeOutlined
