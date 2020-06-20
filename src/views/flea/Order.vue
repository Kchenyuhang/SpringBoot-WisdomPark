<template>
  <div class="container">
    <div class="tab-header">
      <el-row class="header-row">
        <el-input class="input" placeholder="请输入内容" v-model="input" clearable @input="filterSearch"></el-input>
      </el-row>
      <br />
      <el-col class="tl">
        <el-button type="danger" icon="el-icon-delete" size="small" round @click="batchDelete">批量下架</el-button>
      </el-col>
    </div>
    <div class="table">
      <el-table ref="pkFleaOrderId" :data="orderShow" @selection-change="handleSelectionChange">
        <el-table-column prop="pkFleaOrderId" type="selection" width="50%"></el-table-column>
        <el-table-column prop="pkFleaOrderId" label="订单编号 " width="130%"> </el-table-column>
        <el-table-column prop="goodsName" label="商品名 " width="180%"> </el-table-column>
        <el-table-column prop="goodsMark" label="商品标签 " width="100%"> </el-table-column>
        <el-table-column prop="goodsSeller" label="卖方 " width="120%"> </el-table-column>
        <el-table-column prop="goodsBuyer" label="买方" width="120%"> </el-table-column>
        <el-table-column prop="goodsDescription" label="商品信息" width="250%"> </el-table-column>
        <el-table-column prop="orderCreateTime" label="订单创建时间" width="200%"> </el-table-column>
        <el-table-column label="状态" width="130%">
          <template slot-scope="scope">
            <p v-if="orderShow[scope.$index].isDeleted == 0" style="color: blue">已发布</p>
            <p v-if="orderShow[scope.$index].isDeleted == 1" style="color: red">已下架</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150%">
          <template slot-scope="scope">
            <el-button icon="el-icon-delete" @click="deleteOne(scope.$index, scope.row)" type="danger" size="small" round>
              下架
            </el-button>
          </template>
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
      currentPage: 1,
      total: 0, //总记录数
      pageSize: 5,
      orderShow: [],
      orderAll: [],
      orderId: [],
      delVisible: false, //删除提示弹框的状态
      multipleSelection: [], //多选的数据
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
      let data = {
        //此处需要减一
        currentPage: this.currentPage - 1,
        pageSize: this.pageSize
      }
      console.log(data)
      let res = await apiPost('/flea/order/all', data)
      this.orderAll = res.data.content
      this.total = res.data.totalElements
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
    },
    //单行删除
    handleDelete(index, row) {
      this.index = index
      // this.msg = row //每一条数据的记录
      this.orderId.push(row.pkFleaOrderId) //把单行删除的每条数据的id添加进放删除数据的数组
      this.delVisible = true
    },
    //批量删除
    delAll() {
      this.delVisible = true //显示删除弹框
    },
    //多选信息
    handleSelectionChange(val) {
      let ids = []
      for (let i = 0; i < val.length; i++) {
        ids.push(val[i].pkFleaOrderId)
      }
      this.orderId = ids
    },
    //确定单行删除
    async deleteOne() {
      let data = {
        pkFleaOrderId: this.orderId
      }
      console.log(data)
      // console.log(data.fleaRewardId.get[0])
      let data1 = {
        pkFleaOrderId: data.pkFleaOrderId[0]
      }
      alert('要删除的订单id：' + data1.pkFleaOrderId)
      await apiPost('flea/order/logicalDelOne', data1)
      this.getOrderAll()
    },
    //确定批量删除
    async batchDelete() {
      let data = {
        id: this.orderId
      }
      console.log(data)
      await apiPost('flea/order/batchLogicalDel', data)
      this.getOrderAll()
    }
  },
  computed: {},

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
