'use client'

import InitializedMDXEditor from '@/components/InitializedMDXEditor/InitializedMDXEditor'
import { MDXEditorMethods } from '@mdxeditor/editor'
import { Button, Form } from 'antd'
import clsx from 'clsx'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { editTaskAction } from '../../../actions'
import { Converter } from 'showdown'

type JobDescriptionProps = {
  value?: any
  params?: any
}

const JobDescription: React.FC<JobDescriptionProps> = ({
  value: defaultValue,
  params,
}) => {
  const [value] = useState(defaultValue || '')
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const editorRef = useRef<MDXEditorMethods>(null)
  const converter = new Converter()

  const handleSubmit = async (formData: any) => {
    console.log(formData)
    setLoading(true)

    try {
      const { message, errors } = await editTaskAction(params?.task?.code, {
        description: converter.makeHtml(formData?.description),
      })

      if (errors) {
        toast.error(message)
        setLoading(false)
        return
      }

      toast.success('Cập nhật thành công')
      setIsEdit(false)
      setLoading(false)
      
      if (typeof window !== 'undefined') {
        window.location.reload()
      }
    } catch (error: any) {
      setLoading(false)
      throw new Error(error)
    }
  }

  return (
    <div className="mt-[24px]">
      <div className="flex items-center justify-between gap-[24px]">
        <div className="text-[12px] font-[500] text-[#42b814]">MÔ TẢ</div>
        <span
          className="cursor-pointer text-[13px] text-[#267cde] hover:underline"
          onClick={() => setIsEdit(!isEdit)}
        >
          Chỉnh sửa
        </span>
      </div>
      {isEdit ? (
        <Form
          className="mt-[16px]"
          initialValues={{
            description: value,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item rootClassName="min-h-[220px]" name="description">
            <InitializedMDXEditor
              contentEditableClassName="p-[12px] border border-[#eee] focus:outline-none rounded-[4px] min-h-[180px] prose !max-w-full"
              editorRef={editorRef}
              markdown={converter.makeMarkdown(value || '')}
              placeholder='Mô tả nhiệm vụ'
            />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary" loading={loading}>
              Cập nhật
            </Button>
            <Button
              className="ml-[8px]"
              variant="outlined"
              onClick={() => setIsEdit(false)}
            >
              Bỏ qua
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <div
          className={clsx('mt-[8px] prose !max-w-full', value ? 'text-[#333]' : 'text-[#999]')}
          dangerouslySetInnerHTML={{ __html: value || 'Không có mô tả' }}
        />
      )}
    </div>
  )
}

export default JobDescription
