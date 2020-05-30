<template>
  <el-container style="background-color: gray">
    <el-header class="header">
      <el-form :inline="true" ref="form" :model="form" size="mini">
        <el-form-item>
          <el-select v-model="form.semester" placeholder="学期" @change="test()">
            <el-option v-for="(item, index) in semester" :key="item" :label="item" :value="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.clazz" placeholder="班级" @change="test()">
            <el-option v-for="(item, index) in clazz" :key="item" :label="item" :value="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.week" placeholder="周次" @change="test()">
            <el-option v-for="(item, index) in week" :key="item" :label="item" :value="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-table
        ref="singleTable"
        @current-change="handleCurrentChange()"
        height="500px"
        :data="tableData"
        border
        style="width: 100%"
        size="medium"
      >
        <el-table-column prop="blank" label="节次" width="180"> </el-table-column>
        <el-table-column prop="monday" label="周一" width="180"> </el-table-column>
        <el-table-column prop="tuesday" label="周二" width="180"> </el-table-column>
        <el-table-column prop="wednesday" label="周三" width="180"> </el-table-column>
        <el-table-column prop="thursday" label="周四" width="180"> </el-table-column>
        <el-table-column prop="friday" label="周五" width="180"> </el-table-column>
        <el-table-column prop="saturday" label="周六" width="180"> </el-table-column>
        <el-table-column prop="sunday" label="周日" width="180"> </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'TimeTable',
  data() {
    return {
      form: {
        semester: '',
        clazz: '',
        week: ''
      },
      semester: ['第一学期', '第二学期', '第三学期', '第四学期'],
      clazz: ['软件1851'],
      course: ['高数', '高英', '物理', 'Java'],
      week: ['1', '2', '3', '4'],
      tableData: [
        {
          blank: '1-2'
        },
        {
          blank: '3-4'
        },
        {
          blank: '5-6'
        },
        {
          blank: '7-8'
        },
        {
          blank: '9-10'
        }
      ]
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    handleCurrentChange() {
      this.current = null
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;

  .item {
    margin-right: 40px;
    height: 10px;
  }

  el-table-column {
    background-color: red;
  }
}
</style>
