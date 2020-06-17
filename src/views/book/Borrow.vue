<template>
  <div style="width:100%">
    <!-- 增加弹出框 -->
    <el-dialog
      :modal="false"
      title="新增借阅"
      :visible.sync="addcenterDialogVisible"
      width="50%"
      center
    >
      <el-form
        label-width="80px"
        :model="ruleForm1"
      >
        <el-form-item
          required
          label="书名"
          prop="bookName"
        >
          <el-input v-model="ruleForm1.bookName"></el-input>
        </el-form-item>
        <el-form-item
          required
          label="借阅人"
          prop="borrowUserName"
        >
          <el-input v-model="ruleForm1.borrowUserName"></el-input>
        </el-form-item>
        <el-form-item
          required
          label="联系方式"
          prop="borrowUserPhone"
        >
          <el-input v-model="ruleForm1.borrowUserPhone"></el-input>
        </el-form-item>
        <el-form-item
          required
          label="学号"
          prop="borrowUserNumber"
        >
          <el-input
            v-model="ruleForm1.borrowUserNumber"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          required
          label="编号"
          prop="borrowBookId"
        >
          <el-input
            v-model="ruleForm1.borrowBookId"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
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
        v-model="input"
        clearable
        placeholder="请输入内容"
        class="blur-search"
        size="mini"
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
          :modal="false"
          title="提示"
          :visible.sync="batchdelVisible"
          width="300px"
          center
        >
          <div class="del-dialog-cnt">批量删除借阅信息后不可恢复，是否确定删除？</div>
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
          :data="bookBorrowList"
          stripe="true"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            min-width="10%"
          > </el-table-column>
          <el-table-column
            label="书名"
            show-overflow-tooltip
            min-width="13%"
          >
            <template slot-scope="scope">
              <span style="margin-left:-5%">{{ scope.row.borrowBookName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="借阅人"
            show-overflow-tooltip
            min-width="13%"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.borrowUserName }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="学号/工号"
            show-overflow-tooltip
            min-width="13%"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.borrowUserNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="联系方式"
            show-overflow-tooltip
            min-width="13%"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.borrowUserPhone }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="是否归还"
            show-overflow-tooltip
            min-width="13%"
            :formatter="statusChange"
          >
          </el-table-column>

          <el-table-column
            label="借阅时间"
            show-overflow-tooltip
            min-width="18%"
          >
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span>{{ scope.row.gmtCreate }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="归还时间"
            show-overflow-tooltip
            min-width="18%"
            :formatter="timeChange"
          >
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
              >归还处理</el-button>
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
      :modal="false"
      title="提示"
      :visible.sync="delVisible"
      width="300px"
      center
    >
      <div class="del-dialog-cnt">借阅信息删除不可恢复，是否确定删除？</div>
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
      bookBorrowList: [],
      bookBorrowList1: [],
      currentPage: 0,
      total: 40,
      pageSize: 8,
      updatecenterDialogVisible: false,
      addcenterDialogVisible: false,
      datailcenterDialogVisible: false,
      delVisible: false, //删除提示弹框的状态
      batchdelVisible: false,
      delarr: [], //存放删除的数据
      multipleSelection: [],
      value1: '',
      input: '',
      msg: '', //记录每一条的信息，便于取id
      ruleForm1: {
        borrowUserName: '',
        borrowUserNumber: '',
        borrowUserPhone: '',
        borrowBookName: '',
        borrowBookId: ''
      },
      file: ''
    }
  },
  created() {
    this.getbookBorrowAll()
  },
  watch: {
    pageSize: function() {
      this.getbookBorrowAll()
    },
    currentPage: function() {
      this.getbookBorrowAll()
    },
    total: function() {}
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    statusChange: function(row, column) {
      return row.isReturned == 1 ? '已归还' : row.isReturned == 0 ? '未归还' : 'aaa'
    },
    // eslint-disable-next-line no-unused-vars
    timeChange: function(row, column) {
      if (row.isReturned == 1) {
        return row.gmtReturn
      }
      return '未归还'
    },
    // 分页查询所有
    async getbookBorrowAll() {
      this.data = { currentPage: this.currentPage, pageSize: this.pageSize }
      this.url = '/borrow/all'
      this.result = await API.init(this.url, this.data, 'post')
      this.bookBorrowList = this.result.data
      console.log(this.result.data)
      this.bookBorrowList1 = this.result.data
      for (let i = 0; i < this.bookBorrowList.length; i++) {
        this.bookBorrowList[i].gmtCreate = this.formatDate(this.bookBorrowList[i].gmtCreate)
        this.bookBorrowList[i].gmtReturn = this.formatDate(this.bookBorrowList[i].gmtReturn)
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
    async deleteRow() {
      this.data = { field: this.msg.pkBorrowId }
      this.url = '/borrow/id'
      this.result = await API.init(this.url, this.data, 'post')
      if (this.data) {
        this.getbookBorrowAll()
        this.$message.success('删除成功')
      } else {
        this.$message.error('借阅信息删除失败')
      }
      this.delVisible = false //关闭删除提示模态框
    },
    //批量删除
    delAll() {
      this.batchdelVisible = true //显示删除弹框
      const length = this.multipleSelection.length
      for (let i = 0; i < length; i++) {
        this.delarr.push(this.multipleSelection[i].pkBorrowId)
      }
    },
    //操作多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    //批量删除
    async deleteBatch() {
      this.data = { ids: String(this.delarr) }
      this.url = '/book/deletion/batch'
      this.result = await API.init(this.url, this.data, 'post')
      if (this.data) {
        this.getbookBorrowAll()
        this.$message.success('批量删除成功')
      } else {
        this.$message.error('借阅信息批量删除失败')
      }
      this.batchdelVisible = false //关闭删除提示模态框
    },
    //修改借阅信息
    async handleUpdate(index, row) {
      this.idx = index
      this.msg = row
      this.data = {
        pkBorrowId: this.msg.pkBorrowId,
        isReturned: true
      }
      this.url = '/borrow/deletion'
      this.result = await API.init(this.url, this.data, 'post')
      this.getbookBorrowAll()
      this.$message.success('归还成功')
    },
    //新增借阅
    async confirmAdd() {
      this.data = {
        borrowUserName: this.ruleForm1.borrowUserName,
        borrowUserNumber: this.ruleForm1.borrowUserNumber,
        borrowUserPhone: this.ruleForm1.borrowUserPhone,
        borrowBookName: this.ruleForm1.borrowBookName,
        borrowBookId: this.ruleForm1.borrowBookId
      }
      this.url = '/borrow/increase'
      this.result = await API.init(this.url, this.data, 'post')
      this.addcenterDialogVisible = false
      this.getbookBorrowAll()
      this.$message.success('借阅添加成功')
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
      return y + '年' + MM + '月' + d + '日' + h + ':' + m + ':' + s
    },
    //过滤搜索
    filterSearch() {
      // 获取输入框的值
      let search = this.input
      //数组元素按条件过滤
      this.bookBorrowList = this.bookBorrowList1.filter((v) => {
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
