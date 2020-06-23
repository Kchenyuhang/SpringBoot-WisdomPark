<template>
  <div>
    <el-row class="df-jr-ac ml-20 mt-10">
      <el-col class="tl">
        <el-button type="primary" icon="el-icon-plus" @click="addcenterDialogVisible = true" size="mini">
          <span class="light-font-color">新增</span>
        </el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <!-- <el-row>
      <el-col span="23" class="ml-20 mt-10">
        <el-table :data="items.slice(start, end)" style="width: 100%;">
          <el-table-column label="名称" show-overflow-tooltip min-width="13%">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="负责人" show-overflow-tooltip min-width="12%">
            <template slot-scope="scope">
              <span>{{ scope.row.bossName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="类型" show-overflow-tooltip min-width="12%">
            <template slot-scope="scope">
              <span>{{ scope.row.jobType }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="gmtCreate" label="创建时间" min-width="15%" show-overflow-tooltip> </el-table-column>

          <el-table-column label="操作" show-overflow-tooltip min-width="23%">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
export default {
  name: 'Job',
  data() {
    return {
      addcenterDialogVisible: false
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
  computed: {}
}
</script>

<style scoped lang="scss"></style>
