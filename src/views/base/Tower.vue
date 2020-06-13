<template>
  <!-- <div class="container1">
    <div class="operation">
      <el-button type="primary" size="medium" @click="dialogFormVisible = true">新增</el-button>
      <el-button type="warning" size="medium" disabled>修改</el-button>
      <el-button type="danger" size="medium">删除</el-button>
    </div>
    <Table :towerList="towerList"></Table>
    <Form :dialogFormVisible="dialogFormVisible"></Form>
  </div> -->
  <div style="width: 100%">
    <el-row type="flex" class="ml-20 mt-10">
      <el-input v-model="input" placeholder="请输入内容" class="blur-search"></el-input>
      <el-date-picker
        v-model="time"
        type="daterange"
        range-separator=":"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        class="date-input-search ml-10"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
      <el-select v-model="selectValue" placeholder="请选择" class="statu-search ml-10">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
      <el-button type="success" size="mini" @click="search()" class="ml-10" icon="el-icon-search">搜索</el-button>
    </el-row>
    <el-row class="df-jr-ac ml-20 mt-10">
      <el-col class="tl">
        <el-button type="primary" icon="el-icon-plus" size="small"><span>新增</span></el-button>
        <el-button type="success" icon="el-icon-edit" size="small">修改</el-button>
        <el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>
        <el-button type="warning" icon="el-icon-download" size="small">导出</el-button>
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
          ref="multipleTable"
          :data="towerList"
          tooltip-effect="dark"
          style="width: 100%;"
          stripe="true"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" min-width="5%"></el-table-column>
          <el-table-column label="用户名" min-width="10%">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column prop="latitude" label="经度" min-width="15%"></el-table-column>
          <el-table-column prop="longitude" label="纬度" show-overflow-tooltip min-width="15%"> </el-table-column>
          <el-table-column prop="gmtCreate" label="创建时间" show-overflow-tooltip min-width="15%"> </el-table-column>
          <el-table-column label="操作" align="center" show-overflow-tooltip min-width="20%">
            <template slot-scope="scope">
              <p class="tc">
                <el-button size="mini" icon="el-icon-edit" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.row)">删除</el-button>
              </p>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//import global from '@/js/global.js'
export default {
  name: 'Tower',
  data() {
    return {
      towerList: [],
      formShow: false,
      dialogFormVisible: false
    }
  },
  components: {},
  created() {
    this.getTowerList()
  },
  mounted() {},
  methods: {
    getTowerList() {
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/tower/list'
      }).then((res) => {
        this.towerList = res.data.data
        for (let i = 0, len = this.towerList.length; i < len; i++) {
          this.towerList[i].gmtCreate = this.global.formatDate(this.towerList[i].gmtCreate)
        }
        console.log(res)
      })
    },
    // formatDate(value) {
    //   let date = new Date(value)
    //   let y = date.getFullYear()
    //   let MM = date.getMonth() + 1
    //   MM = MM < 10 ? '0' + MM : MM
    //   let d = date.getDate()
    //   d = d < 10 ? '0' + d : d
    //   return y + '-' + MM + '-' + d
    // }
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

.search-btn {
  height: 30px;
  width: 80px;
}

>>> .el-input__inner {
  height: 30px;
}

</style>
