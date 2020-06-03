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
            @click="handleStatus(scope.$index, scope.row)"
          >挂失</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 申请挂失弹出框 -->
    <el-dialog
      title="提示"
      :visible.sync="statusVisible"
      width="300px"
      center
    >
      <div class="del-dialog-cnt">该一卡通正在申请挂失，是否确定挂失</div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="statusVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="changeStatus"
        >确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除提示框 -->
    <el-dialog
      title="提示"
      :visible.sync="delVisible"
      width="300px"
      center
    >
      <div class="del-dialog-cnt">一卡通信息删除不可恢复，是否确定删除？</div>
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
  name: 'ReportLoss',
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      delVisible: false,
      statusVisible: false
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
    //分页查询
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
    },
    //申请挂失
    handleStatus(index, row) {
      this.idx = index
      this.msg = row //每一条数据的记录
      if (this.msg.lossStatus == false) {
        this.statusVisible = true
      } else {
        this.$message.success('该一卡通已挂失')
      }
    },
    changeStatus() {
      console.log(this.msg.pkReportLossId)
      this.axios({
        method: 'post',
        url: 'http://localhost:8080/loss/statuschange',
        params: {
          pk_report_loss_id: this.msg.pkReportLossId,
          loss_status: true
        }
      })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          this.getLossAll()
          this.$message.success('挂失成功')
        })
        .catch(function(error) {
          console.log(error)
        })
      this.statusVisible = false
    },
    //单行删除
    handleDelete(index, row) {
      this.idx = index
      this.msg = row //每一条数据的记录
      this.delVisible = true
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss"></style>
