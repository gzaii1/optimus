import { 
    TO_EXPAND_OR_CONTRACT
} from '../actionTypes'

export const LeftActions = {
    toExpandOrContract
}

/* 控制左侧栏展开或收缩 */
function toExpandOrContract(){
    return {
        type:TO_EXPAND_OR_CONTRACT
    }
}