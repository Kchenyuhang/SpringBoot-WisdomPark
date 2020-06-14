<template>
  <div style="width:100%">
    <!-- 修改弹出框 -->
    <el-dialog
      title="编辑App版本信息"
      :visible.sync="updatecenterDialogVisible"
      width="30%"
      left
    >
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="updatecenterDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="confirmUpdate"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 增加弹出框 -->
    <el-dialog
      title="新增App版本信息"
      :visible.sync="addcenterDialogVisible"
      width="30%"
      center
    >
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="addcenterDialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="confirmAdd"
        >确 定</el-button>
      </span>
    </el-dialog>

    <el-row
      type="flex"
      class="ml-20 mt-10"
    >
      <el-input
        size="mini"
        v-model="input"
        clearable
        placeholder="请输入内容"
        class="blur-search"
        @input="filterSearch()"
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
          @click="addcenterDialogVisible = true"
        ><span>新增</span></el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="small"
          @click="delAll()"
        >批量删除</el-button>
        <!-- 删除提示框 -->
        <el-dialog
          title="提示"
          :visible.sync="batchdelVisible"
          width="300px"
          center
        >
          <div class="del-dialog-cnt">批量删除App版本后不可恢复，是否确定删除？</div>
          <span
            slot="footer"
            class="dialog-footer"
          >
            <el-button @click="batchdelVisible = false">取 消</el-button>
            <el-button
              type="primary"
              @click="deleteBatch()"
            >确 定</el-button>
          </span>
        </el-dialog>
      </el-col>
      <el-col class="tr mr-20">
        <el-button
          icon="el-icon-refresh"
          size="small"
        ></el-button>
      </el-col>
    </el-row>
    <!-- 表格展示 -->
    <el-row>
      <el-col span="1"></el-col>
      <el-col
        span="23"
        class="ml-20 mt-10"
      >
        <el-table
          :data="appList"
          stripe="true"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            min-width="10%"
          > </el-table-column>
          <el-table-column
            label="客户端类型"
            show-overflow-tooltip
            min-width="13%"
          >
            <template slot-scope="scope">
              <span style="margin-left:-5%">{{ scope.row.appType }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="当前版本号"
            show-overflow-tooltip
            min-width="12%"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.currentVersion }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="最低版本号"
            show-overflow-tooltip
            min-width="12%"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.minVersion }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="最高版本号"
            show-overflow-tooltip
            min-width="12%"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.maxVersion }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="versionDescription"
            label="版本描述"
            min-width="15%"
            show-overflow-tooltip
          > </el-table-column>
          <el-table-column
            label="下载地址"
            show-overflow-tooltip
            min-width="18%"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.downloadLink }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            show-overflow-tooltip
            min-width="23%"
          >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="success"
                @click="handleUpdate(scope.$index, scope.row)"
              >编辑</el-button>
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
    <!-- 删除提示框 -->
    <el-dialog
      title="提示"
      :visible.sync="delVisible"
      width="300px"
      center
    >
      <div class="del-dialog-cnt">删除App版本号后不可恢复，是否确定删除？</div>
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
    <div
      class="block"
      style="margin-top:2%"
    >
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[8, 16, 24, 32, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
const API = require('../utils/api')
export default {
  data() {
    return {
      appList: [],
      appList1: [],
      detailList: [],
      currentPage: 0,
      total: 40,
      pageSize: 8,
      updatecenterDialogVisible: false,
      addcenterDialogVisible: false,
      datailcenterDialogVisible: false,
      delVisible: false, //删除提示弹框的状态
      batchdelVisible: false, //批量删除提示弹框的状态
      value1: '',
      input: '',
      gmtTime: '',
      msg: '',
      delarr: [], //存放删除的数据
      multipleSelection: []
    }
  },
  created() {
    this.getAppAll()
  },
  watch: {
    pageSize: function() {
      this.getAppAll()
    },
    currentPage: function() {
      this.getAppAll()
    },
    total: function() {}
  },
  methods: {
    // 分页查询所有
    async getAppAll() {
      this.data = { currentPage: this.currentPage, pageSize: this.pageSize }
      this.url = '/app/all'
      this.result = await API.init(this.url, this.data, 'post')
      this.appList = this.result.data
      this.appList1 = this.result.data
      for (let i = 0; i < this.appList.length; i++) {
        this.appList[i].gmtCreate = this.formatDate(this.appList[i].gmtCreate)
      }
    },
    // 当前页展示数据
    handleSizeChange: function(pageSize) {
      this.pageSize = pageSize
    },
    // 当前页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    },
    //单行删除
    handleDelete(index, row) {
      this.idx = index
      this.msg = row //每一条数据的记录
      this.delVisible = true
    },
    //批量删除
    delAll() {
      this.batchdelVisible = true //显示删除弹框
      const length = this.multipleSelection.length
      for (let i = 0; i < length; i++) {
        this.delarr.push(this.multipleSelection[i].pkAppVersionId)
      }
    },
    //操作多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    //单个删除
    async deleteRow() {
      this.data = { field: this.msg.pkAppVersionId }
      this.url = '/app/deletion'
      this.result = await API.init(this.url, this.data, 'delete')
      if (this.data) {
        this.getAppAll()
        this.$message.success('删除成功')
      } else {
        this.$message.error('App版本信息删除失败')
      }
      this.delVisible = false //关闭删除提示模态框
    },
    //批量删除
    async deleteBatch() {
      this.data = { ids: String(this.delarr) }
      this.url = '/app/deletionBath'
      this.result = await API.init(this.url, this.data, 'post')
      if (this.data) {
        this.getAppAll()
        this.$message.success('批量删除成功')
      } else {
        this.$message.error('App版本信息批量删除失败')
      }
      this.batchdelVisible = false //关闭删除提示模态框
    },
    //编辑
    handleUpdate(index, row) {
      this.idx = index
      this.msg = row //每一条数据的记录
      this.updatecenterDialogVisible = true
    },
    //过滤搜索
    filterSearch() {
      // 获取输入框的值
      let search = this.input
      //数组元素按条件过滤
      this.appList = this.appList1.filter((v) => {
        if (JSON.stringify(v).includes(search)) {
          return v
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.top-input {
  width: 200px;
  height: 30px;
  margin-left: 50px;
}
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
