'use client'

import { TiptapEditor } from '@/components'
import { FormProps } from 'antd'
import React from 'react'

type TestFormProps = FormProps & {}

const TestForm: React.FC<TestFormProps> = (props) => {
  return (
    <>
      <div className="mb-[8px] mt-[16px]">Tiptap Editor</div>
      <TiptapEditor />
    </>
  )
}

export default TestForm
