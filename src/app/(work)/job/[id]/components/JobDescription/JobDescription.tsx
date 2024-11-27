'use client'

import { Button, Form } from 'antd'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import React, { useCallback, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import ReactQuill from 'react-quill-new'
import { editTaskAction, uploadImageAction } from '../../../actions'

type JobDescriptionProps = {
  value?: any
  params?: any
}

const base64ToFile = (base64: string) => {
  const byteString = atob(base64.split(',')[1])
  const mimeString = base64.split(',')[0].split(':')[1].split(';')[0]

  const byteArray = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i)
  }

  return new File([byteArray], 'upload', { type: mimeString })
}

const JobDescription: React.FC<JobDescriptionProps> = ({
  value: defaultValue,
  params,
}) => {
  const [value, setValue] = useState(defaultValue || '')
  const [isEdit, setIsEdit] = useState(false)
  const [loading, setLoading] = useState(false)
  const quillRef = useRef<ReactQuill>(null)
  const router = useRouter()

  const handleSubmit = async (formData: any) => {
    setLoading(true)

    try {
      const { message, errors } = await editTaskAction(params?.task?.code, {
        ...formData,
      })

      if (errors) {
        toast.error(message)
        setLoading(false)
        return
      }

      toast.success('Cập nhật thành công')
      setIsEdit(false)
      setLoading(false)
      router.refresh()
    } catch (error: any) {
      setLoading(false)
      throw new Error(error)
    }
  }

  const uploadImage = useCallback(async () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async (e) => {
      const quill = quillRef.current

      if (input !== null && input.files !== null) {
        const file = input.files[0]
        const formData = new FormData()

        formData.append('image', file)

        try {
          const { url, error } = await uploadImageAction(formData)

          if (error) {
            toast.error(error)
            return
          }

          if (!quill) return

          const range = quill.getEditorSelection()

          if (!range) return

          quill.getEditor().insertEmbed(range.index, 'image', url)
        } catch (error: any) {
          throw new Error(error)
        }
      }
    }
  }, [])

  const modules: ReactQuill.ReactQuillProps['modules'] = {
    toolbar: {
      container: [
        [{ header: '1' }, { header: '2' }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image', 'video'],
        ['code-block'],
        ['clean'],
      ],
      handlers: {
        image: uploadImage,
      },
    },
    clipboard: {
      matchVisual: false,
    },
  }

  const formats: ReactQuill.ReactQuillProps['formats'] = [
    'header',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'indent',
    'link',
    'image',
    'video',
    'code-block',
  ]

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
            <ReactQuill
              ref={quillRef}
              theme="snow"
              modules={modules}
              formats={formats}
              value={value}
              onChange={setValue}
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
          className={clsx('mt-[8px]', value ? 'text-[#333]' : 'text-[#999]')}
          dangerouslySetInnerHTML={{ __html: value || 'Không có mô tả' }}
        />
      )}
    </div>
  )
}

export default JobDescription
