'use client'

import React, { useEffect } from 'react'

const ConfirmLeave: React.FC = () => {
  useEffect(() => {
    const beforeUnload = (e: any) => {
      e.preventDefault()
    }

    window.addEventListener('close', beforeUnload)

    return () => {
      window.removeEventListener('close', beforeUnload)
    }
  }, [])

  return null
}

export default ConfirmLeave
