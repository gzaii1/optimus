const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
// const bodyparser = require('koa-bodyparser')
const body = require('koa-body')
const logger = require('koa-logger')
const cors = require('koa2-cors');
const index = require('./routes/index')
// 登录登出
const user = require('./routes/user')
// yaml config
const yaml = require('./routes/yaml')
const mongoose = require('mongoose')

const db = mongoose.connection

// error handler
onerror(app)

// middlewares
app.use(body({
  multipart: true,
  strict:false
}))

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

mongoose.connect('mongodb://127.0.0.1:27017/mydata', { useUnifiedTopology: true } )

db.on('error', console.log.bind(console, 'connection error:'))
db.once('open', function(){
  console.log('Connected!~')
})

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log('ctx:', ctx)
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// cors
// app.use(cors({
//   exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//   maxAge: 5,
//   credentials: true,
//   allowMethods: ['GET', 'POST', 'DELETE'],
//   allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
// }))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(yaml.routes(), yaml.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
