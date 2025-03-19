import { PlusOutlined } from '@ant-design/icons'
import { Button, Card } from 'antd'
import React from 'react'
import ContractDocumentList from './ContractDocumentList'
import ContractDocumentModalForm from './ContractDocumentModalForm'

export type ContractDocumentCardProps = {
  title?: React.ReactNode
  extra?: React.ReactNode
  items?: any[]
}

const ContractDocumentCard: React.FC<ContractDocumentCardProps> = ({
  title,
  extra,
  items,
}) => {
  return (
    <Card
      classNames={{
        body: '!space-y-[16px]',
      }}
    >
      <div className="flex items-center justify-between">
        <div className="text-[20px] leading-[28px] font-[500]">{title}</div>
        {extra || (
          <ContractDocumentModalForm>
            <Button icon={<PlusOutlined />} type="primary">
              Thêm mới
            </Button>
          </ContractDocumentModalForm>
        )}
      </div>

      <ContractDocumentList dataSource={items} />
    </Card>
  )
}

export default ContractDocumentCard
