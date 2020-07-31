import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { HomeActions, LeftActions } from '@actions'
import { throttle } from '@utils'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Header, Left } from '@components'
import './index.scss'

const { toExpandOrContract } = LeftActions

/* 主要页面布局 */
export const Layout = ({children, history})=> {
    const dispatch = useDispatch()
    const { collapsed } = useSelector((state)=> state.LeftReducer)
    const [ menuControl ] = useState(()=> throttle(dispatch, 300))
  
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
    
    return <div className='layout'>
    <Header history={history}/>
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
            </div>
            <div className='main_content_children'>
                { children }
            </div>
        </div>
    </div>
</div>
}


export default Layout 