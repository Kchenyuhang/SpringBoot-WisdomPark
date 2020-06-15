<template>
  <div class="container">
    <div class="tab-header">
      <el-row class="header-row">
        <el-input class="input" placeholder="请输入内容" v-model="input" clearable @input="filterSearch"></el-input>
        <!-- <el-button size="medium" type="success">查询</el-button> -->
      </el-row>
      <br />
      <el-col class="tl">
        <el-button type="danger" icon="el-icon-delete" size="small" class="del">批量删除</el-button>
      </el-col>
    </div>
    <div class="table">
      <el-table ref="orderId" :data="orderShow" @selection-change="handleSelectionChange">
        <el-table-column prop="pkFleaOrderId" type="selection" width="50%"></el-table-column>
        <el-table-column prop="pkFleaOrderId" label="订单编号 " width="130%"> </el-table-column>
        <el-table-column prop="goodsName" label="商品名 " width="180%"> </el-table-column>
        <el-table-column prop="goodsMark" label="商品标签 " width="150%"> </el-table-column>
        <el-table-column prop="goodsSeller" label="卖方 " width="150%"> </el-table-column>
        <el-table-column prop="goodsBuyer" label="买方" width="150%"> </el-table-column>
        <el-table-column prop="goodsDescription" label="商品信息" width="250%"> </el-table-column>
        <el-table-column prop="orderCreateTime" label="订单创建时间" width="200%"> </el-table-column>
        <el-table-column label="操作" width="150%">
          <el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top:2%">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { apiPost } from '../utils/api'
export default {
  name: 'Order',
  data() {
    return {
      currentPage: 0,
      total: 0, //总记录数
      pageSize: 5,
      orderShow: [],
      orderAll: [],
      orderId: [],
      input: ''
    }
  },
  components: {},
  created() {
    this.getOrderAll()
  },
  mounted() {},
  methods: {
    async getOrderAll() {
      if (this.currentPage - 1 < 0) {
        this.currentPage = 0
      } else {
        this.currentPage--
      }

      let data = {
        //此处需要减一
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      console.log(data)
      let res = await apiPost('/flea/order/all', data)
      this.orderAll = res.data
      console.log(this.orderAll)
      //需要清除一下原显示
      this.orderShow = []
      this.orderShow = this.orderShow.concat(JSON.parse(JSON.stringify(this.orderAll))) //拷贝数组
      // let len = this.userShow.length
      // this.total = len
      // console.log('len' + len)
      console.log('total' + this.total)
      for (let i = 0; i < this.orderShow.length; i++) {
        this.orderShow[i].orderCreateTime = this.formatDate(this.orderShow[i].orderCreateTime)
      }
    },
    //过滤搜索
    filterSearch() {
      // 获取输入框的值
      let search = this.input
      //数组元素按条件过滤
      console.log('输入的关键字的为：' + search)
      this.orderShow = this.orderAll.filter((v) => {
        // console.log(JSON.stringify(v))
        if (JSON.stringify(v).includes(search)) {
          return v
        }
      })
    },
    handleSelectionChange(val) {
      let ids = []
      for (let i = 0; i < val.length; i++) {
        ids.push(val[i].pkFleaOrderId)
      }
      this.orderId = ids
    },
    formatDate(value) {
      let date = new Date(value)
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? '0' + MM : MM
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      return y + '年' + MM + '月' + d + '日'
    },
    //当前页展示数据
    handleSizeChange: function(pageSize) {
      this.pageSize = pageSize
    },
    //当前页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    }
  },
  computed: {},
  watch: {
    pageSize: function() {
      console.log('pageSize改变' + this.pageSize)
      this.getOrderAll()
    },
    currentPage: function() {
      console.log('currentPage改变' + this.currentPage)
      this.getOrderAll()
    },
    total: function() {
      console.log('total改变' + this.total)
      this.getOrderAll()
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
}
.tab-header {
  margin: 20px;
  .input {
    width: 400px;
    margin-right: 20px;
    margin-left: -70%;
  }
}
.table {
  padding-left: 10px;
}
.del {
  background-color: red;
  color: aliceblue;
}
</style>
