<template>
  <div>
    <div id="main" style="width: 100%;height:400px;margin-top: 50px;"></div>
    <div class="" style="margin-top: 50px; display:flex">
      <div id="child" style="flex:0 0 48%;height:430px;"></div>
      <div id="child2" style="flex:0 0 48%; height: 430px"></div>
    </div>
  </div>
</template>

<script>
const API = require('../views/utils/api')
export default {
  name: 'DashBoard',
  data() {
    return {
      aa: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [
        ['product', '2019'],
        ['1', 30],
        ['Tue', 20],
        ['Wed', 60],
        ['Thu', 40],
        ['Fri', 25],
        ['Sat', 35]
      ],
      newUsersCount: 0,
      colors: ['red', 'green', 'yellow', '#1890FF', '#dddddd', '#3888fa', '#1296db', '#37eff3', '#d81e06', '#f66f86', '#34bfa3']
    }
  },
  components: {},
  created() {
    this.getAll()
  },
  mounted() {
    this.drawChart()
    this.drawCharts()
    this.drawChart1()
  },
   props: ['users', 'typeName', 'types', 'orderCounts', 'orderTime'],
  methods: {
    //订单趋势
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('main'))
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: '半个月接单趋势表'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          borderWidth: 1,
          borderColor: '#3888fa',
          snap: true
        },
        /* legend: {
          data: ['搜索引擎']
        }, */
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#098ece',
              width: 2
            }
          },
          data: this.orderTime
        },
        yAxis: {
          name: '接单量',
          type: 'value',
          splitArea: { show: true },
          axisLine: {
            lineStyle: {
              type: 'solid',
              color: '#098ece',
              width: 2
            }
          }
        },
        series: [
          {
            name: '每日接单',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            stack: '总量',
            itemStyle: {
              normal: {
                color: '#3888fa'
              }
            },
            data: this.orderCounts
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    //用户新增
    drawChart1() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('child2'))
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: '近一周新增用户量',
          left: 'right'
        },
        legend: {},
        tooltip: {},
        dataset: {
          source: this.users
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {},

        series: [
          {
            type: 'bar',
            itemStyle: {
              normal: {
                color: '#32dadd'
              }
            }
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
    //商品分类
    drawCharts() {
      console.log(this.typeName)
      console.log(this.types)
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(document.getElementById('child'))
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: '销售商品分类统计图',
          subtext: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: this.colors,
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.typeName
        },
        series: [
          {
            name: '电子',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.types,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      myChart1.setOption(option)
    },
    async getUsers() {
      let time = new Date().getFullYear()
      let result = (await API.init('/userAccount/count', this.data, 'post')).data
      let arr = ['新增用户']
      arr[1] = String(time)
      this.users.push(arr)
      for (let i = 0, len = result.weekNewUsers.length; i < len; i++) {
        arr = []
        arr[0] = result.weekNewUsers[i].time
        arr[1] = result.weekNewUsers[i].count
        this.users.push(arr)
      }
      this.newUsersCount = result.newUsersCount
      console.log(this.data)
      console.log(this.users)
      this.drawChart1()
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss"></style>
