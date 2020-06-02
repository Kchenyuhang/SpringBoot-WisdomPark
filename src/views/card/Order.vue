<template>
  <div style="width:100%;margin-left:5%">
    <div class="tab-hearder">
      <el-row style="margin-left:-80%;margin-top:1%">
        <el-button
          size="mini"
          type="primary"
          @click="addcenterDialogVisible = true"
        >增加</el-button>
        <el-button
          size="mini"
          type="warning"
          disabled
        >修改</el-button>
        <el-button
          size="mini"
          type="danger"
          disabled
        >删除</el-button>
        <el-button
          type="success"
          size="mini"
        >导出</el-button>
      </el-row>

    </div>
    <el-table
      :data="tableData"
      border
      style="width: 88%;margin-top:3%"
    >
      <el-table-column
        prop="gmtCreate"
        fixed
        label="日期"
        width="150"
      >
      </el-table-column>
      <el-table-column
        prop="orderNumber"
        label="订单号"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="orderType"
        label="类型"
        width="
        120"
      >
      </el-table-column>
      <el-table-column
        prop="orderMoney"
        label="金额"
        width="
        120"
      >
      </el-table-column>
      <el-table-column
        prop="jobNumber"
        label="卡号"
        width="
        120"
      >
      </el-table-column>
      <el-table-column
        prop="description"
        label="缴费描述"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="payMethod"
        label="支付方式"
        width="300"
      >
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="120"
        :formatter="statusChange"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100"
      >
        <template slot-scope="scope">
          <el-button
            @click="handleClick(scope.row)"
            type="text"
            size="small"
          >查看</el-button>
          <el-button
            type="text"
            size="small"
          >编辑</el-button>
          <el-button
            type="text"
            size="small"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Order',
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10
    }
  },
  components: {},
  created() {
    this.getOrderAll()
  },
  mounted() {},
  methods: {
    //时间格式化
    dateFormat: function(row, column) {
      var date = row[column.property]
      if (date == undefined) {
        return ''
      }
      // eslint-disable-next-line no-undef
      return moment(date).format('YYYY-MM-DD HH:mm:ss')
    },
    // eslint-disable-next-line no-unused-vars
    statusChange: function(row, column) {
      return row.status == 1 ? '已支付' : row.status == 0 ? '未支付' : 'aaa'
    },
    getOrderAll() {
      this.axios({
        method: 'post',
        url: 'http://localhost:8080/order/all',
        data: {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      })
        .then((res) => {
          this.tableData = res.data.data
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss"></style>
