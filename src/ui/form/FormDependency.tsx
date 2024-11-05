'use client'

import React from 'react'
import { useWatch } from 'react-hook-form'

export type FormDependencyProps = {
  name?: any
  children?: (
    values: unknown | unknown[] | { [key: string]: unknown },
  ) => React.ReactNode
}

const FormDependency: React.FC<FormDependencyProps> = ({ name, children }) => {
  const values = useWatch({ name })

  return children?.(values)
}

export default FormDependency
