<template>
  <div style="width: 100%">
    <el-row
      type="flex"
      class="ml-20 mt-10"
    >
      <el-input
        v-model="searchInput"
        placeholder="请输入内容"
        class="blur-search"
        clearable
        @input="filterSearch"
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
          size="small"
          @click="dialogFormVisible = true"
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
          :data="roleList"
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
            prop="roleName"
            label="角色名"
            min-width="20%"
          > </el-table-column>
          <el-table-column
            prop="roleDecoration"
            label="角色简介"
            min-width="20%"
          ></el-table-column>

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
            min-width="45%"
          >
            <template slot-scope="scope">
              <p class="tc">
                <el-button
                  size="mini"
                  icon="el-icon-edit"
                  type="primary"
                  @click="handleEdit(scope.$index, scope.row)"
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
      </el-col>
    </el-row>

    <div
      class="block"
      style="margin-top:2%"
    >
      <el-pagination
        @current-change="handleCurrentChange"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      > </el-pagination>
    </div>
    <!-- 新增角色弹出框 -->
    <el-dialog
      title="新增系统角色"
      :visible.sync="dialogFormVisible"
      width="30%"
      center
    >
      <el-form :model="formRole">
        <el-form-item
          label="角色名称"
          prop="roleName"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="formRole.roleName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="角色简介"
          prop="roleDecoration"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="formRole.roleDecoration"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="confirmAdd"
        >确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改弹出框 -->
    <el-dialog
      title="修改管理员信息"
      :visible.sync="isTrue"
      width="30%"
      left
    >

      <el-form
        :model="updateRole"
        status-icon
        label-width="80px"
      >
        <el-form-item
          label="角色名"
          prop="roleName"
        >
          <el-input
            type="name"
            v-model="updateRole.roleName"
            autocomplete="off"
            placeholder="输入角色名"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="角色简介"
          prop="roleDecoration"
        >
          <el-input
            type="name"
            v-model="updateRole.roleDecoration"
            autocomplete="off"
            placeholder="输入用角色简介"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="删除状态"
          prop="isDeleted"
        >
          <el-radio-group v-model="updateRole.isDeleted">
            <el-radio :label="false">启用</el-radio>
            <el-radio :label="true">删除</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="isTrue = false">取 消</el-button>
        <el-button
          type="primary"
          @click="adminUpdate()"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const API = require('../utils/api')
export default {
  name: 'Permmission',
  data() {
    return {
      time: '',
      currentPage: 0,
      pageSize: 10,
      total: 40,
      roleList: [],
      roleList1: [],
      addcenterDialogVisible: false,
      value: true,
      searchInput: '',
      selectValue: '',
      multipleSelection: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      formRole: {
        roleName: '',
        roleDecoration: ''
      },
      updateRole: {
        pkRoleId: null,
        roleName: null,
        roleDecoration: null,
        isDeleted: false
      },
      formLabelWidth: '120px',
      isTrue: false
    }
  },
  components: {},
  created() {
    this.getAllRole()
  },
  mounted() {},
  watch: {
    pageSize: function() {
      this.getAllRole()
    },
    currentPage: function() {
      this.getAllRole()
    },
    total: function() {}
  },
  methods: {
    async adminUpdate() {
      this.result = await API.init('/role/modification', this.updateRole, 'put')
      console.log(this.result)
      this.getAllRole()
      this.isTrue = false
    },
    // 编辑
    handleEdit(index, row) {
      this.updateRole.pkRoleId = row.pkRoleId
      this.updateRole.roleName = row.roleName
      this.updateRole.roleDecoration = row.roleDecoration
      this.updateRole.isDeleted = row.isDeleted
      this.isTrue = true
    },
    //删除方法
    async handleDelete(row) {
      console.log(row.pkRoleId)
      this.data = {}
      this.result = await API.init('/role/deletion/' + row.pkRoleId, this.data, 'delete')
      this.data1 = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      this.result1 = await API.init('/role/all', this.data1, 'post')
      this.roleList = this.result1.data
      this.roleList1 = this.result1.data
    },
    //搜索
    search() {
      alert(this.selectValue)
    },
    // 当前页展示数据
    handleSizeChange: function(pageSize) {
      this.pageSize = pageSize
    },
    // 当前页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage - 1
      this.getAllRole()
    },
    //获取所有角色信息
    async getAllRole() {
      console.log(this.currentPage)
      this.data = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      this.result = await API.init('/role/all', this.data, 'post')
      this.roleList = this.result.data
      this.roleList1 = this.result.data
      console.log(this.roleList)
      for (let i = 0; i < this.roleList.length; i++) {
        this.roleList[i].gmtCreate = this.formatDate(this.roleList[i].gmtCreate)
      }
    },
    formatDate(value) {
      let date = new Date(value)
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? '0' + MM : MM
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      return y + '年' + MM + '月' + d + '日'
    }, //过滤搜索
    filterSearch() {
      // 获取输入框的值
      let search = this.searchInput
      //数组元素按条件过滤
      console.log('输入的关键字的为：' + search)
      this.roleList = this.roleList1.filter((v) => {
        // console.log(JSON.stringify(v))
        if (JSON.stringify(v).includes(search)) {
          return v
        }
      })
    },
    async confirmAdd() {
      this.data = {
        roleName: this.formRole.roleName,
        roleDecoration: this.formRole.roleDecoration
      }
      this.result = await API.init('/role/increase', this.data, 'post')
      this.getAllRole()
      this.dialogFormVisible = false
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
