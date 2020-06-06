<template>
  <div class="container">
    <div class="tab-header">
      <el-row class="header-row">
        <el-input class="input" placeholder="请输入内容" v-model="input" clearable @input="filterSearch"> </el-input>
        <el-button size="medium" type="success" @click="searchByTime">根据时间查询</el-button>
        <el-button size="medium" type="primary">书籍，是人类进步的阶梯</el-button>
        <!-- <el-button size="medium" type="danger">批量删除</el-button> -->
      </el-row>
    </div>
    <div>
      <el-form :model="timeForm" :rules="rules" ref="timeForm" label-width="150px" class="timeForm">
        <el-form-item label="查询时间范围" required>
          <el-col :span="3">
            <el-form-item prop="timeForm">
              <el-date-picker type="date" placeholder="起始日期" v-model="timeForm.startTime" style="width: 90%;">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item prop="timeForm">
              <el-date-picker type="date" placeholder="截止日期" v-model="timeForm.endTime" style="width: 90%;">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-form>
    </div>
    <el-table ref="bookId" :data="borrowShow" @selection-change="handleSelectionChange" class="borrowTable">
      <!-- <el-table-column prop="pkBorrowId" label="记录ID" width="100"> </el-table-column> -->
      <!-- <el-table-column prop="borrowBookId" label="图书ID" width="100"> </el-table-column> -->
      <el-table-column prop="borrowBookName" label="书名" width="200"> </el-table-column>
      <el-table-column prop="borrowUserName" label="借阅人" width="100"> </el-table-column>
      <el-table-column prop="borrowUserPhone" label="联系方式" width="150"> </el-table-column>
      <el-table-column prop="isReturned" label="是否归还" width="100"> </el-table-column>
      <el-table-column prop="isDeleted" label="删除标志" width="100"> </el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间" width="130"> </el-table-column>
      <el-table-column prop="gmtModified" label="修改时间" width="130"> </el-table-column>
      <!-- <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <div style="margin-top:2%">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[5,7,10,15,20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
const API = require('../utils/api.js')

export default {
  name: 'Borrow',
  data() {
    return {
      input: '', //搜索
      borrowShow: [], //显示数据
      borrows: [], //源数据
      currentPage: 1, //当前页
      total: 40, //总记录数
      pageSize: 7, //页的大小
      timeForm: {
        startTime: '',
        endTime: ''
      },
      rules: {
        startTime: [{ type: 'date', required: true, message: '请选择起始日期', trigger: 'change' }],
        endTime: [{ type: 'date', required: true, message: '请选择截止日期', trigger: 'change' }]
      }
    }
  },
  components: {},
  created() {
    this.getAllBorrow()
  },
  mounted() {},
  methods: {
    async getAllBorrow() {
      let data = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      let res = await API.init('/book/record/all', data, 'post')
      this.borrows = res.data.content
      this.borrowShow = this.borrows
      console.log(this.formatDate(this.borrows[0].gmtCreate))
      for (let i = 0; i < this.borrowShow.length; i++) {
        this.borrowShow[i].gmtCreate = this.formatDate(this.borrows[i].gmtCreate)
        this.borrowShow[i].gmtModified = this.formatDate(this.borrows[i].gmtModified)
        if (this.borrowShow[i].isDeleted) {
          this.borrowShow[i].isDeleted = '禁用'
        } else {
          this.borrowShow[i].isDeleted = '启用'
        }
        if (this.borrowShow[i].isReturned) {
          this.borrowShow[i].isReturned = '已归还'
        } else {
          this.borrowShow[i].isReturned = '未归还'
        }
      }
    },
    async searchByTime() {
      let startTime = this.GMTToStr(this.timeForm.startTime)
      let endTime = this.GMTToStr(this.timeForm.endTime)
      let data = {
        startTime: startTime,
        endTime: endTime,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      let res = await API.init('/book/record/time', data, 'post')
      this.borrowShow = res.data.content
    },
    GMTToStr(time) {
      let date = new Date(time)
      let Str = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' 00:00:00'
      return Str
    },
    //过滤搜索
    filterSearch() {
      // 获取输入框的值
      let search = this.input
      //数组元素按条件过滤
      console.log('输入的关键字的为：' + search)
      this.borrowShow = this.borrows.filter((v) => {
        if (JSON.stringify(v).includes(search)) {
          return v
        }
      })
    },
    formatDate(value) {
      let date = new Date(value)
      let y = date.getFullYear()
      let MM = date.getMonth() + 1 //月份从0开始
      MM = MM < 10 ? '0' + MM : MM
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      return y + '年' + MM + '月' + d + '日'
    },
    //当前页展示数据
    handleSizeChange: function(pageSize) {
      this.pageSize = pageSize
    },
    //当前页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    }
  },
  computed: {},
  watch: {
    pageSize: function() {
      console.log('pageSize改变' + this.pageSize)
      this.getAllBorrow()
    },
    currentPage: function() {
      console.log('currentPage改变' + this.currentPage)
      this.getAllBorrow()
    },
    total: function() {}
  }
}
</script>

<style scoped lang="scss">
.container {
  padding-left: 30px;
  display: flex;
  flex-direction: column;
}
.header-row {
  margin: 20px;
  margin-left: 50px;
  .input {
    width: 400px;
    margin-right: 10px;
    margin-left: -550px;
  }
}
.timeForm {
  margin-left: -2%;
}
.borrowTable {
  padding-left: 20%;
}
</style>
