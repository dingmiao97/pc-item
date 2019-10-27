<template>
  <div class="container">
    <el-card>
      <img src="../../assets/logo_index.png" alt />
      <!-- 表单 -->
      <el-form :model="loginfrom" :rules="Loginserve" status-icon ref="logins">
        <el-form-item prop="mobile">
          <el-input v-model="loginfrom.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginfrom.code"
            placeholder="请输入验证码"
            style="width:240px;margin-right:8px"
          ></el-input>
          <el-button>发送验证码</el-button>
        </el-form-item>
        <el-checkbox :value="1>0">我已阅读并同意用户协议和隐私条款</el-checkbox>
        <el-form-item>
          <el-button type="primary" @click="loginsub" style="width:100%;margin-top:20px">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    const validateMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机号码格式不对'))
      }
    }

    return {
      loginfrom: {
        mobile: '',
        code: ''
      },
      Loginserve: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '请输入6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginsub () {
      this.$refs['logins'].validate(valid => {
        if (valid) {
          // 跳转
          this.$axios
            .post('authorizations', this.loginfrom)
            .then(res => {
              this.$router.push('/')
            })
            .catch(() => {
              this.$message.error('登录失败')
            })
        }
      })
    }
  }
}
</script>

<style  lang="less">
.container {
  width: 100%;
  height: 100%;
  background-color: pink;
  position: absolute;
  left: 0;
  top: 0;
  background: url("../../assets/login_bg.jpg") no-repeat center / cover;
  .el-card {
    width: 400px;
    height: 350px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 200px;
      display: block;
      margin: 0 auto 30px;
    }
  }
}
</style>
