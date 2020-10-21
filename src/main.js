import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/global.less'
import axios from 'axios'
axios.defaults.baseURL = 'http://www.dongh5.com:9000/'
import ElementUI, { Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入全局样式
import '@/style/global.less'
Vue.use(ElementUI);
Vue.config.productionTip = false
    // 添加响应拦截器
let loadingInstance = null
axios.interceptors.request.use(
    function(config) {
        // 在发送请求之前做些什么
        loadingInstance = Loading.service({
            text: '拼命加载中...',
            spinner: 'el-icon-loading'
        })
        return config
    },
    function(error) {
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)
axios.interceptors.response.use(
    function(response) {
        // 对响应数据做点什么
        loadingInstance && loadingInstance.close()
        return response.data
    },
    function(error) {
        // 对响应错误做点什么
        loadingInstance && loadingInstance.close()
        return Promise.reject(error)
    }
)
Vue.prototype.$http = axios
new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')
    // TODO全局过滤器
Vue.filter('Times', cont => {
    if (cont / 10000 > 10) {
        return parseInt(cont / 10000) + '万'
    } else {
        return cont
    }

})
import moment from 'moment'

Vue.filter('second', (time, formatStr = 'mm:ss') => {
    return moment(time).format(formatStr)
})
Vue.filter('date', (time, formatStr = 'YYYY-MM-DD') => {
    return moment(time).format(formatStr)
})