<template>
  <div class="contniner-article">
    <el-card>
      <!-- 头 -->
      <div slot="header">
        <my-bread>内容管理</my-bread>
      </div>
      <!-- 表单 -->
      <el-form label-width="80px" size="small">
        <el-form-item label="状态：">
          <el-radio-group v-model="reqparams.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- v-model 1.:value 2.@input -->
          <my-channel v-model="reqparams.channel_id"></my-channel>
        </el-form-item>
        <el-form-item label="日期：">
          <el-date-picker
            v-model="datearr"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changedate"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top:20px">
      <div slot="header">
        <span>根据筛选条件共查询到 {{total}} 条结果</span>
      </div>
      <el-table :data="articles">
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image style="width: 150px; height: 100px" :src="scope.row.cover.images[0]">
              <div slot="error">
                <img style="width:150px;height:100px" src="../../assets/error.gif" />
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag type="info" v-if="scope.row.status === 0">草稿</el-tag>
            <el-tag v-if="scope.row.status === 1">待审核</el-tag>
            <el-tag type="success" v-if="scope.row.status === 2">审核通过</el-tag>
            <el-tag type="warning" v-if="scope.row.status === 3">审核失败</el-tag>
            <el-tag type="danger" v-if="scope.row.status === 4">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发布时间" prop="pubdate"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑 删除 -->
            <el-button
              type="primary"
              @click="toEdit(scope.row.id)"
              icon="el-icon-edit"
              circle
              plain
            ></el-button>
            <el-button
              type="danger"
              @click="delArticle(scope.row.id)"
              icon="el-icon-delete"
              circle
              plain
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqparams.per_page"
        :current-page="reqparams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 定义结收数据
      articles: [],
      // 提交后台的参数对象
      // 由axios进行数据提交，字段的值null，axios是不会提交该字段
      reqparams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null,
        page: 1,
        per_page: 10
      },
      // 频道选项
      options: [
        {
          value: 1,
          label: '前端'
        },
        {
          value: 2,
          label: 'java'
        }
      ],
      datearr: [],
      total: 0
    }
  },
  created () {
    // 频道列表
    // this.getOptions()
    this.getArticles()
  },
  methods: {
    // // 频道列表
    // async getOptions () {
    //   const res = await this.$axios.get('channels')
    //   this.options = res.data.data.channels
    // },
    // 文章列表
    async getArticles () {
      const res = await this.$axios.get('articles', { params: this.reqparams })
      this.articles = res.data.data.results
      this.total = res.data.data.total_count
    },
    pager (newpager) {
      // 修改当前页码为新的页码
      this.reqparams.page = newpager
      // 重新获取数据
      this.getArticles()
    },
    // 筛选
    search () {
      // 页码改成1
      this.reqparams.page = 1
      // 处理频道空白字符
      if (this.reqparams.channel_id === '') this.reqparams.channel_id = null
      // 重新获取数据
      this.getArticles()
    },
    // 日期
    changedate (datearr) {
      // dateArr 是数组 [date,date]  起始时间  结束时间
      // 我们需要： dateArr 是数组 [string,string]  string === '2019-10-02'
      // value-form="yyyy-MM-dd" 格式转换成功
      // 注意：清空日期之后，dateArr是null  对应的 begin end 值也该为null
      if (datearr) {
        this.reqparams.begin_pubdate = datearr[0]
        this.reqparams.end_pubdate = datearr[1]
      } else {
        this.reqparams.begin_pubdate = null
        this.reqparams.end_pubdate = null
      }
    },
    // 编辑
    toEdit (id) {
      // this.$router.push(`/publish?id=${id}`)
      // query的传参
      this.$router.push({ path: '/publish', query: { id } })
    },
    // 删除
    async delArticle (id) {
      await this.$axios.delete(`articles/${id}`)
      this.$message.success('成功删除')
      this.getArticles()
    }
  }
}
</script>

<style>
</style>
