<template>
  <div style="width: 100%">
    <el-row
      type="flex"
      class="ml-20 mt-10"
    >
      <el-input
        size="mini"
        v-model="input"
        placeholder="请输入内容"
        class="blur-search"
        @input="filterSearch()"
      ></el-input>

      <el-date-picker
        size="mini"
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
    <!-- 表格 -->
    <el-row>
      <el-col span="1"></el-col>
      <el-col
        span="23"
        class="ml-20 mt-10"
      >
        <el-table
          ref="multipleTable"
          :data="userAccountList"
          tooltip-effect="dark"
          style="width: 100%;"
          stripe="true"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            min-width="5%"
          ></el-table-column>
          <el-table-column
            label="账号"
            min-width="10%"
          >
            <template slot-scope="scope">{{ scope.row.userAccount }}</template>
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="昵称"
            min-width="15%"
          ></el-table-column>
          <el-table-column
            prop="role"
            label="角色"
            min-width="15%"
          ></el-table-column>
          <el-table-column
            prop="phoneNumber"
            label="手机号"
            show-overflow-tooltip
            min-width="15%"
          > </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            show-overflow-tooltip
            min-width="15%"
          >
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.status"
                active-color="#13ce66"
                :disabled="scope.row.status == 0"
                inactive-color="#ff4949"
                @change="changeSwitchA($event, scope.row, scope.$index)"
              >
                >
              </el-switch>
            </template>
          </el-table-column>
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
                >编辑</el-button>
                <el-button
                  size="mini"
                  icon="el-icon-delete"
                  type="danger"
                  @click="handleDelete(scope.row)"
                >删除</el-button>
              </p>
            </template>
          </el-table-column>
        </el-table>
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
const API = require('../utils/api.js')
export default {
  name: 'Permmission',
  data() {
    return {
      time: '',
      value: true,
      userAccountList: [],
      userAccountList1: [],
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
      currentPage: 1,
      total: 38,
      pageSize: 8,
      input: ''
    }
  },
  components: {},
  created() {
    this.getuserAccount()
  },
  mounted() {},
  watch: {
    pageSize: function() {
      this.getuserAccount()
    },
    currentPage: function() {
      this.getuserAccount()
    },
    total: function() {}
  },
  methods: {
    //删除信息
    async handleDelete(item) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          field1: item.pk_user_account_id
        }
        let res = API.init('/userAccount/deletion', data, 'post')
        if (res.data.code == 1) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          let index = this.userAccountList.indexOf(item)
          this.userAccountList.splice(index, 1)
        }
      })
      // })
    },
    // 编辑
    handleEdit(row) {
      console.log(row)
    },
    //搜索
    search() {
      alert(this.selectValue)
    },
    async getuserAccount() {
      this.data = { currentPage: this.currentPage, pageSize: this.pageSize }
      this.url = '/userAccount/all'
      this.result = await API.init(this.url, this.data, 'post')
      this.userAccountList = this.result.data
      this.userAccountList1 = this.result.data
      for (let i = 0; i < this.userAccountList.length; i++) {
        this.userAccountList[i].gmtCreate = this.formatDate(this.userAccountList[i].gmtCreate)
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
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s
    },
    //过滤搜索
    filterSearch() {
      // 获取输入框的值
      let search = this.input
      //数组元素按条件过滤
      this.cardList = this.userAccountList1.filter((v) => {
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

.el-input__inner {
  height: 30px;
}
</style>
