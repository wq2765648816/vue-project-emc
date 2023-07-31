import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { useUserStore } from '@/stores/modules/resToken'

NProgress.configure({
  showSpinner: false // 是否显示加载ico
})
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      meta: { title: '登录' },
      component: () => import('@/views/Login/index.vue')
    },
    {
      path: '/user/patient',
      meta: { title: '家庭档案' },
      component: () => import('@/views/User/PatientPage.vue')
    },
    {
      path: '/user/consult',
      meta: { title: '问诊记录' },
      component: () => import('@/views/User/ConsultPage.vue')
    },
    {
      path: '/consult/fast',
      meta: { title: '快速问诊' },
      component: () => import('@/views/Consult/ConsultFast.vue')
    },
    {
      path: '/consult/dep',
      meta: { title: '选择科室' },
      component: () => import('@/views/Consult/ConsultDep.vue')
    },
    {
      path: '/consult/illness',
      meta: { title: '图文问诊' },
      component: () => import('@/views/Consult/ConsultIllness.vue')
    },
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/views/Layout/index.vue'),
      children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue'),
          meta: { title: '首页' }
        },
        {
          path: '/article',
          component: () => import('@/views/Article/index.vue'),
          meta: { title: '健康百科' }
        },
        {
          path: '/notify',
          component: () => import('@/views/Notify/index.vue'),
          meta: { title: '消息通知' }
        },
        {
          path: '/user',
          component: () => import('@/views/User/index.vue'),
          meta: { title: '个人中心' }
        }
      ]
    }
  ]
})

// 全局的前置导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start() //每次切换页面时，调用进度条
  const store = useUserStore()

  // const token =
  // console.log(store)

  // console.log(token)

  if (store.user?.token && to.path == '/login') {
    next('/')
  } else if (!store.user?.token && to.path != '/login') {
    next('/login')
  } else {
    next()
  }
})

// 全局的后置导航守卫
router.afterEach((to) => {
  document.title = `${import.meta.env.VITE_APP_TITLE}-${to.meta.title || ''}`
  // console.log(import.meta.env)

  NProgress.done() // 在即将进入新的页面组件前，关闭掉进度条
})

export default router
