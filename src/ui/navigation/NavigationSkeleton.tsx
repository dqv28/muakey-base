import clsx from 'clsx'
import { times } from 'lodash'
import React from 'react'
import { Skeleton } from '..'

type NavigationSkeletonProps = React.ComponentPropsWithoutRef<'div'> & {
  items: number
  icon?: boolean
}

const NavigationSkeleton: React.FC<NavigationSkeletonProps> = ({
  items,
  icon = true,
  className: customClassName,
  ...props
}) => {
  const className = clsx('rounded-3xl bg-[#272450] p-4', customClassName)

  return (
    <div className={className} {...props}>
      {times(items, (i) => (
        <div key={i} className="flex items-center gap-2 px-4 py-3">
          {icon && <Skeleton.Image size={24} shape="circle" active />}
          <Skeleton active />
        </div>
      ))}
    </div>
  )
}

export default NavigationSkeleton
