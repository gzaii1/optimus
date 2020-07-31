import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { LeftActions } from '@actions'
import { throttle } from '@utils'
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, MoreOutlined  } from '@ant-design/icons'
import { Avatar, Dropdown, Menu } from 'antd';
import { Header, Left } from '@components'
import { request } from '@utils'
import store from 'storejs'
import { createHashHistory } from 'history'

import './index.scss'

const { toExpandOrContract } = LeftActions

/* 主要页面布局 */
export const Optimus = ({children})=> {
    const history = createHashHistory() 
    const dispatch = useDispatch()
    const { collapsed } = useSelector((state)=> state.LeftReducer)
    const [ menuControl ] = useState(()=> throttle(dispatch, 300))

    /* 右侧登录图标 */
    const menu = (
      <Menu>
        <Menu.Item>
          <b>admin</b>
        </Menu.Item>
        <Menu.Item onClick={()=>history.push('/YamlGenerator')}>
          Yaml Generator
        </Menu.Item>

        <Menu.Item onClick={()=>history.push('/Ericic')}>
          Ericic
        </Menu.Item>

        <Menu.Item onClick={()=>history.push('/ToolSelection')}>
          Settings
        </Menu.Item>
        <Menu.Item danger onClick={signOut}>Sign out</Menu.Item>
      </Menu>
    );

    // 登出
    async function signOut(){
      const { status, data } = await request('POST')('logout', {})
      if(status === 200){
        if(data.code === 200){
          store.clear()
          history.push('Login')
        }
      }
    }
  
    // 左侧控制
    function leftMenuControl(e){
      if(e.code === 'Tab'){
        e.preventDefault()
        menuControl(toExpandOrContract())
      }
    }
  
    useEffect(()=>{
      window.addEventListener('keydown', leftMenuControl)
      return function(){
        window.removeEventListener('keydown', leftMenuControl)
      }
    },[])
    
    return <div className='Optimus'>
    {/* <Header history={history}/> */}
    <div className="main">
        <Left history={history} />
        <div className='main_content'>
            <div className='ActionBar'>
                <div className='ActionBar_btn' onClick={()=>{dispatch(toExpandOrContract())}}>
                { collapsed?
                <MenuUnfoldOutlined />:
                <MenuFoldOutlined />
                }
                </div>

                <div className="ebSystemBar-admin"> 
                  <Dropdown overlay={menu}>
                      <div>
                          <Avatar size='small' style={{ backgroundColor: '#8c8c8c' }} icon={<UserOutlined />} />
                          <MoreOutlined  style={{ color: '#8c8c8c', fontSize:'1.2rem', transform:'translate(0, 4px)'}}/>
                      </div>
                  </Dropdown>
                </div>
            </div>
            <div className='main_content_children'>
                { children }
            </div>
        </div>
    </div>
</div>
}


export default Optimus 