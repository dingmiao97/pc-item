// 引入
import axios from 'axios'
import local from '@/utils/local'
import router from '../router'
import JsonBig from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.transformResponse = [function (data) {
  try {
    // 后台可能没有任何响应内容 data的值为null
    const result = JsonBig.parse(data)
    return result
  } catch (e) {
    return data
  }
}]

// if (local.getUser()) {
//   axios.defaults.headers.Authorization = `Bearer ${local.getUser().token}`
// }

// 添加请求拦截器
// 在登陆页面刷新没有存储token 代码会重新执行 因为是路由跳转  但是没有设置头
// 在首页刷新代码会重新执行 这时会携带token
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const user = local.getUser() || {}
  config.headers.Authorization = `Bearer ${user.token}`
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (res) {
  //   // 对响应数据做点什么
  return res
}, function (error) {
  // 对响应错误做点什么
  // 获取响应对象 error.response
  //   // 获取状态码  error.response.status
  if (error.response.status === 401) {
    return router.push('/login')
  }
  return Promise.reject(error)
})

// 导出
export default axios
