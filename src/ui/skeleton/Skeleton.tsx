import clsx from 'clsx'
import React from 'react'

export type SkeletonProps = React.ComponentPropsWithoutRef<'div'> & {
  width?: number | string
  active?: boolean
}

const InternalSkeleton: React.ForwardRefRenderFunction<
  HTMLDivElement,
  SkeletonProps
> = (
  {
    width,
    active = false,
    className: customClassName,
    style: customStyle,
    ...props
  },
  ref,
) => {
  const className = clsx(
    'h-[14px] rounded-[4px] bg-[#FFFFFF99]',
    {
      'animate-pulse': active,
    },
    customClassName,
  )

  const style: React.CSSProperties = {
    width: width ?? '100%',
    ...customStyle,
  }

  return <div {...props} className={className} style={style} ref={ref}></div>
}

const Skeleton = React.forwardRef(InternalSkeleton)

export default Skeleton
