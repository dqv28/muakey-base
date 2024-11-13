import MarkTaskFailedModalForm from '@/components/MarkTaskFailedModalForm'
import { Avatar } from '@/ui'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button, Dropdown, Input, Modal, Popconfirm } from 'antd'
import clsx from 'clsx'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast'
import { deleteTaskAction, editTaskAction } from '../../../action'
import { StageContext } from '../stage/StageList'
import TaskModalForm from './TaskModalForm'

export type TaskItemProps = {
  className?: string
  task?: any
  isCompleted?: boolean
  isFailed?: boolean
  members?: any
}

const TaskItem: React.FC<TaskItemProps> = ({
  className,
  task,
  isCompleted,
  isFailed,
  members,
}) => {
  const [assignConfirmOpen, setAssignConfirmOpen] = useState(false)
  const params = useParams()
  const { failedStageId } = useContext(StageContext)
  const router = useRouter()

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task?.id, data: task })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  }

  const user = members?.filter((u: any) => u?.id === task.account_id)?.[0]

  const handleDelete = async () => {
    try {
      const { error, success } = await deleteTaskAction(task?.id || 0)

      if (error) {
        toast.error(error)

        return
      }

      toast.success(success)
      router.refresh()
    } catch (error: any) {
      throw new Error(error)
    }
  }

  const handleAssign = async (id: number) => {
    try {
      const { error } = await editTaskAction(task?.id, {
        account_id: id,
      })

      if (error) {
        toast.error(error)
        return
      }

      toast.success('Nhiệm vụ đã được giao.')
      setAssignConfirmOpen(false)
      router.refresh()
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return (
    <div className="relative">
      <div
        className={clsx(
          'border-b border-[#eee] px-[16px] py-[12px] text-[12px] leading-none !transition-all',
          isCompleted
            ? 'bg-[#2bbf3d] text-[#fff]'
            : 'bg-[#fff] hover:bg-[#f8f8f8]',
          className,
        )}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <Link
          className="space-y-[8px]"
          key={task?.id}
          href={`/job/${task?.id}?wid=${params?.id}`}
        >
          <div className="line-clamp-2 flex items-center justify-between text-[14px] font-[600] leading-[18px]">
            {task?.name}
          </div>
          <div
            className="line-clamp-1 leading-[17px]"
            dangerouslySetInnerHTML={{
              __html: task?.description || 'Không có mô tả',
            }}
          />
          {!isCompleted && !isFailed && (
            <div>
              {task?.account_id ? (
                <div className="flex min-h-[28px] items-center justify-between gap-[8px]">
                  <div className="flex items-center gap-[4px]">
                    <Avatar shape="circle" size={20}>
                      {user?.full_name}
                    </Avatar>
                    {user?.full_name}
                  </div>
                  <div className={isCompleted ? 'text-[#fff9]' : 'text-[#999]'}>
                    Không thời hạn
                  </div>
                </div>
              ) : (
                <span className="flex items-center gap-[4px] leading-[28px] text-[#D96C6C]">
                  <ExclamationCircleFilled className="text-[16px]" />
                  Chưa được giao
                </span>
              )}
            </div>
          )}
        </Link>
      </div>
      {!isCompleted && !isFailed && (
        <div>
          {!task?.account_id && (
            <Button
              className="absolute bottom-[12px] right-[16px] !p-[10px] !text-[12px] text-[#fff]"
              size="small"
              type="primary"
              onClick={() => setAssignConfirmOpen(true)}
            >
              Giao
            </Button>
          )}
        </div>
      )}
      <Modal
        open={assignConfirmOpen}
        onCancel={() => setAssignConfirmOpen(false)}
        title="LỰA CHỌN NGƯỜI PHỤ TRÁCH NHIỆM VỤ NÀY"
        footer={<></>}
        width={500}
      >
        <div className="-mx-[24px] text-[#b1b1b1]">
          <div className="px-[20px]">
            <Input.Search placeholder="Tìm nhanh" />
          </div>
          <div className="divide-y divide-[#0000001a]">
            {members &&
              members.map((mem: any) => (
                <div
                  className="flex cursor-pointer items-center gap-[12px] px-[20px] py-[16px] leading-[20px] hover:bg-[#f6f6f6]"
                  key={mem.id}
                  onClick={() => handleAssign(mem.id)}
                >
                  <Avatar size={32} shape="circle">
                    {mem.full_name}
                  </Avatar>
                  <div>
                    <div className="text-[14px] text-[#111]">
                      {mem.full_name}
                    </div>
                    <div className="text-[13px]">
                      {mem.username} {mem.position ? `· ${mem.position}` : ''}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Modal>
      <div className="absolute right-[16px] top-[12px]">
        <Dropdown
          trigger={['click']}
          rootClassName="!z-auto"
          placement="bottomRight"
          dropdownRender={() => (
            <div className="mt-[4px] w-[240px] rounded-[4px] bg-[#fff] p-[8px] shadow-[0_2px_6px_0_rgba(0,0,0,0.1)]">
              <Link
                href={`/job/${task?.id}?wid=${params?.id}`}
                className="inline-block w-full bg-transparent px-[10px] py-[6px] text-[14px] leading-[17px] transition-all hover:bg-[#f8f8f8] hover:text-[#000]"
              >
                Xem nhiệm vụ
              </Link>
              {!isCompleted && !isFailed && (
                <>
                  <TaskModalForm
                    title="CHỈNH SỬA NHIỆM VỤ"
                    initialValues={{
                      ...task,
                      members,
                    }}
                    action="edit"
                  >
                    <div className="cursor-pointer bg-transparent px-[10px] py-[6px] text-[14px] leading-[17px] transition-all hover:bg-[#f8f8f8]">
                      Chỉnh sửa nhiệm vụ
                    </div>
                  </TaskModalForm>
                  <MarkTaskFailedModalForm
                    options={{
                      failedStageId,
                      task,
                    }}
                  >
                    <div className="cursor-pointer bg-transparent px-[10px] py-[6px] text-[14px] leading-[17px] transition-all hover:bg-[#f8f8f8]">
                      Đánh dấu thất bại
                    </div>
                  </MarkTaskFailedModalForm>
                </>
              )}

              <Popconfirm
                title={
                  <div>
                    Xác nhận muốn xóa nhiệm vụ{' '}
                    <span className="font-[600]">{task?.name}</span>?
                  </div>
                }
                onConfirm={handleDelete}
              >
                <div className="cursor-pointer bg-transparent px-[10px] py-[6px] text-[14px] leading-[17px] text-[#cc1111] transition-all hover:bg-[#f8f8f8]">
                  Xóa nhiệm vụ
                </div>
              </Popconfirm>
            </div>
          )}
        >
          <div
            className={clsx(
              'cursor-pointer pl-[8px] text-[20px] leading-none',
              isCompleted && 'text-[#fff]',
            )}
          >
            ··
          </div>
        </Dropdown>
      </div>
    </div>
  )
}

export default TaskItem
