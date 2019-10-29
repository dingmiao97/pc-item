<template>
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
        <el-select v-model="reqparams.channel_id" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期：">
        <el-date-picker
          v-model="datearr"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">筛选</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 提交后台的参数对象
      // 由axios进行数据提交，字段的值null，axios是不会提交该字段
      reqparams: {
        status: null,
        channel_id: null,
        begin_pubdate: null,
        end_pubdate: null
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
      datearr: []
    }
  }
}
</script>

<style>
</style>
