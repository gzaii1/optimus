import React, { useState, useEffect } from 'react'
import { Table, Button, Space, Dropdown, Menu, Checkbox } from 'antd'
import { SwipeableDrawer } from '@material-ui/core'
import DataUsageIcon from '@material-ui/icons/DataUsage';
import StorageIcon from '@material-ui/icons/Storage';
import HistoryIcon from '@material-ui/icons/History';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { Optimus } from '@components'
import { Login } from './login'
import { Save } from './save'
import { Test } from './test'
import { NestedRoute } from '@utils'
import './index.scss'

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '11',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '12',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '13',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '14',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '21',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '22',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '23',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '24',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '31',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '32',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '33',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '34',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
  {
    key: '41',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '42',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '43',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '44',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];


//   首页布局
export const Ericic = (({history})=> { 
  const [filteredInfo, setfilteredInfo] = useState({})
  const [sortedInfo, setsortedInfo] = useState({})

  // 控制左侧抽屉开启或关闭
  const [open, setOpen] = useState(false)

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' },
      ],
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filters: [
        { text: 'London', value: 'London' },
        { text: 'New York', value: 'New York' },
      ],
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
      ellipsis: true,
    },
  ];

    /* 头部导航组 */
    const navigationLst = [{
      key:'datacenter',
      label:'Datacenter',
      icon: <DataUsageIcon/>,
      menu_list:[{
        key:'manage_datacenter',
        label:'Manage Datacenter',
        onClick:()=>{
          history.push('Ericic/Login')
        }
      },{
        key:'select_datacenter',
        label:'Select Datacenter',
        tree:[{
          key:'HZZZ-VIM7-1',
          label:'HZZZ-VIM7-1',
        },{
          key:'TEST_VIM01',
          label:'TEST_VIM01',
        },]
      },]
    },{
      key:'data',
      label:'Data',
      icon:<StorageIcon />,
      menu_list:[{
        key:'reload',
        label:'Reload',
      },{
        key:'save',
        label:'Save',
        onClick:()=>{
          history.push('/Ericic/Save')
        }
      },{
        key:'compare',
        label:'Compare',
      },]
    },{
      key:'history',
      label:'History',
      icon:<HistoryIcon />,
      menu_list:[{
        key:'show_history',
        label:'Show History',
      }]
    },{
      key:'download',
      label:'Download',
      icon:<SystemUpdateAltIcon />,
      menu_list:[{
        key:'download_as_xls',
        label:'Download as xls',
      }]
    },{
      key:'advance',
      label:'Advance',
      icon:<AutorenewIcon />,
      menu_list:[{
        key:'customize_fields',
        label:'Customize Fields',
        onClick:function(){
          setOpen(true)
        },
      }]
    },]

    /* dropdown 显示组 */
    const DropdownList = ({children, nav})=>
    nav.menu_list && nav.menu_list.length > 0?
       <Dropdown
            overlay={
            <Menu>
              {
                nav.menu_list.map((menu, idx)=>{
                  return menu.tree?
                        <Menu.SubMenu title={ menu.label } key={ menu.key }>
                          { menu.tree.map(item=> <Menu.Item key={item.key}>{item.label}</Menu.Item>) }
                        </Menu.SubMenu>:

                       <Menu.Item key={menu.key}>
                        <a onClick={()=>{ menu.onClick && menu.onClick() }}>
                          { menu.label }
                        </a>
                  </Menu.Item>})
              }
            </Menu>
            }
        >
          { children }</Dropdown>:
      <>
        { children }
      </>
    
    return <Optimus>
            <div className='ericic'>
              <div className='ericic-navigation'>
                {
                  navigationLst.map((nav, idx)=>
                    <div className='ericic-navigation-item' key={nav.key}>
                      <DropdownList nav={nav}>
                        <div className='ericic-navigation-item-box'>{ nav.icon } <span className="ericic-navigation-item-span" onClick={e => e.preventDefault()}>{nav.label}</span></div>
                      </DropdownList>   
                    </div>
                  )
                }
              </div>

              <div className='ericic-showboard'>
                <div className='left'>
                <div>
                    <span>Datacenter:</span>
                    <span>HZZ-VIM7-1</span>
                  </div>

                  <div>
                    <span>CEE version:</span>
                    <span>Drop26</span>
                  </div>
            
                  <div>
                    <span>Host:</span>
                    <span>100</span>
                  </div>
                </div>
                <div className="middle">
                  <span>The data is loaded on 2020-07-09 14:22:03</span>
                </div>
                <div className='right'>
                  <Button className='diy_light_blue' type='primary'>clean filters</Button>
                </div>
              
              </div>

              <div className='ericic-table'>
                <Table
                  dataSource={data}
                  columns={columns}
                  rowClassName={(e, idx)=> idx & 1 ?'Odd':'Even'}
                  size='small'
                  pagination={false}
                  scroll={{
                    scrollToFirstRowOnChange:true,
                    y:0
                  }}
                />
              </div>
            </div>
            <SwipeableDrawer
              anchor='right'
              open={open}
            >
              <div className='chechbox-grp'>
                <div>
                  <Checkbox /> VM Name
                </div>
                <div>
                  <Checkbox /> UUID
                </div>
                <div>
                  <Checkbox /> Status
                </div>
                <div>
                  <Checkbox /> Power State
                </div>
                <div>
                  <Checkbox /> vCPU
                </div>
                <div>
                  <Checkbox /> Mem
                </div>
                <div>
                  <Checkbox /> Disk
                </div>
                <div>
                  <Checkbox /> Created Time
                </div>
                <div>
                  <Checkbox /> Networks
                </div>
                <div>
                  <Checkbox /> Host
                </div>
                <div>
                  <Checkbox /> High Availability
                </div>
                <div>
                  <Checkbox /> Infra vCPU state
                </div>
                <div>
                  <Checkbox /> Infra Mem state
                </div>
                <div>
                  <Checkbox /> Infra Disk state
                </div>
                <div>
                  <Checkbox /> Compute state
                </div>
                <div>
                  <Checkbox /> NUMA layout
                </div>
                <div>
                  <Checkbox /> CEE/plugin version
                </div>

                  <Button 
                    className='diy_dark_blue' type='primary' style={{margin:'2rem 0', width:'4rem'}}
                    onClick={()=>{
                    setOpen(false)
                  }}>OK</Button>
              </div>
            </SwipeableDrawer>
        </Optimus>
})

// 嵌套路由
NestedRoute(Ericic)({Login, Save, Test})