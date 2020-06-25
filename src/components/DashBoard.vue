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
export default {
  name: 'DashBoard',
  data() {
    return {
      aa: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: [
        ['product', '2019'],
        ['Mon', 30.0],
        ['Tue', 20.0],
        ['Wed', 60.0],
        ['Thu', 40.0],
        ['Fri', 25.0],
        ['Sat', 35.0]
      ]
    }
  },
  components: {},
  created() {},
  mounted() {
    this.drawChart()
    this.drawCharts()
    this.drawChart1()
  },
  methods: {
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
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']
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
            data: [320, 100, 201, 350, 180, 400, 320, 320, 100, 201, 350, 180, 400, 320]
          }
        ]
      }

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    },
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
          source: this.data
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
    drawCharts() {
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
        color: ['red', 'green', 'yellow', '#1890FF', 'blueviolet'],
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['电子', '上衣', '妆品', '首饰', '家具']
        },
        series: [
          {
            name: '电子',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {
                value: 335,
                name: '电子'
              },
              {
                value: 310,
                name: '上衣'
              },
              {
                value: 234,
                name: '妆品'
              },
              {
                value: 135,
                name: '首饰'
              },
              {
                value: 1548,
                name: '家具'
              }
            ],
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
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss"></style>
