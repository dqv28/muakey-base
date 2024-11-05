'use client'

import React from 'react'
import { useFormContext } from 'react-hook-form'
import Button, { ButtonProps } from '../button'

export type FormSubmitButtonProps = ButtonProps

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  children,
  ...rest
}) => {
  const { formState } = useFormContext()

  return (
    <Button
      type="submit"
      disabled={formState.disabled}
      loading={formState.isSubmitting}
      {...rest}
    >
      {children}
    </Button>
  )
}

export default FormSubmitButton
