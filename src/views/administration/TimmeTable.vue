<template>
  <el-container style="">
    <!-- 课表上方的 学期、班级、周次信息 -->
    <el-header class="header">
      <el-form :inline="true" ref="form" :model="form" size="mini">
        <el-form-item>
          <el-select v-model="form.semester" placeholder="学期" @change="test()">
            <el-option v-for="(item, index) in semesterList" :key="index" :label="item.name" :value="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.clazz" placeholder="班级" @change="test()">
            <el-option v-for="(item, index) in clazzList" :key="index" :label="item" :value="index"></el-option>
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
      <!-- 课表主界面 -->
      <table align="center" border="1" cellspacing="0">
        <thead>
          <tr>
            <th colspan="2"></th>
            <th v-for="item in weekDuration1.slice(0, 7)" :key="item + 1">周{{ item }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="2">上午</td>
            <td>1-2</td>
            <td>English</td>
            <td>Chinese</td>
            <td>History</td>
            <td>Geography</td>
            <td>Geography</td>
            <td>Geography</td>
            <td>Geography</td>
          </tr>
          <tr>
            <td>3-4</td>
            <td>English</td>
            <td>Chinese</td>
            <td>History</td>
            <td>Geography</td>
            <td>Geography</td>
            <td>Geography</td>
            <td>Geography</td>
          </tr>
          <tr>
            <td colspan="9"></td>
          </tr>
          <tr>
            <td rowspan="2">下午</td>
            <td>5-6</td>
            <td>English</td>
            <td>Chinese</td>
            <td>History</td>
            <td>History</td>
            <td>History</td>
            <td>History</td>
            <td>Geography</td>
          </tr>
          <tr>
            <td>7-8</td>
            <td>English</td>
            <td>Chinese</td>
            <td>History</td>
            <td>Geography</td>
            <td>Geography</td>
            <td>Geography</td>
            <td>Geography</td>
          </tr>
          <tr>
            <td colspan="9"></td>
          </tr>
          <tr>
            <td>晚间</td>
            <td>9-10</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <!-- 课表下方的周次表 -->
      <table style="margin-top: 100px" align="center" border="1" cellspacing="50">
        <caption>
          以上配置应用周次
        </caption>
        <tbody>
          <tr>
            <td
              class="item"
              v-for="(item1, index) in weekDuration1"
              :key="item1"
              @click="choice1(index)"
              :class="isChoice1[index] ? 'choice' : ''"
            >
              第{{ item1 }}周
            </td>
          </tr>
          <tr>
            <td
              class="item"
              v-for="(item2, index) in weekDuration2"
              :key="item2"
              @click="choice2(index)"
              :class="isChoice2[index] ? 'choice' : ''"
            >
              第{{ item2 }}周
            </td>
          </tr>
        </tbody>
      </table>
    </el-main>
  </el-container>
</template>

<script>
const API = require('../utils/api.js')
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
      week: ['1', '2', '3', '4'],
      text: '高数',
      // 周次数组
      weekDuration1: ['一', '二', '三', '四', '五', '六', '七', '八', '九'],
      isChoice1: [],
      weekDuration2: ['十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八'],
      isChoice2: [],
      // 存放学期和班级的数组
      clazzList: [],
      semesterList: []
    }
  },
  components: {},
  created() {
    // 初始化周次的状态
    for (let i = 0; i < this.weekDuration1.length; i++) {
      this.isChoice1.splice(i, 0, false)
      this.isChoice2.splice(i, 0, false)
    }
    this.getAllInfo()
  },
  mounted() {},
  methods: {
    async getAllInfo() {
      let clazzRes = await API.init('/clazz/all', null, 'get')
      let semesterRes = await API.init('/semester/all', null, 'get')
      for (let i = 0; i < clazzRes.data.length; i++) {
        this.clazzList.splice(i, 0, clazzRes.data[i].name)
      }
      for (let i = 0; i < semesterRes.data.length; i++) {
        this.semesterList.push({
          name: semesterRes.data[i].name,
          weekCount: semesterRes.data[i].weekCount
        })
      }
    },
    /**
     * 选择 1-9 周的 td 方法
     */
    choice1(i) {
      let status = this.isChoice1[i]
      this.isChoice1.splice(i, 1, !status)
    },

    /**
     * 选择 10-18 周的 td 方法
     */
    choice2(i) {
      let status = this.isChoice2[i]
      this.isChoice2.splice(i, 1, !status)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;
}

table {
  text-align: center;

  .choice {
    background-color: rgb(106, 163, 251);
  }

  .item {
    cursor: pointer;
  }

  tr,
  th,
  td {
    width: 150px;
    height: 70px;
    border: 1px solid blank;
  }
}
</style>
