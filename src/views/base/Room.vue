<template>
  <div class="room-container">
    <el-row type="flex">
      <el-col span="2">
        <el-tree :data="towers" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-col>
      <el-col span="22">
        <!-- 操作按钮 -->
        <el-row type="flex" justify="start">
          <el-col span="12" style="text-align:left">
            <el-button type="primary" size="medium" @click="addRoom()">新增</el-button>
            <el-button type="warning" size="medium" disabled>修改</el-button>
            <el-button type="danger" size="medium">删除</el-button>
          </el-col>
          <el-col span="12" style="text-align:right">
            <el-button type="primary" plain size="mini" icon="el-icon-refresh-left"></el-button>
          </el-col>
        </el-row>
        <!-- 表格 -->
        <el-row>
          <el-table ref="multipleTable" :data="rooms" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection"> </el-table-column>
            <el-table-column label="房间名">
              <template slot-scope="scope">{{ scope.row.roomName }}</template>
            </el-table-column>
            <el-table-column label="楼栋">
              <template slot-scope="scope">{{ scope.row.towerName }}</template>
            </el-table-column>
            <el-table-column label="创建时间" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.gmtGreate }}</template>
            </el-table-column>
            <el-table-column align="right">
              <template slot-scope="scope">
                <p style="text-align:center">
                  <el-button size="mini" icon="el-icon-edit" type="primary" @click="updateRoomInfo(scope.row)">编辑</el-button>
                  <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                </p>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <!-- 新增页面 -->
        <el-dialog title="新增房间信息" :visible.sync="dialogFormVisible" width="400px" center="true">
          <el-form :model="room" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="房间号" prop="name">
              <el-input v-model="room.name"></el-input>
            </el-form-item>
            <el-form-item label="楼栋名" prop="towerName">
              <el-input v-model="room.towerName"></el-input>
            </el-form-item>
          </el-form>
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
      tag: 1
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
        console.log(this.rooms)
      })
    },
    /* 新增room */
    addRoom() {
      this.tag = 1
      this.dialogFormVisible = true
    },
    addRoomInfo(tag) {
      if(tag == 1){
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
      }else {
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
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.room-container {
  padding: 20px 20px;
}

.demo-ruleForm {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
