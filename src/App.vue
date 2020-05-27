<template>
  <div id="app">
    <div id="nav">
      <!-- 权限管理相关操作 -->
      <h4
        @click="perShow = !perShow"
        style="cursor: pointer;"
      >Permission</h4>
      <div
        v-show="perShow"
        style=" margin-left: 10px;display: flex; flex-direction: column; align-items: flex-start;"
      >
        <router-link to="/admin"> admin</router-link>
        <router-link to="/role"> role</router-link>
      </div>
      <!-- 配置管理相关操作 -->
      <h4
        @click="conShow = !conShow"
        style="cursor: pointer;"
      >Configuration</h4>
      <div
        v-show="conShow"
        style=" margin-left: 10px;display: flex; flex-direction: column; align-items: flex-start;"
      >
        <router-link to="/appVersion"> appVersion</router-link>
        <router-link to="/statement"> statement</router-link>
        <router-link to="/feedback"> feedback</router-link>
      </div>
      <!-- 基础管理相关操作 -->
      <h4
        @click="baseShow = !baseShow"
        style="cursor: pointer;"
      >Base</h4>
      <div
        v-show="baseShow"
        style=" margin-left: 10px;display: flex; flex-direction: column; align-items: flex-start;"
      >
        <router-link to="/tower"> tower</router-link>
        <router-link to="/room"> room</router-link>
        <router-link to="/semester"> semester</router-link>
        <router-link to="/clazz"> clazz</router-link>
        <router-link to="/student"> student</router-link>
        <router-link to="/teacher"> teacher</router-link>
      </div>
      <!-- 账号管理相关操作 -->
      <h4
        @click="accShow = !accShow"
        style="cursor: pointer;"
      >Account</h4>
      <div
        v-show="accShow"
        style=" margin-left: 10px;display: flex; flex-direction: column; align-items: flex-start;"
      >
        <router-link to="/account"> account</router-link>
      </div>
      <!-- 图书管理相关操作 -->
      <h4
        @click="bookShow = !bookShow"
        style="cursor: pointer;"
      >Book</h4>
      <div
        v-show="bookShow"
        style=" margin-left: 10px;display: flex; flex-direction: column; align-items: flex-start;"
      >
        <router-link to="/book"> book</router-link>
        <router-link to="/borrow"> borrow</router-link>
      </div>
      <!-- 一卡通管理相关操作 -->
      <h4
        @click="cardShow = !cardShow"
        style="cursor: pointer;"
      >Card</h4>
      <div
        v-show="cardShow"
        style=" margin-left: 10px;display: flex; flex-direction: column; align-items: flex-start;"
      >
        <router-link to="/card"> card</router-link>
        <router-link to="/order"> order</router-link>
        <router-link to="/reportLoss"> reportLoss</router-link>
      </div>
      <!-- 资讯管理相关操作 -->
      <h4
        @click="infoShow = !infoShow"
        style="cursor: pointer;"
      >Information</h4>
      <div
        v-show="infoShow"
        style=" margin-left: 10px;display: flex; flex-direction: column; align-items: flex-start;"
      >
        <router-link to="/infoType"> infoType</router-link>
        <router-link to="/infoManage"> infoManage</router-link>
      </div>
      <!-- 教务管理相关操作 -->
      <h4
        @click="adminShow = !adminShow"
        style="cursor: pointer;"
      >administration</h4>
      <div
        v-show="adminShow"
        style=" margin-left: 10px;display: flex; flex-direction: column; align-items: flex-start;"
      >
        <router-link to="/timeTable"> timeTable</router-link>
        <router-link to="/examiination"> examiination</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Role',
  data() {
    return {
      perShow: false,
      conShow: false,
      baseShow: false,
      accShow: false,
      bookShow: false,
      cardShow: false,
      infoShow: false,
      adminShow: false
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {},
  computed: {}
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: 2avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
}

#nav {
  padding: 30px;
  display: flex;
  flex-direction: column;
  margin-right: 200px;
  align-items: flex-start;

  h4 {
    color: rgb(126, 87, 194);
  }

  a {
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 20px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
