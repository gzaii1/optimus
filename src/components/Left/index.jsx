import React, { useMemo, useState, useEffect } from 'react'
import { useSelector} from 'react-redux'
import { Menu } from 'antd'
import SettingsIcon from '@material-ui/icons/Settings'
import PersonIcon from '@material-ui/icons/Person'
import MemoryIcon from '@material-ui/icons/Memory';
import routes from '../../routes'
import './optimus.scss'

const { SubMenu } = Menu

// 左侧导航
const navigation = {
    YamlGenerator: [{
        label:'CONFIG',
        value:'config',
        icon: <SettingsIcon/>,
        children:[{
                    label:'Yaml Generator',
                    value:'YamlGenerator',
                },]
    }],
    Ericic: [{
        label:'Ericic',
        value:'Ericic',
        icon: <MemoryIcon />,
        children:[{
            label:'NFVI Resource Checker',
            value:'Ericic',
        }]
    }]
}

export const Left = ({history}) =>{
    const { collapsed } = useSelector((state)=> state.LeftReducer)
    const [selectedKey, changeSelectKey] = useState({})
    const [dataList, setDataList] = useState([])
    useEffect(()=>{
        // 工具名
        const tool = history.location.pathname.split('/').filter(Boolean)[0]
        // 选择左侧栏内容
        setDataList(navigation[tool]? navigation[tool]: [])
        changeSelectKey(routes.find(routeList=> routeList.url === history.location.pathname))
    }, [history.location.pathname])
    


    return <div className={`LeftMenu ${collapsed?'expand':'contract'}`} onClick={(e)=>{}}> 
    <div className='LeftMenuTitle'>
        <div className='logo'></div>
        <div className='title'><span>OPTIMUS</span></div>
    </div>
    <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['config', 'Ericic']}
        selectedKeys={ [selectedKey? selectedKey.name: ''] }
        mode="inline"
        inlineCollapsed={collapsed}
        onClick={({key})=>{
            const temp = routes.find(({name})=> name === key)
            temp && history.push('/' + key)
        }}
    >
        {
            dataList.map(({children, label, value, icon}, idx1)=>{
                return collapsed?
                children?
                <SubMenu key={value} title={icon} disabled={true}>
                    {
                        children.map(({label, value, icon}, idx2)=> 
                    <Menu.Item key={value} icon={icon}>{label}</Menu.Item>
                        )
                    }
                </SubMenu>:
                <Menu.Item key={value} icon={icon}></Menu.Item>
                :
                children?
                <SubMenu key={value} title={label} icon={icon}  disabled={true}>
                    {
                        children.map(({label, value, icon}, idx2)=> 
                        <Menu.Item key={value} icon={icon||<></>}>{label}</Menu.Item>
                        )
                    }
                </SubMenu>:
                <Menu.Item key={value} icon={icon||<></>}>
                    { label }
                </Menu.Item>
            })
        }
    </Menu>
    </div>
}