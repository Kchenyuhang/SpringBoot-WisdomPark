<template>
  <!-- <div class="container1">
    <div class="operation">
      <el-button type="primary" size="medium" @click="dialogFormVisible = true">新增</el-button>
      <el-button type="warning" size="medium" disabled>修改</el-button>
      <el-button type="danger" size="medium">删除</el-button>
    </div>
    <Table :towerList="towerList"></Table>
    <Form :dialogFormVisible="dialogFormVisible"></Form>
  </div> -->
  <div style="width: 100%">
    <el-row
      type="flex"
      class="ml-20 mt-10"
    >
      <el-input
        v-model="input"
        placeholder="请输入内容"
        class="blur-search"
      ></el-input>
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
      <el-select
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
          @click="openDialog"
          size="mini"
        >
          <span class="light-font-color">新增</span>
        </el-button>
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
        >
          <span class="light-font-color">修改</span>
        </el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
        >
          <span class="light-font-color">删除</span>
        </el-button>
        <el-button
          type="warning"
          icon="el-icon-download"
          disabled
          size="mini"
        >
          <span class="light-font-color">导出</span>
        </el-button>
      </el-col>
      <el-col class="tr mr-20">
        <el-button
          size="mini"
          style="width: 45px"
          class="search-btn"
          @click="searchShow = !searchShow"
          @mouseover="searchOver()"
        >
          <i
            class="el-icon-search"
            style="color: white"
          ></i>
        </el-button>
        <el-button
          icon="el-icon-refresh"
          size="small"
          @click="flush()"
        ></el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <el-col span="1"></el-col>
      <el-col
        span="23"
        class="ml-20 mt-10"
      >
        <el-row>
          <el-table
            ref="multipleTable"
            :data="towerList.slice(start, end)"
            tooltip-effect="dark"
            style="width: 100%;"
            stripe="true"
            class="light-small-font"
            @selection-change="handleSelectionChange"
          >
            <el-table-column
              type="selection"
              min-width="5%"
            ></el-table-column>
            <el-table-column
              label="用户名"
              min-width="10%"
            >
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column
              prop="latitude"
              label="经度"
              min-width="15%"
            ></el-table-column>
            <el-table-column
              prop="longitude"
              label="纬度"
              show-overflow-tooltip
              min-width="15%"
            > </el-table-column>
            <el-table-column
              prop="gmtCreate"
              label="创建时间"
              show-overflow-tooltip
              min-width="15%"
            > </el-table-column>
            <el-table-column
              label="操作"
              align="center"
              show-overflow-tooltip
              min-width="20%"
            >
              <template slot-scope="scope">
                <p class="tc">
                  <el-button
                    size="mini"
                    icon="el-icon-edit"
                    type="primary"
                    @click="handleEdit(scope.row)"
                  >
                    <span class="light-font-color">编辑</span>
                  </el-button>
                  <el-button
                    size="mini"
                    icon="el-icon-delete"
                    type="danger"
                    @click="handleDelete(scope.row)"
                  >
                    <span class="light-font-color">删除</span>
                  </el-button>
                </p>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="df-jl-ac mt-10">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[8]"
            :page-size="100"
            layout="total, prev, pager, next, sizes"
            :total="towerList.length"
            @prev-click="prevPage()"
            @next-click="nextPage()"
          ></el-pagination>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//import global from '@/js/global.js'
export default {
  name: 'Tower',
  data() {
    return {
      towerList: [],
      formShow: false,
      dialogFormVisible: false,
      start: 0,
      end: 8,
      pageSize: 8,
      currentPageSize: 8,
      currentPage: 1
    }
  },
  components: {},
  created() {
    this.getTowerList()
  },
  mounted() {},
  methods: {
    getTowerList() {
      this.axios({
        method: 'post',
        url: 'http://localhost:8081/tower/list'
      }).then((res) => {
        this.towerList = res.data.data
        for (let i = 0, len = this.towerList.length; i < len; i++) {
          this.towerList[i].gmtCreate = this.global.formatDate(this.towerList[i].gmtCreate)
        }
        console.log(res)
      })
    },
    //下一页
    nextPage() {
      this.currentPage += 1
      this.start += this.pageSize
      this.end += this.pageSize
    },
    //上一页
    prevPage() {
      this.currentPage -= 1
      this.start -= this.pageSize
      this.end -= this.pageSize
    },
    //改变页的数据条数
    handleSizeChange(val) {
      this.start = (this.currentPage - 1) * val
      this.end = this.currentPage * val
      this.currentPageSize = val
    },
    //选择分页
    handleCurrentChange(val) {
      this.currentPage = val
      this.start = (this.currentPage - 1) * this.currentPageSize
      this.end = this.currentPage * this.currentPageSize
    }
    // formatDate(value) {
    //   let date = new Date(value)
    //   let y = date.getFullYear()
    //   let MM = date.getMonth() + 1
    //   MM = MM < 10 ? '0' + MM : MM
    //   let d = date.getDate()
    //   d = d < 10 ? '0' + d : d
    //   return y + '-' + MM + '-' + d
    // }
  },
  computed: {}
}
</script>

<style scoped>
.room-container {
  padding: 20px 20px;
}

.demo-ruleForm {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

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

>>> .el-input__icon {
  color: #ddd;
  margin-bottom: 10px;
}

.el-button--success {
  background-color: #13ce66;
}

.search-btn {
  background-color: #f4f4f5;
}

.search-btn:hover {
  background-color: #909399;
}

>>> .el-input__inner {
  height: 30px;
}

>>> .el-icon-edit {
  color: #f7fbff;
}

>>> .el-icon-plus {
  color: #f7fbff;
}

>>> .el-icon-delete {
  color: #f7fbff;
}

>>> .el-icon-download {
  color: #f7fbff;
}

>>> .el-range-separator {
  margin-bottom: 10px;
}

/* >>> .el-icon-search {
  color: #f7fbff;
} */

>>> .el-input__prefix {
  display: flex;
  align-items: center;
}

>>> .el-select__caret {
  margin-top: 5px;
}
</style>
