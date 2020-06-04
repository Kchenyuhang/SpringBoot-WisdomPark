<template>
  <div>
    <div class="cc-df title">
      <el-button
        size="mini"
        type="success"
        @click="handleAdd()"
      >新增</el-button>
      <el-input
        placeholder="请输入内容"
        v-model="searchInput"
        class="search-input cc-mleft"
        clearable
        @input="filterSearch"
      >
      </el-input>
    </div>
    <div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :default-sort="{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          prop="sys_user_name"
          label="姓名"
          sortable
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="role_name"
          label="角色"
          sortable
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="sys_user_phone_number"
          label="手机号"
          sortable
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="is_enabled"
          label="状态"
          sortable
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="gmt_create"
          label="日期"
          sortable
          width="180"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="250"
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
              @click="handleDelete(scope.$index)"
            >删除</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="cleanPassword(scope.$index)"
            >重置</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <!-- 修改弹出框 -->
      <el-dialog
        title="修改管理员信息"
        :visible.sync="isTrue"
        width="30%"
        left
      >
        <div
          class="cc-df cc-mltop"
          id="fileBox"
          v-if="updatecenterDialogVisible"
        >
          <img
            class="avatar"
            :src="ruleForm.sysUserAvatar"
            @click="avatarClick()"
          />
          <input
            type="file"
            @change="uploadAvatar($event)"
            ref="file"
            style="display: none;"
            id="file"
          />
        </div>
        <el-form
          :model="ruleForm"
          status-icon
          label-width="80px"
        >
          <el-form-item
            label="用户名"
            prop="sysUserName"
          >
            <el-input
              type="name"
              v-model="ruleForm.sysUserName"
              autocomplete="off"
              placeholder="输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="手机号"
            prop="sysUserPhoneNumber"
          >
            <el-input
              type="name"
              v-model="ruleForm.sysUserPhoneNumber"
              autocomplete="off"
              placeholder="输入用手机号"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="角色信息"
            prop="roleId"
          >
            <el-select
              v-model="ruleForm.roleId"
              placeholder="请选择角色信息"
            >
              <div
                v-for="(item,index) in roles"
                :key="index"
              >
                <el-option
                  :label="item.roleDecoration"
                  :value="item.pkRoleId"
                ></el-option>
              </div>
            </el-select>
          </el-form-item>
          <el-form-item
            label="状态"
            prop="isEnabled"
            v-if="updatecenterDialogVisible"
          >
            <el-radio-group v-model="ruleForm.isEnabled">
              <el-radio label="启用"></el-radio>
              <el-radio label="禁用"></el-radio>
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
            v-if="updatecenterDialogVisible"
          >确 定</el-button>
          <el-button
            type="primary"
            @click="adminAdd()"
            v-if="addVisble"
          >确 定</el-button>
        </span>

      </el-dialog>
    </div>
  </div>

</template>

<script>
const API = require('../utils/api')
export default {
  data() {
    return {
      tableData: [],
      tableData1: [],
      searchInput: '',
      isShow: true,
      isTrue: false,
      updatecenterDialogVisible: false,
      addVisble: false,
      idx: '',
      msg: '',
      ruleForm: {
        sysUserName: null,
        sysPassword: null,
        sysUserPhoneNumber: null,
        sysUserAvatar: null,
        isEnabled: null,
        roleId: null,
        pkUserId: null
      },
      roles: []
    }
  },
  methods: {
    uploadAvatar(event) {
      const OSS = require('ali-oss')
      let client = new OSS({
        region: 'oss-cn-beijing',
        accessKeyId: 'LTAI4FuNH3cQirWwhynvdCxv',
        accessKeySecret: 'TmUIP6EkFBi5c9Mrq5kysWMRsNe7x6',
        bucket: 'niit-cmj'
      })
      let timestamp = Date.parse(new Date())
      let imgUrl = 'img/' + timestamp
      var file = event.target.files[0] //获取文件流
      var _this = this
      client.multipartUpload(imgUrl, file).then(function(result) {
        _this.avatar = result.res.requestUrls[0]
        console.log(_this.avatar)
        _this.updateAdminInfo(_this.avatar)
      })
    },
    updateAdminInfo(url) {
      this.imgDataUrl = url
      this.ruleForm.sysUserAvatar = this.imgDataUrl
    },
    avatarClick() {
      this.$refs.file.click()
    },
    async cleanPassword(index) {
      this.result = await API.init('/sysUser/reset/' + this.tableData[index].sys_user_id, null, 'put')
      console.log(this.result)
    },
    async adminUpdate() {
      if (this.ruleForm.isEnabled == '启用') {
        this.ruleForm.isEnabled = true
      } else {
        this.ruleForm.isEnabled = false
      }
      console.log(this.ruleForm)
      this.result = await API.init('/admin/modification', this.ruleForm, 'put')

      this.selectGuanli()
      console.log(this.result)
      this.updatecenterDialogVisible = false
      this.addVisble = false
      this.isTrue = false
    },
    handleUpdate(index, row) {
      this.idx = index
      this.msg = row //每一条数据的记录
      this.ruleForm.sysUserName = row.sys_user_name
      this.ruleForm.sysUserPhoneNumber = row.sys_user_phone_number
      this.ruleForm.sysUserAvatar = row.sys_user_avatar
      this.ruleForm.isEnabled = row.is_enabled
      this.ruleForm.roleId = row.role_id
      this.ruleForm.pkUserId = this.tableData[index].sys_user_id
      this.addVisble = false
      this.isTrue = true
      this.updatecenterDialogVisible = true
    },
    handleAdd() {
      this.ruleForm.sysUserName = null
      this.ruleForm.sysUserPhoneNumber = null
      this.ruleForm.roleId = null
      this.updatecenterDialogVisible = false
      this.isTrue = true
      this.addVisble = true
      this.ruleForm.sysPassword = 123456
    },
    async adminAdd() {
      this.data = {
        sysUserName: this.ruleForm.sysUserName,
        sysPassword: this.ruleForm.sysPassword,
        sysUserPhoneNumber: this.ruleForm.sysUserPhoneNumber,
        roleId: this.ruleForm.roleId
      }
      this.result = await API.init('/admin/increase', this.data, 'post')
      console.log(this.result)
      this.selectGuanli()
      this.isTrue = false
      this.addVisble = false
    },
    async handleDelete(index) {
      console.log(index)
      this.data = {}
      this.result = await API.init('/admin/deletion/' + this.tableData[index].sys_user_id, this.data, 'delete')
      this.result = await API.init('/admin/all', this.data, 'get')
      this.tableData = this.result.data
    },
    async selectGuanli() {
      this.data = {}
      this.url = '/admin/all'
      this.result = await API.init(this.url, this.data, 'get')
      console.log(this.result)
      this.tableData = this.result.data
      this.tableData1 = this.result.data
      for (let i = 0; i < this.tableData.length; i++) {
        this.tableData[i].gmt_create = this.formatDate(this.tableData[i].gmt_create)
        if (this.tableData[i].is_enabled) {
          this.tableData[i].is_enabled = '启用'
        } else {
          this.tableData[i].is_enabled = '禁用'
        }
      }
    },
    formatDate(value) {
      let date = new Date(value)
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? '0' + MM : MM
      let d = date.getDate()
      d = d < 10 ? '0' + d : d
      // let h = date.getHours();
      // h = h < 10 ? ('0' + h) : h;
      // let m = date.getMinutes();
      // m = m < 10 ? ('0' + m) : m;
      // let s = date.getSeconds();
      // s = s < 10 ? ('0' + s) : s;
      return y + '年' + MM + '月' + d + '日'
    },
    async selectRole() {
      this.result = await API.init('/role/all', this.data, 'get')
      console.log(this.result)
      this.roles = this.result.data
    },
    //过滤搜索
    filterSearch() {
      // 获取输入框的值
      let search = this.searchInput
      //数组元素按条件过滤
      console.log('输入的关键字的为：' + search)
      this.tableData = this.tableData1.filter((v) => {
        // console.log(JSON.stringify(v))
        if (JSON.stringify(v).includes(search)) {
          return v
        }
      })
    }
  },
  created() {
    this.selectRole()
    this.selectGuanli()
  }
}
</script>
<style lang="scss" scope>
.search-input {
  width: 150px;
}
.title {
  padding-left: 30px;
  padding-right: 30px;
}
.avatar {
  width: 100px;
  margin-top: -60px;
  margin-left: 35%;
  margin-bottom: 30px;
}
</style>