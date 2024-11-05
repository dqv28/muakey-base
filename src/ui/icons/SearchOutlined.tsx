import React from 'react'
import { Icon, IconProps } from '.'

const SearchOutlined: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M2.5 8.333a5.834 5.834 0 1 0 11.667 0 5.834 5.834 0 0 0-11.667 0Zm15 9.167-5-5"
        stroke="currentColor"
        strokeWidth={1.5}
      />
    </svg>
  </Icon>
)

export default SearchOutlined
