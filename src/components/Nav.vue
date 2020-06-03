<template>
  <el-container>
    <el-header height="60px" style="background-color: rgb(38, 38, 38)">
      <el-row class="header">
        <el-col :span="3" class="row-bg text" style="color: #fff; text-align:left">
          <span style="margin-right: 10px">后台管理系统</span>
          <i class="el-icon-s-fold" @click="changeSide"></i>
        </el-col>
        <el-col :span="21">
          <el-row class="nav-top">
            <el-col style="text-align:left">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">{{ menu.name }}</el-breadcrumb-item>
                <el-breadcrumb-item v-if="menu.childName !== ''">{{ menu.childName }}</el-breadcrumb-item>
              </el-breadcrumb>
            </el-col>
            <el-col class="header-right">
              <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
                <i class="el-icon-full-screen header-icon" style="margin-right:30px"></i>
              </el-tooltip>
              <el-dropdown>
                <el-avatar :size="50" src="https://empty">
                  <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                </el-avatar>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item><span @click="logout()">退出</span></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
          <el-row></el-row>
        </el-col>
      </el-row>
    </el-header>
  </el-container>
</template>

<script>
import Bus from '../js/bus'
export default {
  name: 'Nav',
  data() {
    return {
      isCollapse: true,
      menu: {
        name: '主页',
        childName: ''
      }
    }
  },
  components: {},
  created() {},
  mounted() {
    var _this = this
    Bus.$on('menuName', function(menuName) {
      _this.menu.name = menuName
    }),
      Bus.$on('childMenuName', function(childMenuName) {
        _this.menu.childName = childMenuName
      })
  },
  methods: {
    errorHandler() {
      alert('头像加载失败')
    },
    changeSide() {
      this.isCollapse = !this.isCollapse
      Bus.$emit('isCollapse', this.isCollapse)
    },
    logout() {
      alert(1)
      localStorage.removeItem('user')
      localStorage.removeItem('menuList')
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-icon {
  font-size: 30px;
  color: white;
}

.header-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
