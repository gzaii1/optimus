import { CREATE_USER, TABLE_DATA, ADD_YAML, ADD_EXCEL, DEL_YAML, CLEAR_FILE_LIST, DEL_EXCEL } from '../actionTypes'

/* 初始值 */
const initial_value = {
    user:{},
    dataList: [1,2,3],
    yamlList:[],
    excel:null
}

export function HomeReducer(state = initial_value, action) {
    switch (action.type){
        case CREATE_USER:
            const user = action.user
            return { ...state, user }
        case TABLE_DATA:
            return { ...state, dataList: action.dataList }
        /* 添加YAML文件 */
        case ADD_YAML:
            return {...state, yamlList: [...state.yamlList, action.newFile]}
        /* 添加excel */
        case ADD_EXCEL:
            return {...state, excel:action.newFile}
        case DEL_YAML:
            const old_yamlList = state.yamlList
            const yamlList = [...old_yamlList.slice(0, action.del_index - 1), ...old_yamlList.slice(action.del_index)]
            return {...state, yamlList}
        case DEL_EXCEL:
            return {...state, excel:null}
        case CLEAR_FILE_LIST:
            return {...state, yamlList:[], excel:null}
        default:
            return state
    }
}