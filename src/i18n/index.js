import i18n from './i18n.json'

const i18nObj = new Proxy(i18n, {
    get:(target, property) =>{
        console.log('target, property', target, property)
        return property in target? target[property]: error()
    }
})

export const getI18n = (condition) => {
    // 检索是否报错
    let isErr = false
    // 返回给页面或组件的JSON体
    let reMsg = null;
    if(typeof condition === 'string'){
        const dictLst = condition.split('/')
        for(let i = 0; i < dictLst.length; i++){
            reMsg = reMsg||i18nObj
            const nextMsg = reMsg[dictLst[i]]
            if(nextMsg){
                reMsg = nextMsg
            }else{
                isErr = true
                return
            }
        }
    }
    return isErr? false: reMsg
}

function error(){
    console.error('您要检索的条件不存在!')
    return false
}