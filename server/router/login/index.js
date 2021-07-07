const express = require('express')
const router = express.Router()
const userDB = require('../../db/user')
const visitorDB = require('../../db/visitor')

// 接收登录请求
router.post('/', async (req, res) => {
    let { user, pass } = req.body

    //验证数据格式

    // 检测用户名是否存在
    let doc = await userDB.findOne({ user })

    // 用户不存在
    if (!doc) {
        return res.send({
            code: 3,
            msg: "用户名不存在"
        })
    }

    // 检测密码对不对
    if (doc.pass !== pass) {
        return res.send({
            code: 5,
            msg: "密码错误"
        })
    }

    // 登陆成功
    // 处理一下返回前端的数据
    let data = {
        _id: doc._id,
        user: doc.user,
        photo: doc.photo,
        admin: doc.admin
    }
    // 配置session
    req.session.userInfo = data
    // 添加当前用户到访问表
    let visitorDoc = await visitorDB.findOne({ visitor: doc._id })
    if (visitorDoc) {
        await visitorDB.updateOne({ visitor: doc._id }, { date: Date.now() })
    } else {
        await visitorDB.create({ visitor: doc._id })
    }
    // 返回前端
    res.send({
        code: 0,
        msg: "登陆成功",
        data
    })
})

// 检测是登录接口
router.post('/check', async (req, res) => {
    if (req.session.userInfo) {
        // 添加当前用户到访问表
        let _id = req.session.userInfo._id
        let visitorDoc = await visitorDB.findOne({ visitor: _id })
        if (visitorDoc) {
            await visitorDB.updateOne({ visitor: _id }, { date: Date.now() })
        } else {
            await visitorDB.create({ visitor: _id })
        }
        res.send({
            code: 0,
            msg: "用户已登录",
            data: req.session.userInfo
        })
    } else {
        res.send({
            code: 1,
            msg: '用户未登录',
            data: {}
        })
    }
})

// 退出登录接口
router.post('/logout', async (req, res) => {
    // session销毁
    req.session.destroy()
    res.send({
        code: 0,
        msg: "退出登陆成功"
    })
})
module.exports = router