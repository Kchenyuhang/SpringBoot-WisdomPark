<template>
  <div style="width:100%">
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
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%;margin-top:3%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
      >
      </el-table-column>
      <el-table-column
        label="挂失人"
        width="120"
      >
        <template slot-scope="scope">{{ scope.row.lossName }}</template>
      </el-table-column>
      <el-table-column
        prop="lossPhone"
        label="手机号"
        width="120"
      >
      </el-table-column>
      <el-table-column
        prop="lossJobNumber"
        label="挂失卡号"
        width="150"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="lossStatus"
        label="状态"
        width="150"
        :formatter="statusChange"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="remark"
        label="备注"
        width="250"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="gmtCreate"
        label="创建时间"
        width="180"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        label="操作"
        width="250"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
          >编辑</el-button>
          <el-button
            size="mini"
            type="primary"
          >流水账单</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ReportLoss',
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10
    }
  },
  components: {},
  created() {
    this.getLossAll()
  },
  mounted() {},
  methods: {
    // eslint-disable-next-line no-unused-vars
    statusChange: function(row, column) {
      return row.lossStatus == 1 ? '已挂失' : row.lossStatus == 0 ? '申请挂失中' : 'aaa'
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getLossAll() {
      this.axios({
        method: 'post',
        url: 'http://localhost:8080/loss/all',
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
