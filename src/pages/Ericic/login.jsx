import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Input, Form, message } from 'antd'
import { Optimus } from '@components'
import { NestedRoute } from '@utils'
import './index.scss'

// 初始表格设置
const init_columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render:(name, item)=>{
      return <Link href="" to={`/Ericic/Login?show=${item.key}`}>{name}</Link>
      }
    },
    {
      title: 'Connection Status',
      dataIndex: 'connection_status',
      key: 'connection_status',
    },
    {
      title: 'Access Mgmt',
      dataIndex: 'access_mgmt',
      key: 'access_mgmt',
      render:(type, item)=>{
        return type === 'edit'? 
            <>
            <Button className='diy_dark_blue' type='primary' style={{marginRight:'1rem'}}>Show</Button>
            <Button className='diy_dark_red' type='primary' danger>Delete</Button>
            </>:
            <Button>
              <Link to='/Ericic/Login?edit=NEW'>New +</Link> 
              </Button>
      }
    },
  ];

const Init = ({history})=>{
  // 虚拟数据
  const data = [
    {
      key: '1',
      name: 'John Brown',
      connection_status: 32,
      access_mgmt: 'edit',
    },
    {
      key: '2',
      name: 'Jim Green',
      connection_status: 42,
      access_mgmt: 'edit',
    },
  ];

  return <div className='ericic-login'>
  <div className='ericic-table'>
    <Table
      dataSource={[...data, {
        key: '',
        name: '',
        connection_status: '',
        access_mgmt: 'new',
      }]}
      columns={init_columns}
      rowClassName={(e, idx)=> idx & 1 ?'Odd':'Even'}
      size='small'
      pagination={false}
    />
  </div>
  
  <div className='ericic-bottom'>
      <Button className='tab_content_generator_btn' type='primary' onClick={()=>{
          history.push('/Ericic')
      }}>Back</Button>
  </div>
</div>
}

//   首页布局
export const Login = (({history})=> {
  const { pathname, search } = history.location
  const [ form ] = Form.useForm()
  const [type, setType] = useState([])
  useEffect(()=>{
    const ky_w = history.location.search.substr(1)
    setType(ky_w? ky_w.split('='): [])
    if(ky_w === 'edit=NEW'){
      form.resetFields()
    }else{
      form.setFieldsValue(
        Object.fromEntries(dataSource.map(data=>{
          return [data.key, data.value]
        }))
      )
    }
  },[history.location.search])

const columns = [
  {
    title: 'Parameter',
    dataIndex: 'parameter',
    key: 'parameter',
    width:'20%',
    render:(name, item, idx)=>{
    return <>
      { name }
      { item.required?<span style={{color:'red', margin:'0 .5rem 0 .5rem'}}>*</span>:'' }
    </>
    }
  },
  {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
    width:'60%',
    render:(name, item)=>{
    return <div className='table-value'>{type[0]==='edit'?
    <Form.Item name={item.key}>
      <Input type="text"/></Form.Item>
    :<span>{name}</span>}</div>
    }
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
    key: 'comment',
    width:'20%',
    render:(t, item)=>{
      return <></>
      // t === 'edit'? 
      //     <>
      //     <Button className='diy_dark_blue' type='primary' style={{marginRight:'1rem'}}>Show</Button>
      //     <Button className='diy_dark_red' type='primary' danger>Delete</Button>
      //     </>:
      //     <Button>
      //       <Link to='/Ericic/Login?type=NEW'>New +</Link> 
      //       </Button>
    }
  },
];

  // 虚拟数据
  const [dataSource, setDataSource] = useState([
    {
      key: 'Name',
      parameter: 'Name',
      value: 'HZZZ-VIM7-1',
      comment: 'edit',
      required:true,
    },
    {
      key: 'Country/Province/City',
      parameter: 'Country/Province/City',
      value: 'China/HN/ZZ',
      comment: 'edit',
      required:false,
    },
    {
      key: 'Datacenter/VIM',
      parameter: 'Datacenter/VIM',
      value: 'DC1/VIM7',
      comment: 'edit',
      required:false,
    },
    {
      key: 'CEE version',
      parameter: 'CEE version',
      value: 'drop26',
      comment: 'edit',
      required:true,
    },
    {
      key: 'LCM IP',
      parameter: 'LCM IP',
      value: '192.168.0.11',
      comment: 'edit',
      required:true,
    },
    {
      key: 'LCM Usr',
      parameter: 'LCM Usr',
      value: 'root',
      comment: 'edit',
      required:true,
    },
    {
      key: 'LCM Pwd',
      parameter: 'LCM Pwd',
      value: '******',
      comment: 'edit',
      required:true,
    },
    {
      key: 'openrc dir',
      parameter: 'openrc dir',
      value: '/root/openrc',
      comment: 'edit',
      required:true,
    },
  ]);

    return <Optimus>
      {
        // 初始页面
        !type[0]?
      <Init history={history}/>
      :
      <div className='ericic-login'>
        <div className='ericic-table'>
          <Form form={form}>
            <Table
              dataSource={dataSource}
              columns={columns}
              rowClassName={(e, idx)=> idx & 1 ?'Odd':'Even'}
              size='small'
              pagination={false}
            />
          </Form>
        </div>

        <div className='ericic-bottom'>
        {type[0]==='edit'?
        <>
        <Button className='tab_content_generator_btn' type='primary' onClick={()=>{
              history.push(
                type[1] === 'NEW'?
                pathname: 
                pathname + search.replace(/^\?[a-z]*\=/gi, `?show=`))
          }}>Cancel</Button>

          <Button className='tab_content_generator_btn' type='primary'
            onClick={()=>{
              const form_obj = form.getFieldsValue()
              const obj = dataSource
              for(let key in form_obj){
                obj.find(o=> o.key === key).value = form_obj[key]
              }
              setDataSource(obj)
              history.push(pathname + search.replace(/^\?[a-z]*\=/gi, `?show=`))
              message.success('Saved successfully!')
            }}
          >Save</Button>
        </>
        :null
        }

        {type[0]==='show'?
        <>
          <Button className='tab_content_generator_btn' type='primary' onClick={()=>{
              history.push(pathname + search.replace(/^\?[a-z]*\=/gi, `?edit=`))
          }}>Edit</Button>
          <Button className='tab_content_generator_btn' type='primary' onClick={()=>{
              history.push(pathname)
          }}>Back</Button>
        </>
        :null
        }
      </div>
    </div>
    }
    </Optimus>
})