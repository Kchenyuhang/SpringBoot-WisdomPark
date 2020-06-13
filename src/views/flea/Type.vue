<template>
  <div class="type">
    <el-row>
      <el-col :span="4">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo "
          @open="handleOpen"
          @close="handleClose"
          background-color="#F5F5F5 "
          text-color="#607D8B"
          active-text-color="#607D8B"
          unique-opened="true"
        >
          <el-submenu v-for="(item, index) in typeMenu" :key="index" :index="item.typeName" unique-opened="true">
            <template slot="title">
              <span slot="title">{{ item.typeName }}</span>
            </template>
            <!-- 遍历二级标题 -->
            <div v-if="item.subTypes.length > 0">
              <el-menu-item
                v-for="(subitem, subindex) in item.subTypes"
                :key="subindex"
                @click="changeShowType(subitem.pkFleaTypeId)"
                unique-opened="true"
                >{{ subitem.typeName }}</el-menu-item
              >
            </div>
            <el-menu-item index="index">添加</el-menu-item>
          </el-submenu>

          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">添加</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <div class="typeShow">
        <el-form :model="typeShow" ref="typeShow">
          <el-form-item label="类型名称" prop="typeName">
            <el-input v-model="typeShow.typeName"></el-input>
          </el-form-item>
          <el-form-item label="类型地址" prop="typeUrl">
            <el-input v-model="typeShow.typeUrl"></el-input>
          </el-form-item>
          <el-form-item label="类型图标" prop="typeUrl">
            <img :src="typeShow.typeCoverUrl" style="width:300px;" />
          </el-form-item>
        </el-form>
      </div>
      <div class="typeBtn">
        <el-button size="medium" type="primary" @click="createBookShow = !createBookShow">修改</el-button>
        <el-button size="medium" type="danger" @click="handleDeleteMul">删除</el-button>
      </div>
      <div class="tab">
        <span>管理的艺术在于沟通的技巧和真诚。</span>
        <el-divider content-position="left"><i class="el-icon-place"></i></el-divider>
        <span></span>
        <el-divider><i class="el-icon-monitor"></i></el-divider>
        <span>夫为治有体，上下不可相侵!</span>
        <el-divider content-position="right">易之思之</el-divider>
      </div>
    </el-row>
  </div>
</template>

<script>
const API = require('../utils/api.js')
export default {
  name: 'Type',
  data() {
    return {
      typeMenu: [],
      showTypeId: 0,
      typeShow: {
        parentId: 0,
        pkFleaTypeId: 0,
        subTypes: [],
        typeCoverUrl: '',
        typeName: '',
        typeUrl: ''
      }
    }
  },
  components: {},
  created() {
    this.getAllType()
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    async getAllType() {
      let res = await API.init('/flea/type/all', null, 'post')
      console.log(res)
      this.typeMenu = res.data.types //源数据
      this.changeShowType(this.typeMenu[0].subTypes[0].pkFleaTypeId)
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    },
    changeShowType(type) {
      this.showTypeId = type
      for (let i = 0; i < this.typeMenu.length; i++) {
        for (let j = 0; j < this.typeMenu[i].subTypes.length; j++) {
          console.log(this.showTypeId + '--------------' + this.typeMenu[i].subTypes[j].pkFleaTypeId)
          if (this.showTypeId === this.typeMenu[i].subTypes[j].pkFleaTypeId) {
            this.typeShow.parentId = this.typeMenu[i].subTypes[j].parentId
            this.typeShow.pkFleaTypeId = this.typeMenu[i].subTypes[j].pkFleaTypeId
            this.typeShow.subTypes = this.typeMenu[i].subTypes[j].subTypes
            this.typeShow.typeCoverUrl = this.typeMenu[i].subTypes[j].typeCoverUrl
            this.typeShow.typeName = this.typeMenu[i].subTypes[j].typeName
            this.typeShow.typeUrl = this.typeMenu[i].subTypes[j].typeUrl
          }
        }
      }
      console.log('要展示的type的id为' + this.showTypeId)
      console.log('要展示的typeshow' + this.typeShow)
    }
  }
}
</script>

<style scoped lang="scss">
.type {
  position: relative;
  padding: 0;
  margin: 0;
}
.typeShow {
  position: relative;
  display: inline-block;
  // width: 100%;
  float: left;
  margin-top: 5%;
  margin-left: 12%;
}
.typeBtn {
  position: relative;
  display: inline-block;
  float: left;
  margin-top: 35%;
  margin-left: 5%;
}
.tab {
  position: relative;
  display: inline-block;
  float: left;
  width: 27%;
  margin-top: 5%;
  margin-left: -1%;
}
</style>
