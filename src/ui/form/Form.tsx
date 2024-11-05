'use client'

import React, { useImperativeHandle, useMemo } from 'react'
import {
  FieldValues,
  FormProvider,
  UseFormProps,
  UseFormReturn,
  useForm,
} from 'react-hook-form'

export type FormInstance<TFormData extends FieldValues = FieldValues> =
  UseFormReturn<TFormData> & {
    submit: ReturnType<UseFormReturn['handleSubmit']>
  }

export type FormProps<TFormData extends FieldValues = FieldValues> = Omit<
  React.ComponentPropsWithoutRef<'form'>,
  'onSubmit' | 'onSubmitError'
> & {
  formRef?: React.ForwardedRef<FormInstance<TFormData> | undefined>
  onSubmit?: (values: TFormData) => unknown | Promise<unknown>
  onSubmitError?: (errors: any) => unknown | Promise<unknown>
  defaultValues?: UseFormProps<TFormData>['defaultValues']
  values?: UseFormProps<TFormData>['values']
  children?: React.ReactNode
  disabled?: boolean
}

const Form: React.FC<FormProps> = ({
  formRef,
  onSubmit,
  onSubmitError,
  defaultValues,
  values,
  children,
  disabled,
  ...rest
}) => {
  const form = useForm({
    defaultValues,
    values,
    disabled,
  })

  const handleSubmit = useMemo(
    () =>
      form.handleSubmit(
        async (data) => await onSubmit?.(data),
        async (errors) => await onSubmitError?.(errors),
      ),
    [form, onSubmit, onSubmitError],
  )

  useImperativeHandle(formRef, () => ({
    ...form,
    submit: handleSubmit,
  }))

  return (
    <FormProvider {...form}>
      <form {...rest} onSubmit={handleSubmit}>
        {children}
      </form>
    </FormProvider>
  )
}

export default Form as <TFormData extends FieldValues = FieldValues>(
  props: FormProps<TFormData>,
) => React.ReactElement
