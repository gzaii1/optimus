import { 
    CREATE_USER, 
    TABLE_DATA, 
    ADD_YAML,
    ADD_EXCEL,
    DEL_YAML,
    CLEAR_FILE_LIST,
    DEL_EXCEL,
} from '../actionTypes'

export const HomeActions = {
    createUser,
    setTableData,
    addYaml,
    addExcel,
    delYaml,
    clearFileList,
    delExcel,
}

function createUser(args){
    let user = {}
    if(Object.prototype.toString.call(args) === '[object Object]')
    user = args
    return {
        type: CREATE_USER,
        user
    }
}

function setTableData(dataList){
    return {
        type: TABLE_DATA,
        dataList
    }
}

/* 添加新的yaml */
function addYaml(newFile){
    return {
        type: ADD_YAML,
        newFile
    }
}

/* 添加excel */
function addExcel(newFile){
    return {
        type: ADD_EXCEL,
        newFile
    }
}

/* 删除del */
function delYaml(args){
    return {
        type: DEL_YAML,
        del_index:args[2]
    }
}

/* 删除excel */
function delExcel(){
    return {
        type:DEL_EXCEL
    }
}

/* 清空文件 */
function clearFileList(){
    return {
        type: CLEAR_FILE_LIST
    }
}

