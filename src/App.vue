<template>
  <div id="app">
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
