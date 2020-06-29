<template>
  <div class="body" style="margin: 0;">
    <div class="dashboard-head df-jb-ac">
      <div class="col-4 head-card df-jb-ac">
        <span><img src="../assets/user.png" style="width: 60px; height:60px" alt="" class="col-2 ml-20"/></span>
        <p class="col-2 dc-jc-ac">
          <span class="dark-medium-fon">new users</span>
          <span class="mt-5 dark-large-font fw">{{ newUsersCount }}</span>
        </p>
      </div>
      <div class="col-4 head-card df-jb-ac">
        <span><img src="../assets/order.png" style="width: 60px; height:60px" alt="" class="col-2 ml-20"/></span>
        <p class="col-2 dc-jc-ac">
          <span class="dark-medium-fon">order counts</span>
          <span class="mt-5 dark-large-font fw">{{ orders }}</span>
        </p>
      </div>
      <div class="col-4 head-card df-jb-ac">
        <span><img src="../assets/money.png" style="width: 60px; height:60px" alt="" class="col-2 ml-20"/></span>
        <p class="col-2 dc-jc-ac">
          <span class="dark-medium-fon">turnover</span>
          <span class="mt-5 dark-large-font fw">{{ money }}</span>
        </p>
      </div>
      <div class="col-4 head-card df-jb-ac">
        <span><img src="../assets/car.png" style="width: 60px; height:60px" alt="" class="col-2 ml-20"/></span>
        <p class="col-2 dc-jc-ac">
          <span class="dark-medium-fon">shopping counts</span>
          <span class="mt-5 dark-large-font fw">{{ typeCounts }}</span>
        </p>
      </div>
    </div>
    <!-- <dashBoard :users="users" :typeName="typeName" :types="types" :orderCounts="orderCounts" :orderTime="orderTime"></dashBoard> -->
    <div>
      <div id="main" style="width: 100%;height:400px;margin-top: 50px;" class="cursor"></div>
      <div class="cursor" style="margin-top: 50px; display:flex">
        <div id="child" style="flex:0 0 48%;height:430px; " class="ml-20"></div>
        <div id="child2" style="flex:0 0 48%; height: 430px"></div>
      </div>
    </div>
  </div>
</template>

<script>
const API = require('../views/utils/api')
/* import dashBoard from '../components/DashBoard' */
export default {
  name: 'home',
  data() {
    return {
      users: [],
      newUsersCount: 0,
      typeName: [],
      types: [],
      typeCounts: 0,
      orderTime: [],
      orderCounts: [],
      orders: 0,
      shoppingCounts: 0,
      money: 0,
      colors: ['red', 'green', 'yellow', '#1890FF', '#dddddd', '#3888fa', '#1296db', '#37eff3', '#d81e06', '#f66f86', '#34bfa3']
    }
  },
  components: {},
  created() {
    this.getUsers()
    this.getShopping()
    this.getOrder()
  },
  mounted() {},
  methods: {
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
      this.drawChart1()
    },
    async getShopping() {
      let result = (await API.init('/flea/dashBorder', this.data, 'post')).data
      for (let i = 0, len = result.list.length; i < len; i++) {
        this.typeName.push(result.list[i].name)
      }
      this.types = result.list
      this.typeCounts = result.goodsNumber
      this.money = result.profit
      this.drawCharts()
    },
    async getOrder() {
      let result = (await API.init('/errends/getFifteenOrder', this.data, 'post')).data
      this.orders = (await API.init('/errends/getallOrde', this.data, 'post')).data
      for (let i = 0, len = result.length; i < len; i++) {
        this.orderCounts.push(result[i].orderCount)
        this.orderTime.push(String(result[i].time[1]) + '.' + String(result[i].time[2]))
      }
      this.drawChart()
    },
    //订单趋势
    drawChart() {
      console.log()
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
            areaStyle: {
              color: ['rgba(61, 149, 255, 0.1)']
            },
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
    }
  },
  computed: {}
}
</script>

<style scoped>
@import '../css/home.css';
</style>
