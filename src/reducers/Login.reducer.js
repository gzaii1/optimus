import { SET_ERROR_MSG, FUNC_CHANGE } from '../actionTypes'

/* 初始值 */
const initial_value = {
    // 登录表单内容
    iptContentLst: [{
        key:'name',
        label:'User Id',
        type:'text',
      },{
        key:'password',
        label:'Password',
        type:'password',
      },],
      // 注册表单内容
      signLst:[{
        key:'name',
        label:'New User Name',
        type:'text',
      },{
        key:'password',
        label:'New Password',
        type:'password',
      }],
    // 错误信息提醒
    errorMsg:{}, 
    shouldLogin: true, // true or false => login or register
}

export function LoginReducer(state = initial_value, action) {
    switch (action.type){
        case SET_ERROR_MSG:
            return { ...state, errorMsg:action.errorMsg }
        case FUNC_CHANGE:
            return {...state,shouldLogin:!state.shouldLogin }
        default:
            return state
    }
}