import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import axios from 'axios'

const app = createApp(App)
installElementPlus(app)

// 判断是否是开发环境
let ifDEV = process.env.NODE_ENV === "development"
const baseURL = ifDEV ? 'http://localhost:4000' : ''

axios.defaults.baseURL = baseURL
// 让axios携带cookie
axios.defaults.withCredentials = true
app.config.globalProperties.$axios=axios
app.use(store).use(router).mixin({
    data(){
        return{
            baseURL
        }
    }
}).mount('#app')