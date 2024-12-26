'use client'

import { InitializedMDXEditor } from '@/components'
import { withApp } from '@/hoc'
import { useAsyncEffect } from '@/libs/hook'
import { randomColor } from '@/libs/utils'
import { PlusOutlined } from '@ant-design/icons'
import { MDXEditorMethods } from '@mdxeditor/editor'
import {
  App,
  Button,
  Divider,
  Empty,
  Form,
  FormInstance,
  Input,
  InputRef,
  Modal,
  ModalProps,
  Select,
  SelectProps,
  Tag,
  Tooltip,
} from 'antd'
import { cloneDeep } from 'lodash'
import { useParams } from 'next/navigation'
import React, { useContext, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Converter } from 'showdown'
import { addTaskAction, editTaskAction } from '../../../action'
import { StageContext } from '../WorkflowPageLayout'
import { addTagAction, addTagToTaskAction, getTagsAction } from './action'
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
  const formRef = useRef<FormInstance>(null)
  const params = useParams()
  const { setStages, isAuth } = useContext(StageContext)
  const editorRef = useRef<MDXEditorMethods>(null)
  const converter = new Converter({
    tables: true,
    strikethrough: true,
    tasklists: true,
    simpleLineBreaks: true,
  })

  const [tags, setTags] = useState<any[]>([])
  const [name, setName] = useState('')
  const inputRef = useRef<InputRef>(null)
  const { account_id, members, sticker, description, ...restInitialValues } =
    initialValues
  const { message } = App.useApp()

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleAdd = async (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
  ) => {
    setTagAddLoading(true)

    e.preventDefault()

    if (!name) {
      setTagAddLoading(false)
      return
    }

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

    const { member: memberVal, tag, ...restFormData } = formData

    const member: any = members.find(
      (m: any) =>
        `${`${m.full_name} ·`} ${m.username} ${!!m.position ? `· ${m.position}` : ''}` ===
        memberVal,
    )

    try {
      if (action === 'create') {
        var { errors, id } = await addTaskAction({
          ...restFormData,
          description: converter.makeHtml(restFormData.description),
          account_id: member?.id || null,
          workflow_id: params?.id || null,
          tag_id: tag || [],
        })

        if (!errors) {
          await addTagToTaskAction({
            task_id: id,
            tag_id: tag,
          })

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
                      description: converter.makeHtml(restFormData.description),
                      account_id: member?.id || null,
                      workflow_id: params?.id || null,
                      stage_id: Number(String(stage?.id).split('_').pop()),
                      id,
                      sticker: tag?.map((t: number) => {
                        const tagName = tags.find(
                          (s: any) => s?.id === t,
                        )?.title
                        return {
                          name: tagName,
                          sticker_id: t,
                        }
                      }),
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
        if (!isAuth) {
          message.error('Bạn không có quyền sửa nhiệm vụ')
          return
        }

        var { errors } = await editTaskAction(initialValues?.id, {
          ...restFormData,
          description: converter.makeHtml(restFormData.description),
          account_id: member?.id || null,
          tag_id: tag || [],
        })

        if (!errors) {
          setStages((prevStages: any[]) => {
            const newStages = cloneDeep(prevStages)

            return newStages?.map((stage: any) => {
              if (stage?.id === `stage_${initialValues?.stage_id}`) {
                return {
                  ...stage,
                  tasks: stage?.tasks?.map((task: any) => {
                    if (task?.id === initialValues?.id) {
                      return {
                        ...restFormData,
                        description: converter.makeHtml(
                          restFormData.description,
                        ),
                        account_id: member?.id || null,
                        stage_id: stage?.id,
                        id: initialValues?.id,
                        sticker: tag?.map((t: number) => {
                          const tagName = tags.find(
                            (s: any) => s?.id === t,
                          )?.title

                          return {
                            name: tagName,
                            sticker_id: t,
                          }
                        }),
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
        if (errors.task) {
          toast.error(errors.task)
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

  useAsyncEffect(async () => {
    if (!open) return

    const res = await getTagsAction({
      workflow_id: params?.id,
    })

    setTags(res)

    editorRef.current?.setMarkdown(description || '')
  }, [open])

  const optionRender: SelectProps['optionRender'] = (option) => (
    <div className="group relative flex min-h-[32px] items-center gap-[16px]">
      <div className="flex w-full flex-1 items-center gap-[8px]">
        <div
          className="size-[24px] rounded-[4px]"
          style={{
            backgroundColor: randomColor(String(option?.label || '')),
          }}
        />
        <span className="line-clamp-1 inline-block w-[calc(100%-68px)]">
          {option?.label}
        </span>
      </div>
      <TagDeleteButton
        className="visible absolute right-[8px] z-[10020] !size-[16px] opacity-0 transition-all group-hover:opacity-100"
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
      <Tooltip title={label}>
        <Tag
          className="flex items-center"
          color={randomColor(String(label || ''))}
          onMouseDown={onPreventMouseDown}
          closable={closable}
          onClose={onClose}
          style={{ marginInlineEnd: 4, maxWidth: 150 }}
        >
          <span className="line-clamp-1">{label}</span>
        </Tag>
      </Tooltip>
    )
  }

  return (
    <>
      <div
        onClick={() => {
          if (action === 'create' && !isAuth) {
            message.error('Bạn không có quyền sửa nhiệm vụ')
            return
          }

          setOpen(true)
        }}
      >
        {children}
      </div>
      <Modal
        classNames={{
          mask: '!z-auto',
          wrapper: '!z-auto',
        }}
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
              tag: sticker?.map((s: any) => s?.sticker_id),
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
            notFoundContent={<Empty description="Chưa có nhãn" />}
          />
        </Form.Item>
        <Form.Item
          rootClassName="min-h-[240px]"
          name="description"
          label="Mô tả"
        >
          <InitializedMDXEditor
            contentEditableClassName="p-[12px] border border-[#eee] focus:outline-none rounded-[4px] min-h-[180px] prose !max-w-full"
            ref={editorRef}
            markdown={converter.makeMarkdown(description || '')}
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

export default withApp(TaskModalForm)
