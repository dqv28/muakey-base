import React from 'react'
import Icon, { IconProps } from './Icon'

const CheckListOutlined: React.FC<IconProps> = (props) => {
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
          d="M5.69425 18.452L2.5 15.2578L3.54425 14.2135L5.66925 16.3385L9.91925 12.0885L10.9635 13.1578L5.69425 18.452ZM5.69425 10.8365L2.5 7.64227L3.54425 6.59802L5.66925 8.72302L9.91925 4.47302L10.9635 5.54227L5.69425 10.8365ZM13.0095 16.5578V15.0578H21.5095V16.5578H13.0095ZM13.0095 8.94227V7.44227H21.5095V8.94227H13.0095Z"
          fill="currentColor"
        />
      </svg>
    </Icon>
  )
}

export default CheckListOutlined
