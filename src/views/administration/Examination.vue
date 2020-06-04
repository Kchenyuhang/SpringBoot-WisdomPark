<template>
  <el-container>
    <!-- 考务管理上方的按钮区域 -->
    <el-header>
      <el-row type="flex" justify="space-between" align="middle" style="height: 60px; width: 100%">
        <el-col :span="1">
          <el-button size="medium" style="height: 30px">添加考试</el-button>
        </el-col>
        <el-col :span="4">
          <el-button size="medium" style="height: 30px">添加考试</el-button>
          <el-button size="medium" style="height: 30px">添加考试</el-button>
        </el-col>
      </el-row>
    </el-header>
    <!-- 考务管理下方的正文内容 -->
    <el-main>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column v-for="(item, index) in th" :prop="item.prop" :label="item.label" :width="item.width" :key="index">
        </el-table-column>
        <el-table-column label="操作" width="243">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" size="small">编辑</el-button>
            <el-button @click="handleClick(scope.row)" size="small">考生管理</el-button>
            <el-button size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
const API = require('../utils/api.js')
export default {
  name: 'Examination',
  data() {
    return {
      tableData: [
        {
          semester: '2016-05-03',
          course: '王小虎',
          type: '上海',
          teacher: '普陀区',
          date: '上海市普陀区金沙江路 1516 弄',
          area: 200333,
          createTime: 'sad'
        },
        {
          semester: '2016-05-03',
          course: '王小虎',
          type: '上海',
          teacher: '普陀区',
          date: '上海市普陀区金沙江路 1516 弄',
          area: 200333,
          createTime: 'sad'
        },
        {
          semester: '2016-05-03',
          course: '王小虎',
          type: '上海',
          teacher: '普陀区',
          date: '上海市普陀区金沙江路 1516 弄',
          area: 200333,
          createTime: 'sad'
        },
        {
          semester: '2016-05-03',
          course: '王小虎',
          type: '上海',
          teacher: '普陀区',
          date: '上海市普陀区金沙江路 1516 弄',
          area: 200333,
          createTime: 'sad'
        },
        {
          semester: '2016-05-03',
          course: '王小虎',
          type: '上海',
          teacher: '普陀区',
          date: '上海市普陀区金沙江路 1516 弄',
          area: 200333,
          createTime: 'sad'
        },
        {
          semester: '2016-05-03',
          course: '王小虎',
          type: '上海',
          teacher: '普陀区',
          date: '上海市普陀区金沙江路 1516 弄',
          area: 200333,
          createTime: 'sad'
        }
      ],
      // 表头数据
      th: [
        {
          width: 144,
          prop: 'semester',
          label: '学期'
        },
        { width: 144, prop: 'course', label: '课程' },
        { width: 144, prop: 'type', label: '类型' },
        { width: 144, prop: 'teacher', label: '监考教师' },
        { width: 144, prop: 'date', label: '时间' },
        { width: 144, prop: 'area', label: '地点' },
        { width: 144, prop: 'createTime', label: '创建时间' }
      ],
      // 分页对象
      pageDto: {
        currentPage: 0,
        pageSize: 10
      }
    }
  },
  components: {},
  created() {
    this.getAllInfo()
  },
  mounted() {},
  methods: {
    handleClick(row) {
      console.log(row)
    },
    async getAllInfo() {
      let examinationRes = await API.init('./examination/all/page', this.pageDto, 'post')
      console.log(examinationRes)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss"></style>
