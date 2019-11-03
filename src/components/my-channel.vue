<template>
  <el-select :value="value" @change="fn" placeholder="请选择" clearable>
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
//  频道插件
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      options: []
    }
  },
  methods: {
    // 频道列表
    async getOptions () {
      const res = await this.$axios.get('channels')
      this.options = res.data.data.channels
    },
    fn (channelid) {
      if (channelid === '') channelid = null
      this.$emit('input', channelid)
    }
  },
  created () {
    this.getOptions()
  }
}
</script>

<style>
</style>
