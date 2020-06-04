<template>
  <div class="container">
    <div class="tab-header">
      <el-row class="header-row">
        <el-input class="input" placeholder="请输入内容" v-model="input" clearable @input="filterSearch"> </el-input>
        <el-button size="medium" type="success">查询</el-button>
        <el-button size="medium" type="primary" @click="createBookShow = !createBookShow">增加</el-button>
        <el-button size="medium" type="danger" @click="handleDeleteMul">批量删除</el-button>
      </el-row>
    </div>
    <div class="createBook" v-if="createBookShow">
      <el-form :model="bookCreate" :rules="bookCreateRules" ref="bookCreate" label-width="100px" class="bookFormCreate">
        <el-form-item label="书名" prop="bookName">
          <el-input v-model="bookCreate.bookName"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="bookCreate.author"></el-input>
        </el-form-item>

        <el-form-item label="类型" prop="type">
          <el-input v-model="bookCreate.type"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input v-model="bookCreate.description"></el-input>
        </el-form-item>

        <el-form-item label="数量" prop="bookNumber">
          <el-input type="number" v-model="bookCreate.bookNumber"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select v-model="bookCreate.status" placeholder="请选择状态" style="width:380px">
            <el-option label="启用" value="true"></el-option>
            <el-option label="禁用" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封面">
          <!-- <el-upload :limit="1" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传一张jpg/png文件，且不超过500kb</div>
          </el-upload> -->
          <img :src="bookCreate.cover" @click="selectavatar()" class="imgChange" width="100px" height="100px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('bookCreate')">立即创建</el-button>
          <el-button @click="resetForm('bookCreate')">重置</el-button>
          <el-button @click="createBookShow = !createBookShow">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="createBook" v-if="bookUpdateShow">
      <el-form :model="bookUpdate" :rules="bookCreateRules" ref="bookUpdate" label-width="100px" class="bookFormCreate">
        <el-form-item label="书名" prop="bookName">
          <el-input v-model="bookUpdate.bookName"></el-input>
        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="bookUpdate.author"></el-input>
        </el-form-item>

        <el-form-item label="类型" prop="type">
          <el-input v-model="bookUpdate.type"></el-input>
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input v-model="bookUpdate.description"></el-input>
        </el-form-item>

        <el-form-item label="数量" prop="bookNumber">
          <el-input type="number" v-model="bookUpdate.bookNumber"></el-input>
        </el-form-item>

        <el-form-item label="状态" prop="status">
          <el-select v-model="bookUpdate.status" placeholder="请选择状态" style="width:380px">
            <el-option label="启用" value="true"></el-option>
            <el-option label="禁用" value="false"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="封面">
          <!-- <el-upload :limit="1" class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传一张jpg/png文件，且不超过500kb</div>
          </el-upload> -->
          <img :src="bookUpdate.cover" @click="selectavatar()" class="imgChange" width="100px" height="100px" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('bookUpdate')">立即修改</el-button>
          <el-button @click="resetForm('bookUpdate')">重置</el-button>
          <el-button @click="bookUpdateShow = !bookUpdateShow">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table ref="bookId" :data="bookShow" @selection-change="handleSelectionChange">
      <el-table-column prop="pkBookId" type="selection" width="50"></el-table-column>
      <el-table-column prop="pkBookId" label="id" width="50"> </el-table-column>
      <el-table-column prop="author" label="作者" width="220"> </el-table-column>
      <el-table-column prop="bookName" label="书名" width="200"> </el-table-column>
      <el-table-column prop="description" label="描述" width="180"> </el-table-column>
      <el-table-column prop="type" label="类型" width="50"> </el-table-column>
      <el-table-column prop="bookNumber" label="总数" width="50"> </el-table-column>
      <el-table-column prop="bookResidueNumber" label="库存" width="50"> </el-table-column>
      <el-table-column prop="status" label="状态" width="50"></el-table-column>
      <el-table-column prop="gmtCreate" label="创建时间" width="150"> </el-table-column>
      <el-table-column prop="gmtModified" label="修改时间" width="150"> </el-table-column>
      <el-table-column prop="isDeleted" label="删除标志" width="100"> </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:2%">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">图书信息删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteBook">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置可以被引用  引用名为file  不可见 -->
    <input ref="file" v-show="false" type="file" @change="uploadAvatar($event)" />
  </div>
</template>

<script>
// import OSS from 'ali-oss'
const API = require('../utils/api.js')
export default {
  name: 'Book',
  data() {
    return {
      input: '',
      index: '', //根据索引删除元素
      bookShow: [],
      book: [],
      bookId: [],
      fileList: [
        {
          name: 'food.jpeg',
          url:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      msg: '',
      delVisible: false, //删除提示弹框的状态
      currentPage: 1, //当前页
      total: 40, //总记录数
      pageSize: 10, //页的大小
      createBookShow: false, //添加书籍的表单的控制变量
      bookUpdateShow: false, //修复书籍的表单的控制变量
      bookCreate: {
        bookName: '',
        author: '',
        type: '',
        description: '',
        bookNumber: 0,
        status: '',
        cover:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAAC0CAMAAAB4+cOfAAAAKlBMVEXw8PDg4ODu7u7h4eHq6urk5OTz8/PZ2dns7Ozd3d3n5+fY2Nj29vbU1NTkhN11AAAFGklEQVR4nO2d63arOAxGfZNv0Pd/3ZFsIAnB0zLjM12jfPsHq6FpVr1rybIx1BgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwb4iR+ux2TiS6HOThNbqKpvkzCklNjJjpf7DSKzUrMRCNepvUYNqOlz1TpLxRmZJlcpc/Qb7doDk4CIMwaldqnqQimyH/kUqe1JIapH/eLRImkiX9i55XEUhPj5n0exAyAmAEQMwBiBkDMAIgZoFxMNC5nZ/5BeaNaTDSVpLSnel+NZjFc1pd9DSHc/TzNYmo51mdKqTc/T6+YGF6Wre7OCPWKcec1uXvrTmrFtNcvXYYgpvG+jHurytEqJub3hfFwp8toFWPCu5hb6RdiGtX604UkrWLihZhxKEnFU+xLfaxWTH5PvoMV4WioSyw+PNRoFWPM22VJP/hBR48C2eddjVox73XMdYo5X9ilrV+pFWMMvU4JrjsMh9yrQE41LQvrFRPdc5MHV6LlutqZloWjXjHyR39OHpeBdI63/d2Bc5ReMZHLk7ZvoVi6WqmKAy+ihoJiMRJOoRLR9f6oeMpCF3b+k9/8DzNYDI/H4e077hsvusWM3+/sN14+U8xVZQwx11OpDxNzvWd3OBx9iphocs3n5PvtcKRfjIw8p+WEfXvnJ4tpBZ49LSfc2A6sVEw04TBQ6Iint1njh4mJMfuXOeQ2KbiaNX6SmJ5cXlrZ5sym/tyLQjF7cjm10+efDdNaxTwnl1On8Te06BOTf1alfJaYeB1FHy9G7iiYd8+SIjF1VhRpEzMXiIEYiIGYA4gZADEDIGYAxAyAmAEQM+CPiFFx3/UPLi3eFaPihnTZ0CL4KXQzE2+Y+036Vdc5YryiDvPD664/DyQVqbfTN1DN0WIVeeEETP7eevcA7yn/dmPmEo2bwmAXFgAAAHCTx5aHeyOL8nEoOinlWyMz3aleQ7uXP3glE6QzXPt+pVJSrXxI8kiHmPmLJOeEhaK4e31KovxgtEmOddHyvMQT1S+WPPlsk2zXbHce8WuispDgg4hZfBVztVHEiIm+yLEmpWLWUGKt67q2fuD6hhlmpbLuT+plMXldTUqea3+31tLe5It8NySj8HG+ssXuK/kl2VJpkShJ+52z0ZbHm0RM+CqhhrLkSLuY7LKjJbgsz+JRBk8jiVIhG7idNflwbD4r9ugG0aVAiUrlzpLjLoaWnoTaQc1SzANOIcW64Aqtpi812d7WZcu+rELEBI6lJbnVHGJKFlw//nIr5uNl+OEoolT7wM35uCXdVBbf0q/rodT2dcp+xT3H2LJ2VOYYk2uQqFkpGe4STUzLvblw+9cj+cpYtPjoLIed33JM6oNU1ddbGtxwT85xz8jZH6tNHF75GIg5lKh4F7jDONkm3dNyj7iUvm49NOT/Q/TLXrhxl9hPhiU8i1m48c64yk5i7KHkUnt3zItWMTb1/Jm5vt3PmaVwhdLEyF0FIobHrkKBM3FPviykx51TK+boMXax2ymXuGzbxCSKrfEuV+IMU7Y6hkfrXgzq7TE+bY9Tz2UTU3lYjn0W1DqGjEpbFcxzxlXE8Kle52gW88gxIoYH7S9rmpIk56Tkd8tjAsmje5H6b5s8ahaTqFO3HONrr0uCXGEk1xrv6YAHbnbit1pXrxiT8/EI/T5a7+Xa0397Cc//PMa9Pm5S2QWlJ+LFV8O3fPcKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPh7/gLfCkBS+NmGOgAAAABJRU5ErkJggg=='
      },
      bookUpdate: {
        id: '',
        bookName: '',
        author: '',
        type: '',
        description: '',
        bookNumber: 0,
        status: '',
        cover: ''
      },
      bookCreateRules: {
        bookName: [{ required: true, message: '请输入书名', trigger: 'blur' }],
        author: [{ required: true, message: '请输入作者', trigger: 'blur' }],
        type: [{ required: true, message: '请输入类型', trigger: 'blur' }],
        description: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        bookNumber: [{ required: true, message: '请输入数量', trigger: 'blur' }],
        status: [{ required: true, message: '请输入状态', trigger: 'blur' }]
      }
    }
  },
  components: {},
  created() {
    this.getAllBook()
  },
  mounted() {},
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    submitForm(formName) {
      if (formName === 'bookCreate') {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('添加submit!')
            let data = this.bookCreate
            API.init('/book/increased', data, 'post')
            this.createBookShow = !this.createBookShow
          } else {
            console.log('error submit!!')
            return false
          }
        })
      } else if (formName === 'bookUpdate') {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('修改submit!')
            let data = this.bookUpdate
            data.status = data.status === '启用' ? true : false
            API.init('/book/updation', data, 'put')
            this.bookUpdateShow = !this.bookUpdateShow
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
      this.getAllBook()
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    async getAllBook() {
      let data = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      let res = await API.init('/book/all', data, 'post')

      this.book = res.data.content
      this.bookShow = this.book
      console.log(this.book)
      for (let i = 0; i < this.bookShow.length; i++) {
        this.bookShow[i].description = this.bookShow[i].description.substring(0, 10) + '...'
        this.bookShow[i].gmtCreate = this.formatDate(this.bookShow[i].gmtCreate)
        this.bookShow[i].gmtModified = this.formatDate(this.bookShow[i].gmtModified)
        if (!this.bookShow[i].status) {
          this.bookShow[i].status = '启用'
        } else {
          this.bookShow[i].status = '禁用'
        }
        if (!this.bookShow[i].isDeleted) {
          this.bookShow[i].isDeleted = '启用'
        } else {
          this.bookShow[i].isDeleted = '禁用'
        }
      }
    },
    //过滤搜索
    filterSearch() {
      // 获取输入框的值
      let search = this.input
      //数组元素按条件过滤
      console.log('输入的关键字的为：' + search)
      this.bookShow = this.book.filter((v) => {
        // console.log(JSON.stringify(v))
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
      return y + '年' + MM + '月' + d + '日'
    },
    //当前页展示数据
    handleSizeChange: function(pageSize) {
      this.pageSize = pageSize
    },
    //当前页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    },
    //修改
    handleUpdate(index, row) {
      this.index = index
      this.bookUpdate.id = row.pkBookId
      this.bookUpdate.bookName = row.bookName
      this.bookUpdate.author = row.author
      this.bookUpdate.type = row.type
      this.bookUpdate.description = row.description
      this.bookUpdate.bookNumber = row.bookNumber
      this.bookUpdate.status = row.status
      this.bookUpdate.cover = row.cover
      this.bookUpdateShow = true
    },
    //单行删除
    handleDelete(index, row) {
      this.index = index
      this.bookId.push(row.pkBookId)
      this.delVisible = true
    }, //批量删除
    handleDeleteMul() {
      this.delVisible = true
    },
    //确定删除
    async deleteBook() {
      let data = {
        ids: String(this.bookId)
      }
      API.init('book/deletion/batch', data, 'delete')
      this.delVisible = false //关闭删除提示模态框
      //删除book数组中id在bookId的元素，并清空bookId
      // }
      for (let i = 0; i < this.bookId.length; i++) {
        this.book.filter((bok) => {
          if (bok.pkBookId == this.bookId[i]) {
            let index = this.book.indexOf(bok)
            this.book.splice(index, 1)
            this.bookShow = this.book
          }
        })
      }
      this.bookId = []
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.bookId.toggleRowSelection(row)
        })
      } else {
        this.$refs.bookId.clearSelection()
      }
    },
    handleSelectionChange(val) {
      let ids = []
      for (let i = 0; i < val.length; i++) {
        ids.push(val[i].pkBookId)
      }
      this.bookId = ids
    }
    //上传图片
    // selectavatar() {
    //   this.$refs.file.click()
    // },
    // uploadAvatar(event) {
    //   const OSS = require('ali-oss')
    //   let client = new OSS({
    //     region: 'oss-cn-beijing',
    //     //云账号的AccessKey所有的API访问权限，
    //     //建议遵循阿里云安全最佳实践没部署在服务器端使用RAM子账号
    //     accessKeyId: 'LTAI4GD8r7BPa4ik89fSdFws',
    //     accessKeySecret: 'H5uLKRHHYnndxuHctQjPPBJj5vRWSH',
    //     bucket: 'nttbucket'
    //   })
    //   let timestamp = Date.parse(new Date())
    //   let imgUrl = 'img/' + timestamp
    //   alert(imgUrl)
    //   var file = event.target.files[0] //获取文件流1
    //   //因为在内部方法中，this无效
    //   var _this = this
    //   client.multipartUpload(imgUrl, file).then(function(result) {
    //     let img = result.res.requestUrls[0].split('?')[0]
    //     alert('图片地址***' + img)
    //     _this.bookCreate.cover = img
    //     //地址改变，但没有远程存储，所以找不到文件
    //     //要先存储
    //     alert('图片地址' + _this.bookCreate.coverr)
    //   })
    // }
  },
  computed: {},
  watch: {
    pageSize: function() {
      console.log('pageSize改变' + this.pageSize)
      this.getAllBook()
    },
    currentPage: function() {
      console.log('currentPage改变' + this.currentPage)
      this.getAllBook()
    },
    total: function() {}
  }
}
</script>

<style scoped lang="scss">
.container {
  margin-left: 20px;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
}
.header-row {
  margin: 20px;
  .input {
    width: 400px;
    margin-right: 20px;
    margin-left: -680px;
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
  width: 600px;
  height: 750px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  padding-top: 50px;
  padding-right: 100px;
}
.imgChange {
  cursor: pointer;
}
</style>
