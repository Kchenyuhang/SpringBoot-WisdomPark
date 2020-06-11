<template>
  <el-container>
    <el-header height="80px" style="box-shadow: 0px 3px 5px 0px #ddd;  padding: 0">
      <el-row class="nav-header">
        <el-col class="nav-header-left">
          <i class="el-icon-s-fold" style="font-size: 20px" @click="changeSide"></i>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">{{ menu.name }}</el-breadcrumb-item>
            <el-breadcrumb-item v-if="menu.childName !== ''">{{ menu.childName }}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
        <el-col class="nav-header-right">
          <img src="@/assets/search.png" alt="" style="height: 28px; width:28px" />
          <el-tooltip class="item" effect="dark" content="全屏" placement="bottom">
            <img src="@/assets/full_screen.png" alt="" style="height: 28px; width:28px" />
          </el-tooltip>
          <el-dropdown>
            <el-avatar :size="45" src="https://empty">
              <img :src="user.sysUserAvatar" />
            </el-avatar>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><span @click="logout()">退出</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <el-row class="nav-bottom">
        <el-tag v-for="(tag, index) in tags" @click="jumpTo(tag.path)"  class="nav-bottom-tag" :key="tag.name" :type="''" effect="dark">
          {{ tag.name }}
          <span :class="{ changeIcon: index == currentIndex }" @click="deleteTag(tag)" @mouseenter="currentIndex = index" @mouseleave="currentIndex = -1">
            <img src="@/assets/chahao.png" alt="" style="height: 12px; width:12px" v-show="iconShow" />
            <img src="@/assets/chahao_white.png" alt="" style="height: 12px; width:12px" v-show="!iconShow" />
          </span>
        </el-tag>
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
      },
      iconShow: true,
      currentIndex: -1,
      tags: [
        { name: '标签一', path: 'card' },
        { name: '标签二', path: 'card' },
        { name: '标签三', path: 'tower' }
      ],
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  components: {},
  created() {
    console.log(this.user)
  },
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
      localStorage.removeItem('user')
      localStorage.removeItem('menuList')
      localStorage.removeItem('token')
      this.$router.push('/login')
    },
    showTag(index) {
      this.currentIndex = index
    },
    deleteTag(tag) {
      let index = this.tags.indexOf(tag)
      alert(index)
      this.tags.splice(index, 1)
    },
    jumpTo(path) {
      this.$router.push(path)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  border-bottom: 2px solid #ddd;
  &-left {
    text-align: left;
    display: flex;
    align-items: center;
    margin-left: 20px;
    i {
      margin-right: 15px;
    }
  }
  &-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 20px;
    img {
      margin-right: 15px;
    }
  }
}

.nav-bottom {
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  &-tag {
    height: 26px;
    border: 1px solid #ddd;
    margin-right: 5px;
    line-height: 26px;
    color: black;
    background-color: white;
    .changeIcon {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #eee;
      img {
        width: 12px;
        height: 12px;
      }
    }
  }
  //@debugmargin-bottom: 20px;
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
</style>
