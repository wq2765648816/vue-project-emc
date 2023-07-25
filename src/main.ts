import './assets/main.css'

import { createApp } from 'vue'
import pinia from './stores'

import App from './App.vue'
import router from './router'

// 引入vant
import 'vant/lib/index.css'
// 引入全局样式
import './styles/main.scss'
// vant 使用提示
import {} from 'vant'
// pinia持久化插件
import persist from 'pinia-plugin-persistedstate'

const app = createApp(App)
app.use(pinia.use(persist))
app.use(pinia)
app.use(router)

app.mount('#app')
