const { response } = require("express")
const express = require("express")
const router = express.Router()
const linkDB = require("../../db/link")

router.get('/', async (req, res) => {
    let data = await linkDB.find({})

    res.send({
        code: 0,
        msg: "获取成功",
        data
    })
})


module.exports = router