import React from 'react'
import { Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined, MoreOutlined } from '@ant-design/icons'
import { request } from '@utils'
import store from 'storejs'
import './index.scss'

export const Header = ({history})=> {
    const menu = (
        <Menu>
          <Menu.Item>
            <b>admin</b>
          </Menu.Item>
          <Menu.Item>
            Set status
          </Menu.Item>
          <Menu.Item>
            Settings
          </Menu.Item>
          <Menu.Item danger onClick={signOut}>Sign out</Menu.Item>
        </Menu>
      );

    // log out
    async function signOut(){
      const { status, data } = await request('POST')('logout', {})
      if(status === 200){
        if(data.code === 200){
          store.clear()
          history.push('/Login')
        }
      }
    }
    
    return <div className="ebSystemBar">
    <div className="ebSystemBar-logo"></div>
    <div className="ebSystemBar-topMenuName">Optimus</div>
    <div className="ebSystemBar-admin"> 
    
    <Dropdown overlay={menu}>
        <div>
            <Avatar size='small' style={{ backgroundColor: '#8c8c8c' }} icon={<UserOutlined />} />
            <MoreOutlined  style={{ color: '#8c8c8c', fontSize:'1.2rem', transform:'translate(0, 4px)'}}/>
        </div>
    </Dropdown>
    </div>
</div>
}

export default Header 