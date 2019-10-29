import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import welcome from '@/views/welcome'
import NotFound from '@/views/404'
import local from '@/utils/local'
Vue.use(VueRouter)

const router = new VueRouter({

  routes: [{
    // 登录
    path: '/login',
    component: Login
  },
  {
    // 首页
    path: '/',
    component: Home,
    // 欢迎
    children: [{
      path: '',
      component: welcome
    }]
  },
  {
    path: '*',
    component: NotFound
  }
  ]
})
// 前置路由守卫
router.beforeEach((to, from, next) => {
  const user = local.getUser()
  if (to.path !== '/login' && !user) return next('/login')
  next()
})

export default router
