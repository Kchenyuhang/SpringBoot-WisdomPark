<template>
  <el-container class="container">
    <Side :menuList="menuList" style="position: relative; top: 0;height: 100%"></Side>
    <div style="flex: 1 1 auto;" class="body" :class="{ body1: isCollapse }">
      <Nav></Nav>
      <div style="height: 40px;line-height: 40px;margin-top: 100px; background-color: #f8f8f8; padding-left: 10px" class="tl ">
        <span>推荐歌曲</span>
      </div>
      <router-view />
    </div>
  </el-container>
</template>
<script>
import Side from '../components/Side'
import Nav from '../components/Nav'
import Bus from '../js/bus'
export default {
  name: 'Index',
  data() {
    return {
      menuList: [],
      isCollapse: true
    }
  },
  components: {
    Side,
    Nav
  },
  created() {
    this.getMenuList()
  },
  mounted() {
    var _this = this
    Bus.$on('isCollapse', function(isCollapse) {
      _this.isCollapse = isCollapse
    })
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    getMenuList() {
      localStorage.setItem('token', 'lksdjfklsdjfiosiofja;ljdfsdjfkljs')
      let phoneNumber = JSON.parse(localStorage.getItem('user')).sysUserPhoneNumber
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/sysUser/menus',
        params: {
          phoneNumber: phoneNumber
        },
        // 设置请求头Content-Type
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then((res) => {
        console.log(res.data.data)
        this.menuList = res.data.data
        this.$store.commit('setMenuList', res.data.data)
        localStorage.setItem('menuList', JSON.stringify(res.data.data))
      })
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  max-width: 100%;
  height: 100%;
  width: 100%;
  padding: 0;
}

.body {
  margin-left: 200px;
}

.body1 {
  margin-left: 60px;
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
