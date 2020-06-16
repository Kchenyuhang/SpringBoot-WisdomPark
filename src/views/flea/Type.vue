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
            <el-menu-item index="index" @click="addSecondType">添加</el-menu-item>
          </el-submenu>

          <el-menu-item index="4" @click="addFirstType">
            <i class="el-icon-setting"></i>
            <span slot="title">添加</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <div class="typeShow">
        <el-form :model="typeShow" :rules="typeShowRules" ref="typeShow">
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
      <div class="typeBtn" v-if="isTypeAdd">
        <el-button size="medium" type="primary" @click="increasedType">保存</el-button>
        <el-button size="medium" type="danger" @click="resetAddType">重置</el-button>
      </div>
      <div class="typeBtn" v-else>
        <el-button size="medium" type="primary" @click="changeType">修改</el-button>
        <el-button size="medium" type="danger" @click="deleteTypeById">删除</el-button>
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
      parentId: 0,
      isTypeAdd: false,
      typeShow: {
        parentId: 0,
        pkFleaTypeId: 0,
        subTypes: [],
        typeCoverUrl: '',
        typeName: '',
        typeUrl: ''
      },
      typeShowRules: {
        typeCoverUrl: [{ required: true, message: '请输入图片', trigger: 'blur' }],
        typeName: [{ required: true, message: '请输入类型名称', trigger: 'blur' }],
        typeUrl: [{ required: true, message: '请输入类型地址', trigger: 'blur' }]
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
      this.typeMenu = res.data.types //源数据
      this.changeShowType(this.typeMenu[0].subTypes[0].pkFleaTypeId)
    },
    handleOpen(key, keyPath) {
      this.$refs['typeShow'].clearValidate()
      console.log(key, keyPath)
      for (let i = 0; i < this.typeMenu.length; i++) {
        for (let j = 0; j < this.typeMenu[i].subTypes.length; j++) {
          if (this.showTypeId === this.typeMenu[i].subTypes[j].pkFleaTypeId) {
            this.typeShow.parentId = this.typeMenu[i].subTypes[j].parentId
            this.typeShow.pkFleaTypeId = this.typeMenu[i].subTypes[j].pkFleaTypeId
            this.typeShow.subTypes = this.typeMenu[i].subTypes[j].subTypes
            this.typeShow.typeCoverUrl = this.typeMenu[i].subTypes[j].typeCoverUrl
            this.typeShow.typeName = this.typeMenu[i].subTypes[j].typeName
            this.typeShow.typeUrl = this.typeMenu[i].subTypes[j].typeUrl
          }
        }
        if (key === this.typeMenu[i].typeName) {
          this.parentId = this.typeMenu[i].pkFleaTypeId
          break
        }
      }
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
      this.isTypeAdd = false
    },
    changeShowType(type) {
      this.showTypeId = type
      this.isTypeAdd = false
      for (let i = 0; i < this.typeMenu.length; i++) {
        for (let j = 0; j < this.typeMenu[i].subTypes.length; j++) {
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
    },
    async deleteTypeById() {
      let data = {
        pkId: this.showTypeId
      }
      alert('要删除的id:' + data)
      await API.init('flea/type/delete', data, 'post')
      this.getAllType()
    },
    changeTypeCheck() {
      let nameFlag = true
      let urlFlag = true
      for (let i = 0; i < this.typeMenu.length; i++) {
        for (let j = 0; j < this.typeMenu[i].subTypes.length; j++) {
          if (this.typeShow.typeName !== this.typeMenu[i].typeName) {
            if (
              this.typeShow.typeName === this.typeMenu[i].subTypes[j].typeName &&
              this.typeShow.pkFleaTypeId !== this.typeMenu[i].subTypes[j].pkFleaTypeId
            ) {
              console.log('该二级类型已存在')
              nameFlag = false
              break
            } else {
              console.log('名称校验成功')

              for (let i = 0; i < this.typeMenu.length; i++) {
                for (let j = 0; j < this.typeMenu[i].subTypes.length; j++) {
                  if (this.typeShow.typeUrl !== this.typeMenu[i].typeUrl) {
                    if (
                      this.typeShow.typeUrl === this.typeMenu[i].subTypes[j].typeUrl &&
                      this.typeShow.pkFleaTypeId !== this.typeMenu[i].subTypes[j].pkFleaTypeId
                    ) {
                      console.log('该路径已存在')
                      urlFlag = false
                      break
                    }
                  } else {
                    urlFlag = false
                    console.log('该路径已存在')
                    break
                  }
                }
              }
            }
          } else {
            nameFlag = false
            console.log('该一级类型已存在')
            break
          }
        }
      }
      if (!nameFlag) {
        this.$message.error('修改失败，该类型名称重复！')
      }

      if (!urlFlag) {
        this.$message.error('修改失败，该类型路径重复！')
      }
      if (nameFlag && urlFlag) {
        return true
      } else {
        return false
      }
    },
    async changeType() {
      let flag = true
      this.$refs['typeShow'].validate((valid) => {
        if (!valid) {
          flag = false
        }
      })
      if (flag && this.changeTypeCheck()) {
        this.$message.success('修改成功!')
        let data = {
          pkFleaTypeId: this.typeShow.pkFleaTypeId,
          parentId: this.typeShow.parentId,
          subTypes: this.subTypes,
          typeCoverUrl: this.typeShow.typeCoverUrl,
          typeName: this.typeShow.typeName,
          typeUrl: this.typeShow.typeUrl,
          isDeleted: false
        }
        await API.init('flea/type/modify', data, 'post')
      }
    },
    addFirstType() {
      this.parentId = 0
      console.log(this.parentId)
      this.isTypeAdd = true
      this.resetAddType()
    },
    addSecondType() {
      console.log(this.parentId)
      this.isTypeAdd = true
      this.resetAddType()
    },
    resetAddType() {
      // 图片不可修改，此处先不变
      // this.typeShow.typeCoverUrl = ''
      this.typeShow.typeName = ''
      this.typeShow.typeUrl = ''
    },
    async increasedType() {
      let date = {
        //pkFleaTypeId可为任意值，后端不用
        parentId: this.parentId,
        typeCoverUrl: this.typeShow.typeCoverUrl,
        typeName: this.typeShow.typeName,
        typeUrl: this.typeShow.typeUrl
      }
      console.log(date)
      let res = await API.init('flea/type/increased', date, 'post')
      console.log(res)
      if (res.code === 1) {
        this.$message.success('添加成功!')
      } else {
        this.$message.error('添加失败')
      }
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
