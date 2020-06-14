<template>
  <div class="container">
    <div class="tab-header">
      <el-row class="header-row">
        <el-input class="input" placeholder="请输入内容" v-model="input" clearable @input="filterSearch"></el-input>
        <el-button size="medium" type="success">查询</el-button>
      </el-row>
    </div>
    <div class="table">
      <el-table ref="rewardId" :data="rewardShow" @selection-change="handleSelectionChange">
        <el-table-column prop="pkFleaRewardId" type="selection" width="50"></el-table-column>
        <el-table-column prop="title" label="标题 " width="100%"> </el-table-column>
        <el-table-column prop="description" label="描述 " width="100%"> </el-table-column>
        <el-table-column prop="nickname" label="发布人昵称 " width="150%"> </el-table-column>
        <el-table-column prop="sex" label="性别" width="100%"> </el-table-column>
        <el-table-column prop="username" label="发布人姓名" width="150%"> </el-table-column>
        <el-table-column prop="createTime" label="发布时间" width="150%"> </el-table-column>
        <el-table-column prop="isDeleted" label="删除标志 " width="100%"> </el-table-column>
      </el-table>
    </div>
    <div style="margin-top:2%">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { apiPost } from '../utils/api'
export default {
  name: 'Reword',
  data() {
    return {
      currentPage: 0,
      total: 0, //总记录数
      pageSize: 5,
      rewardShow: [],
      rewardAll: [],
      rewardId: [],
      input: ''
    }
  },
  components: {},
  created() {
    this.getRewardAll()
  },
  mounted() {},
  methods: {
    async getRewardAll() {
      if (this.currentPage - 1 < 0) {
        this.currentPage = 0
      } else {
        this.currentPage--
      }

      let data = {
        //此处需要减一
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      console.log(data)
      let res = await apiPost('/flea/reward/all', data)
      this.rewardAll = res.data
      console.log(this.rewardAll)
      //需要清除一下原显示
      this.rewardShow = []
      this.rewardShow = this.rewardShow.concat(JSON.parse(JSON.stringify(this.rewardAll))) //拷贝数组
      // let len = this.userShow.length
      // this.total = len
      // console.log('len' + len)
      console.log('total' + this.total)
      for (let i = 0; i < this.rewardShow.length; i++) {
        if (!this.rewardShow[i].isDeleted) {
          this.rewardShow[i].isDeleted = '发布中'
        } else {
          this.rewardShow[i].isDeleted = '已删除'
        }
      }
    },
    //过滤搜索
    filterSearch() {
      // 获取输入框的值
      let search = this.input
      //数组元素按条件过滤
      console.log('输入的关键字的为：' + search)
      this.rewardShow = this.rewardAll.filter((v) => {
        // console.log(JSON.stringify(v))
        if (JSON.stringify(v).includes(search)) {
          return v
        }
      })
    },
    handleSelectionChange(val) {
      let ids = []
      for (let i = 0; i < val.length; i++) {
        ids.push(val[i].pkFleaRewardId)
      }
      this.rewardId = ids
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
      this.getRewardAll()
    },
    currentPage: function() {
      console.log('currentPage改变' + this.currentPage)
      this.getRewardAll()
    },
    total: function() {
      console.log('total改变' + this.total)
      this.getRewardAll()
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
}
.tab-header {
  margin: 20px;
  .input {
    width: 400px;
    margin-right: 20px;
    margin-left: -30%;
  }
}
.table {
  padding-left: 18%;
}
</style>
