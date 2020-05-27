<template>
  <el-table
    :data="cardList"
    style="width: 100%;margin-top:6%;margin-left:1%"
  >
    <el-table-column
      label="卡号"
      width="180"
    >
      <template slot-scope="scope">
        <span style="margin-left:-5%">{{ scope.row.cardNumber }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="卡密"
      width="180"
    >
      <template slot-scope="scope">
        <span>{{ scope.row.cardPassword }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="绑定账号"
      width="180"
    >
      <template slot-scope="scope">
        <span>{{ scope.row.jobNumber }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="余额"
      width="180"
    >
      <template slot-scope="scope">
        <span>{{ scope.row.cardBalance }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="状态"
      width="180"
    >
      <template slot-scope="scope">
        {{ scope.row.status}}
      </template>
    </el-table-column>
    <el-table-column
      label="创建时间"
      width="180"
    >
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span>{{ scope.row.gmtCreate }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="success"
          @click="handleEdit(scope.$index, scope.row)"
        >编辑</el-button>
        <el-button
          size="mini"
          type="primary"
          @click="handleEdit(scope.$index, scope.row)"
        >流水账单</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      cardList: [],
      currentPage: 1,
      pageSize: 10
    }
  },
  created() {
    this.getCardAll()
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    },
    getCardAll() {
      this.axios({
        method: 'post',
        url: 'http://localhost:8080/card/all',
        data: {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      })
        .then((res) => {
          this.cardList = res.data.data
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped lang="scss">
</style>
