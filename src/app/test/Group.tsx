'use client'

import { AntDesignOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Tooltip } from 'antd'

const Group: React.FC = () => {
  return (
    <Avatar.Group>
      <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
      <a href="https://ant.design">
        <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
      </a>
      <Tooltip title="Ant User" placement="top">
        <Avatar
          style={{ backgroundColor: '#87d068' }}
          icon={<UserOutlined />}
        />
      </Tooltip>
      <Avatar
        style={{ backgroundColor: '#1677ff' }}
        icon={<AntDesignOutlined />}
      />
    </Avatar.Group>
  )
}

export default Group
