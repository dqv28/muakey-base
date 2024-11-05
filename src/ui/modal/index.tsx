'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import ModalView, { ModalViewProps } from './ModalView'

export type ModalProps = ModalViewProps & {
  forceRender?: boolean
  destroyOnClose?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  open,
  forceRender = false,
  destroyOnClose = false,
  ...rest
}) => {
  const [shouldRender, setShouldRender] = useState(forceRender)

  useEffect(() => {
    setShouldRender(open || !destroyOnClose)
  }, [destroyOnClose, open])

  return (
    <>
      {shouldRender &&
        createPortal(<ModalView open={open} {...rest} />, document.body)}
    </>
  )
}

export default Modal
