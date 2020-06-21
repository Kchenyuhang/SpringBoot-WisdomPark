<template>
  <el-container>
    <!-- 考务管理上方的按钮区域 -->
    <el-header>
      <el-row
        type="flex"
        justify="space-between"
        align="middle"
        style="height: 60px; width: 100%"
      >
        <el-col :span="1">
          <el-button
            size="medium"
            style="height: 30px"
          >添加考试</el-button>
        </el-col>
        <el-col :span="4">
          <el-button
            size="medium"
            style="height: 30px"
          >添加考试</el-button>
          <el-button
            size="medium"
            style="height: 30px"
          >添加考试</el-button>
        </el-col>
      </el-row>
    </el-header>
    <!-- 考务管理下方的正文内容 -->
    <el-main>
      <el-table
        :data="examination"
        border
        style="width: 100%"
      >
        <el-table-column
          v-for="(item, index) in th"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :key="index"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="243"
        >
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              size="small"
            >编辑</el-button>
            <el-button
              @click="handleClick(scope.row)"
              size="small"
            >考生管理</el-button>
            <el-button size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-header>
      <div class="block">
        <el-pagination
          :hide-on-single-page="isShow"
          @current-change="changePageIndex"
          :page-size="8"
          layout="prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </el-header>
  </el-container>
</template>

<script>
const API = require('../utils/api.js')
export default {
  name: 'Examination',
  data() {
    return {
      examination: [],
      // 表头数据
      th: [
        {
          width: 184,
          prop: 'semester',
          label: '学期'
        },
        { width: 104, prop: 'subjectName', label: '课程' },
        { width: 104, prop: 'type', label: '类型' },
        { width: 138, prop: 'teacherName', label: '监考教师' },
        { width: 164, prop: 'startTime', label: '时间' },
        { width: 164, prop: 'area', label: '地点' },
        { width: 164, prop: 'gmtCreate', label: '创建时间' }
      ],
      // 分页对象
      pageDto: {
        currentPage: 0,
        pageSize: 8
      },
      // 总数据量
      total: null,
      // 是否显示分页组件
      isShow: null
    }
  },
  components: {},
  created() {
    this.getAllInfo()
    this.getTotal()
  },
  mounted() {},
  methods: {
    handleClick(row) {
      console.log(row)
    },
    /**
     * 调用接口，获取分页数据
     */
    async getAllInfo() {
      let examinationRes = await API.init('/examination/all/page', this.pageDto, 'post')
      this.examination = examinationRes.data
    },
    /**
     * 调用接口，获取考务数据的总数
     */
    async getTotal() {
      let totalRes = await API.init('/examination/count', null, 'post')
      this.total = totalRes.data
      // 判断查到的数据条数是否满足分页条件
      if (this.total <= this.pageDto.pageSize) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    },
    /**
     * 改变分页页码后执行的方法
     */
    changePageIndex(currentPage) {
      this.pageDto.currentPage = currentPage
      this.getAllInfo()
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss"></style>
