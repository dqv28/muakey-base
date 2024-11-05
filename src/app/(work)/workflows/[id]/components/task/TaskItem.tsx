import MarkTaskFailedModalForm from '@/components/MarkTaskFailedModalForm'
import { Avatar, Button, Dropdown, Input, Modal, toast } from '@/ui'
import { SearchOutlined } from '@/ui/icons'
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useContext, useState } from 'react'
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
  members,
}) => {
  const [open, setOpen] = useState(false)
  const [assignConfirmOpen, setAssignConfirmOpen] = useState(false)
  const params = useParams()
  const { failedStageId } = useContext(StageContext)

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

        return false
      }

      setOpen(false)
      toast.success(success)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  const handleAssign = async (id: number) => {
    try {
      const { error } = await editTaskAction(task?.id, {
        data: {
          ...task,
          account_id: id,
        },
      })

      if (error) {
        toast.error(error)
        return
      }

      toast.success('Nhiệm vụ đã được giao.')
      setAssignConfirmOpen(false)
    } catch (error: any) {
      throw new Error(error)
    }
  }

  return (
    <div className="relative">
      <Link key={task?.id} href={`/job/${task?.id}`}>
        <div
          className={clsx(
            'space-y-[12px] border-b border-[#eee] px-[16px] py-[12px] text-[12px] leading-none !transition-all',
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
          <div className="line-clamp-2 flex items-center justify-between text-[14px] font-[600] leading-[18px]">
            {task?.name}
          </div>
          <p>{task?.description || 'Không có mô tả'}</p>
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
      </Link>
      {!task?.account_id && (
        <Button
          className="absolute bottom-[12px] right-[16px] !p-[10px] !text-[12px] text-[#fff]"
          size="small"
          color="primary"
          onClick={() => setAssignConfirmOpen(true)}
        >
          Giao
        </Button>
      )}
      <Modal
        open={assignConfirmOpen}
        onOpenChange={setAssignConfirmOpen}
        title="LỰA CHỌN NGƯỜI PHỤ TRÁCH NHIỆM VỤ NÀY"
        footer={<></>}
        width={500}
      >
        <div className="-m-[20px] text-[#b1b1b1]">
          <div className="flex items-center border-b border-[#0000001a] px-[12px] py-[10px]">
            <SearchOutlined className="text-[20px]" />
            <div className="flex-1">
              <Input placeholder="Tìm nhanh" borderless />
            </div>
          </div>
          <div className="divide-y divide-[#0000001a]">
            {members &&
              members.map((mem: any) => (
                <div
                  className="cursor-pointer px-[20px] py-[16px] leading-[20px] hover:bg-[#f6f6f6]"
                  key={mem.id}
                  onClick={() => handleAssign(mem.id)}
                >
                  <div className="text-[14px] text-[#111]">{mem.full_name}</div>
                  <div className="text-[13px]">
                    {mem.username} · {mem.position}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Modal>
      <div className="absolute right-[16px] top-[12px]">
        <Dropdown
          trigger="hover"
          placement="bottomRight"
          dropdownRenderer={() => (
            <div className="mt-[4px] w-[240px] rounded-[4px] bg-[#fff] p-[8px] shadow-[0_2px_6px_0_rgba(0,0,0,0.1)]">
              <Link
                href={`/job/${task?.id}?wid=${params?.id}`}
                className="inline-block w-full bg-transparent px-[10px] py-[6px] text-[14px] leading-[17px] transition-all hover:bg-[#f8f8f8]"
              >
                Xem nhiệm vụ
              </Link>
              <TaskModalForm
                title="CHỈNH SỬA NHIỆM VỤ"
                initialValues={{
                  ...task,
                  members,
                }}
                action="edit"
              >
                <div className="bg-transparent px-[10px] py-[6px] text-[14px] leading-[17px] transition-all hover:bg-[#f8f8f8]">
                  Chỉnh sửa nhiệm vụ
                </div>
              </TaskModalForm>
              <MarkTaskFailedModalForm
                options={{
                  failedStageId,
                  task,
                }}
              >
                <div className="bg-transparent px-[10px] py-[6px] text-[14px] leading-[17px] transition-all hover:bg-[#f8f8f8]">
                  Đánh dấu thất bại
                </div>
              </MarkTaskFailedModalForm>
              <div
                className="bg-transparent px-[10px] py-[6px] text-[14px] leading-[17px] text-[#cc1111] transition-all hover:bg-[#f8f8f8]"
                onClick={() => setOpen(true)}
              >
                Xóa nhiệm vụ
              </div>

              <Modal
                open={open}
                onOpenChange={setOpen}
                okButtonProps={{
                  onClick: handleDelete,
                  size: 'large',
                  children: 'Ok',
                }}
                cancelButtonProps={{
                  onClick: () => setOpen(false),
                  size: 'large',
                  children: 'Đóng lại',
                }}
                headerClassName="bg-[#fff] !pb-0"
              >
                <div className="-mt-[20px] flex items-center justify-center gap-[8px] text-[#000]">
                  <ExclamationCircleFilled className="text-[36px] text-[#c65144]" />
                  <span>
                    Xác nhận muốn xóa nhiệm vụ{' '}
                    <span className="font-[600]">{task?.name}</span>?
                  </span>
                </div>
              </Modal>
            </div>
          )}
        >
          <div className="pl-[8px] text-[20px] leading-none">··</div>
        </Dropdown>
      </div>
    </div>
  )
}

export default TaskItem
