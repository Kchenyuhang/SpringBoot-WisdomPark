<template>
  <div class="body" style="margin: 0;">
    <div class="dashboard-head df-jb-ac">
      <div class="col-4 head-card df-jb-ac">
        <span><img src="../assets/user.png" style="width: 60px; height:60px" alt="" class="col-2 ml-20"></span>
        <p class="col-2 dc-jc-ac">
          <span class="dark-medium-fon">new users</span>
          <span class="mt-5 dark-large-font fw">新增用户量</span>
        </p>
      </div>
      <div class="col-4 head-card df-jb-ac">
        <span><img src="../assets/order.png" style="width: 60px; height:60px" alt="" class="col-2 ml-20"></span>
        <p class="col-2 dc-jc-ac">
          <span class="dark-medium-fon">order counts</span>
          <span class="mt-5 dark-large-font fw">每日订单量</span>
        </p>
      </div>
      <div class="col-4 head-card df-jb-ac">
        <span><img src="../assets/money.png" style="width: 60px; height:60px" alt="" class="col-2 ml-20"></span>
        <p class="col-2 dc-jc-ac">
          <span class="dark-medium-fon">turnover</span>
          <span class="mt-5 dark-large-font fw">收入金额</span>
        </p>
      </div>
      <div class="col-4 head-card df-jb-ac">
        <span><img src="../assets/car.png" style="width: 60px; height:60px" alt="" class="col-2 ml-20"></span>
        <p class="col-2 dc-jc-ac">
          <span class="dark-medium-fon">shopping counts</span>
          <span class="mt-5 dark-large-font fw">购物数量</span>
        </p>
      </div>
    </div>
    <div>
      <dashBoard></dashBoard>
    </div>
  </div>
</template>

<script>
import dashBoard from '../components/DashBoard'
export default {
  name: 'home',
  data() {
    return {}
  },
  components: {
    dashBoard
  },
  created() {},
  mounted() {},
  methods: {},
  computed: {}
}
</script>

<style scoped>
@import '../css/home.css';
</style>
