<template>
  <el-container style="display:flex; flex-direction: column;">
    <Nav></Nav>
    <div style="display:flex">
    <Side :menuList="menuList" style="margin-top:10px"></Side>
    <router-view/>
    </div>
  </el-container>
</template>
<script>
import Side from '../components/Side'
import Nav from '../components/Nav'
export default {
  name: 'Index',
  data() {
    return {
      menuList: []
    }
  },
  components: {
    Side,
    Nav
  },
  created() {
    this.getMenuList()
  },
  mounted() {},
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    getMenuList() {
      localStorage.setItem('token', 'lksdjfklsdjfiosiofja;ljdfsdjfkljs')
      let phoneNumber = JSON.parse(localStorage.getItem("user")).sysUserPhoneNumber
      alert(phoneNumber)
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
  computed: {
  }
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
