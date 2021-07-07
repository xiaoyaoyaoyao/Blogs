const mongoose = require('mongoose')
const Schema = mongoose.Schema

let linkSchema = new Schema({
    // 名称
    name: {
        type: String,
        required: true
    },
    // 主页
    home: {
        type: String,
        required: true
    },
    // logo
    logo: {
        type: String,
        required: true
    },
    // 描述
    des: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('link', linkSchema)