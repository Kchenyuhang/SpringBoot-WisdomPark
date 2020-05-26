<template>
  <el-container>
    <el-header height="50px" style="background-color: rgb(38, 38, 38)">
      <el-row class="row-bg text" style="color: #fff">后台管理系统</el-row>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <el-col :span="24">
          <el-menu
            router
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="rgb(48, 65, 86)"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
          >
            <el-submenu v-for="(item, index) in menuList" :key="index" :index="index + ''">
              <template slot="title" style="height: 100px; margin-left: 0">
                <i :class="item.icon"></i>
                <span>{{ item.menu }}</span>
              </template>
              <el-menu-item-group v-if="item.submenu != null">
                <el-menu-item v-for="(obj, i) in item.submenu" :key="i" :index="obj">{{ obj }}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      menuList: [
        {
          icon: 'el-icon-turn-off',
          menu: 'Permission',
          submenu: ['admin', 'role']
        },
        {
          icon: 'el-icon-postcard',
          menu: 'Configuration',
          submenu: ['appVersion', 'statement', 'feedback']
        },
        {
          icon: 'el-icon-setting',
          menu: 'Base',
          submenu: ['tower', 'room', 'semester', 'clazz', 'student', 'teacher']
        },
        {
          icon: 'el-icon-user',
          menu: 'Account',
          submenu: ['account']
        },
        {
          icon: 'el-icon-notebook-2',
          menu: 'Book',
          submenu: ['book', 'borrow']
        },
        {
          icon: 'el-icon-wallet',
          menu: 'Card',
          submenu: ['card', 'order', 'reportLoss']
        },
        {
          icon: 'el-icon-money',
          menu: 'Information',
          submenu: ['infoType', 'infoManage']
        },
        {
          icon: 'el-icon-s-grid',
          menu: 'Administration',
          submenu: ['timeTable', 'examiination']
        }
      ]
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.header {
  width: 800px;
  height: 50px;
  background-color: lightgreen;
}

.side {
  background-color: blue;
}
.area {
  background-color: red;
}
.text {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
</style>
