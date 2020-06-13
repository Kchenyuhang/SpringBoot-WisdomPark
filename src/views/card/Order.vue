/* eslint-disable prettier/prettier */
<template>
  <div style="width:100%">
    <el-row
      type="flex"
      class="ml-20 mt-10"
    >
      <el-input
        v-model="input"
        placeholder="请输入内容"
        class="blur-search"
      ></el-input>

      <el-select
        v-model="selectValue"
        placeholder="请选择"
        class="statu-search ml-10"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        > </el-option>
      </el-select>
      <el-button
        type="success"
        size="mini"
        @click="search()"
        class="ml-10"
        icon="el-icon-search"
      >搜索</el-button>
    </el-row>
    <el-row class="df-jr-ac ml-20 mt-10">
      <el-col class="tl">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="small"
        ><span>新增</span></el-button>
        <el-button
          type="success"
          icon="el-icon-edit"
          size="small"
        >修改</el-button>
        <el-button
          type="warning"
          icon="el-icon-download"
          size="small"
        >导出</el-button>
      </el-col>
      <el-col class="tr mr-20">
        <el-button
          icon="el-icon-refresh"
          size="small"
        ></el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col span="1"></el-col>
      <el-col
        span="23"
        class="ml-20 mt-10"
      >
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            type="selection"
            min-width="5%"
          ></el-table-column>
          <el-table-column
            prop="gmtCreate"
            fixed
            label="日期"
            width="180"
          > </el-table-column>
          <el-table-column
            prop="orderNumber"
            label="订单号"
            width="120"
          > </el-table-column>
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
        100"
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
            width="180"
          > </el-table-column>
          <el-table-column
            prop="payMethod"
            label="支付方式"
            width="150"
          > </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            width="120"
            :formatter="statusChange"
          > </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="150"
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
                slot="reference"
                type="text"
                size="small"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <div
      class="block"
      style="margin-top:2%"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[6, 12, 18, 24]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 删除提示框 -->
    <el-dialog
      title="提示"
      :visible.sync="delVisible"
      width="300px"
      center
    >
      <div class="del-dialog-cnt">订单信息删除不可恢复，是否确定删除？</div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="deleteRow"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Order',
  data() {
    return {
      tableData: [],
      total: 72,
      currentPage: 1,
      pageSize: 6,
      visible: false,
      delVisible: false
    }
  },
  components: {},
  created() {
    this.getOrderAll()
  },
  watch: {
    pageSize: function() {
      this.getOrderAll()
    },
    currentPage: function() {
      this.getOrderAll()
    },
    total: function() {}
  },
  mounted() {},
  methods: {
    //单行删除
    handleDelete(index, row) {
      this.idx = index
      this.msg = row //每一条数据的记录
      this.delVisible = true
    },
    // 确定删除
    deleteRow() {
      this.axios({
        method: 'post',
        url: 'http://localhost:8080/order/id',
        data: {
          field: this.msg.pkOrderId
        }
      })
        .then((res) => {
          if (res.data) {
            this.getOrderAll()
            this.$message.success('删除成功')
          }
        })
        .catch((error) => {
          console.log(error)
          this.$message.error('订单信息删除失败')
        })
      this.delVisible = false //关闭删除提示模态框
    },
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
    //获取所有订单消息
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
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i].gmtCreate = this.formatDate(this.tableData[i].gmtCreate)
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    // 当前页展示数据
    handleSizeChange: function(pageSize) {
      this.pageSize = pageSize
    },
    // 当前页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    },
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
      return y + '年' + MM + '月' + d + '日 ' + h + ':' + m + ':' + s
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.blur-search {
  width: 200px;
}

.statu-search {
  width: 100px;
}

el-input {
  height: 30px;
}

.search-btn {
  height: 30px;
  width: 80px;
}
.el-input__inner {
  height: 30px;
}
</style>
