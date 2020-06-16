<template>
  <div style="width:100%">
    <el-row
      type="flex"
      class="ml-20 mt-10"
    >
      <el-input
        size="mini"
        v-model="input"
        placeholder="请输入内容"
        class="blur-search"
      ></el-input>
      <el-select
        size="mini"
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
          type="danger"
          icon="el-icon-delete"
          size="small"
        >删除</el-button>
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
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            min-width="5%"
          >
          </el-table-column>
          <el-table-column
            label="挂失人"
            min-width="12%"
          >
            <template slot-scope="scope">{{ scope.row.lossName }}</template>
          </el-table-column>
          <el-table-column
            prop="lossPhone"
            label="手机号"
            min-width="12%"
          >
          </el-table-column>
          <el-table-column
            prop="lossJobNumber"
            label="挂失卡号"
            min-width="12%"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="lossStatus"
            label="状态"
            min-width="12%"
            :formatter="statusChange"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注"
            min-width="12%"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="gmtCreate"
            label="创建时间"
            min-width="15%"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="操作"
            min-width="23%"
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
      </el-col>
    </el-row>
    <div
      class="block"
      style="margin-top:2%"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPageA"
        :page-sizes="[2, 4, 6, 8, 10]"
        :page-size="pageSizeA"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
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
      <div class="del-dialog-cnt">挂失信息删除不可恢复，是否确定删除？</div>
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
const API = require('../utils/api')
export default {
  name: 'ReportLoss',
  data() {
    return {
      tableData: [],
      currentPage: 0,
      pageSize: 1000,
      pageSizeA: 4,
      total: '',
      currentPageA: 0,
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
    watch: {
      pageSizeA: function() {
        this.getLossAll()
      },
      currentPageA: function() {
        this.getLossAll()
      },
      total: function() {}
    },
    // 分页查询所有
    async getLossAll() {
      this.data = { currentPage: this.currentPage, pageSize: this.pageSize }
      this.url = '/loss/all'
      this.result = await API.init(this.url, this.data, 'post')
      this.tableData = this.result.data
      this.tableData1 = this.result.data
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].gmtCreate = this.formatDate(this.tableData[i].gmtCreate)
      }
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
    // 分页查询所有
    async changeStatus() {
      this.data = { field: this.msg.pkReportLossId, status: true }
      this.url = '/loss/statuschange'
      this.result = await API.init(this.url, this.data, 'post')
      this.getLossAll()
      this.$message.success('挂失成功')
      this.statusVisible = false
    },
    //单行删除
    handleDelete(index, row) {
      this.idx = index
      this.msg = row //每一条数据的记录
      this.delVisible = true
    },
    // 确定删除
    async deleteRow() {
      this.data = { field: this.msg.pkReportLossId }
      this.url = '/loss/deletion/{pk_card_id}'
      this.result = await API.init(this.url, this.data, 'post')
      if (this.data) {
        this.getLossAll()
        this.$message.success('删除成功')
      } else {
        this.$message.error('挂失信息删除失败')
      }
      this.delVisible = false //关闭删除提示模态框
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
