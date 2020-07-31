import { takeEvery, put } from 'redux-saga/effects'
import { HomeActions } from '@actions'
import { CREATE_USER } from '../actionTypes'
import { request } from '@utils'

function* func({type, ...args}){
    try{
        // 可以获取异步返回数据
        // const res = yield axios.get('/getData')
        // const action = initTodoList(res.data)
        // 将action发送到reducer
        console.log('funcccc', type, args, HomeActions)
        yield put(HomeActions)
    }catch(e){
        console.log('网络请求失败')
    }
}

function* saga(){
    console.log('saga!!!!!!!!!')
    yield takeEvery(CREATE_USER, func)
}

export default saga