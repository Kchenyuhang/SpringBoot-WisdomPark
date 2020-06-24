<template>
  <div class="container">
    <div class="tab-header">
      <el-row class="header-row">
        <el-input class="input" placeholder="请输入内容" v-model="input" clearable @input="filterSearch"></el-input>
        <el-button size="medium" type="success">查询</el-button>
        <el-button type="danger" icon="el-icon-delete" size="medium" @click="delAll()">批量删除</el-button>
      </el-row>
    </div>
    <div class="table">
      <el-table ref="pkFleaOrderId" :data="orderShow" @selection-change="handleSelectionChange">
        <el-table-column prop="pkFleaOrderId" type="selection" width="50%"></el-table-column>
        <el-table-column prop="pkFleaOrderId" label="订单编号 " width="130%"> </el-table-column>
        <el-table-column prop="goodsName" label="商品名 " width="130%">
          <template slot-scope="scope">
            <el-popover placement="top" trigger="hover">
              <span style="display:block; width: 300px;">{{ scope.row.goodsName }}</span>
              <span slot="reference" class="text-ellipsis">{{ scope.row.goodsName }}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="goodsMark" label="商品标签 " width="120%"> </el-table-column>
        <el-table-column prop="goodsSeller" label="卖方 " width="120%"> </el-table-column>
        <el-table-column prop="goodsBuyer" label="买方" width="120%"> </el-table-column>
        <el-table-column prop="goodsDescription" label="商品信息" width="150%">
          <template slot-scope="scope">
            <el-popover placement="top" trigger="hover">
              <span style="display:block; width: 300px;">{{ scope.row.goodsDescription }}</span>
              <span slot="reference" class="text-ellipsis">{{ scope.row.goodsDescription }}</span>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="orderCreateTime" label="订单创建时间" width="170%" sortable show-overflow-tooltip>
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{ orderShow[scope.$index].orderCreateTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="130%">
          <template slot-scope="scope">
            <p v-if="orderShow[scope.$index].isDeleted == 0" style="color: blue">已下单</p>
            <p v-if="orderShow[scope.$index].isDeleted == 1" style="color: red">已删除</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150%">
          <template slot-scope="scope">
            <el-button
              v-if="orderShow[scope.$index].isDeleted == 0"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
              type="danger"
              size="small"
            >
              删除
            </el-button>
            <el-button
              v-if="orderShow[scope.$index].isDeleted == 1"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
              type="danger"
              size="small"
              disabled
            >
              删除
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
    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">建议您仅删除违规订单，您确定删除吗</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteOne">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="batchDelVisible" width="300px" center>
      <div class="del-dialog-cnt">建议您仅删除违规订单，您确定批量删除吗</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="batchDelete()">确 定</el-button>
      </span>
    </el-dialog>
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
      ordersId: [],
      delVisible: false, //删除提示弹框的状态
      multipleSelection: [], //多选的数据
      input: '',
      batchDelVisible: false,
      index: '',
      msg: ''
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
    //格式化时间
    formatDate(value) {
      let date = new Date(value)
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? '0' + MM : MM
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      let h = date.getHours()
      h = h < 10 ? '0' + h : h
      let m = date.getMinutes()
      m = m < 10 ? '0' + m : m
      let s = date.getSeconds()
      s = s < 10 ? '0' + s : s
      return y + '年' + MM + '月' + d + '日' + h + ':' + m + ':' + s
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
      this.msg = row //每一条数据的记录
      // this.orderId.push(row.pkFleaOrderId) //把单行删除的每条数据的id添加进放删除数据的数组
      this.delVisible = true
    },
    //批量删除
    delAll() {
      this.batchDelVisible = true //显示删除弹框
    },
    //确定单行删除
    async deleteOne() {
      let data = {
        pkFleaOrderId: this.msg.pkFleaOrderId
      }
      console.log(data)
      // console.log(data.fleaRewardId.get[0])
      // let data1 = {
      //   pkFleaOrderId: data.pkFleaOrderId[0]
      // }
      alert('要删除的订单id：' + data.pkFleaOrderId)
      await apiPost('flea/order/logicalDelOne', data)
      this.getOrderAll()
      this.delVisible = false
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.ordersId.toggleRowSelection(row)
        })
      } else {
        this.$refs.ordersId.clearSelection()
      }
    },
    //多选信息
    handleSelectionChange(val) {
      console.log(val)
      let ids = []
      for (let i = 0; i < val.length; i++) {
        ids.push(val[i].pkFleaOrderId)
      }
      this.ordersId = ids
    },
    //确定批量删除
    async batchDelete() {
      let data1 = {
        id: this.ordersId
      }
      console.log(data1)
      await apiPost('flea/order/batchLogicalDel', data1)
      this.getOrderAll()
      this.batchDelVisible = false
      this.ordersId = []
    }
  },
  computed: {},
  watch: {
    pageSize: function() {
      this.getOrderAll()
    },
    currentPage: function() {
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
    margin-right: 69%;
  }
}
.header-row {
  margin: 20px;
  .input {
    width: 400px;
    margin-right: 20px;
    margin-left: -53%;
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
