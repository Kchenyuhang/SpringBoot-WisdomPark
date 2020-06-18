<template>
  <div style="width: 100%">
    <el-row type="flex" class="ml-20 mt-10">
      <el-input prefix-icon="el-icon-search" v-model="blurSearch" placeholder="请输入内容" class="blur-search"></el-input>
      <el-button type="success" size="mini" @click="searchByName()" class="ml-10" icon="el-icon-search">
        <span style="color:white">搜索</span>
      </el-button>
    </el-row>
    <el-row class="df-jr-ac ml-20 mt-10">
      <el-col class="tl">
        <el-button type="primary" icon="el-icon-plus" @click="openDialog" size="mini">
          <span class="light-font-color">新增</span>
        </el-button>
        <el-button type="warning" disabled icon="el-icon-download" size="mini">
          <span class="light-font-color">导出</span>
        </el-button>
      </el-col>
      <el-col class="tr mr-20">
        <el-button icon="el-icon-refresh" size="small"></el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-row>
      <el-col span="1"></el-col>
      <el-col span="23" class="ml-20 mt-10">
        <el-table
          border
          ref="multipleTable"
          :data="subjectlist.slice(start, end)"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" min-width="5%"></el-table-column>
          <el-table-column label="课程名" min-width="20%">
            <template slot-scope="scope">{{ scope.row.subjectName }}</template>
          </el-table-column>
          <el-table-column prop="semesterName" label="学期" min-width="10%"></el-table-column>
          <el-table-column prop="user_name" align="center" label="授课教师" show-overflow-tooltip min-width="15%"> </el-table-column>
          <el-table-column prop="classRoom" align="center" label="上课地点" show-overflow-tooltip min-width="15%"> </el-table-column>
          <el-table-column prop="time" align="center" label="上课时间" show-overflow-tooltip min-width="15%"> </el-table-column>
          <el-table-column prop="" align="center" label="上课班级" show-overflow-tooltip min-width="15%"> </el-table-column>
          <el-table-column prop="week_day" align="center" label="周几" show-overflow-tooltip min-width="15%"> </el-table-column>
          <el-table-column prop="week_duration" align="center" label="上课的周次" show-overflow-tooltip min-width="15%"> </el-table-column>
          <el-table-column prop="gmt_create" align="center" label="创建时间" show-overflow-tooltip min-width="20%"> </el-table-column>
          <el-table-column label="操作" align="center" show-overflow-tooltip min-width="30%">
            <template slot-scope="scope">
              <p class="tc">
                <el-button size="mini" icon="el-icon-edit" type="primary" @click="handleEdit(scope.row)">
                  <span class="light-font-color">编辑</span>
                </el-button>
                <el-button size="mini" type="primary" @click="handleEdit(scope.row)">
                  <span class="light-font-color">学生管理</span>
                </el-button>
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.row)">
                  <span class="light-font-color">删除</span>
                </el-button>
              </p>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 分页 -->
    <el-row class="df-jl-ac mt-10">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20]"
        :page-size="pageSize"
        layout="total, prev, pager, next, sizes"
        :total="subjectlist.length"
        @prev-click="prevPage()"
        @next-click="nextPage()"
      ></el-pagination>
    </el-row>
    <!-- 新增页面 -->
    <div class="dialog" v-if="dialogFormVisible">
      <h2>新增房间信息</h2>
      <el-form class="mt-10 dialog-form dc-jc-ac" :model="course" style="border-radius: 5px;">
        <el-form-item required label="课程名" style="width: 80%">
          <el-input v-model="course.name" autocomplete="off" placeholder="请输入学期名" style="width: 80%"></el-input>
        </el-form-item>
        <el-form-item required label="学期" style="width: 80%">
          <el-select v-model="course.semesterName" class="ml-10" placeholder="请选择学期" @change="getSemester" style="width: 80%">
            <el-option v-for="(item, index) in semesterList" :key="index" :label="item.name" :value="item.pkSemesterId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item required label="教工号" style="width: 80%">
          <el-input v-model="course.jobNumber" placeholder="输入教师工号" style="width: 80%"></el-input>
        </el-form-item>
        <p class="df-jb-ac" style="width: 80%">
          <el-form-item min-width="50%" required label="楼栋">
            <el-select v-model="course.towerId" placeholder="请选择楼栋" class="ml-10" @change="getTowerRooms" style="width: 60%">
              <el-option v-for="(item, index) in towersRooms" :key="index" :label="item.name" :value="item.pk_tower_id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item min-width="50%" label="房间" required class="ml-10">
            <el-select v-model="course.roomId" placeholder="选择教室" @change="getRoomId" style="width: 60%">
              <el-option v-for="(item, index) in rooms" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </p>
        <el-form-item class="tr" style="width: 80%">
          <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="addCourseInfo(tag)" size="mini">确定</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
const API = require('../utils/api')
export default {
  name: 'course',
  data() {
    return {
      subjectlist: [],
      subjectlist1: [],
      detailList: [],
      pageSize: 10,
      pageSize1: 100,
      currentPage: 1,
      currentPage1: 1,
      dialogFormVisible: false,
      start: 0,
      end: 10,
      tag: 1,
      blurSearch: '', //查询
      updatecenterDialogVisible: false,
      addcenterDialogVisible: false,
      datailcenterDialogVisible: false,
      delVisible: false, //删除提示弹框的状态
      gmtTime: '',
      msg: '', //记录每一条的信息，便于取id
      course: {
        name: '',
        semesterName: '',
        jobNumber: '',
        classRoom: '',
        towerId: '',
        roomId: ''
      }, //课程信息
      semestersList: [],
      towersRooms: [],
      childRooms: []
    }
  },
  created() {
    this.getSubjectAll()
    this.getTeachTowers()
    this.getSemesterAll()
  },
  watch: {},
  methods: {
    //获取所有学期信息
    async getSemesterAll() {
      this.semesterList = (await API.init('/semester/all', null, 'post')).data
      for (let i = 0, len = this.semesterList.length; i < len; i++) {
        let time = this.semesterList[i].gmtCreate
        this.semesterList[i].gmtCreate = this.global.formatDate(time)
      }
      console.log(this.semestersList)
    },
    //获取所有教学楼信息
    async getTeachTowers() {
      this.towersRooms = (await API.init('/tower/list/teach', null, 'post')).data
    },
    //获取房间id
    getRoomId(val) {
      this.course.roomId = val
    },
    // 分页查询所有
    async getSubjectAll() {
      this.data = { currentPage: this.currentPage1, pageSize: this.pageSize1 }
      this.url = '/course/list'
      this.result = await API.init(this.url, this.data, 'post')
      this.subjectlist = this.result.data
      for (let i = 0; i < this.subjectlist.length; i++) {
        this.subjectlist[i].gmt_create = this.global.formatDate(this.subjectlist[i].gmt_create)
      }
      this.subjectlist1 = this.subjectlist
    },
    //单行删除
    handleDelete(index, row) {
      this.idx = index
      this.msg = row //每一条数据的记录
      this.delVisible = true
    },
    addCourseInfo(){
      console.log(this.course)
    },
    //批量删除
    handleDeleteMul() {
      this.delVisible = true
    },
    //获取楼栋的所有房间
    getTowerRooms(val) {
      this.course.towerId = val
      let towerRooms = this.towersRooms
      let towerRoom = towerRooms.filter((x) => {
        if (x.pk_tower_id == val) {
          return x
        }
      })
      this.rooms = towerRoom[0].rooms
    },
    getSemester(val) {
      this.course.semesterName = val
    },
    async deleteRow() {
      this.data = { field: this.msg.pkAppVersionId }
      this.url = '/app/deletion'
      this.result = await API.init(this.url, this.data, 'delete')
      if (this.data) {
        this.getSubjectAll()
        this.$message.success('删除成功')
      } else {
        this.$message.error('App版本信息删除失败')
      }
      this.delVisible = false //关闭删除提示模态框
    },
    //编辑
    handleUpdate(index, row) {
      this.idx = index
      this.msg = row //每一条数据的记录
      this.updatecenterDialogVisible = true
    },
    //打开新增面板
    openDialog() {
      this.dialogFormVisible = true
      this.course.name = ''
      this.course.semesterName = ''
      this.course.jobNumber = ''
      this.course.towerId = null
      this.course.roomId = null
    },
    //下一页
    nextPage() {
      this.currentPage += 1
      this.start += this.pageSize
      this.end += this.pageSize
      /* alert(this.start)
      alert(this.end) */
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
      this.pageSize = val
    },
    //选择分页
    handleCurrentChange(val) {
      this.currentPage = val
      this.start = (this.currentPage - 1) * this.pageSize
      this.end = this.currentPage * this.pageSize
    },
    //过滤搜索
    filterSearch() {
      // 获取输入框的值
      let search = this.input
      //数组元素按条件过滤
      this.subjectlist = this.subjectlist1.filter((v) => {
        if (JSON.stringify(v).includes(search)) {
          return v
        }
      })
    }
  }
}
</script>

<style scoped>
.top-input {
  width: 200px;
  height: 30px;
  margin-left: 50px;
}
.blur-search {
  width: 200px;
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
  line-height: 30px;
  height: 30px;
}

>>> .el-input__icon {
  color: #ddd;
}

.el-button--success {
  background-color: #13ce66;
}

.search-btn {
  background-color: #f4f4f5;
}

>>> .el-icon-search {
  color: #f4f4f5;
}

.search-btn:hover {
  background-color: #909399;
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
/* 遮罩层 */
.dialog-form {
  border-radius: 5px;
  background-color: white;
  width: 500px;
  height: 350px;
}

.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
}

.date-input-search {
  width: 260px;
}

>>> .el-range-separator {
  margin-bottom: 10px;
}
</style>
