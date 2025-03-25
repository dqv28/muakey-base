import clsx from 'clsx'
import Link from 'next/link'
import React, { ReactNode, useState } from 'react'
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

  const [show, setShow] = useState(true)
  const active = item?.children ? !show : initActive
  const layout = clsx(
    item?.icon && show && 'bg-gradient-to-b from-[#FFFFFF33] to-[#99999933]',
  )

  const className = clsx(
    'inline-block w-full transition-all duration-300 px-[16px] py-[8px]',
    show && active ? 'bg-[#FFFFFF29]' : 'bg-transparent',
    {
      'hover:bg-[#FFFFFF1A]': !ghost && !item?.children,
      'py-[12px]': ghost,
      'hover:rounded-2xl': item?.shouldRound,
    },
    customClassName,
  )

  const node = (
    <div className="flex items-center justify-between">
      <div
        className={clsx(
          'flex flex-1 items-center gap-[8px] leading-none',
          ghost ? 'text-[16px]' : 'text-[24px]',
        )}
      >
        {item?.icon}
        <div className="w-full text-[14px]">{item?.label}</div>
      </div>

      {item?.children && item.children.length > 0 && (
        <DownOutlined
          className={
            clsx(
              'text-white',
              {
                'rotate-0 text-[#fff]': !show,
                'rotate-180 text-[#ffffff4d]': show,
                'text-[16px]': ghost,
              })}
        />
      )}
    </div>
  )

  const handleClick = () => {
    if (!item?.children) return;
    setShow(!show);
  }


  return (
    <div className={layout}>
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
    </div>
  )
}

export default NavigationItem
