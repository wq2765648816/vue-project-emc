import './assets/main.css'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import CpIcon from '@/components/CpIcon.vue'
import App from './App.vue'
import router from './router'
import persist from 'pinia-plugin-persistedstate'
import 'virtual:svg-icons-register'
// 引入vant
import 'vant/lib/index.css'
// 引入全局样式
import './styles/main.scss'
// vant 使用提示
import {} from 'vant'

const app = createApp(App)
app.component('CpIcon', CpIcon)
app.use(router)
app.use(createPinia().use(persist))
app.mount('#app')
