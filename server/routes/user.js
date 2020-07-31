/* 模拟登录接口 */
const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const serect = 'token'
const User = require('../models/User').Users

router.prefix('/api/v1')

// 登录
router.post('/login', async function (ctx, next) {
  const { name, password, id = 1 } = ctx.request.body  
  let responseObj = {}
  let query = await User.find({ name })
  const user_obj = query.find(user=> user.name === name && user.password === password )
  if(user_obj){
    const token = jwt.sign({ user:name, id:user_obj._id }, serect, {expiresIn: '1h'});
    responseObj = {
      "code": 200,
      "status": true,
      "data": {
          "token": token,
      },
    }
  }else{
    responseObj = {
      "status": true,
      "code": 500,
    }
  }

  // 返回内容
  ctx.body = responseObj
})

// 登出
router.post('/logout', function (ctx, next) {
  const token = ctx.header.authorization
  let payload = jwt.decode(token.split(' ')[1], 'jwtSecret');
  console.log(`用户: ${payload.user}已经登出`)
  // 返回内容
  ctx.body = {
    "status": true,
    "data": [],
    "code": 200,
  }
})

router.post('/sign',async function(ctx){
  const _user = new User(ctx.request.body)
  let responseObj = {}
  try{
    const ret = await _user.save()
    console.log(ret)
    responseObj = {
      "status": true,
      "data": [],
      "code": 201,
    }
  }catch(error){
    responseObj = {
      "status": true,
      "code": 500,
    }
  }
  // 返回内容
  ctx.body  = responseObj
})


module.exports = router
