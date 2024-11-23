'use client'

import { randomColor } from '@/libs/utils'
import { Avatar, ConfigProvider, Form, FormInstance, Input, List } from 'antd'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { addCommentAction } from './action'

const JobCommentCollapse: React.FC<{
  comment?: any
}> = ({ comment }) => {
  const [loading, setLoading] = useState(false)
  const [expand, setExpand] = useState(false)
  const router = useRouter()
  const formRef = useRef<FormInstance>(null)

  const handleSubmit = async (formData: any, options: any) => {
    setLoading(true)
    try {
      const { success, error } = await addCommentAction({
        ...formData,
        task_id: options?.taskId,
        comment_id: options?.commentId,
      })

      if (error) {
        toast.error(error)
        return
      }

      formRef.current?.resetFields()
      toast.success(success)
      router.refresh()
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      throw new Error(error)
    }
  }

  return (
    <div>
      <div
        className="group mt-[8px] flex cursor-pointer items-center gap-[8px] text-[#888]"
        onClick={() => setExpand(!expand)}
      >
        <span className="font-[500] group-hover:text-[#267cde] group-hover:underline">
          Bình luận
        </span>
        <span className="inline-block rounded-[3px] border border-[#0000001a] bg-[#fff] px-[4px] py-[1px] leading-none group-hover:text-[#267cde]">
          {comment?.children?.length || 0}
        </span>
      </div>

      {expand && (
        <div className="mt-[8px] w-full bg-[#f3f3f3] p-[12px]">
          <ConfigProvider
            theme={{
              components: {
                List: {
                  emptyTextPadding: 0,
                },
              },
            }}
          >
            <List
              dataSource={comment?.children}
              renderItem={(item: any) => (
                <div
                  className="mb-[8px] flex items-start gap-[12px]"
                  key={item?.id}
                >
                  <Avatar
                    src={item?.avatar}
                    style={{
                      backgroundColor: randomColor(item?.full_name || ''),
                    }}
                    size={32}
                  >
                    {String(item?.full_name).charAt(0).toLocaleUpperCase()}
                  </Avatar>
                  <div className="flex-1">
                    <div className="space-x-[8px]">
                      <span className="text-[13px] font-[700] text-[#267cde]">
                        {item?.full_name}
                      </span>
                      <span>{item?.content}</span>
                    </div>

                    <div className="text-[12px] text-[#888]">
                      {dayjs(item?.created_at).format('HH:mm MMM DD, YYYY')}
                    </div>
                  </div>
                </div>
              )}
              loading={loading}
              locale={{
                emptyText: <></>,
              }}
            />
          </ConfigProvider>
          <Form
            onFinish={(values) =>
              handleSubmit(values, {
                taskId: comment?.task_id,
                commentId: comment?.id,
              })
            }
            ref={formRef}
          >
            <Form.Item className="!mb-[12px]" name="content">
              <Input placeholder="Viết thảo luận của bạn" />
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  )
}

export default JobCommentCollapse
