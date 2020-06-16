<template>
  <div>
    <div class="container">
      <div class="header">
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
        <el-row class="top">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-row>
        <el-button type="primary">主要按钮</el-button>
      </div>
      <div class="table">
        <div class="tcontainer">
          <el-table
            ref="userId"
            :data="orderList"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            :default-sort="{ prop: 'oderCreateTime', order: 'descending' }"
          >
            <el-table-column prop="id" type="selection" width="50"></el-table-column>
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                  <el-form-item label="订单ID">
                    <span>{{ props.row.id }}</span>
                  </el-form-item>
                  <el-form-item label="订单发起人工号">
                    <span>{{ props.row.founderId }}</span>
                  </el-form-item>
                  <el-form-item label="送件人名字">
                    <span>{{ props.row.founderName }}</span>
                  </el-form-item>
                  <el-form-item label="送件人手机号">
                    <span>{{ props.row.founderPhonenumber }}</span>
                  </el-form-item>
                  <el-form-item label="收件人名字">
                    <span>{{ props.row.receiverName }}</span>
                  </el-form-item>
                  <el-form-item label="收件人手机号">
                    <span>{{ props.row.receiverPhoneNumber }}</span>
                  </el-form-item>
                  <el-form-item label="商品分类">
                    <span>{{ props.row.type }}</span>
                  </el-form-item>
                  <el-form-item label="商品价格范围">
                    <span>{{ props.row.priceRange }}</span>
                  </el-form-item>
                  <el-form-item label="出发地">
                    <span>{{ props.row.originAddress }}</span>
                  </el-form-item>
                  <el-form-item label="目的地">
                    <span>{{ props.row.destination }}</span>
                  </el-form-item>
                  <el-form-item label="订单创建时间">
                    <span>{{ props.row.oderCreateTime }}</span>
                  </el-form-item>
                  <el-form-item label="订单送出时间">
                    <span>{{ props.row.deliveryTime }}</span>
                  </el-form-item>
                  <el-form-item label="订单金额">
                    <span>{{ props.row.amount }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column label="订单ID" prop="id"> </el-table-column>
            <el-table-column label="订单发起人" prop="founderName"> </el-table-column>
            <el-table-column label="联系方式" prop="founderPhonenumber"> </el-table-column>
            <el-table-column label="订单创建时间" prop="oderCreateTime" sortable> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 20]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="20"
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
      input: '',
      num: 0,
      size: 5,
      status: 0,
      orderList: [],
      commodity: []
    }
  },
  created() {
    this.getFinshOrder()
  },

  methods: {
    async getFinshOrder() {
      if (this.currentPage - 1 < 0) {
        this.currentPage = 0
      } else {
        this.currentPage--
      }
      let data = {
        num: this.num,
        size: this.size,
        status: 0
      }
      console.log(data)
      let res = await API.init('errends/serach/differentOrder', data, 'post')
      this.orderList = res.data.order
      for (let i = 0; i < this.orderList.length; i++) {
        this.orderList[i].oderCreateTime = this.formatDate(this.orderList[i].oderCreateTime)
      }
      console.log(this.orderList)
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
  align-items: center;
  justify-content: center;
  margin-left: 100px;
}
.top {
  display: flex;
  height: 40px;
  width: 40%;
}
.table {
  display: flex;

  align-items: center;
  justify-content: center;
}
.tcontainer {
  width: 80%;
}
</style>
