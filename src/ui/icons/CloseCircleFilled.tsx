import React from 'react'
import Icon, { IconProps } from './Icon'

const CloseCircleFilled: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 12 12"
        fill="currentColor"
      >
        <path d="M8.5 1.67a5 5 0 1 1-7.498 4.492L1 6l.002-.162A5 5 0 0 1 8.5 1.67m-3.245 2.9a.5.5 0 0 0-.609.783L5.294 6l-.647.646-.041.047a.5.5 0 0 0 .749.66L6 6.707l.646.646.048.042a.5.5 0 0 0 .66-.749L6.707 6l.647-.647.041-.047a.5.5 0 0 0-.748-.66L6 5.292l-.646-.646-.048-.041z" />
      </svg>
    </Icon>
  )
}

export default CloseCircleFilled
