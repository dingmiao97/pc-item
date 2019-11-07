import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import welcome from '@/views/welcome'
import NotFound from '@/views/404'
import local from '@/utils/local'
import Article from '@/views/article'
import images from '@/views/image'
import Publish from '@/views/publish'
import Comment from '@/views/comment'
import Setting from '@/views/setting'
import Fans from '@/views/fans'

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
    }, {
      // 内容
      path: 'article',
      component: Article
    },
    {
      // 素材
      path: 'image',
      component: images
    },

    {
      // 发布文章
      path: 'publish',
      component: Publish
    },

    {
      // 评论管理
      path: 'comment',
      component: Comment
    },
    {
      // 个人设置
      path: 'setting',
      component: Setting
    },
    {
      // 粉丝管理
      path: 'fans',
      component: Fans
    }
    ]
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
