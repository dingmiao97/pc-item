// 导出一个本地信息的模块(设置用户，获取用户，删除用户)
const KEY = 'pc-item'
const local = {
  setUser (user) {
    const strJosn = JSON.stringify(user)
    // key在将来获取的时候使用 value 是json字符串格式
    window.sessionStorage.setItem(KEY, strJosn)
  },
  getUser () {
    const strJosn = window.sessionStorage.getItem(KEY)
    return JSON.parse(strJosn)
  },
  delUser () {
    window.sessionStorage.removeItem(KEY)
  }
}

export default local
