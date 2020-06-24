<template>
  <div class="container">
    <div class="tab-header">
      <el-row class="header-row">
        <el-input class="input" placeholder="请输入内容" v-model="input" clearable @input="filterSearch"></el-input>
        <el-button size="medium" type="success">查询</el-button>
        <el-button size="medium" type="danger" @click="handleDeleteMul()">批量删除</el-button>
      </el-row>
    </div>
    <div class="table">
      <el-table ref="commentId" :data="commentsShow" @selection-change="handleSelectionChange">
        <el-table-column prop="commentId" type="selection" width="50%"></el-table-column>
        <el-table-column prop="commentId" label="id" width="180%"></el-table-column>
        <el-table-column prop="reviwerName" label="回复人" width="180%"></el-table-column>
        <el-table-column prop="commentByName" label="评论人" width="200%"></el-table-column>
        <el-table-column prop="comment" label="评论内容" width="180%" show-overflow-tooltip></el-table-column>
        <el-table-column prop="title" label="评论帖标题" width="190%"></el-table-column>
        <el-table-column prop="createTime" label="评论时间" width="150%" sortable show-overflow-tooltip>
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span>{{ commentsShow[scope.$index].createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150%">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div style="margin-top:20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 7, 10, 15, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">建议您仅删除违规评论，您确定删除吗</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteComments">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="batchDelVisible" width="300px" center>
      <div class="del-dialog-cnt">建议您仅删除违规评论，您确定删除吗</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="batchDelete">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置可以被引用  引用名为file  不可见
    <input ref="file" v-show="false" type="file" @change="uploadAvatar($event)" />-->
  </div>
</template>

<script>
// import OSS from 'ali-oss'
const API = require('../utils/api.js')
export default {
  name: 'Comment',
  data() {
    return {
      input: '',
      index: '', //根据索引删除元素
      commentsShow: [],
      comments: [],
      commentsId: [],
      fileList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      msg: '',
      delVisible: false, //删除提示弹框的状态
      batchDelVisible: false,
      currentPage: 1, //当前页
      total: 40, //总记录数
      pageSize: 7 //页的大小
    }
  },
  components: {},
  created() {
    this.getAllComments()
  },
  mounted() {},
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    async getAllComments() {
      let data = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      let res = await API.init('/flea/comment/all', data, 'post')
      this.comments = res.data //源数据
      this.commentsShow = this.comments //拷贝数组
      for (let i = 0; i < this.commentsShow.length; i++) {
        this.commentsShow[i].createTime = this.formatDate(this.commentsShow[i].createTime)
      }
    },
    copyArr(arr) {
      let res = []
      for (let i = 0; i < arr.length; i++) {
        res.push(arr[i])
      }
      return res
    },
    //过滤搜索
    filterSearch() {
      // 获取输入框的值
      let search = this.input
      //数组元素按条件过滤
      console.log('输入的关键字的为：' + search)
      this.commentsShow = this.comments.filter((v) => {
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
      this.msg = row
      this.delVisible = true
    }, //批量删除
    handleDeleteMul() {
      this.batchDelVisible = true
    },
    //确定删除
    async deleteComments() {
      let data = {
        commentId: this.msg.commentId
      }
      console.log(data)
      this.result = await API.init('/flea/comment/del', data, 'post')
      console.log(this.result)
      if (this.result.code === 1) {
        this.getAllComments()
        this.$message.success('删除成功')
      } else {
        this.$message.error('评论删除失败')
      }
      this.delVisible = false //关闭删除提示模态框
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.commentsId.toggleRowSelection(row)
        })
      } else {
        this.$refs.commentId.clearSelection()
      }
    },
    handleSelectionChange(val) {
      let ids = []
      for (let i = 0; i < val.length; i++) {
        ids.push(val[i].commentId)
      }
      this.commentsId = ids
      console.log(ids)
    },
    async batchDelete() {
      let data = {
        id: this.commentsId
      }
      console.log(data)
      API.init('flea/comment/batchDel', data, 'post')
      this.batchDelVisible = false
      this.commentsId = []
    }
  },
  computed: {},
  watch: {
    pageSize: function() {
      console.log('pageSize改变' + this.pageSize)
      this.getAllComments()
    },
    currentPage: function() {
      console.log('currentPage改变' + this.currentPage)
      this.getAllComments()
    },
    total: function() {}
  }
}
</script>

<style scoped lang="scss">
.container {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
}
.header-row {
  margin: 20px;
  .input {
    width: 400px;
    margin-right: 20px;
    margin-left: -47%;
  }
}
.createBook {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  border: solid 1px black;
}
.bookFormCreate {
  width: 500px;
  height: 650px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  padding-top: 50px;
  padding-right: 100px;
}
.imgChange {
  cursor: pointer;
  width: 80px;
}
.table {
  padding-left: 10px;
}
</style>
