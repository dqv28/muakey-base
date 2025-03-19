'use client'

import clsx from 'clsx'
import React, { useContext } from 'react'
import { RowContext, RowProps } from '../row'

type Breakpoint = {
  sm?: number
  md?: number
  lg?: number
  xl?: number
  '2xl'?: number
  default?: number
}

export type ColProps = React.ComponentPropsWithoutRef<'div'> & {
  span?: number | Breakpoint
  order?: number | Breakpoint
  offset?: number | Breakpoint
}

const InternalCol: React.ForwardRefRenderFunction<HTMLDivElement, ColProps> = (
  { span, order, offset, className: customClassName, children, ...props },
  ref,
) => {
  const gutter = useContext(RowContext)
  const customProps = { gutter, span, order, offset }

  const generateColClass = (
    props?: ColProps & {
      gutter?: RowProps['gutter']
    },
  ) => {
    if (props) {
      return Object.entries(props).map(([key, propValue]) => {
        if (Array.isArray(propValue)) {
          return `px-dynamic-${propValue[0] / 2}`
        }

        if (typeof propValue === 'object') {
          return Object.entries<any>(propValue)
            .map(([breakpoint, value]) =>
              breakpoint === 'default'
                ? clsx({
                    [`w-${value}-24`]: props.span && key === 'span',
                    [`order-${value}-24`]: props.order && key === 'order',
                    [`ms-${value}-24`]: props.offset && key === 'offset',
                    [`px-dynamic-${value / 2}`]:
                      props.gutter &&
                      key === 'gutter' &&
                      typeof value === 'number',
                    [`px-dynamic-${value[0] / 2}`]:
                      props.gutter &&
                      key === 'gutter' &&
                      typeof value !== 'number' &&
                      value[0] > 0,
                  })
                : clsx({
                    [`${breakpoint}:w-${value}-24`]:
                      props.span && key === 'span',
                    [`${breakpoint}:order-${value}-24`]:
                      props.order && key === 'order',
                    [`${breakpoint}:ms-${value}-24`]:
                      props.offset && key === 'offset',
                    [`${breakpoint}:px-dynamic-${value / 2}`]:
                      props.gutter &&
                      key === 'gutter' &&
                      typeof value === 'number',
                    [`${breakpoint}:px-dynamic-${value[0] / 2}`]:
                      props.gutter &&
                      key === 'gutter' &&
                      typeof value !== 'number' &&
                      value[0] > 0,
                  }),
            )
            .join(' ')
        }

        if (typeof propValue === 'number') {
          return clsx({
            [`w-${propValue}-24`]: props.span && key === 'span',
            [`order-${propValue}-24`]: props.order && key === 'order',
            [`ms-${propValue}-24`]: props.offset && key === 'offset',
            [`px-dynamic-${propValue / 2}`]: props.gutter && key === 'gutter',
          })
        }
      })
    }

    return null
  }

  const spanClass = generateColClass(customProps)
  const className = clsx(
    {
      hidden: typeof span === 'number' && span === 0,
      'shrink-0 grow-0': span,
    },
    spanClass,
    customClassName,
  )

  return (
    <div {...props} className={className} ref={ref}>
      {children}
    </div>
  )
}

export const Col = React.forwardRef(InternalCol)

export default Col
