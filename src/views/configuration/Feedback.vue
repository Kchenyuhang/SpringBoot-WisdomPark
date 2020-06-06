<template>
  <div>
    <div class="cc-df-between title">
      <div></div>
      <el-input
        placeholder="请输入内容"
        v-model="searchInput"
        class="search-input"
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
          prop="title"
          label="反馈标题"
          sortable
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="content"
          label="反馈内容"
          sortable
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="contactWay"
          label="联系方式"
          sortable
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="isHandled"
          label="状态"
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
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <!-- 修改弹出框 -->
      <el-dialog
        title="意见反馈处理"
        :visible.sync="isTrue"
        width="40%"
        left
      >
        <div class="cc-shadow cc-ptop cc-pbottom">
          <div>
            <img
              class="avatar"
              src="https://zhxy-vue.oss-cn-hangzhou.aliyuncs.com/icon/1.jpg"
            />
          </div>
          <div>
            <h2>{{feedBack.title}}</h2>
          </div>
          <div class="address">

            <p>我是发牢骚灯红酒绿偶数时间了撒精灵盛典开房间老师的看看交老师的</p>

          </div>
          <el-radio-group v-model="feedBack.isHandled">
            <el-radio label="已处理"></el-radio>
            <el-radio label="未处理"></el-radio>
          </el-radio-group>
        </div>

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
      page: 0,
      updatecenterDialogVisible: false,
      addVisble: false,
      idx: '',
      msg: '',
      feedBack: {
        pkFeedbackId: null,
        title: null,
        content: null,
        contactWay: null,
        isHandled: null,
        isDeleted: null
      },
      roles: []
    }
  },
  methods: {
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
    },
    handleUpdate(index, row) {
      this.idx = index
      this.msg = row //每一条数据的记录
      this.feedBack = row
      console.log(this.feedBack)
      this.addVisble = false
      this.isTrue = true
      this.updatecenterDialogVisible = true
    },
    async selectGuanli() {
      this.data = {
        currentPage: this.page,
        pageSize: 5
      }
      this.url = '/feedback/all'
      this.result = await API.init(this.url, this.data, 'post')
      console.log(this.result)
      this.tableData = this.result.data
      this.tableData1 = this.result.data
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].isHandled) {
          this.tableData[i].isHandled = '已处理'
        } else {
          this.tableData[i].isHandled = '未处理'
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
}
.address {
  width: 50%;
  margin-left: 30%;
  text-align: left;
}
</style>