<template>
  <div class="container-image">
    <el-card>
      <div slot="header">
        <my-bread>素材管理</my-bread>
      </div>
      <!-- 全部 收藏 -->
      <div class="box-list">
        <el-radio-group @change="toggles" v-model="reqparams.collect" size="small">
          <el-radio-button label="false">全部</el-radio-button>
          <el-radio-button label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button style="float:right" @click="open" type="success" size="small">添加素材</el-button>
      </div>
      <!-- 图片列表 -->
      <div class="image_name">
        <div class="image_list" v-for="item in images" :key="item.id">
          <img :src="item.url" alt />
          <div class="footer">
            <span
              class="el-icon-star-off"
              @click="toggleStatus(item)"
              :class="{red:item.is_collected}"
            ></span>
            <span class="el-icon-delete" @click="deleteImg(item.id)"></span>
          </div>
        </div>
      </div>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqparams.per_page"
        :current-page="reqparams.page"
        @current-change="toggleList"
      ></el-pagination>
      <!-- 添加素材 -->
      <!-- headers 设置请求头 -->
      <!-- name 设置字段名 -->
      <!--on-success 文件上传时的钩子 -->
      <el-dialog title="添加素材" :visible.sync="dialogVisible" width="30%">
        <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :show-file-list="false"
          :headers="headers"
          name="image"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import local from '@/utils/local/index'
export default {
  data () {
    return {
      reqparams: {
        collect: false,
        page: 1,
        per_page: 10
      },
      // 图片
      images: [],
      // 总条数
      total: 0,
      dialogVisible: false,
      // 上传成功后的地址
      imageUrl: null,
      // 设置请求头
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  created () {
    // 图片渲染
    this.getimages()
  },
  methods: {
    // 再次点击时关闭
    open () {
      this.dialogVisible = true
      this.imageUrl = null
    },
    // 文件上传成功
    handleAvatarSuccess (res) {
      // res是响应体  res.data就是图片地址
      // 预览
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
      // 关闭 2秒后
      window.setTimeout(() => {
        this.dialogVisible = false
        this.getimages()
      }, 2000)
    },
    async getimages () {
      const res = await this.$axios.get('user/images', {
        params: this.reqparams
      })
      this.images = res.data.data.results
      this.total = res.data.data.total_count
    },
    // 分页
    toggleList (newPage) {
      this.reqparams.page = newPage
      this.getimages()
    },
    // 全部 收藏
    toggles () {
      this.reqparams.page = 1
      this.getimages()
    },
    // 添加 收藏
    async toggleStatus (item) {
      const res = await this.$axios.put(`user/images/${item.id}`, {
        // 根据状态取反
        collect: !item.is_collected
      })
      // 成功 改变当前的状态 提示
      item.is_collected = res.data.data.collect
      this.$message.success(res.data.data.collect ? '添加成功' : '添加失败')
    },
    // 删除
    deleteImg (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(async () => {
          await this.$axios.delete(`user/images/${id}`)
          this.$message.success('删除成功')
          this.getimages()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="less">
.image_name {
  margin-top: 20px;
  .image_list {
    width: 180px;
    height: 180px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 30px;
    img {
      width: 100%;
      height: 100%;
    }
    .footer {
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      position: absolute;
      left: 0;
      bottom: 0;
      color: #fff;
      background: rgba(0, 0, 0, 0.4);
      span {
        margin: 0 20px;
        &.red {
          color: red;
        }
      }
    }
  }
}
</style>
