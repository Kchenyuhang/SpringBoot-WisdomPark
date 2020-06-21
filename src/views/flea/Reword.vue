<template>
  <div class="container">
    <div class="tab-header">
      <el-row class="header-row">
        <el-input class="input" placeholder="请输入内容" v-model="input" clearable @input="filterSearch"></el-input>
      </el-row>
      <br />
      <el-col class="tl">
        <el-button type="danger" icon="el-icon-delete" size="small" round @click="batchDelete">批量下架</el-button>
      </el-col>
    </div>
    <div class="table">
      <el-table ref="RewardId" :data="rewardShow" @selection-change="handleSelectionChange">
        <el-table-column prop="pkFleaRewardId" type="selection" width="50%"></el-table-column>
        <el-table-column prop="title" label="标题 " width="200%" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="description" label="描述 " width="200%" show-overflow-tooltip>
          <template slot-scope="scope">
            <!-- <i class="el-icon-time"></i> -->
            <span>{{ rewardShow[scope.$index].description }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="发布人昵称 " width="130%"> </el-table-column>
        <el-table-column prop="sex" label="性别" width="130%"> </el-table-column>
        <el-table-column prop="username" label="发布人姓名" width="150%"> </el-table-column>
        <el-table-column prop="createTime" label="发布时间" width="170%" sortable show-overflow-tooltip>
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{ rewardShow[scope.$index].createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100%">
          <template slot-scope="scope">
            <p v-if="rewardShow[scope.$index].isDeleted == 0" style="color: blue">已发布</p>
            <p v-if="rewardShow[scope.$index].isDeleted == 1" style="color: red">已下架</p>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150%">
          <template slot-scope="scope">
            <el-button icon="el-icon-delete" @click="deleteOne(scope.$index, scope.row)" type="danger" size="small" round>
              下架
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="margin-top:2%">
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
      currentPage: 1,
      total: 0, //总记录数
      pageSize: 5,
      delVisible: false, //删除提示弹框的状态
      multipleSelection: [], //多选的数据
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
      let data = {
        //此处需要减一
        currentPage: this.currentPage - 1,
        pageSize: this.pageSize
      }
      console.log(data)
      let res = await apiPost('/flea/reward/all', data)
      this.rewardAll = res.data.content
      this.total = res.data.totalElements
      console.log(this.rewardAll)
      //需要清除一下原显示
      this.rewardShow = []
      this.rewardShow = this.rewardShow.concat(JSON.parse(JSON.stringify(this.rewardAll))) //拷贝数组
      // let len = this.userShow.length
      // this.total = len
      // console.log('len' + len)
      console.log('total' + this.total)
      for (let i = 0; i < this.rewardShow.length; i++) {
        this.rewardShow[i].createTime = this.formatDate(this.rewardShow[i].createTime)
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
    //当前页展示数据
    handleSizeChange: function(pageSize) {
      this.pageSize = pageSize
    },
    //当前页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    },
    //单行删除
    handleDelete(index, row) {
      this.index = index
      // this.msg = row //每一条数据的记录
      this.rewardId.push(row.pkFleaRewardId) //把单行删除的每条数据的id添加进放删除数据的数组
      this.delVisible = true
    },
    //批量删除
    delAll() {
      this.delVisible = true //显示删除弹框
    },
    //多选信息
    handleSelectionChange(val) {
      let ids = []
      for (let i = 0; i < val.length; i++) {
        ids.push(val[i].pkFleaRewardId)
      }
      this.rewardId = ids
    },
    //确定单行删除
    async deleteOne() {
      let data = {
        fleaRewardId: this.rewardId
      }
      console.log(data)
      // console.log(data.fleaRewardId.get[0])
      let data1 = {
        fleaRewardId: data.fleaRewardId[0]
      }
      alert('要下架的悬赏id：' + data1.fleaRewardId)
      await apiPost('flea/reward/deleteOne', data1)
      this.getRewardAll()
    },
    //确定批量删除
    async batchDelete() {
      let data = {
        id: this.rewardId
      }
      console.log(data)
      await apiPost('flea/reward/batchDelete', data)
      this.getRewardAll()
    }
  },
  computed: {},
  watch: {
    pageSize: function() {
      this.getRewardAll()
    },
    currentPage: function() {
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
    margin-right: 69%;
  }
}
.table {
  padding-left: 10px;
}
.del {
  background-color: red;
  color: white;
}
</style>
