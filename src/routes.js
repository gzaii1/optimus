import * as pages from './pages'

export default Object.entries(pages).flatMap(p => {
    // 要输出的路由
    const route = [{ name:p[0], url:'/' + p[0], component:p[1] }]
    // 嵌套路由
    const child_list = p[1]._child_
    if(child_list){
        child_list.forEach(child=>{
            const name = `${p[0]}/${child.__name}`
            route.push({name: p[0], url: `/${name}`, component:child}) 
        })
        delete p[1]._child_
    }
    console.log('routes:', route)
    return route
})