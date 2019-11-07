<template>
  <div class="container-publish">
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <my-bread>{{this.$route.query.id?'修改':'发布'}}文章</my-bread>
      </div>
      <!-- 内容 -->
      <el-form label-width="100px">
        <el-form-item label="标题:">
          <el-input style="width:400px" v-model="articleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容:">
          <quill-editor :options="editorOption" v-model="articleForm.content"></quill-editor>
        </el-form-item>
        <el-form-item label="封面:">
          <!-- 选中完成后清空图片  -->
          <el-radio-group @change="articleForm.cover.images=[]" v-model="articleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 根据类型选择 -->
          <div v-if="articleForm.cover.type === 1">
            <my-image v-model="articleForm.cover.images[0]"></my-image>
          </div>
          <div v-if="articleForm.cover.type === 3">
            <my-image :key="i" v-for="i in 3" v-model="articleForm.cover.images[i-1]"></my-image>
          </div>
        </el-form-item>
        <el-form-item label="频道:">
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="this.$route.query.id">
          <el-button @click="update(false)" type="primary">修改</el-button>
          <el-button @click="update(true)">存入草稿</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button @click="creat(false)" type="primary">发表</el-button>
          <el-button @click="creat(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      articleForm: {
        title: null,
        channel_id: null,
        content: null,
        cover: {
          type: 1,
          images: []
        }
      },
      editorOption: {
        // 清除文本内容
        placeholder: '',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['image']
          ]
        }
      }
    }
  },
  watch: {
    // 监听 id 变化
    '$route.query.id': function (newVal) {
      if (newVal) {
        // 修改
        this.getarticles(newVal)
      } else {
        // 新建
        this.articleForm = {
          title: null,
          channel_id: null,
          content: null,
          cover: {
            type: 1,
            images: []
          }
        }
      }
    }
  },
  created () {
    const articleID = this.$route.query.id
    if (articleID) {
      // 修改文章
      // 填充内容
      this.getarticles(articleID)
    }
  },
  methods: {
    // 获取文章
    async getarticles (id) {
      const res = await this.$axios.get(`articles/${id}`)
      this.articleForm = res.data.data
    },
    // 发表文章
    async creat (draft) {
      await this.$axios.post(`articles?${draft}`, this.articleForm)
      this.$message.success(draft ? '存入草稿' : '发布成功')
      this.$router.push('/article')
    },
    // 修改文章
    async update (draft) {
      await this.$axios.put(
        `articles/${this.$route.query.id}?draft=${draft}`,
        this.articleForm
      )
      this.$message.success(draft ? '存入草稿' : '发布成功')
      this.$router.push('/article')
    }
  }
}
</script>

<style lang="less">
</style>
