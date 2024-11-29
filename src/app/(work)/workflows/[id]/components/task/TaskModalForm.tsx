'use client'

import { uploadImageAction } from '@/app/(work)/job/actions'
import { useAsyncEffect } from '@/libs/hook'
import { randomColor } from '@/libs/utils'
import { PlusOutlined } from '@ant-design/icons'
import {
  Button,
  Divider,
  Form,
  FormInstance,
  Input,
  InputRef,
  Modal,
  ModalProps,
  Select,
  SelectProps,
  Tag,
} from 'antd'
import { cloneDeep } from 'lodash'
import { useParams } from 'next/navigation'
import React, { useCallback, useContext, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import ReactQuill from 'react-quill-new'
import { addTaskAction, editTaskAction } from '../../../action'
import { StageContext } from '../WorkflowPageLayout'
import { addTagAction, getTagsAction } from './action'
import TagDeleteButton from './TagDeleteButton'

type TaskModalFormProps = ModalProps & {
  children?: React.ReactNode
  initialValues?: any
  query?: any
  action?: 'edit' | 'create'
}

const TaskModalForm: React.FC<TaskModalFormProps> = ({
  children,
  initialValues,
  query,
  title,
  action = 'create',
  ...rest
}) => {
  const [loading, setLoading] = useState(false)
  const [tagAddLoading, setTagAddLoading] = useState(false)

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(initialValues?.description || '')
  const formRef = useRef<FormInstance>(null)
  const quillRef = useRef<ReactQuill>(null)
  const params = useParams()
  const { setStages } = useContext(StageContext)

  const [tags, setTags] = useState<any[]>([])
  const [name, setName] = useState('')
  const inputRef = useRef<InputRef>(null)
  const { account_id, members, ...restInitialValues } = initialValues

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleAdd = async (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    setTagAddLoading(true)

    e.preventDefault()

    if (!name) return

    try {
      const { id, message, errors } = await addTagAction({
        title: name,
        workflow_id: params?.id,
      })

      if (errors) {
        setTagAddLoading(false)
        toast.error(message)
        return
      }

      setTags([
        ...tags,
        {
          title: name,
          id,
        },
      ])
      setName('')
      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)
      setTagAddLoading(false)
    } catch (error) {
      setTagAddLoading(false)
      throw new Error(String(error))
    }
  }

  const handleSubmit = async (formData: any) => {
    setLoading(true)

    const { member: memberVal, ...restFormData } = formData

    const member: any = members.find(
      (m: any) =>
        `${`${m.full_name} ·`} ${m.username} ${!!m.position ? `· ${m.position}` : ''}` ===
        memberVal,
    )

    try {
      if (action === 'create') {
        var { errors, id } = await addTaskAction({
          ...restFormData,
          account_id: member?.id || null,
          workflow_id: params?.id || null,
        })

        if (!errors) {
          setStages((prevStages: any[]) => {
            const newStages = cloneDeep(prevStages)

            return newStages?.map((stage: any) => {
              if (
                !restInitialValues?.stage_id &&
                stage?.id === newStages[0]?.id
              ) {
                return {
                  ...stage,
                  tasks: [
                    {
                      ...restFormData,
                      account_id: member?.id || null,
                      workflow_id: params?.id || null,
                      stage_id: stage?.id,
                      id,
                    },
                    ...stage?.tasks,
                  ],
                }
              }

              return stage
            })
          })
        }
      } else {
        var { errors } = await editTaskAction(initialValues?.id, {
          ...restFormData,
          account_id: member?.id || null,
        })

        if (!errors) {
          setStages((prevStages: any[]) => {
            const newStages = cloneDeep(prevStages)

            return newStages?.map((stage: any) => {
              if (stage?.id === initialValues?.stage_id) {
                return {
                  ...stage,
                  tasks: stage?.tasks?.map((task: any) => {
                    if (task?.id === initialValues?.id) {
                      return {
                        ...restFormData,
                        account_id: member?.id || null,
                        stage_id: stage?.id,
                        id: initialValues?.id,
                      }
                    }

                    return task
                  }),
                }
              }

              return stage
            })
          })
        }
      }

      if (errors) {
        if (typeof errors === 'string') {
          toast.error(errors)
          setLoading(false)
          return
        }

        const nameList: string[] = Object.keys(errors)

        formRef.current?.setFields(
          nameList.map((name) => ({
            name,
            errors: [errors?.[name]],
          })),
        )

        return
      }

      toast.success(
        action === 'create' ? 'Thêm thành công.' : 'Cập nhật thành công.',
      )
      setOpen(false)
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      throw new Error(error)
    }
  }

  const mem: any = members?.find((m: any) => m?.id === account_id)

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

  useAsyncEffect(async () => {
    const res = await getTagsAction({
      workflow_id: params?.id,
    })

    setTags(res)
  }, [])

  const optionRender: SelectProps['optionRender'] = (option) => (
    <div className="group relative flex min-h-[32px] items-center">
      <div className="flex items-center gap-[8px]">
        <div
          className="size-[24px] rounded-[4px]"
          style={{
            backgroundColor: randomColor(String(option?.label || '')),
          }}
        />
        <span>{option?.label}</span>
      </div>
      <TagDeleteButton
        className="visible absolute right-0 z-[10020] opacity-0 transition-all group-hover:opacity-100"
        tagId={Number(option?.value)}
        onDelete={() => {
          setTags((prevTags: any[]) =>
            prevTags.filter((tag: any) => tag?.id !== Number(option?.value)),
          )
        }}
      />
    </div>
  )

  const dropdownRender: SelectProps['dropdownRender'] = (menu) => (
    <>
      {menu}
      <Divider style={{ margin: '8px 0' }} />
      <div
        className="flex w-full items-center gap-[8px]"
        style={{ padding: '0 8px 4px' }}
      >
        <div className="flex-1">
          <Input
            placeholder="Nhập tên nhãn"
            ref={inputRef}
            value={name}
            onChange={onNameChange}
            onKeyDown={(e) => e.stopPropagation()}
          />
        </div>
        <Button
          className="!w-[130px]"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          loading={tagAddLoading}
          type="primary"
        >
          Thêm nhãn
        </Button>
      </div>
    </>
  )

  const tagRender: SelectProps['tagRender'] = (props) => {
    const { label, closable, onClose } = props
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault()
      event.stopPropagation()
    }
    return (
      <Tag
        color={randomColor(String(label || ''))}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginInlineEnd: 4 }}
      >
        {label}
      </Tag>
    )
  }

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      <Modal
        title={title || 'TẠO NHIỆM VỤ MỚI'}
        open={open}
        onCancel={() => setOpen(false)}
        width={760}
        cancelText="Bỏ qua"
        okText={action === 'create' ? 'Tạo nhiệm vụ mới' : 'Cập nhật'}
        okButtonProps={{
          htmlType: 'submit',
          loading,
        }}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            ref={formRef}
            initialValues={{
              ...restInitialValues,
              member: account_id
                ? `${`${mem?.full_name} ·`} ${mem?.username} ${!!mem?.position ? `· ${mem?.position}` : ''}`
                : undefined,
            }}
            onFinish={handleSubmit}
            layout="vertical"
          >
            {dom}
          </Form>
        )}
        {...rest}
      >
        <Form.Item
          name="name"
          label="Tên nhiệm vụ"
          rules={[
            {
              required: true,
              message: 'Nhập tên nhiệm vụ.',
            },
          ]}
        >
          <Input
            className="border-b border-[#eee]"
            placeholder="Tên nhiệm vụ"
          />
        </Form.Item>
        <Form.Item name="tag" label="Thêm nhãn">
          <Select
            placeholder="Chọn nhãn"
            mode="multiple"
            options={tags.map((item: any) => ({
              label: item?.title,
              value: item?.id,
            }))}
            optionRender={optionRender}
            dropdownRender={dropdownRender}
            tagRender={tagRender}
          />
        </Form.Item>
        <Form.Item
          rootClassName="min-h-[240px]"
          name="description"
          label="Mô tả"
        >
          <ReactQuill
            ref={quillRef}
            theme="snow"
            modules={modules}
            formats={formats}
            value={value}
            onChange={setValue}
            placeholder="Mô tả nhiệm vụ"
          />
        </Form.Item>
        <Form.Item name="member" label="Giao cho">
          <Select
            options={members?.map((m: any) => {
              const mem = `${`${m.full_name} ·`} ${m.username} ${!!m.position ? `· ${m.position}` : ''}`

              return {
                label: mem,
                value: mem,
              }
            })}
            placeholder="-- Lựa chọn một người dưới đây --"
          />
        </Form.Item>
        {/* <Form.Item name="expired" label="Thời hạn">
          <InputNumber
            className="w-full border-b border-[#eee]"
            placeholder="Thời hạn"
          />
        </Form.Item> */}
      </Modal>
    </>
  )
}

export default TaskModalForm
