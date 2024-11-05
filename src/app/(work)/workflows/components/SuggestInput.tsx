import { Avatar, Input, InputProps } from '@/ui'
import clsx from 'clsx'
import { uniqueId } from 'lodash'
import React from 'react'

type SuggestInputProps = InputProps & {
  suggestInputRef?: any
  suggestOpen?: boolean
  suggestItems?: any[]
  onSuggestClick?: (item: any) => void
  test?: string
}

const SuggestInput: React.FC<SuggestInputProps> = ({
  suggestInputRef,
  suggestOpen,
  suggestItems,
  onSuggestClick,
  value,
  test,
  ...rest
}) => {
  return (
    <div className="relative">
      <Input value={test || value} {...rest} />
      {suggestOpen && (
        <div
          className="absolute left-0 right-0 top-[100%] h-max bg-[#fff] p-[6px] shadow-[0_2px_10px_0_rgba(0,0,0,0.2)]"
          ref={suggestInputRef}
        >
          {(suggestItems || []).map((sug: any) => {
            const active = (test || (value as string))
              .split(' ')
              .includes(sug.username)
            return (
              <div
                className={clsx(
                  'group flex cursor-pointer items-center gap-[4px] p-[8px] text-[13px]',
                  active ? 'bg-[#f3f3f3]' : 'bg-[#fff]',
                )}
                key={uniqueId()}
                onClick={() => onSuggestClick?.(sug)}
              >
                <Avatar size={24}>{sug.full_name}</Avatar>

                <span className={clsx(active ? 'text-[#000]' : 'text-[#888]')}>
                  <span className="font-[700]">{sug.username}</span> ·{' '}
                  {sug.full_name} {!!sug.position && `· ${sug.position}`}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default SuggestInput
