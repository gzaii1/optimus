import { 
    SET_ERROR_MSG,
    FUNC_CHANGE,
} from '../actionTypes'

export const LoginActions = {
    setErrorMsg,
    editing,
    funcChange,
}

/* 错误信息提醒字典 */

/* 设置错误信息 */
function setErrorMsg(formObj = {}){
    // 整理后的错误信息
    const errorMsg = {}
    Object.entries(formObj).forEach(formItem=>{
        if(typeof formItem[1]!=='string'){
            errorMsg[formItem[0]] = 'is empty!'
        }else if(!formItem[1].replace(/^\s*|\s*$/g,"")){
            errorMsg[formItem[0]] = 'is empty!' 
        }
    })
    return {
        type: SET_ERROR_MSG,
        errorMsg,
        // 是否允许登录
        shouldGoToLogin: Object.keys(errorMsg).length === 0
    }
}

// 编辑中
function editing(args){
    console.log(`editing`, args)
}

/* 改变登录页功能(login to sign) */
function funcChange(){
    return {
        type: FUNC_CHANGE
    }
}