// 跨域中间件
const cors = require('cors')

module.exports = cors({
    // 当axios配置了withCredentials,需要设置具体的跨域地址，以及credentials为true
    origin: 'http://localhost:8080',
    credentials: true
})