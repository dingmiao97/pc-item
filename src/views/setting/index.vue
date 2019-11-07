<template>
  <div class="container-setting">
    <el-card>
      <div slot="header">
        <my-bread>个人设置</my-bread>
      </div>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form label-width="120px">
              <el-form-item label="编号:">{{userInfo.id}}</el-form-item>
              <el-form-item label="手机:">{{userInfo.mobile}}</el-form-item>
              <el-form-item label="媒体名称:">
                <el-input v-model="userInfo.name"></el-input>
              </el-form-item>
              <el-form-item label="媒体介绍:">
                <el-input :rows="3" type="textarea" v-model="userInfo.intro"></el-input>
              </el-form-item>
              <el-form-item label="邮箱:">
                <el-input v-model="userInfo.email"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="saveInfo" type="primary">保存设置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <el-upload
              :http-request="updatePhoto"
              :show-file-list="false"
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
              class="avatar-uploader"
            >
              <img :src="userInfo.photo" class="avatar" v-if="userInfo.photo" />
              <i class="el-icon-plus avatar-uploader-icon" v-else></i>
            </el-upload>
            <p style="text-align:center">修改头像</p>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local'
import eventBus from '../../eventBus.js'
export default {
  data () {
    return {
      userInfo: {
        name: null,
        intro: null,
        email: null,
        photo: null
      }
    }
  },
  // 在页面初始话时获取用户信息
  created () {
    this.getUserInfo()
  },
  methods: {
    // 上传文件
    async updatePhoto (result) {
      // 选择一个文件触发当前函数 默认传入一个参数（包含文件信息）
      // 获取图片信息
      const file = result.file
      // 创建一个formDate
      const formData = new FormData()
      // 追加一条数据  把图片文件给他
      formData.append('photo', file)
      // 使用axios提交数据
      const res = await this.$axios.patch('user/photo', formData)
      // 预览
      this.userInfo.photo = res.data.data.photo
      // 成功
      this.$message.success('上传成功')
      // 上传在home页面
      eventBus.$emit('updatePhoto', res.data.data.photo)
      // 在本地修改
      const user = local.getUser()
      user.photo = res.data.data.photo
      local.setUser(user)
    },
    // 获取用户信息
    async getUserInfo () {
      const res = await this.$axios.get('user/profile')
      this.userInfo = res.data.data
    },
    // 保存设置
    async saveInfo () {
      await this.$axios.patch('user/profile', {
        name: this.userInfo.name,
        intro: this.userInfo.intro,
        email: this.userInfo.email
      })
      // 成功提示
      this.$message.success('保存成功')
      // 传递到home
      eventBus.$emit('update', this.userInfo.name)
      // 本地的修改
      const user = local.getUser()
      user.name = this.userInfo.name
      local.setUser(user)
    }
  }
}
</script>

<style>
</style>
