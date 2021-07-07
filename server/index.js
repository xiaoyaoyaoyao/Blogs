// 后端入口文件
const express = require('express')
const app = express()
const path = require('path')

// 启动数据库
require('./middleware/mongoose')

// 监听端口
app.listen(4000,() => {
    console.log("服务启动成功，端口4000...") 
})

// 跨域中间件
app.use(require('./middleware/cors'))
// session中间件
app.use(require('./middleware/session'))
// 处理数据的中间件
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// 静态资源库
app.use(express.static(path.join(__dirname, './public')))

// 端口监听
app.use("/", require('./router/index'))

// 解决history模式 刷新/手动输入地址 无法访问
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})
