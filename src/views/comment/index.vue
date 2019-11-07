<template>
  <div class="container-comment">
    <el-card>
      <!-- 头部 -->
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 表格 -->
      <el-table :data="articles">
        <el-table-column label="标题" prop="title" width="400px"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="toggleStatus(scope.row)"
              size="small"
              type="danger"
              v-if="scope.row.comment_status"
            >关闭评论</el-button>
            <el-button @click="toggleStatus(scope.row)" size="small" type="success" v-else>打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        :current-page="reqparams.page"
        :page-size="reqparams.per_page"
        :total="total"
        @current-change="pager"
        background
        layout="prev, pager, next"
        style="margin-top:20px"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 定义接受数据
      articles: [],
      reqparams: {
        response_type: 'comment',
        page: 1,
        per_page: 10
      },
      // 总条数
      total: 0
    }
  },
  created () {
    // 获取文章列表
    this.getarticles()
  },
  methods: {
    // 获取文章列表
    async getarticles () {
      const res = await this.$axios.get('articles', { params: this.reqparams })
      this.articles = res.data.data.results
      this.total = res.data.data.total_count
    },
    pager (newpager) {
      // 修改当前页码为新的页码
      this.reqparams.page = newpager
      // 重新获取数据
      this.getarticles()
    },
    // 切换评论状态
    toggleStatus (row) {
      const text = row.comment_status
        ? '您确认打开评论吗？'
        : '您确认关闭文章评论吗？如果关闭将不在进行任何操作'
      this.$confirm(text, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$axios.put(
            `comments/status?article_id=${row.id}`,
            {
              allow_comment: !row.comment_status
            }
          )
          // 成功
          this.$message.success(
            res.data.data.allow_comment ? '关闭评论' : '打开评论'
          )
          // 更新列表状态
          row.comment_status = res.data.data.allow_comment
        })
        .catch(() => {})
    }
  }
}
</script>

<style>
</style>
