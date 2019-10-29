// 注册全局插件
// 导出必须是一个对象
// install的值必须是函数
// 默认传参：Vue对象
// 基于Vue对象
import Mybread from '@/components/my-bread.vue'
export default {
  install (Vue) {
    Vue.component('my-bread', Mybread)
  }
}
