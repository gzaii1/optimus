/* 模拟登录接口 */
const router = require('koa-router')()
const File = require('../models/File').Files
const jwt = require('jsonwebtoken')
const serect = 'token'

router.prefix('/api/v1')

// yaml config history
router.post('/config/yaml_gen', async function (ctx, next) {
    // 验证token
    const token = ctx.header.authorization
    let payload = jwt.decode(token.split(' ')[1], 'jwtSecret');
    console.log(`user: ${payload}`)

    // 文件名列表, 仅测试用
    const fileNameList = ctx.request.body.devTest.split(',')
    const { site, cee_ver, pjt_name } = ctx.request.query
    await Promise.all(fileNameList.map(val=>{
        return new File({
            project_name:`${site}_CEE_NEXT_${pjt_name}`,
            cee_version:cee_ver,
            run_time:`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} ${new Date().getHours()}:${new Date().getMinutes()}`,
            task_status:"RUNNING"
        }).save()
    }))
    
    // 返回内容
    ctx.body = {
        "status": true,
        "data": {
            "id": "job_id"
        },
        "code": 201,
    }    
})

// yaml config
router.get('/config/yaml_gen/history', async function (ctx, next) {
    // 验证token
    const Files = await File.find({})
    // 返回内容
    ctx.body = {
        "status": true,
        "data": Files.map(file=>{
            file.id = file._id
            return file
        }),
        "code": 201,
    }    
})

// yaml config
router.delete('/config/yaml_gen/history', async function (ctx, next) {
    // 验证token
    const { id:idList } = ctx.request.body
    await Promise.all(idList.map(id=>{
        return File.findOneAndRemove({_id:id})
    }))
    // 返回内容
    ctx.body = {
        "status": true,
        "code":200,
    } 
})

module.exports = router
