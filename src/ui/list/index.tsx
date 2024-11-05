import clsx from 'clsx'
import { uniqueId } from 'lodash'
import React from 'react'
import Col from '../col'
import Row, { RowProps } from '../row'

type Breakpoint = {
  sm?: number
  md?: number
  lg?: number
  xl?: number
  '2xl'?: number
  default?: number
}

type Grid = {
  gutter?: RowProps['gutter']
  column?: number | Breakpoint
}

const generateColSpan = (col: Grid['column']) => {
  if (typeof col === 'number') {
    return 24 / col
  }

  const a = Object.entries(col ?? {}).map(([key, value]) => [key, 24 / value])

  return Object.fromEntries(a)
}

export type ListProps = React.ComponentPropsWithoutRef<'div'> & {
  dataSource?: any[]
  grid?: Grid
  renderItem?: (item: any) => React.ReactNode
  rowKey?: React.Key
  split?: boolean
}

const InternalList: React.ForwardRefRenderFunction<
  HTMLDivElement,
  ListProps
> = (
  {
    dataSource,
    grid,
    renderItem,
    rowKey,
    split = true,
    className: customClassName,
    ...props
  },
  ref,
) => {
  const className = clsx(
    'leading-none text-[#fff]',
    {
      'divide-y divide-[#ffffff1f] border-y border-[#FFFFFF1F]': split && !grid,
    },
    customClassName,
  )

  const span = generateColSpan(grid?.column ?? 1)

  return (
    <div className={className} ref={ref} {...props}>
      {grid ? (
        <Row gutter={grid?.gutter}>
          {dataSource?.map((item) => (
            <Col key={rowKey ? item[rowKey as string] : uniqueId()} span={span}>
              {renderItem?.(item)}
            </Col>
          ))}
        </Row>
      ) : (
        dataSource?.map((item) => (
          <div
            key={rowKey ? item[rowKey as string] : uniqueId()}
            className={clsx({
              '-my-[1px]': split,
            })}
          >
            {renderItem?.(item)}
          </div>
        ))
      )}
    </div>
  )
}

export const List = React.forwardRef(InternalList)

export default List
