import clsx from 'clsx'
import React from 'react'

export type ProgressProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'color'
> & {
  percent?: number | number[]
  format?: (percent?: number) => void
  size?: number | 'default' | 'small'
  color?: string | string[]
  showInfo?: boolean
}

const SIZE_VARIANTS = {
  default: 8,
  small: 4,
}

const ProgressBar: React.FC<
  Pick<ProgressProps, 'percent' | 'color'> & {
    height?: number
  }
> = ({ percent, color, height }) => {
  if (Array.isArray(percent)) {
    return (
      <div className="flex items-center">
        {percent.map((p, i) => {
          const c = Array.isArray(color) ? color[i] : color
          return (
            p > 1 && (
              <div style={{ width: `${p}%`, backgroundColor: c, height }} />
            )
          )
        })}
      </div>
    )
  }

  return (
    <div
      style={{
        width: `${percent}%`,
        backgroundColor: Array.isArray(color) ? color[0] : color,
        height,
      }}
    />
  )
}

export const Progress: React.FC<ProgressProps> = ({
  percent,
  format,
  size = 'default',
  showInfo = false,
  color,
  className: customClassName,
  ...rest
}) => {
  const className = clsx('flex w-full items-center', customClassName)
  const h = typeof size === 'number' ? size : SIZE_VARIANTS[size]

  return (
    <div className={className} {...rest}>
      <div
        className="w-full overflow-hidden rounded-full bg-[#0000001a]"
        style={{
          height: h,
        }}
      >
        <ProgressBar percent={percent} color={color} height={h} />
      </div>
    </div>
  )
}

export default Progress
