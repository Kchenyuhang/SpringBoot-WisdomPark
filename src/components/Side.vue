<template>
  <div>
    <el-menu default-active="1-4-1" background-color="#304156" class="el-menu-vertical-demo sideBar" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-menu-item class="menu-title">
          <i class="el-icon-s-grid" style="font-size: 30px"></i>
          <span class="logo-title font-white">智慧校园后台</span>
      </el-menu-item>
      <el-submenu v-for="(item, index) in menuList" :key="index" :index="item.name">
        <template slot="title">
          <p class="row" @click="changeMenu(item)">
            <i :class="item.icon" style="flex: 0 0 20%; text-align: left;"></i>
            <span style="flex: 0 0 80%; text-align: left;" class="font-white">{{ item.name }}</span>
          </p>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="(item1, index1) in item.subMenus"
            :key="index1"
            @click="changeChildMenu(item1, item.name)"
            :route="item1.path"
            style="color: white"
            :index="index + '-' + index1"
            >{{ item1.name }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import Bus from '../js/bus'
export default {
  name: 'side',
  data() {
    return {
      isCollapse: true
    }
  },
  mounted() {
    var _this = this
    Bus.$on('isCollapse', function(isCollapse) {
      _this.isCollapse = isCollapse
    })
  },
  props: ['menuList'],
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    changeMenu(item) {
        //this.$router.push(item.path)
        Bus.$emit('menuName', item)
    },
    changeChildMenu(item1, parentName) {
      if (item1.path != null) {
        this.$router.push(item1.path)
      }
      Bus.$emit('childMenuName', item1, parentName)
    }
  }
}
</script>

<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-width: 200px;
  height: 100%;
  color: #bfcbd9;
} 

.logo-title {
  font-size: 14px;
  margin-left: 10px;
  font-weight: 600;
}

.sideBar {
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  overflow: hidden;
}

.menu-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.row {
  display: flex;
  align-items: center;
}

.router-link-active {
  text-decoration: none;
}

a {
  text-decoration: none;
}

.font-white {
  color: #bfcbd9;
}
</style>
