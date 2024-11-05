import clsx from 'clsx'
import Link from 'next/link'
import React, { useState } from 'react'
import { NavigationMenuType } from '.'
import { DownOutlined } from '../icons'
import NavigationSubmenu from './NavigationSubmenu'

export type NavigationItemProps = {
  item?: NavigationMenuType
  active?: boolean
  defaultOpen?: boolean
  children?: React.ReactNode
  ghost?: boolean
  exact?: boolean
  matchType?: 'default' | 'prefix' | 'exact'
  className?: string
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  item,
  active: initActive,
  defaultOpen,
  children,
  ghost,
  exact,
  matchType = 'default',
  className: customClassName,
}) => {
  const [show, setShow] = useState(defaultOpen)
  const active = item?.children ? !show : initActive

  const className = clsx(
    'inline-block w-full transition-all duration-300',
    active ? 'bg-[#FFFFFF1A]' : 'bg-transparent',
    {
      'hover:bg-[#FFFFFF1A]': !ghost && !item?.children,
      'py-[12px]': ghost,
      'px-[16px] py-[8px]': item?.children,
    },
    customClassName,
  )

  const node = (
    <div className="flex items-center justify-between">
      <div
        className={clsx(
          'flex flex-1 items-center gap-[8px] leading-none',
          ghost ? 'text-[16px]' : 'text-[24px]',
          show ? 'text-[#ffffff4d]' : 'text-[#fffc]',
        )}
      >
        {item?.icon}
        <div className="w-full text-[14px]">{item?.label}</div>
      </div>

      {item?.children && (
        <DownOutlined
          className={clsx({
            'rotate-0 text-[#fff]': !show,
            'rotate-180 text-[#ffffff4d]': show,
            'text-[16px]': ghost,
          })}
        />
      )}
    </div>
  )

  const handleClick = () => {
    if (!item?.children) {
      return
    }

    setShow(!show)
  }

  return (
    <li
      key={item?.key}
      className="cursor-pointer rounded-full text-[16px] leading-none"
      onClick={handleClick}
    >
      {item?.children ? (
        <div className={className}>{node}</div>
      ) : (
        <Link className={className} href={item?.href ?? ''}>
          {node}
        </Link>
      )}
      {children ??
        (item?.children && (
          <div
            className={clsx('transition-all duration-300', {
              'mt-[12px] rounded-[16px] bg-[#FFFFFF0F] px-4 py-[4px]':
                ghost && show,
            })}
          >
            <NavigationSubmenu
              menu={item?.children}
              defaultOpen={show}
              ghost={ghost}
              exact={exact}
              matchType={matchType}
            />
          </div>
        ))}
    </li>
  )
}

export default NavigationItem
