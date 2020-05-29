<template>
  <div>
    <!-- <el-button @click="isCollapse = !isCollapse">收起</el-button> -->
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-submenu :index="index" v-for="(item, index) in menuList" :key="index">
        <template slot="title">
          <p class="row" @click="changeMenu(item)">
            <i :class="item.icon" style="  flex: 0 0 20%; text-align: left;"></i>
            <span style="  flex: 0 0 80%; text-align: left;">{{ item.menu }}</span>
          </p>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="index + '-' + index1"
            v-for="(item1, index1) in item.submenu"
            :key="index1"
            @click="changeChildMenu(item1)"
            >{{ item1.menu }}</el-menu-item
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
      this.$router.push(item.path)
      Bus.$emit('menuName', item.menu)
    },
    changeChildMenu(item1) {
      this.$router.push(item1.path)
      Bus.$emit('childMenuName', item1.menu)
    }
  }
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
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
</style>
