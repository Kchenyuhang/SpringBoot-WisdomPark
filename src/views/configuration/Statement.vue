<template>
  <div style="width: 100%">
    <el-row type="flex" class="ml-20 mt-10">
      <el-input v-model="input" placeholder="请输入内容" class="blur-search"></el-input>
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator=":"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        class="date-input-search ml-10"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
      <el-select v-model="selectValue" placeholder="请选择" class="statu-search ml-10">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
      <el-button type="success" size="mini" @click="search()" class="ml-10" icon="el-icon-search">搜索</el-button>
    </el-row>
    <el-row class="df-jr-ac ml-20 mt-10">
      <el-col class="tl">
        <el-button type="primary" icon="el-icon-plus" size="small"><span>新增</span></el-button>
        <el-button type="success" icon="el-icon-edit" size="small">修改</el-button>
        <el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>
        <el-button type="warning" icon="el-icon-download" size="small">导出</el-button>
      </el-col>
      <el-col class="tr mr-20">
        <el-button icon="el-icon-refresh" size="small"></el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <el-col span="1"></el-col>
      <el-col span="23" class="ml-20 mt-10">
        <el-table :data="statementList" tooltip-effect="dark" style="width: 100%;" stripe="true" @selection-change="handleSelectionChange">
          <el-table-column type="selection" min-width="5%"></el-table-column>
          <el-table-column label="声明标题" min-width="10%">
            <template slot-scope="scope">{{ scope.row.statementTitle }}</template>
          </el-table-column>
          <el-table-column prop="statementContent" label="声明内容" min-width="15%"></el-table-column>
          <el-table-column prop="statementType" label="声明分类" show-overflow-tooltip min-width="15%"> </el-table-column>
          <el-table-column prop="gmtCreate" label="创建时间" show-overflow-tooltip min-width="15%"> </el-table-column>
          <el-table-column label="操作" align="center" show-overflow-tooltip min-width="20%">
            <template slot-scope="scope">
              <p class="tc">
                <el-button size="mini" icon="el-icon-edit" type="primary" @click="handleEdit(scope.$index.scope.row)">编辑</el-button>
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </p>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">声明信息删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
    <div class="block">
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
  name: 'Permmission',
  data() {
    return {
      statementList: [],
      statementList1: [],
      delVisible: false, //删除提示弹框的状态
      time: '',
      currentPage: 0,
      total: 40,
      pageSize: 8,
      value: true,
      options: [
        {
          value: '0',
          label: '禁用'
        },
        {
          value: '1',
          label: '正常'
        }
      ],
      selectValue: '',
      multipleSelection: [],
      input: ''
    }
  },
  components: {},
  created() {
    this.getStatementAll()
  },
  watch: {
    pageSize: function() {
      this.getStatementAll()
    },
    currentPage: function() {
      this.getStatementAll()
    },
    total: function() {}
  },
  mounted() {},
  methods: {
    // 分页查询所有
    async getStatementAll() {
      this.data = { currentPage: this.currentPage, pageSize: this.pageSize }
      this.url = '/statement/all'
      this.result = await API.init(this.url, this.data, 'post')
      this.statementList = this.result.data
      console.log(this.statementList.length)
      this.statementList1 = this.result.data
      for (let i = 0; i < this.statementList.length; i++) {
        this.statementList[i].gmtCreate = this.formatDate(this.statementList[i].gmtCreate)
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
    handleDeleteMul() {
      this.delVisible = true
    },
    async deleteRow() {
      this.data = { field: this.msg.pkStatementId }
      this.url = '/statement/deletion'
      this.result = await API.init(this.url, this.data, 'delete')
      if (this.data) {
        this.getStatementAll()
        this.$message.success('删除成功')
      } else {
        this.$message.error('声明信息删除失败')
      }
      this.delVisible = false //关闭删除提示模态框
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
      this.statementList = this.statementList1.filter((v) => {
        if (JSON.stringify(v).includes(search)) {
          return v
        }
      })
    }
  },
  computed: {}
}
</script>

<style scoped>
.blur-search {
  width: 200px;
}

.date-input-search {
  width: 260px;
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

>>> .el-input__inner {
  height: 30px;
}
</style>
