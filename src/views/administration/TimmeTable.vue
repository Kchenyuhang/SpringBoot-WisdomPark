<template>
  <el-container>
    <!-- 课表上方的 学期、班级、周次信息 -->
    <el-header class="header">
      <el-form
        :inline="true"
        ref="form"
        :model="form"
        size="mini"
        style="margin-top: 10px"
      >
        <el-form-item>
          <el-select
            v-model="form.semester"
            placeholder="学期"
            @change="changeWeekCount()"
          >
            <el-option
              v-for="(item, index) in semesterList"
              :key="index"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="form.clazz"
            placeholder="班级"
            @change="changeClazz()"
          >
            <el-option
              v-for="(item, index) in clazzList"
              :key="index"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="form.week"
            placeholder="周次"
            @change="showSchedule()"
          >
            <el-option
              v-for="(item, index) in weekList"
              :key="index"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <!-- 课表主界面 -->
      <table
        align="center"
        border="1"
        cellspacing="0"
      >
        <thead>
          <tr>
            <th colspan="2"></th>
            <th
              v-for="item in weekDuration1.slice(0, 6)"
              :key="item + 1"
            >周{{ item }}</th>
            <th>周日</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="2">上午</td>
            <td>1-2</td>
            <td
              v-for="(item, index) in courseList1"
              :key="index"
              :style="{ backgroundColor: item.backgroundColor }"
            >
              <div
                class="info"
                v-show="item.isShow"
              >
                <span>{{ item.subjectName }}</span>
                <span>{{ item.teacherName }}</span>
                <span>{{ item.towerName }}{{ item.roomName }}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>3-4</td>
            <td
              v-for="(item, index) in courseList2"
              :key="index"
              :style="{ backgroundColor: item.backgroundColor }"
            >
              <div
                class="info"
                v-show="item.isShow"
              >
                <span>{{ item.subjectName }}</span>
                <span>{{ item.teacherName }}</span>
                <span>{{ item.towerName }}{{ item.roomName }}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="9"></td>
          </tr>
          <tr>
            <td rowspan="2">下午</td>
            <td>5-6</td>
            <td
              v-for="(item, index) in courseList3"
              :key="index"
              :style="{ backgroundColor: item.backgroundColor }"
            >
              <div
                class="info"
                v-show="item.isShow"
              >
                <span>{{ item.subjectName }}</span>
                <span>{{ item.teacherName }}</span>
                <span>{{ item.towerName }}{{ item.roomName }}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td>7-8</td>
            <td
              v-for="(item, index) in courseList4"
              :key="index"
              :style="{ backgroundColor: item.backgroundColor }"
            >
              <div
                class="info"
                v-show="item.isShow"
              >
                <span>{{ item.subjectName }}</span>
                <span>{{ item.teacherName }}</span>
                <span>{{ item.towerName }}{{ item.roomName }}</span>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="9"></td>
          </tr>
          <tr>
            <td>晚间</td>
            <td>9-10</td>
            <td
              v-for="(item, index) in courseList5"
              :key="index"
              :style="{ backgroundColor: item.backgroundColor }"
            >
              <div
                class="info"
                v-show="item.isShow"
              >
                <span>{{ item.subjectName }}</span>
                <span>{{ item.teacherName }}</span>
                <span>{{ item.towerName }}{{ item.roomName }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 课表下方的周次表 -->
      <table
        style="margin-top: 100px"
        align="center"
        border="1"
        cellspacing="50"
      >
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
      // 界面底部的周次数组
      weekDuration1: ['一', '二', '三', '四', '五', '六', '七', '八', '九'],
      isChoice1: [],
      weekDuration2: ['十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八'],
      isChoice2: [],
      // 存放学期和班级、周次的数组
      clazzList: [],
      semesterList: [],
      weekList: [],
      // scheduleDto 对象
      scheduleDto: {
        semesterId: null,
        clazzId: null,
        week: null
      },
      // 存放课程信息的数组:
      // 1-2 节课的课程数据
      courseList1: [],
      // 1-2 节课的课程数据
      courseList2: [],
      // 1-2 节课的课程数据
      courseList3: [],
      // 1-2 节课的课程数据
      courseList4: [],
      // 1-2 节课的课程数据
      courseList5: []
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
    this.courseList1 = this.initArr()
    this.courseList2 = this.initArr()
    this.courseList3 = this.initArr()
    this.courseList4 = this.initArr()
    this.courseList5 = this.initArr()
  },
  mounted() {},
  methods: {
    /**
     * 获取所有班级和学期数据
     */
    async getAllInfo() {
      let clazzRes = await API.init('/clazz/all', null, 'post')
      let semesterRes = await API.init('/semester/all', null, 'post')
      for (let i = 0; i < clazzRes.data.length; i++) {
        this.clazzList.push({
          name: clazzRes.data[i].name,
          id: clazzRes.data[i].pkClazzId
        })
      }
      for (let i = 0; i < semesterRes.data.length; i++) {
        this.semesterList.push({
          name: semesterRes.data[i].name,
          weekCount: semesterRes.data[i].weekCount,
          id: semesterRes.data[i].pkSemesterId
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
    },

    /**
     * 根据所选学期寻找出对应的周次
     */
    changeWeekCount() {
      // 遍历学期数组，查找出操作者选中的那一个选项值
      for (let i = 0; i < this.semesterList.length; i++) {
        if (this.form.semester == this.semesterList[i].name) {
          // 查找出当前选中学期对应的周次数（本学期内应有多少周的课程）
          this.weekList = this.semesterList[i].weekCount
          // 查找出当前选中学期对应的学期id，为下面查找课程做铺垫
          this.scheduleDto.semesterId = this.semesterList[i].id
          return
        }
      }
    },

    /**
     * 当选中的班级发生改变时，进行数据判断操作
     */
    changeClazz() {
      for (let i = 0; i < this.clazzList.length; i++) {
        if (this.form.clazz == this.clazzList[i].name) {
          // 查找出当前选中班级对应的班级id，为下面查找课程做铺垫
          this.scheduleDto.clazzId = this.clazzList[i].id
          return
        }
      }
    },

    /**
     * 根据 学期id、班级id、周次 查询出当周的课程信息
     */
    async showSchedule() {
      this.scheduleDto.week = this.form.week
      let scheduleRes = await API.init('/timetable/info', this.scheduleDto, 'post')
      // 本周内所有课程的数组
      let courseList = scheduleRes.data
      // 以上课时间将课程分组
      // 每天上午第一节课
      let cou1 = []
      // 每天上午第二节课
      let cou2 = []
      // 每天上午第三节课
      let cou3 = []
      // 每天上午第四节课
      let cou4 = []
      // 每天上午第五节课
      let cou5 = []
      for (let i = 0; i < courseList.length; i++) {
        let item = courseList[i]
        let time = item.time
        switch (time) {
          case 1:
            cou1.push(item)
            break
          case 2:
            cou2.push(item)
            break
          case 3:
            cou3.push(item)
            break
          case 4:
            cou4.push(item)
            break
          case 5:
            cou5.push(item)
            break
        }
      }
      // 依次遍历数组，拟造出一个完整的 td数组
      this.courseList1 = this.createTd(cou1)
      this.courseList2 = this.createTd(cou2)
      this.courseList3 = this.createTd(cou3)
      this.courseList4 = this.createTd(cou4)
      this.courseList5 = this.createTd(cou5)
    },

    /**
     * 传入一个数组对象，遍历并填充数组，拟造出一个完整的 td 数组（七天）
     */
    createTd(arr) {
      let array = []
      // 初始化 array 数组，默认 isShow = false, data = null
      for (let i = 0; i < 7; i++) {
        array[i] = {
          isShow: false
        }
      }
      // 根据 arr 数组内的数据，重新给 array数组赋值
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        item['isShow'] = true
        array[item.weekDay - 1] = item
      }
      return array
    },

    /**
     * 初始化 td数组的方法
     */
    initArr() {
      let array = []
      // 初始化 array 数组，默认 isShow = false, data = null
      for (let i = 0; i < 7; i++) {
        array[i] = {
          isShow: false
        }
      }
      return array
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
.info {
  display: flex;
  flex-direction: column;
}
</style>
