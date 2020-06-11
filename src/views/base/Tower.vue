<template>
  <div class="container1">
    <div class="operation">
      <el-button type="primary" size="medium" @click="dialogFormVisible = true">新增</el-button>
      <el-button type="warning" size="medium" disabled>修改</el-button>
      <el-button type="danger" size="medium">删除</el-button>
    </div>
    <Table :towerList="towerList"></Table>
    <Form :dialogFormVisible="dialogFormVisible"></Form>
  </div>
</template>

<script>
import Table from '@/components/Table'
import Form from '@/components/Form'
export default {
  name: 'Tower',
  data() {
    return {
      towerList: [],
      formShow: false,
      dialogFormVisible: false
    }
  },
  components: {
    Table,
    Form
  },
  created() {
    this.getTowerList()
  },
  mounted() {},
  methods: {
    getTowerList(){
      this.axios({
      method: 'get',
      url: 'http://localhost:8080/tower/list'
    }).then((res) => {
      this.towerList = res.data.data 
      console.log(res)
    })
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.container1 {
  padding: 20px 20px;
  .operation {
    text-align: left;
    margin-bottom: 10px;
    el-button {
      margin-right: 20px;
    }
  }
}
</style>
