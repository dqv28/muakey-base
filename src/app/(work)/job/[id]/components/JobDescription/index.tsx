'use client'

import { Button, Form } from 'antd'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import ReactQuill from 'react-quill-new'
import { editTaskAction } from '../../../actions'

type JobDescriptionProps = {
  value?: any
  params?: any
}

const JobDescription: React.FC<JobDescriptionProps> = ({
  value: defaultValue,
  params,
}) => {
  const [value, setValue] = useState(defaultValue || '')
  const [isEdit, setIsEdit] = useState(false)

  const modules: ReactQuill.ReactQuillProps['modules'] = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  }

  const formats: ReactQuill.ReactQuillProps['formats'] = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'indent',
    'link',
    'image',
  ]

  const handleSubmit = async (formData: any) => {
    try {
      const { success, error } = await editTaskAction(params?.taskId, formData)

      if (error) {
        toast.error(error)
        return
      }

      toast.success(success)
    } catch (error: any) {
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
          <Form.Item name="description">
            <ReactQuill theme="snow" modules={modules} formats={formats} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
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
          className="mt-[8px] text-[#999]"
          dangerouslySetInnerHTML={{ __html: value || 'Không có mô tả' }}
        />
      )}
    </div>
  )
}

export default JobDescription
