import { getCustomFieldsByWorkflowId } from '@/libs/data'
import { Button } from '@/ui'
import { PlusOutlined } from '@/ui/icons'
import React from 'react'
import CustomFieldList from './CustomFieldList'
import CustomFieldsModalForm from './CustomFieldsModalForm'

type CustomFieldsProps = {
  stages?: any[]
  workflowId: number
}

const getCustomFieldsByWorkflowIdRequest = async (workflowId: number) => {
  return await getCustomFieldsByWorkflowId({
    workflow_id: workflowId,
  })
}

const CustomFields: React.FC<CustomFieldsProps> = async ({
  stages,
  workflowId,
}) => {
  const fields = await getCustomFieldsByWorkflowIdRequest(workflowId)

  return (
    <div className="h-[calc(100vh-82px)] overflow-auto bg-[#eee] p-[20px]">
      <div className="mx-auto w-[860px] bg-[#fff] p-[24px] shadow-[0_2px_6px_0_#0000000f]">
        <div className="-mx-[24px] flex items-center justify-between gap-[24px] px-[24px] pb-[16px]">
          <div className="text-[18px] font-[600]">
            <div>Trường tùy chỉnh</div>
            <div className="text-[12px] font-[400] text-[#aaa]">
              Kéo thả file Excel để nhập trường dữ liệu tùy chỉnh{' '}
              <span className="font-[600] text-[#267cde]">
                (File Excel mẫu)
              </span>
            </div>
          </div>

          <CustomFieldsModalForm
            options={{
              stages,
            }}
          >
            <Button
              className="bg-[#42b814] !px-[12px] !py-[8px] !text-[13px] font-[500] text-[#fff]"
              color="primary"
              icon={<PlusOutlined />}
            >
              Thêm
            </Button>
          </CustomFieldsModalForm>
        </div>

        <CustomFieldList
          dataSource={fields}
          options={{
            stages,
          }}
        />
      </div>
    </div>
  )
}

export default CustomFields
