// 这个文件夹用于统一管理后端路由
const express = require('express')
const router = express.Router()

// 注册接口
router.use('/reg', require('./reg/index'))

// 登录接口
router.use('/login', require('./login/index'))

//用户信息修改接口
router.use('/user', require('./user/index'))

// 留言相关接口
router.use('/msg', require('./msg/index'))

// admin相关
router.use('/admin', require('./admin/index'))

// 友链相关接口
router.use('/linkServer', require('./linkServer/index'))

// 文章相关接口
router.use('/art', require('./art/index'))

// 访客接口
router.use('/visitor', require('./visitor/index'))

module.exports = router