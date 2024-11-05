import clsx from 'clsx'
import React from 'react'

export type IconProps = React.ComponentPropsWithoutRef<'span'>

const Icon: React.FC<IconProps> = ({ className: customClassName, ...rest }) => {
  const className = clsx(
    'inline-flex items-center text-center align-[-.125em]',
    customClassName,
  )

  return <span {...rest} className={className}></span>
}

export default Icon
