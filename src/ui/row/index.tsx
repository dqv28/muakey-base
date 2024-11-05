'use client'

import clsx from 'clsx'
import React, { createContext } from 'react'

type RowAlign = 'start' | 'center' | 'end' | 'stretch'
type RowJustify =
  | 'start'
  | 'end'
  | 'center'
  | 'space-around'
  | 'space-between'
  | 'space-evenly'
type RowGutter = number | [number, number]

type Breakpoint<T> = {
  sm?: T
  md?: T
  lg?: T
  xl?: T
  '2xl'?: T
  default?: T
}

export type RowProps = React.ComponentPropsWithoutRef<'div'> & {
  align?: RowAlign | Breakpoint<RowAlign>
  gutter?: RowGutter | Breakpoint<RowGutter>
  justify?: RowJustify | Breakpoint<RowJustify>
  wrap?: boolean
}

export const RowContext = createContext<RowProps['gutter']>(0)

const InternalRow: React.ForwardRefRenderFunction<HTMLDivElement, RowProps> = (
  {
    gutter = 0,
    wrap = true,
    align,
    justify,
    className: customClassName,
    style: customStyle,
    children,
    ...props
  },
  ref,
) => {
  const customProps = { gutter, align, justify }

  const generateRowClass = (rowProps: RowProps) => {
    if (rowProps) {
      return Object.entries(rowProps).map(([prop, propValue]) => {
        if (Array.isArray(propValue)) {
          return clsx({
            [`-mx-dynamic-${propValue[0] / 2} gap-y-dynamic-${propValue[1]}`]:
              rowProps.gutter &&
              prop === 'gutter' &&
              typeof propValue !== 'number' &&
              propValue[0] > 0,
            [`gap-y-dynamic-${propValue[1]}`]:
              rowProps.gutter &&
              prop === 'gutter' &&
              typeof propValue !== 'number' &&
              propValue[0] <= 0,
          })
        }

        if (typeof propValue === 'object') {
          return Object.entries<any>(propValue)
            .map(([breakpoint, value]) =>
              breakpoint === 'default'
                ? clsx({
                    [`items-${value}`]: rowProps.align && prop === 'align',
                    [`justify-start`]:
                      rowProps.justify &&
                      prop === 'justify' &&
                      value === 'start',
                    [`justify-center`]:
                      rowProps.justify &&
                      prop === 'justify' &&
                      value === 'center',
                    [`justify-end`]:
                      rowProps.justify && prop === 'justify' && value === 'end',
                    [`justify-around`]:
                      rowProps.justify &&
                      prop === 'justify' &&
                      value === 'space-around',
                    [`justify-between`]:
                      rowProps.justify &&
                      prop === 'justify' &&
                      value === 'space-between',
                    [`justify-evenly`]:
                      rowProps.justify &&
                      prop === 'justify' &&
                      value === 'space-evenly',
                    [`-mx-dynamic-${value / 2}`]:
                      rowProps.gutter &&
                      prop === 'gutter' &&
                      typeof value === 'number',
                    [`-mx-dynamic-${value[0] / 2} gap-y-dynamic-${value[1]}`]:
                      rowProps.gutter &&
                      prop === 'gutter' &&
                      typeof value !== 'number' &&
                      value[0] > 0,
                    [`gap-y-dynamic-${value[1]}`]:
                      rowProps.gutter &&
                      prop === 'gutter' &&
                      typeof value !== 'number' &&
                      value[0] <= 0,
                  })
                : clsx({
                    [`${breakpoint}:items-${value}`]:
                      rowProps.align && prop === 'align',
                    [`${breakpoint}:justify-start`]:
                      rowProps.justify &&
                      prop === 'justify' &&
                      value === 'start',
                    [`${breakpoint}:justify-center`]:
                      rowProps.justify &&
                      prop === 'justify' &&
                      value === 'center',
                    [`${breakpoint}:justify-end`]:
                      rowProps.justify && prop === 'justify' && value === 'end',
                    [`${breakpoint}:justify-around`]:
                      rowProps.justify &&
                      prop === 'justify' &&
                      value === 'space-around',
                    [`${breakpoint}:justify-between`]:
                      rowProps.justify &&
                      prop === 'justify' &&
                      value === 'space-between',
                    [`${breakpoint}:justify-evenly`]:
                      rowProps.justify &&
                      prop === 'justify' &&
                      value === 'space-evenly',
                    [`${breakpoint}:-mx-dynamic-${value / 2}`]:
                      rowProps.gutter &&
                      prop === 'gutter' &&
                      typeof value === 'number',
                    [`${breakpoint}:-mx-dynamic-${value[0] / 2} ${breakpoint}:gap-y-dynamic-${value[1]}`]:
                      rowProps.gutter &&
                      prop === 'gutter' &&
                      typeof value !== 'number' &&
                      value[0] > 0,
                    [`${breakpoint}:gap-y-dynamic-${value[1]}`]:
                      rowProps.gutter &&
                      prop === 'gutter' &&
                      typeof value !== 'number' &&
                      value[0] <= 0,
                  }),
            )
            .join(' ')
        }

        if (typeof propValue === 'number') {
          return `-mx-dynamic-${propValue / 2}`
        }
      })
    }

    return null
  }

  const rowClass = generateRowClass(customProps)
  const className = clsx(
    'flex',
    {
      'flex-wrap': wrap,
      'items-start': typeof align === 'string' && align === 'start',
      'items-end': typeof align === 'string' && align === 'end',
      'items-center': typeof align === 'string' && align === 'center',
      'items-stretch': typeof align === 'string' && align === 'stretch',
      'justify-start': typeof justify === 'string' && justify === 'start',
      'justify-end': typeof justify === 'string' && justify === 'end',
      'justify-center': typeof justify === 'string' && justify === 'center',
      'justify-around':
        typeof justify === 'string' && justify === 'space-around',
      'justify-between':
        typeof justify === 'string' && justify === 'space-between',
      'justify-evenly':
        typeof justify === 'string' && justify === 'space-evenly',
    },
    rowClass,
    customClassName,
  )

  return (
    <RowContext.Provider value={gutter}>
      <div {...props} className={className} ref={ref}>
        {children}
      </div>
    </RowContext.Provider>
  )
}

export const Row = React.forwardRef(InternalRow)

export default Row
