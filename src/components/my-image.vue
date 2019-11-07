<template>
  <div class="my-image">
    <div @click="open" class="box_img">
      <img :src=" value ||defultimg" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName">
        <el-tab-pane label="素材库" name="first">
          <el-radio-group @change="toggles" size="small" v-model="reqparams.collect">
            <el-radio-button label="false">全部</el-radio-button>
            <el-radio-button label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 图片列表 -->
          <div class="image_name">
            <div
              :class="{selected:selectedImageUrl === item.url}"
              :key="item.id"
              @click="selectedImage(item.url)"
              class="image_list"
              v-for="item in images"
            >
              <img :src="item.url" alt />
            </div>
          </div>
          <!-- 分页 -->
          <!-- 分页 -->
          <el-pagination
            :current-page="reqparams.page"
            :page-size="reqparams.per_page"
            :total="total"
            @current-change="toggleList"
            background
            layout="prev, pager, next"
          ></el-pagination>
        </el-tab-pane>
        <!-- headers 添加头部 -->
        <!-- on-success 成功时候的钩子 -->
        <!-- name 字段名 -->
        <el-tab-pane label="上传图片" name="second">
          <el-upload
            :headers="headers"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            class="avatar-uploader"
            name="image"
          >
            <img :src="imageUrl" class="avatar" v-if="imageUrl" />
            <i class="el-icon-plus avatar-uploader-icon" v-else></i>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="confirm" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import local from '@/utils/local/index'
import defultimg from '../assets/default.png'
export default {
  // 如果value 有图片就使用  没有就使用默认的
  props: ['value'],
  name: 'my-image',
  data () {
    return {
      // 对话框默认关闭
      dialogVisible: false,
      // 当前激活的选项卡
      activeName: 'first',
      // 提交的筛选参数
      reqparams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 图片列表
      images: [],
      // 总条数
      total: 0,
      // 当前选中的图片地址
      selectedImageUrl: null,
      // 设置请求头
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      },
      // 上传成功后的地址
      imageUrl: null,
      // 图片默认地址
      defultimg
    }
  },
  methods: {
    // 点击确认 上传图片和文件
    confirm () {
      if (this.activeName === 'first') {
        // 素材库
        if (this.selectedImageUrl) {
          // this.defultimg = this.selectedImageUrl
          this.$emit('input', this.selectedImageUrl)
          this.dialogVisible = false
        } else {
          this.$message.warning('请选择一张图片')
        }
        // 图片url地址
      } else {
        if (this.imageUrl) {
          // this.defultimg = this.imageUrl
          this.$emit('input', this.imageUrl)
          this.dialogVisible = false
        } else {
          this.$message.warning('请上传一张图片')
        }
      }
    },
    // 文件上传成功
    handleAvatarSuccess (res) {
      // res是响应体  res.data就是图片地址
      // 预览
      this.imageUrl = res.data.url
      this.$message.success('上传成功')
    },
    //   打开对话框
    open () {
      this.dialogVisible = true
      this.getimages()
    },
    // 图片列表
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
    // 选中图片
    selectedImage (url) {
      this.selectedImageUrl = url
      console.log(this.selectedImageUrl)
    }
  }
}
</script>

<style lang="less">
.my-image {
  display: inline-block;
  margin-right: 20px;
}
.box_img {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  width: 100%;
  text-align: center;
  display: block;
}
.image_name {
  margin-top: 20px;
  .image_list {
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 30px;
    img {
      width: 100%;
      height: 100%;
    }
    &.selected::after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat
        center / 50px 50px;
    }
  }
}
</style>
