<template>
  <div class="container-fans">
    <el-card>
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="粉丝列表" name="first">
          <div :key="item.id.toString()" class="fans_list" v-for="item in fansList">
            <div class="fans_item">
              <el-avatar :size="100" :src="item.photo"></el-avatar>
            </div>
            <p>{{item.name}}</p>
            <el-button plain size="small" type="primary">+关注</el-button>
          </div>
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
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="second">
          <div ref="dom" style="width: 600px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import circleUrl from '../../assets/avatar.jpg'
import echarts from 'echarts'
export default {
  data () {
    return {
      activeName: 'second',
      circleUrl,
      reqparams: {
        page: 1,
        per_page: 21
      },
      total: 0,
      fansList: []
    }
  },
  mounted () {
    const dom = this.$refs.dom
    const myEcharts = echarts.init(dom)

    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    // 使用刚指定的配置项和数据显示图表。
    myEcharts.setOption(option)
  },
  methods: {
    pager (newpager) {
      // 修改当前页码为新的页码
      this.reqparams.page = newpager
      // 重新获取数据
      this.getFansList()
    },
    async getFansList () {
      const {
        data: { data }
      } = await this.$axios.get('followers', { params: this.reqparams })
      this.fansList = data.results
      this.total = data.total_count
    }
  },
  created () {
    this.getFansList()
  }
}
</script>

<style lang='less'>
.fans_list {
  width: 170px;
  height: 200px;
  border: 1px dashed #ddd;
  text-align: center;
  display: inline-block;
}
</style>
