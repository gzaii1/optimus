import { TO_EXPAND_OR_CONTRACT } from '../actionTypes'

/* 初始值 */
const initial_value = {
    // 左侧栏是否收缩
    collapsed: false,
}

export function LeftReducer(state = initial_value, action) {
    switch (action.type){
        case TO_EXPAND_OR_CONTRACT:
            return { ...state, collapsed:!state.collapsed }
        default:
            return state
    }
}