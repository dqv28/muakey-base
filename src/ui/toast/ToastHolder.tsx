'use client'

import clsx from 'clsx'
import React from 'react'
import { ToastBar, Toaster } from 'react-hot-toast'
import {
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
} from '../icons'

const toastIcons: { [key: string]: any } = {
  success: <CheckCircleFilled className="text-[24px] text-[#12CBAB]" />,
  error: <CloseCircleFilled className="text-[24px] text-[#FF5252]" />,
  warning: <ExclamationCircleFilled className="text-[24px] text-[#FFD25F]" />,
}

const ToastHolder: React.FC = () => {
  return (
    <Toaster>
      {(t) => {
        const hasCustom = ['success', 'error'].includes(t.type)
        const toastStyle: React.CSSProperties = hasCustom
          ? { background: 'transparent' }
          : {}

        return (
          <ToastBar toast={t} style={toastStyle}>
            {({ icon, message }) =>
              hasCustom ? (
                <div
                  className={clsx(
                    'flex items-center rounded-[20px] border-b px-[24px] py-[16px] leading-none ',
                    {
                      'border-b-[#12CBAB] bg-[#3C4746] text-[#12CBAB]':
                        t.type === 'success',
                      'border-b-[#FF5252] bg-[#473C3C] text-[#FF5252]':
                        t.type === 'error',
                      'border-b-[#FFD25F] bg-[#47443C] text-[#FFD25F]':
                        t.type === 'loading',
                    },
                  )}
                >
                  {toastIcons[t.type]}
                  <span className="font-[400]">{message}</span>
                </div>
              ) : (
                <>
                  {icon}
                  {message}
                </>
              )
            }
          </ToastBar>
        )
      }}
    </Toaster>
  )
}

export default ToastHolder
