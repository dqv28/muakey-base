'use client'

import clsx from 'clsx'
import React, { ReactNode, useCallback, useMemo } from 'react'
import Button, { ButtonProps } from '../button'
import { CloseOutlined } from '../icons'

export type ModalViewProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'title'
> & {
  title?: ReactNode
  cancelButtonProps?: ButtonProps
  okButtonProps?: ButtonProps
  onCancel?: () => void
  onOk?: () => void
  onOpenChange?: (value: boolean) => void
  open?: boolean
  width?: number
  footer?: ReactNode
  overlayCloseable?: boolean
  closable?: boolean
  contentRender?: () => ReactNode
  headerClassName?: string
}

const InternalModalView: React.ForwardRefRenderFunction<
  HTMLDivElement,
  ModalViewProps
> = (
  {
    title,
    cancelButtonProps,
    okButtonProps,
    onCancel,
    onOk,
    onOpenChange,
    width = 422,
    open,
    footer,
    overlayCloseable = true,
    closable = true,
    children,
    contentRender,
    headerClassName,
    ...props
  },
  ref,
) => {
  const modalContentStyle: React.CSSProperties = {
    width: width,
  }

  const closeModal = useCallback(() => {
    onOpenChange?.(false)
  }, [onOpenChange])

  const handleClickOverlay = () => {
    if (overlayCloseable) {
      closeModal()
    }
  }

  const content = useMemo(() => {
    if (contentRender) {
      return contentRender()
    }

    return (
      <div className="relative max-w-full transform overflow-hidden rounded-[8px] bg-[#fff] transition-all">
        <div
          className={clsx(
            'flex items-center justify-between bg-[#eee] px-[20px] py-[16px] text-lg',
            headerClassName,
          )}
        >
          <div className="text-[16px] font-bold leading-[20px] text-[#555]">
            {title}
          </div>
          {closable && (
            <div
              onClick={closeModal}
              className="cursor-pointer text-[24px] text-[#9F9BAB]"
            >
              <CloseOutlined />
            </div>
          )}
        </div>
        {children && <div className="p-[20px]">{children}</div>}
        {footer || (
          <div className="mt-[16px] flex items-center justify-center gap-x-3 px-[20px] pb-[16px] font-[400]">
            <Button
              className="!bg-[#666]"
              onClick={onCancel}
              block
              size="small"
              {...cancelButtonProps}
            >
              {cancelButtonProps?.children || 'Đóng'}
            </Button>
            <Button
              className="bg-[#42b814]"
              onClick={onOk}
              block
              size="small"
              color="primary"
              {...okButtonProps}
            >
              {okButtonProps?.children || 'Xác nhận'}
            </Button>
          </div>
        )}
      </div>
    )
  }, [
    cancelButtonProps,
    children,
    closable,
    closeModal,
    contentRender,
    footer,
    okButtonProps,
    onCancel,
    onOk,
    title,
  ])

  return (
    <div {...props} ref={ref}>
      <div className={clsx('relative z-[10003] text-white', !open && 'hidden')}>
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div
            onClick={handleClickOverlay}
            className="fixed inset-0 bg-[#00000099]"
          ></div>
          <div className="flex min-h-full items-center justify-center p-[12px]">
            <div style={modalContentStyle}>{content}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ModalView = React.forwardRef(InternalModalView)

export default ModalView
