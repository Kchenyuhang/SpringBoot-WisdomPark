<template>
  <div class="container">
    <div class="tab-header">
      <el-row class="header-row">
        <el-input class="input" placeholder="请输入内容" v-model="input" clearable @input="filterSearch"></el-input>
        <el-button size="medium" type="success">查询</el-button>
        <el-button size="medium" type="danger" @click="handleDeleteMul()">批量删除</el-button>
      </el-row>
    </div>
    <el-table ref="pkFleaGoodsId" :data="goodsShow" @selection-change="handleSelectionChange" height="100%">
      <el-table-column prop="pkFleaGoodsId" type="selection" width="50"></el-table-column>
      <el-table-column prop="pkFleaGoodsId" label="id" width="50"></el-table-column>
      <el-table-column prop="goodsName" label="商品名" width="310">
        <template slot-scope="scope">
          <el-popover placement="top" trigger="hover">
            <span style="display:block; width: 300px;">{{ scope.row.goodsName }}</span>
            <span slot="reference" class="text-ellipsis">{{ scope.row.goodsName }}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="goodsPrice" label="价格" width="60"></el-table-column>
      <el-table-column prop="goodsDescription" label="描述" width="260">
        <template slot-scope="scope">
          <el-popover placement="top" trigger="hover">
            <span style="display:block; width: 300px;">{{ scope.row.goodsDescription }}</span>
            <span slot="reference" class="text-ellipsis">{{ scope.row.goodsDescription }}</span>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="typeName" label="类型" width="50"></el-table-column>
      <el-table-column prop="goodsMark" label="标签" width="50"></el-table-column>
      <!-- <el-table-column prop="nickname" label="发布人昵称" width="50"></el-table-column> -->
      <el-table-column prop="username" label="卖家" width="80"></el-table-column>
      <el-table-column prop="goodsCreateTime" label="发布时间" width="130" sortable show-overflow-tooltip>
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ goodsShow[scope.$index].goodsCreateTime }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="goodsImgUrl" label="商品图片地址" width="130"></el-table-column> -->

      <el-table-column label="状态">
        <template slot-scope="scope">
          <p v-if="goodsShow[scope.$index].isDeleted == 0" style="color: blue">已发布</p>
          <p v-if="goodsShow[scope.$index].isDeleted == 1" style="color: red">已下架</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button v-if="goodsShow[scope.$index].isDeleted == 0" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
            >下架</el-button
          >
          <el-button v-else size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">上架</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      <div class="del-dialog-cnt">商品信息删除后可在数据库修改标签，若无权限请勿修改，是否删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteGoods">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="batchDelVisible" width="300px" center>
      <div class="del-dialog-cnt">商品信息删除后可在数据库修改标签，若无权限请勿修改，是否删除？</div>
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
  name: 'Goods',
  data() {
    return {
      input: '',
      index: '', //根据索引删除元素
      goodsShow: [],
      goods: [],
      goodsId: [],
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
    this.getAllGoods()
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
    async getAllGoods() {
      let data = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      let res = await API.init('/flea/goods/all', data, 'post')

      this.goods = res.data //源数据
      console.log(this.goods)
      this.goodsShow = this.goods //拷贝数组
      for (let i = 0; i < this.goodsShow.length; i++) {
        this.goodsShow[i].goodsCreateTime = this.formatDate(this.goodsShow[i].goodsCreateTime)
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
      this.goodsShow = this.goods.filter((v) => {
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
    async deleteGoods() {
      let data = {
        pkFleaGoodsId: this.msg.pkFleaGoodsId
      }
      this.result = await API.init('/flea/goods/logicalDel', data, 'post')
      console.log(this.result)
      if (this.result.code === 1) {
        this.getAllGoods()
        this.$message.success('下架成功')
      } else {
        this.$message.error('商品下架失败')
      }
      this.delVisible = false //关闭删除提示模态框
      this.goodsId = []
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.goodsId.toggleRowSelection(row)
        })
      } else {
        this.$refs.goodsId.clearSelection()
      }
    },
    handleSelectionChange(val) {
      let ids = []
      for (let i = 0; i < val.length; i++) {
        ids.push(val[i].pkFleaGoodsId)
      }
      this.goodsId = ids
    },
    async batchDelete() {
      let data = {
        id: this.goodsId
      }
      console.log(data)
      API.init('flea/goods/batchLogical', data, 'post')
      this.batchDelVisible = false
      this.goodsId = []
    }
  },
  computed: {},
  watch: {
    pageSize: function() {
      console.log('pageSize改变' + this.pageSize)
      this.getAllGoods()
    },
    currentPage: function() {
      console.log('currentPage改变' + this.currentPage)
      this.getAllGoods()
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
</style>
