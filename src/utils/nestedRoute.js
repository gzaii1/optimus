/* 
    功能: 实现嵌套路由
    使用方式: 
        - pages/xxx/index.jsx
        在文件末尾执行NestedRoute(xxx)({child1, child2 [, ...] })
        xxx为当前路由的主页面, child1和child2分别为xxx下的嵌套路由.
        child1和child2必须在'{}'下嵌套.    
*/

export function NestedRoute(func){
    return function (obj){
        if(Object.prototype.toString.call(obj) !== '[object Object]') {
            console.error('函数NestedRoute: 返回函数的参数必须为JS对象')
            return func
        }
        func._child_ = Object.entries(obj).map(val=> {
            const funcObj = val[1]
            funcObj.__name = val[0] 
            return funcObj
        })
    }
}