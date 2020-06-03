<template>
  <div>
    <el-table :data="towerList.slice(start, end)" style="width: 100%;" border>
      <el-table-column label="楼栋名" prop="name"></el-table-column>
      <el-table-column label="经度" prop="longitude"></el-table-column>
      <el-table-column label="纬度" prop="latitude"></el-table-column>
      <el-table-column label="创建时间" prop="gmtCreate"></el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope>
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <p style="text-align:center">
            <el-button size="mini" icon="el-icon-edit" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </p>
        </template>
      </el-table-column>
    </el-table>
    <el-row>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        @prev-click="upPage()"
        @next-click="nextPage()"
        :page-size="size"
        layout="prev, pager, next, jumper"
        :total="towerList.length"
      ></el-pagination>
    </el-row>
  </div>
</template>

<script>
import Bus from '../js/bus'
export default {
  name: 'Table',
  data() {
    return {
      start: 0,
      end: 10,
      search: '',
      size: 10,
      currentPage: 1
    }
  },
  components: {},
  created() {
    console.log(this.towerList)
  },
  mounted() {},
  props: ['towerList'],
  methods: {
    handleEdit(row) {
      Bus.$emit('updateTowerInfo', row)
    },
    //删除
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.axios({
          method: 'delete',
          url: 'http://localhost:8080/tower/id/' + row.pkTowerId
        }).then((res) => {
          if (res.data.code == 1) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
        })
      })
    },
    //上一页
    upPage() {
      this.start -= 10
      this.end -= 10
      this.currentPage -= 1
    },
    //下一页
    nextPage() {
      this.start += 10
      this.end += 10
      this.currentPage += 1
    },
    //输出页面跳转
    handleCurrentChange() {
      this.start = this.currentPage * 10 - 10
      this.end = this.currentPage * 10
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss"></style>
