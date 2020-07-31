import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { LoginActions } from '@actions'
import { request, baseUrl, Fetch } from '@utils'
import { Form, message } from 'antd'
import { TextField, Button, Slide } from '@material-ui/core'
import { RecipeReviewCard, MediaCard, MediaControlCard, Types, CustomizedAccordions, InteractiveList } from '@components'
import './index.scss'

/* 设置校验 */
const { setErrorMsg, funcChange } = LoginActions

/* 帮助文字展示 */
const HelpSpan = ({children}) => 
   <div className='login_bottom_help'>{children}</div>

/* 底部文字展示 */
const ShowSpan = ({children}) => {
  const strList = children.split('.')
  return <div className='login_bottom_span'>
          {
            strList.map((str, idx)=> str.length === 0? null:
              <p key={`span${idx}`} style={{textAlign:'center', marginBottom:'.2rem'}}>{str}.</p>)
          }
        </div>
}

/* 中间滑动层 */
const SlideGroup = ({children, height = 300, scrollheight})=>
  Array.isArray(children)? children.map((row, idx)=> 
  <div key={`row${idx}`} className='login_slide' style={{height:height + 'px'}}>
     <Slide  
        direction={idx%2 ===0?'left':'right'}
        in={scrollheight > (idx * height - height * 1.1)}>
            { row }
      </Slide></div>):
      <div style={{height:height + 'px', width:'100%'}}>
      <Slide direction='left' in={true}>
             {children}
       </Slide></div>

/* 头部显示 */
const Header = ()=>
  <div style={{width:'100%', height:'4rem', background:'rgba(255,255,255, .7)'}}></div>

/* 底部显示 */
const Footer = ()=>{
  return <div className='login_footer'>
      <div className='login_footer_img'></div>
      <div className='login_footer_content'>
        <div className='login_footer_p'>
          <p>Other sites</p>
          <p>Ericsson.com</p>
          <p>Extranet</p>
          <p>The Ericsson blog</p>
        </div>

        <div className='login_footer_p'>
          <p>Reporting incidents</p>
          <p>Reporting compliance concerns</p>
          <p>Reporting Environmental, Health and Safety Incidents</p>
          <p>Reporting security and privacy incidents</p>
          <p>Security support line: +46 8 24 10 10</p>
        </div>
      </div> 
  </div>
}

/* 登录首页 */
export const Login = (({history})=> {
    const dispatch = useDispatch()
    const { iptContentLst, errorMsg, signLst, shouldLogin } = useSelector((state)=> state.LoginReducer)
    const [ form ] = Form.useForm()
    const [scrollheight, setScrollHeight] = useState(0)
    // 测试用, 无实际作用
    const [isSimple, setSimple] = useState(true) 

    // 切换注册和登录时重置表单
    useEffect(()=>{
      form.resetFields()
    },[shouldLogin])

    // 用户登录
    function handleLogin(){
      const formObj = form.getFieldsValue()
      // 处理表单的错误信息
      const newMsg = setErrorMsg(formObj)
      dispatch(newMsg)

      if(newMsg.shouldGoToLogin){
        shouldLogin?
        login():
        sign()
      }
    }

    // 用户注册
    async function sign(){
      Fetch.method = 'post'
      const res = await Fetch('sign', form.getFieldsValue())      
      if(res.code === 200 || res.code === 201){
          dispatch(funcChange())
          message.success('Successful registraton. Please login to the account.')        
      }else if(res.code === 400){
        message.error('The user name is already registered.')
      }else{
        message.error('unknow error.')
      }
    }

    // 编辑中...
    function editing(event, key, e){
      // 获取表单内容
      const obj = errorMsg
      if(event === 'focus'){
        obj[key] = '(editing)'
      }
      dispatch(setErrorMsg(obj))
    }

    // 调用登录接口
    async function login(){
      // 调用接口
      Fetch.method = 'POST'
      const res = await Fetch('login', form.getFieldsValue())
      if(res.code === 200){
        if(res.status){
          history.push('ToolSelection')
          message.success('Successful login')
        }else{
          message.error('Please enter the correct user id or password.')
        }
      }else if(res.code === 400){
        message.error('Please enter the correct user id or password.')
      }else{
        message.error('Login failed')
      }
      // const { status, data } = await request('POST', false)('login', { data: form.getFieldsValue()})
      // console.log('status, data', status, data)
      // if(status === 200){
      //   if(data.status) {
      //     history.push('YamlGenerator')
      //     message.success('Successful login')
      //   } else{
      //     message.error('Login failed')
      //   }
      // }
    }

    // 输入事件
    function onKeyDown(e){
      if(e.keyCode === 13){
        // 点击'回车'时登录
        handleLogin()
      }
    }

    return <div className='Login'>
          {/* 左上角logo */}
          <div className='login_logo' onClick={()=>{ setSimple(!isSimple) }}></div>
          <div className='login_logo_optimus'></div>
          {/* 左侧展示区域 */}
          <div className='login_showboard_bg' onScroll={(e)=>{
            // 只会从上往下显示
            if(e.target.scrollTop > scrollheight)
            setScrollHeight(e.target.scrollTop)
          }}>
            {
              isSimple?null:
              <Header />
            }
            {/* 滚动展示区 */}
          <SlideGroup height={isSimple? 0: 500} scrollheight={scrollheight}>
              <div className='login_slideItem'>
                <div className='login_slideItemCard'>
                  <RecipeReviewCard />
                </div>

                <div className='login_slideItemCard'>
                    <Types />
                </div>
              </div>

              <div className='login_slideItem'> 
                <div className='login_slideItemCard'>
                  <InteractiveList />
                </div>
              </div>

              <div className='login_slideItem'>
                <div className='login_slideItemCard'>
                  <Types />
                </div>
                <div className='login_slideItemCard'>
                   <MediaCard />
                </div>
              </div>

              <div className='login_slideItem'>
                <div className='login_slideItemCard'>
                  <MediaControlCard />
                </div>
                <div className='login_slideItemCard'>
                  <Types />
                </div>
              </div>

              <div className='login_slideItem'>
                <div className='login_slideItemCard'>
                  <RecipeReviewCard />
                </div>
                <div className='login_slideItemCard'>
                  <Types />
                </div>
              </div>

              <div className='login_slideItem'>
                <div className='login_slideItemCard'>
                  <Types />
                </div>
                <div className='login_slideItemCard'>
                  <CustomizedAccordions />
                </div>
              </div>
          </SlideGroup>
          
            {
              isSimple?null:
              <Footer />
            }
          </div>

        {/* 登录表单主体 */}
        <div className='login_ipt_area'>
          <div className='login_title'>
          { shouldLogin?'Enterprise sign in':'Register' }
            </div>
          <Form form={form}>
            {
              (shouldLogin?iptContentLst:signLst).map(({key, label, type})=>{
                const isError = key in errorMsg
                return <Form.Item key={key} name={key}>
                          <TextField onKeyDown={onKeyDown} onBlur={(e)=> editing('blur', key, e)} onFocus={(e)=> editing('focus', key, e)} error={isError} helperText={isError?`${label} ${errorMsg[key]}`: null} className="login_ipt" type={type} label={label} variant="outlined" />
                        </Form.Item>
              })
            }
              <Button variant="contained" color='primary' className="login_btn" onClick={handleLogin}>
                {shouldLogin?'Sign In':'Create account'}
                </Button>
          </Form>
          <HelpSpan><span>{ shouldLogin? "Don't have an account?": 'Have an account already?'} </span>
          <a onClick={()=> dispatch(funcChange())}>{ shouldLogin? 'Sign up': 'Back to login'}</a></HelpSpan>
      </div>
    </div>
})