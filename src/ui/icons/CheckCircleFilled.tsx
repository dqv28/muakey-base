import React from 'react'
import Icon, { IconProps } from './Icon'

const CheckCircleFilled: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 12 12"
        fill="currentColor"
      >
        <path d="M8.5 1.67a5 5 0 1 1-7.498 4.492L1 6l.002-.162A5 5 0 0 1 8.5 1.67m-.646 2.976a.5.5 0 0 0-.66-.041l-.048.041L5.5 6.292l-.646-.646-.048-.041a.5.5 0 0 0-.701.701l.041.047 1 1 .048.042a.5.5 0 0 0 .612 0l.048-.042 2-2 .041-.047a.5.5 0 0 0-.041-.66" />
      </svg>
    </Icon>
  )
}

export default CheckCircleFilled
