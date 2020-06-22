<template>
  <div>
    <div class="container">
      <div class="header">
        <el-row type="flex" class="ml-20 mt-10">
          <el-select size="mini" v-model="selectValue" placeholder="请选择" class="statu-search ml-10">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
        </el-row>
      </div>
      <div class="table" v-show="selectValue === 1 || selectValue === '通过'">
        <div class="tcontainer">
          <el-table
            ref="userId"
            :data="orderList1.slice(start, end)"
            style="width: 100%"
            :default-sort="{ prop: 'oderCreateTime', countOrder: 'descending' }"
          >
            <el-table-column label="工号" prop="jobNumber"> </el-table-column>
            <el-table-column label="姓名" prop="name"> </el-table-column>
            <el-table-column label="联系方式" prop="phoneNumber"> </el-table-column>
            <el-table-column label="订单量" sortable prop="countOrder"> </el-table-column>
            <el-table-column label="状态" prop="status"> </el-table-column>
            <el-table-column label="审核人" prop="reviewerName"> </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="block" v-show="selectValue === 1 || selectValue === '通过'">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[5, 15, 30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="orderList1.length"
        >
        </el-pagination>
      </div>

      <div class="table" v-show="selectValue === 2 || selectValue === '不通过'">
        <div class="tcontainer">
          <el-table
            ref="userId"
            :data="orderList1.slice(start, end)"
            style="width: 100%"
            :default-sort="{ prop: 'oderCreateTime', countOrder: 'descending' }"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand form">
                  <el-form-item label="订单发起人工号">
                    <span>{{ props.row.jobNumber }}</span>
                  </el-form-item>
                  <el-form-item label="名字">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                  <el-form-item label="手机号">
                    <span>{{ props.row.phoneNumber }}</span>
                  </el-form-item>
                  <el-form-item label="状态">
                    <span>{{ props.row.status }}</span>
                  </el-form-item>
                  <el-form-item label="原因">
                    <span>{{ props.row.remark }}</span>
                  </el-form-item>
                  <el-form-item label="身份证"> </el-form-item>
                  <el-form-item> </el-form-item>
                  <el-form-item>
                    <div class="idcard">
                      <img :src="props.row.idCard" alt="" />
                    </div>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>

            <el-table-column label="工号" prop="jobNumber"> </el-table-column>
            <el-table-column label="姓名" prop="name"> </el-table-column>
            <el-table-column label="联系方式" prop="phoneNumber"> </el-table-column>
            <el-table-column label="状态" prop="status"> </el-table-column>
            <el-table-column label="审核人" prop="reviewerName"> </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="block" v-show="selectValue === 2 || selectValue === '不通过'">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[5, 15, 30]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="orderList1.length"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
const API = require('../utils/api.js')
export default {
  data() {
    return {
      multipleSelection: [],
      input: null,
      size: 100,
      options: [
        {
          value: 2,
          label: '不通过'
        },
        {
          value: 1,
          label: '通过'
        }
      ],
      orderList: [], //装数据
      orderList1: [], //CANCAT数据

      selectValue: '通过',

      currentPage4: 0,
      start: 0,
      end: 5,
      pageSize: 5
    }
  },
  created() {
    //开始显示发布的订单
    this.getFinshOrder(1)
  },

  methods: {
    async getFinshOrder(i) {
      if (this.currentPage4 - 1 < 0) {
        this.currentPage4 = 0
      } else {
        this.currentPage4--
      }
      if (this.selectValue === '通过') {
        i = 1
      }
      let data = {
        num: this.currentPage4,
        size: this.size,
        status: i
      }

      let res = await API.init('errends/all/errends', data, 'post')
      if (res.data != null) {
        this.orderList = res.data.order
        for (let i = 0; i < this.orderList.length; i++) {
          if (this.orderList[i].status === 1) {
            this.orderList[i].status = '已通过'
          } else {
            this.orderList[i].status = '未通过'
          }
        }

        this.orderList1 = this.orderList1.concat(this.orderList)
        console.log(this.orderList1)
      } else {
        this.orderList1 = []
      }
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
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      this.size = val
      this.end = this.size
    },
    handleCurrentChange(val) {
      this.currentPage4 = val
      if (this.orderList.length === this.size) {
        if (this.currentPage4 >= parseInt(this.orderList1.length / this.pageSize) + 1) {
          this.end = this.pageSize * this.currentPage4
          this.start = this.end - this.pageSize
          this.currentPage4 = parseInt(this.orderList1.length / this.size) + 1
          this.getFinshOrder(this.selectValue)
          this.currentPage4 = val
        }
        this.end = this.pageSize * this.currentPage4
        this.start = this.end - this.pageSize
      } else {
        this.end = this.pageSize * this.currentPage4
        this.start = this.end - this.pageSize
      }
    }
  },
  watch: {
    selectValue: function() {
      console.log(this.selectValue)
      this.orderList1 = []
      this.getFinshOrder(this.selectValue)
    }
  }
}
</script>

<style scoped lang="scss">
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.container {
  width: 100%;
}
.header {
  display: flex;
}

.table {
  display: flex;

  align-items: center;
  justify-content: center;
}
.tcontainer {
  width: 100%;
}
.form {
  margin-left: 10%;
}
.idcard {
  width: 300px;
  height: 200px;
  border: black solid 1px;
}
</style>
