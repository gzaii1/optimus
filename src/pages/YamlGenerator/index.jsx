import React, { useState } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { HomeActions } from '@actions'
import { showConfirm, request, baseUrl } from '@utils'
import { Button, Tabs, Table, Select, Input, Form, Upload, Tag, message } from 'antd'
import { DeleteFilled, DownloadOutlined } from '@ant-design/icons'
import { Optimus } from '@components'
import axios from 'axios'
import './index.scss'
import download from 'downloadjs'


const { addYaml, addExcel, delYaml, delExcel, clearFileList } = HomeActions
const { TabPane } = Tabs
const { Option } = Select 

//   首页布局
export const YamlGenerator = (({history})=> {
  const dispatch = useDispatch()  
  const { yamlList, excel } = useSelector((state)=> state.HomeReducer)
  const fileList = [excel, ...yamlList].filter(Boolean)
  // 操作中的tab页
  const [selectedTab, setselectedTab] = useState('1')
  // 判断文件状态的显示
  const fileStatusDict = {
    failed: {
      tag:<Tag style={{textAlign:'center', width:'4.5rem'}} color='#f50'>FAILED</Tag>,
      Icon: ({onDelete})=> <DeleteFilled onClick={onDelete}/>
    },
    success: {
      tag:<Tag color='#87d068' style={{textAlign:'center', width:'4.5rem'}}>SUCCESS</Tag>,
      Icon: ({onDelete, onDownload})=> <>  
          <DeleteFilled onClick={onDelete}/>
          <DownloadOutlined onClick={onDownload}/>
        </>
    },
    running: {
      tag:<Tag color='#108ee9' style={{textAlign:'center', width:'4.5rem'}}>RUNNING</Tag>,
      Icon: ()=> <></>
    }
  }

   // base64转blobl
   function base64ToBlob(code) {
    let parts = code.split(';base64,');
    let contentType = parts[0].split(':')[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;

    let uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], {type: contentType});
  }

  React.useEffect(()=>{
      // 重新获取表格数据
      if(selectedTab === '2'){
        getTableData()
      }
  },[selectedTab])
  // Current tab 表格设置
  const current_columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width:'10%',
      render:(...args)=>{
        // 显示用序号, 无实际作用
        const num = args[2] + 1
        return <>{ num }</>
      }
    },
    {
      title: 'FILE_NAME',
      dataIndex: 'name',
      key: 'file_name',
      width:'45%'
    },
    {
      title: 'OPERATION',
      dataIndex: 'operation',
      key: 'operation',
      width:'45%',
      render:(...args)=> 
        <div style={{display:'flex', justifyContent:'center'}}>
            <DeleteFilled onClick={()=>{
                if(/\.(xlsx|xls)$/.test(args[1].name)){
                  dispatch(delExcel(args))
                }else{
                  dispatch(delYaml(args))
                }
            }}/>
        </div> 
      }]
  
  // selected rows
  const [rows, setRows] = useState([])
  // history mock data
  const [history_datasource, setDataSource] = useState([])
  
  const history_columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width:'5%',
      render:(...args)=>{
        // 显示用序号, 无实际作用
        const num = args[2] + 1
        return <>{ num }</>
      }
    },
    {
      title: 'Project_Name',
      dataIndex: 'project_name',
      key: 'project_name',
      width:'47%',
    },
    {
      title: 'CEE_Version',
      dataIndex: 'cee_version',
      key: 'cee_version',
      width:'12%',
    },
    {
      title: 'RUN_TIME',
      dataIndex: 'timestamp',
      key: 'run_time',
      width:'12%',
    },
    {
      title: 'TASK_STATUS',
      dataIndex: 'task_status',
      width:'12%',
      key: 'task_status',
      render:(...args)=>{
        const { tag } = fileStatusDict[args[1].status]
        return <div style={{display:'flex', justifyContent:'center'}}>
            { tag }
        </div>
      }
    },
    {
      title: 'OPERATION',
      dataIndex: '0peration',
      key: 'operation',
      width:'12%',
      align:'center',
      render:(...args)=>{
        const { Icon } = fileStatusDict[args[1].status]
       return  <div className='OPERATION_box'>
          <Icon onDelete={()=>{ 
            showConfirm(
              args[1].project_name,
              ()=> {
                // 删除表单数据
                handleDelete([args[1].id])
                message.success('File deletion completed!')
              } 
            )
          }} 
              onDownload={()=>{
                axios.get(baseUrl + `config/yaml_gen/result?id=${args[1].id}`)
                .then(res=>{
                  if(res.status === 200){
                    if(res.data.status){
                      const blob = base64ToBlob('data:application/x-zip-compressed;base64,' + res.data.data)
                      download(blob) &&
                      message.success('File download complete!')
                    }else{
                      message.error('File has been deleted!')
                    }
                  }
                })
                .catch((error)=>{
                  console.log(`error`, error)
                })
              }} />
        </div>}
    },
  ]

  // 获取表格数据
  function getTableData(){
    request('GET')
      ('config/yaml_gen/history')
      .then(res=>{
        if(res.status === 200){
          if(res.data.code === 200){
            setDataSource(res.data.data)
          }
        }
      })
  }

  /* 渲染上传文件的tag组 */
  const tagRender = (value)=>
     <Tag key={Math.random()} color={/\.(xlsx|xls)$/.test(value.value)?'cyan':'blue'}>{value.label}</Tag>

  const [ form ] = Form.useForm()
  
  /* 重置选定文件操作 */
  function fileReset(){
    dispatch(clearFileList())
  }

  /* 添加新文件 */
  function addNewFile({ file }){
    const newFile = {
      key:file.uid,
      file:file.originFileObj,
      name:file.name
    }
    let temp = null
    let msg = {
      value:null,
      type:'success'
    }
    // 上传excel
    if(/\.(xlsx|xls)$/.test(file.name)){
      msg = excel?{
        value:'Excel has been uploaded and the previous file has been replaced.',
        type:'warning'
      }:
      {
        value:'New file added successfully!',
        type:'success'
      }
      temp = addExcel(newFile)
    }
    // 上传yaml
    else if(/\.yaml$/.test(file.name)){
      temp = addYaml(newFile)
      msg = {
        value:'New file added successfully!',
        type:'success'
      }
    }
    // 其他类型文件无效
    temp?
    dispatch(temp):
    msg = {
      type:'error',
      value:'This type of file is not supported!'
    }
    // 弹出消息提示
    message[msg.type](msg.value)

  }

  /* 点击generator config */
  async function handleConfig(){                
    const { site, cee_version: cee_ver, project_name: pjt_name } = form.getFieldsValue()
    const formDict = Object.entries(form.getFieldsValue())
    const emptyItem = formDict.find(formItem=> !formItem[1])
    if(emptyItem){
      message.error(`Please complete the form.`)
    }else if(!excel || yamlList.length === 0){
      message.error('Please upload least 1 excel and 1 config yaml file')
    }else{
      const formdata = new FormData()
      formdata.append('excel', excel.file)
      yamlList.forEach(({file})=>{
        formdata.append('yaml', file)
      })
      const { status, data } = await request('POST')('config/yaml_gen', { data: formdata, params:{ site, cee_ver, pjt_name } }, { headers:{'Content-Type': 'multipart/form-data'} })
      // 转到tab2
      if(status === 200){
        setselectedTab('2')
        // 重置表单内容
        formReset()
        // 重置选中文件
        fileReset()
        message.success('All files are added')
      } 
    }
  }

  /* 删除表单数据 */
  function handleDelete(idList){
    request('DELETE')
    ('config/yaml_gen/history', 
    { data: { id: idList } })
    .then(res=>{
      getTableData()
    })
  }

  /* 重置form内容 */
  function formReset(){
    form.resetFields()
  }
    return <Optimus>
            <div className='Homepage'>
            <Form form={form}>
              <div className='tab'>
              <Tabs
                defaultActiveKey="1" 
                activeKey={selectedTab}
                onChange={setselectedTab}
                tabPosition='top'
                animated={{inkBar:true, tabPane:true}}
                >
                {/* Current tab */}
                <TabPane tab="Current" key="1" forceRender={true}>
                  <div className='tab_content'>
                    <div className='tab_content_iptarea' style={{maxWidth:'38rem', width:'100%'}}>
                    <div>
                      <div className='tab-form-title'>site</div>
                      <Form.Item name='site'>
                          <Select placeholder='site' className='tab_content_select'>
                            <Option key='GZ'>GZ</Option>
                            <Option key='ZZ'>ZZ</Option>
                          </Select>
                        </Form.Item>
                    </div>
                      
                      <div>
                        <div className='tab-form-title'>cee version</div>
                        <Form.Item name='cee_version'>
                          <Select placeholder='cee_version' className='tab_content_select'>
                            <Option key='drop22'>drop22</Option>
                            <Option key='drop25'>drop25</Option>
                            <Option key='drop26'>drop26</Option>
                            <Option key='drop28'>drop28</Option>
                            <Option key='drop35'>drop35</Option>
                          </Select>
                        </Form.Item>
                        </div>

                      <div>
                        <div className='tab-form-title'>project name</div>
                        <Form.Item name='project_name' style={{width:'18rem', display:'flex'}}>
                          <Input placeholder='project_name'  className='tab_content_project_name' />
                        </Form.Item>
                      </div>
                    </div>

                    <div className='tab_content_upload'>     
                        <Select
                          placeholder='upload input files(at least 1 excel and 1 config yaml file)' 
                          mode='multiple' 
                          tagRender={tagRender}
                          value={fileList.map(({name})=> name)}
                          options={fileList}
                          open={false}
                        />

                        <div className='tab_upload_btn_grp'>
                          <div className="tab_upload_btn">
                            <Upload
                                isImageUrl={false}
                                showUploadList={false}
                                multiple={true}
                                customRequest={()=>{}}
                                onChange={addNewFile} 
                              >
                              <Button className='diy_dark_blue' type='primary' style={{marginLeft:'.5rem'}}
                              >Upload</Button>
                            </Upload>
                          </div>

                          <div className='tab_upload_btn'>
                            <Button className='diy_light_blue' type='primary' danger onClick={fileReset}
                              >Reset</Button>
                          </div>
                        </div>
                      </div>

                      <div className='tab_content_table'>
                        <Table 
                            dataSource={fileList} 
                            columns={current_columns}
                            pagination={false}
                            rowClassName={(e, idx)=> idx & 1 ?'Odd':'Even'}
                            size='small'
                            locale={{emptyText:<div style={{width:'100%', height:'5rem', lineHeight:'5rem'}}>No file selected.</div>}}
                          />
                      </div>
                      <div className='tab_content_generator_btn'>
                          <Button onClick={handleConfig}>Generator Config</Button>
                      </div>
                  </div>
                </TabPane>

                {/* History tab */}
                <TabPane tab="History" key="2" forceRender={true}>
                  <div className='tab_content'>
                    <div className='tab_content_iptarea'>
                      <div className='tab_content_delete_btn'>
                        <Button className='diy_dark_red' type='primary' danger onClick={()=>{ handleDelete(rows) }}
                          >DELETE</Button>
                      </div>
                    </div>

                    <div className='tab_content_table'>
                      <Table 
                        rowKey='id'
                        dataSource={history_datasource} 
                        columns={history_columns} 
                        rowClassName={(e, idx)=> idx & 1 ?'Odd':'Even'}
                        size='small'
                        locale={{emptyText:<div style={{width:'100%', height:'5rem', lineHeight:'5rem'}}>No files.</div>}}
                        pagination={{
                          pageSize:10,
                          showLessItems:true,
                          hideOnSinglePage:true,
                          position:['bottomLeft']
                        }}
                        scroll={{
                          scrollToFirstRowOnChange:true,
                          y:0
                        }}
                        rowSelection={{
                          type: 'checkbox',
                          onChange:(...args)=>{ 
                            setRows(args[0]) 
                          }
                        }}
                      />
                    </div>
                  </div>
                </TabPane>
              </Tabs>
            </div>
          </Form>
      </div>
    </Optimus>
})