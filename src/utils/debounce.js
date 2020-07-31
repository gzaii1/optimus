export function debounce(fn, delay, ...args){
    // window._timer = null // 借助闭包
    // console.log('timer',window._timer)
    let _timer = null;
    return function() {
        if(_timer){
            clearTimeout(_timer) 
        }
        _timer = setTimeout(()=>{
            fn(...args)
            // _timer = null
        }, delay) // 简化写法
    }
}