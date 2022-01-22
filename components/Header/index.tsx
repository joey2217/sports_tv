import { Menu } from 'antd'
import React, { memo } from 'react'

const AppHeader: React.FC = () => {
  return (
    <header className="flex items-center">
      <div>LOGO</div>
      <div className="flex-1">
        <Menu selectedKeys={[]} mode="horizontal">
          <Menu.Item key="mail">Navigation One</Menu.Item>
        </Menu>
      </div>
    </header>
  )
}

export default memo(AppHeader)
