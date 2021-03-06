import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import axios from '@/api'
import '@/style/index.less'
// import Mybread from '@/components/my-bread.vue'
// Vue.component('my-bread', Mybread)
import plugin from '@/components'
Vue.use(plugin)
Vue.prototype.$axios = axios
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
