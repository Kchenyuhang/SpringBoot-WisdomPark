<template>
  <div class="room-container" style="width: 100%">
    <el-row type="flex" style="width: 100%">
      <el-col span="4" class="tl">
        <el-input prefix-icon="el-icon-search" v-model="input" placeholder="请输入内容" class="blur-search mt-10"></el-input>
        <el-tree :data="towers" :props="defaultProps" @node-click="handleNodeClick" class="mt-20"></el-tree>
      </el-col>
      <el-col span="20">
        <!-- 操作按钮 -->
        <el-row type="flex" class="ml-20 mt-10">
          <el-input v-model="input" prefix-icon="el-icon-search" placeholder="请输入内容" class="blur-search" v-if="searchShow"></el-input>
          <el-date-picker
            v-model="time"
            type="daterange"
            range-separator=":"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            class="date-input-search ml-10"
            value-format="yyyy-MM-dd"
            v-if="searchShow"
          ></el-date-picker>
          <el-select v-model="selectValue" placeholder="请选择" v-if="searchShow" class="statu-search ml-10">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-button v-if="searchShow" type="success" size="mini" @click="search()" class="ml-10 bg-green" icon="">
            <i class="el-icon-search" style="color: rgb(247, 251, 255)"></i>
            <span class="light-font-color">搜索</span>
          </el-button>
        </el-row>
        <el-row class="df-jr-ac ml-20 mt-10">
          <el-col class="tl">
            <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true" size="mini">
              <span class="light-font-color">新增</span>
            </el-button>
            <el-button type="success" icon="el-icon-edit" size="mini">
              <span class="light-font-color">修改</span>
            </el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">
              <span class="light-font-color">删除</span>
            </el-button>
            <el-button type="warning" icon="el-icon-download" size="mini">
              <span class="light-font-color">导出</span>
            </el-button>
          </el-col>
          <el-col class="tr mr-20">
            <el-button size="small" class="search-btn" @click="searchShow = !searchShow" @mouseover="searchOver()">
              <i class="el-icon-search" style="color: white"></i>
            </el-button>
            <el-button icon="el-icon-refresh" size="small" @click="flush()"></el-button>
          </el-col>
        </el-row>
        <!-- 表格 -->
        <el-row>
          <el-table
            ref="multipleTable"
            :data="rooms.slice(start, end)"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" min-width="5%"></el-table-column>
            <el-table-column label="楼栋" min-width="10%">
              <template slot-scope="scope">{{ scope.row.towerName }}</template>
            </el-table-column>
            <el-table-column label="单元" min-width="15%">
              <template slot-scope="scope">{{ scope.row.unitId }}</template>
            </el-table-column>
            <el-table-column label="房间号" min-width="15%">
              <template slot-scope="scope">{{ scope.row.roomName }}</template>
            </el-table-column>
            <el-table-column label="电费余额" min-width="20%">
              <template slot-scope="scope">{{ scope.row.electricityBalance }}</template>
            </el-table-column>
            <el-table-column label="创建时间" show-overflow-tooltip min-width="10%">
              <template slot-scope="scope">{{ scope.row.gmtGreate }}</template>
            </el-table-column>
            <el-table-column label="操作" align="center" min-width="25%">
              <template slot-scope="scope">
                <p style="text-align:center">
                  <el-button size="mini" icon="el-icon-edit" type="primary" @click="updateRoomInfo(scope.row)">
                    <span class="light-font-color">编辑</span>
                  </el-button>
                  <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.row)">
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
            :page-sizes="[10, 20]"
            :page-size="100"
            layout="total, prev, pager, next, sizes"
            :total="rooms.length"
            @prev-click="prevPage()"
            @next-click="nextPage()"
          ></el-pagination>
        </el-row>
        <!-- 新增页面 -->
        <el-dialog :visible.sync="dialogFormVisible" width="400px" center="true">
          <h2>新增房间信息</h2>
          <el-form class="mt-10" :model="room" style="border-radius: 5px">
            <el-form-item label="楼栋" required :label-width="formLabelWidth">
              <el-select v-model="room.towerName" placeholder="请选择楼栋">
                <el-option label="雪松苑" value="shanghai"></el-option>
                <el-option label="求真楼" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item required label="单元" :label-width="formLabelWidth">
              <el-select v-model="room.towerName" placeholder="请选择活动区域">
                <el-option label="A4" value="shanghai"></el-option>
                <el-option label="A5" value="beijing"></el-option>
              </el-select>
              <span style="color: red" class="ml-10">* 仅限宿舍</span>
            </el-form-item>
            <el-form-item required label="房间" :label-width="formLabelWidth">
              <el-input v-model="room.name" autocomplete="off" placeholder="请输入房间号" style="width: 40%"></el-input>
            </el-form-item>
          </el-form>
          <!-- <p class="df-jl-ac">
          <span class="mr-10">房间 </span>
          <el-input v-model="room.name" autocomplete="off" placeholder="请输入房间号" style="width: 40%"></el-input>
          </p> -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addRoomInfo(tag)">确定</el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Room',
  data() {
    return {
      towers: [
        {
          name: '教学楼',
          children: [
            {
              name: '教四'
            },
            {
              name: '教1'
            },
            {
              name: '教2'
            }
          ]
        },
        {
          name: '宿舍楼',
          children: [
            {
              name: '雪松苑'
            },
            {
              name: '青松苑'
            }
          ]
        }
      ],
      start: 0,
      end: 10,
      searchShow: true,
      iconColor: '#fefcf8',
      pageSize: 10,
      currentPageSize: 10,
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dialogFormVisible: false,
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      multipleSelection: [],
      rooms: [],
      room: {
        name: '',
        towerName: ''
      },
      tag: 1,
      currentPage: 1
    }
  },
  components: {},
  created() {
    this.getRoom()
  },
  mounted() {},
  methods: {
    getRoom() {
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/room/list'
      }).then((res) => {
        this.rooms = res.data.data
        for (let i = 0, len = this.rooms.length; i < len; i++) {
          this.rooms[i].gmtGreate = this.global.formatDate(this.rooms[i].gmtGreate)
        }
        console.log(this.rooms)
      })
    },
    /* 新增room */
    addRoom() {
      this.tag = 1
      this.dialogFormVisible = true
    },
    //新增房间消息
    addRoomInfo(tag) {
      if (tag == 1) {
        this.axios({
          method: 'post',
          url: 'http://localhost:8080/room',
          data: {
            name: this.room.name,
            towerId: 1
          }
        }).then((res) => {
          console.log(res)
          if (res.data.code == 1) {
            this.$message({
              type: 'success',
              message: '新增成功!'
            })
            this.dialogFormVisible = false
          }
        })
      } else {
        this.updateRoom()
      }
    },
    /* 修改room信息 */
    updateRoomInfo(row) {
      this.room.name = row.roomName
      this.room.towerName = row.towerName
      this.dialogFormVisible = true
      this.tag = 2
    },
    //修改房间信息
    updateRoom() {
      this.axios({
        method: 'put',
        url: 'http://localhost:8080/room/id',
        data: {
          name: this.room.name,
          towerId: 1
        }
      }).then((res) => {
        console.log(res)
        if (res.data.code == 1) {
          this.$message({
            type: 'success',
            message: '修改成功!'
          })
          this.dialogFormVisible = false
        }
      })
    },
    //刷新数据
    flush(){
      this.getRoom()
    },
    //删除房间信息
    handleDelete(row) {
      console.log(row)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          method: 'delete',
          url: 'http://localhost:8080/room/id/' + row.roomId
        }).then((res) => {
          if (res.data.code == 1) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            let index = this.rooms.indexOf(row)
            this.room.splice(index, 1)
          }
        })
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
    },
    searchOver() {
      alert(1)
      this.iconColor = '#f1f1df'
    }
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
 .el-input__icon {
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

 .el-input__inner {
  height: 30px;
}

.el-icon-edit {
  color: #f7fbff;
}

.el-icon-plus {
  color: #f7fbff;
}

 .el-icon-delete {
  color: #f7fbff;
}

 .el-icon-download {
  color: #f7fbff;
}

.el-range-separator {
  margin-bottom: 10px;
}

/* >>> .el-icon-search {
  color: #f7fbff;
} */

.el-input__prefix {
  display: flex;
  align-items: center;
}

 .el-select__caret {
   margin-top: 5px;
}

</style>
