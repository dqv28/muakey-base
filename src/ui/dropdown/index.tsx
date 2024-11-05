'use client'

import clsx from 'clsx'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { mergeRefs } from '../utils'

type MenuItemType = {
  key?: React.Key
  label?: string
  link?: string
  icon?: React.ReactNode
}

export type DropdownProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'onClick'
> & {
  menu?: MenuItemType[]
  trigger?: 'click' | 'hover'
  open?: boolean
  placement?:
    | 'bottom'
    | 'bottomLeft'
    | 'bottomRight'
    | 'top'
    | 'topLeft'
    | 'topRight'
  onClick?: () => void
  onOpenChange?: (open: boolean) => void
  dropdownRenderer?: (menu?: MenuItemType[]) => React.ReactNode
}

const InternalDropdown: React.ForwardRefRenderFunction<
  HTMLDivElement,
  DropdownProps
> = (
  {
    menu,
    trigger = 'click',
    open,
    placement = 'bottomLeft',
    onClick,
    onOpenChange,
    dropdownRenderer,
    className: customClassName,
    children,
    ...rest
  },
  ref,
) => {
  const className = clsx('group relative cursor-pointer', customClassName)
  const [hidden, setHidden] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const hasOpen = typeof open !== 'undefined'

  useEffect(() => {
    onOpenChange?.(hasOpen ? open : hidden)

    if (!hasOpen && !hidden) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !event.composedPath().includes(dropdownRef.current)
      ) {
        hasOpen || setHidden(false)
        onOpenChange?.(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [hidden, hasOpen, open])

  const handleToggleDropdown = () => {
    hasOpen || setHidden(!hidden)
    onClick?.()
  }

  return (
    <div {...rest} className={className} ref={mergeRefs([dropdownRef, ref])}>
      <div onClick={handleToggleDropdown}>{children}</div>
      <div
        className={clsx('absolute z-[9999]', {
          'left-[50%] top-full -translate-x-[50%]': placement === 'bottom',
          'left-0 top-full': placement === 'bottomLeft',
          'right-0 top-full': placement === 'bottomRight',
          'bottom-full left-[50%] -translate-x-[50%]': placement === 'top',
          'bottom-full left-0': placement === 'topLeft',
          'bottom-full right-0': placement === 'topRight',
          hidden: hasOpen ? !open : !hidden && trigger === 'click',
          block: hasOpen ? open : hidden && trigger === 'click',
          'hidden group-hover:block': open === undefined && trigger === 'hover',
        })}
      >
        {dropdownRenderer?.(menu) ?? (
          <ul className="min-w-max space-y-[24px] border border-[#5081ff33] bg-[#fff] p-[24px] text-[14px]">
            {menu?.map((item) => (
              <li key={item.key} className="leading-none">
                <Link
                  href={item.link ?? ''}
                  className="flex items-center gap-[8px]"
                >
                  {item.icon && (
                    <span className="text-[20px]">{item.icon}</span>
                  )}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export const Dropdown = React.forwardRef(InternalDropdown)

export default Dropdown
