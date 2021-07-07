const express = require('express')
const router = express.Router()
const userDB = require("../../db/user")

// 接收注册请求
router.post('/', async (req,res) => {
    let {user,pass} = req.body

    // 检测用户名和密码是否符合规范
    let userR = /^[^\s]{2,8}$/,
        passR = /^[\w,.?;<>/|\\:'"!@#$%^&*()+_-]{6,16}$/
    if(!userR.test(user) || !passR.test(pass)){
        // 此时说明数据不符合要求，返回前端并提示
        return res.send({
            code: 1,
            msg: "数据格式错误"
        })
    }

    // 检测用户名是否已经存在
    let doc = await userDB.findOne({user})
    if(doc){
        return res.send({
            code: 2,
            msg: "用户名已经存在"
        })
    }

    // 创建文档
    await userDB.create({user, pass})
    res.send({
        code: 0,
        msg: "用户注册成功！"
    })
})

module.exports = router