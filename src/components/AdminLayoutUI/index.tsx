import { Col, Row } from 'antd'
import React from 'react'
import Sidebar from './Sidebar'

type AdminLayoutUIProps = {
  children?: React.ReactNode
}

const AdminLayoutUI: React.FC<AdminLayoutUIProps> = ({ children }) => {
  return (
    <div className="min-h-[100vh] bg-[#B5C2CA] p-[24px]">
      <Row gutter={24}>
        <Col span={6}>
          <Sidebar />
        </Col>
        <Col span={18}>{children}</Col>
      </Row>
    </div>
  )
}

export default AdminLayoutUI
