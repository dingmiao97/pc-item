<template>
  <el-container class="home-container">
    <el-aside :width="isOpen?'200px':'64px'">
      <!-- logo -->
      <div :class="{smallLogo :!isOpen}" class="logo"></div>
      <el-menu
        :collapse="!isOpen"
        :collapse-transition="false"
        :default-active="$route.path"
        active-text-color="#ffd04b"
        background-color="#002233"
        class="el-menu-vertical-demo"
        router
        style="border-right:none"
        text-color="#fff"
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <!-- 图标 -->
        <span @click="toggle" class="el-icon-s-fold icon"></span>
        <!-- 文字 -->
        <span class="text">江苏传智播客有限公司</span>
        <!-- 下拉菜单 -->
        <el-dropdown @command="handleCommand" class="dropdown">
          <span class="el-dropdown-link">
            <img :src="potho" alt />
            <span class="username">{{name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="setting" icon="el-icon-setting">个人设置</el-dropdown-item>
            <el-dropdown-item command="logout" icon="el-icon-unlock">用户退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import local from '@/utils/local'
import eventBus from '../../eventBus.js'
export default {
  data () {
    // 是否打开
    return {
      isOpen: true,
      potho: '',
      name: ''
    }
  },
  methods: {
    toggle () {
      this.isOpen = !this.isOpen
    },
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      local.delUser()
      this.$router.push('/login')
    },
    handleCommand (command) {
      this[command]()
    }
  },
  created () {
    const user = local.getUser() || {}
    this.potho = user.potho
    this.name = user.name
    // 接受数据
    eventBus.$on('update', name => {
      this.name = name
    })
    // 接受上传的头像
    eventBus.$on('updatePhoto', photo => {
      this.potho = photo
    })
  }
}
</script>

<style lang="less">
.home-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background-color: #002033;
    .logo {
      width: 100%;
      height: 60px;
      background: #002044 url('../../assets/logo_admin.png') no-repeat center /
        140px auto;
    }
    .smallLogo {
      background-image: url('../../assets/logo_admin_01.png');
      background-size: 36px auto;
    }
  }
  .el-header {
    border-bottom: 2px solid #ccc;
    line-height: 60px;
    .icon {
      font-size: 30px;
      vertical-align: middle;
    }
    .text {
      margin-left: 10px;
      vertical-align: middle;
    }
    .dropdown {
      float: right;
      img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
        border-radius: 50%;
      }
      .username {
        vertical-align: middle;
      }
    }
  }
}
</style>
