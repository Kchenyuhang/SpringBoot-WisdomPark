<template>
  <el-container style="display:flex; flex-direction: column;">
    <Nav></Nav>
    <Side :menuList="menuList" style="margin-top:10px"></Side>
  </el-container>
</template>
<script>
import Side from '../components/Side'
import Nav from '../components/Nav'
export default {
  name: 'Index',
  data() {
    return {
      menuList: [
        {
          icon: 'el-icon-turn-off',
          menu: 'Permission',
          submenu: [
            {
              menu: 'admin'
            },
            {
              menu: 'role'
            },
          ]
        },
        {
          icon: 'el-icon-postcard',
          menu: 'Configuration',
          path: '/admin',
          submenu: ['appVersion', 'statement', 'feedback']
        },
        {
          icon: 'el-icon-setting',
          menu: 'Base',
          path: '/role',
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
  components: {
    Side,
    Nav
  },
  created() {},
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
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
