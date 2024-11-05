'use client'

import RadioButton from './Button'
import RadioGroup from './Group'
import Radio from './Radio'

type CompoundedRadioType = typeof Radio & {
  Group: typeof RadioGroup
  Button: typeof RadioButton
}

const CompoundedRadio = Radio as CompoundedRadioType

CompoundedRadio.Group = RadioGroup
CompoundedRadio.Button = RadioButton

export type { RadioButtonProps } from './Button'
export type { RadioGroupProps } from './Group'
export type { RadioProps } from './Radio'
export { CompoundedRadio as Radio, RadioButton, RadioGroup }
export default CompoundedRadio
