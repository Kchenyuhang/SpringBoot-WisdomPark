<template>
  <div class="container">
    <el-form label-width="100px" class="demo-dynamic login-form">
      <el-row class="login-row">
        <el-col>
          <p class="login-form-title">智慧校园后台管理系统</p>
        </el-col>
        <el-col>
          <el-input v-model="user.account" placeholder="请输入内容" prefix-icon="el-icon-s-custom"></el-input>
        </el-col>
        <el-col>
          <el-input placeholder="请输入密码" v-model="user.password" show-password prefix-icon="el-icon-s-goods"></el-input>
        </el-col>
        <el-col style="display:flex">
          <el-input style="width: 60%" v-model="vertifyCode" placeholder="请输入内容" prefix-icon="el-icon-s-goods"></el-input>
          <p style="width:38%">13213</p>
        </el-col>
        <el-col style="text-align:left">
          <el-checkbox v-model="checked">记住我</el-checkbox>
        </el-col>
        <el-col>
          <el-button type="primary" style="width: 100%;" @click="login()">登录</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      checked: true,
      user: {
        account: '',
        password: ''
      },
      vertifyCode: ''
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    login() {
      this.axios({
        method: 'post',
        url: 'http://localhost:8080/sysUser/login',
        data: {
          account: this.user.account,
          password: this.user.password,
          code: this.vertifyCode
        }
        // 设置请求头Content-Type
        //headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then((res) => {
        this.$store.commit('setToken', res.data.data.token)
        localStorage.setItem('token', res.data.data.token)
        this.$store.commit('setUser', res.data.data.user)
        localStorage.setItem('user', JSON.stringify(res.data.data.user))
        console.log(res.data.data.user)
        this.$router.push('/')
      })
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.container {
  background: url('../assets/bg.jpeg') no-repeat;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 500px;
  background-color: white;
  height: 400px;
  border-radius: 5px;
  padding: 20px 20px;
  &-title {
    text-align: center;
    width: 100%;
    font-size: 24px;
    color: #707070;
    margin-bottom: 10px;
  }
}

.el-row {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.el-col {
  width: 100%;
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
  margin-top: 10px;
  display: flex;
  align-items: center;
}
// .login-row {
//     display: flex;
//     width: 100%;
//     flex-direction: column;
// }
</style>
