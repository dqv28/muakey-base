'use client'

import Form from './Form'
import FormDependency from './FormDependency'
import FormItem from './FormItem'
import FormSubmitButton from './FormSubmitButton'

type CompoundedFormType = typeof Form & {
  Item: typeof FormItem
  Dependency: typeof FormDependency
  SubmitButton: typeof FormSubmitButton
}

const CompoundedForm = Form as CompoundedFormType

CompoundedForm.Item = FormItem
CompoundedForm.Dependency = FormDependency
CompoundedForm.SubmitButton = FormSubmitButton

export type * from './Form'
export type * from './FormDependency'
export type * from './FormItem'
export type * from './FormSubmitButton'
export { CompoundedForm as Form, FormDependency, FormItem, FormSubmitButton }
export default CompoundedForm
