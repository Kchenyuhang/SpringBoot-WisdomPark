<template>
  <div>
    <!-- 操作按钮 -->
    <el-row class="df-jr-ac ml-20 mt-10">
      <el-col class="tl">
        <el-button type="primary" icon="el-icon-plus" @click="openDialog" size="mini">
          <span class="light-font-color">新增</span>
        </el-button>
        <el-button type="warning" icon="el-icon-download" disabled size="mini">
          <span class="light-font-color">导出</span>
        </el-button>
      </el-col>
      <el-col class="tr mr-20">
        <el-button size="mini" style="width: 45px" class="search-btn" @click="searchShow = !searchShow" @mouseover="searchOver()">
          <i class="el-icon-search" style="color: white"></i>
        </el-button>
        <el-button icon="el-icon-refresh" size="small" @click="flush()"></el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <el-col span="1"></el-col>
      <el-col span="23" class="ml-20 mt-10">
        <el-table :data="items.slice(start, end)" stripe="true" style="width: 100%;">
          <el-table-column type="selection" min-width="10%" @selection-change="handleSelectionChange"> </el-table-column>
          <el-table-column label="公司名称" show-overflow-tooltip min-width="13%">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="公司logo" show-overflow-tooltip min-width="12%">
            <template slot-scope="scope">
              <el-popover placement="right" trigger="hover">
                <img :src="scope.row.logo" />
                <img slot="reference" :src="scope.row.logo" style="max-height: 50px;max-width: 50px" />
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="类型" show-overflow-tooltip min-width="12%">
            <template slot-scope="scope">
              <span>{{ scope.row.type }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="gmtCreate" label="创建时间" min-width="15%" show-overflow-tooltip> </el-table-column>

          <el-table-column label="操作" show-overflow-tooltip min-width="23%">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>

    <el-row class="df-jl-ac mt-20 ml-20">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5, 8]"
        :page-size="3"
        layout="total, sizes, prev, pager, next, jumper"
        :total="items.length"
        @prev-click="prevPage()"
        @next-click="nextPage()"
      >
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
const API = require('../utils/api')
export default {
  name: 'Company',
  data() {
    return {
      items: [],
      currentPage: 1,
      currentPageSize: 3,
      pageSize: 20,
      start: 0,
      end: 3
    }
  },
  components: {},
  created() {
    this.getCompany()
  },
  mounted() {},
  methods: {
    //分页查询
    async getCompany() {
      this.data = { currentPage: this.currentPage, pageSize: this.pageSize }
      this.url = '/company/list'
      this.result = await API.init(this.url, this.data, 'post')
      this.items = this.result.data
      console.log(this.items.length)
      for (let i = 0, len = this.items.length; i < len; i++) {
        this.items[i].gmtCreate = this.global.formatDate(this.items[i].gmtCreate)
      }
    },
    //下一页
    nextPage() {
      this.currentPage += 1
      this.start += this.pageSize1
      this.end += this.pageSize1
      let num = this.appList.length / this.currentPageSize - 1
      if (this.currentPage === num) {
        this.currentPage1 += 1
        this.getAppAll()
      }
      /* alert(this.start)
      alert(this.end) */
    },
    //改变每页的数据条数
    handleSizeChange(val) {
      this.start = (this.currentPage - 1) * val
      this.end = this.currentPage * val
      this.currentPageSize = val
    },
    //选择页数
    handleCurrentChange(val) {
      this.currentPage = val
      this.start = (this.currentPage - 1) * this.currentPageSize
      this.end = this.currentPage * this.currentPageSize
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss"></style>
