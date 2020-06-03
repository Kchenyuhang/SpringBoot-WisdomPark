<template>
  <div style="width:100%">
    <!-- 修改弹出框 -->
    <el-dialog title="编辑一卡通" :visible.sync="updatecenterDialogVisible" width="30%" left>
      <el-form :model="ruleForm" status-icon :rules="rules" :label-position="labelPosition" label-width="80px">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off" placeholder="123456"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="123456"></el-input>
        </el-form-item>
        <el-form-item label="绑定号码" prop="job_number">
          <el-input v-model.number="ruleForm.jobnumber"></el-input>
        </el-form-item>
        <el-form-item label="余额" prop="balance">
          <el-input v-model.number="ruleForm.balance"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updatecenterDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmUpdate">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 增加弹出框 -->
    <el-dialog title="新增一卡通" :visible.sync="addcenterDialogVisible" width="30%" center>
      <el-form :label-position="labelPosition" label-width="80px" :model="ruleForm1">
        <el-form-item required label="卡号" prop="cardNumber">
          <el-input v-model="ruleForm1.cardNumber"></el-input>
        </el-form-item>
        <el-form-item required label="绑定卡号" prop="jobNumber">
          <el-input v-model="ruleForm1.jobNumber"></el-input>
        </el-form-item>
        <el-form-item required label="卡号密码" prop="cardPassword">
          <el-input type="password" v-model="ruleForm1.cardPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm1.date1" style="width: 100%;">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker placeholder="创建时间" v-model="ruleForm1.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item required="" label="状态" prop="status">
          <el-radio-group v-model="ruleForm1.status">
            <el-radio label="true">激活</el-radio>
            <el-radio label="false">未激活</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item required label="余额" prop="cardbalance1">
          <el-input v-model="ruleForm1.cardbalance1"></el-input>
        </el-form-item>
        <el-form-item required="" label="删除标志" prop="isdeleted">
          <el-radio-group v-model="ruleForm1.isdeleted">
            <el-radio label="true">已删除</el-radio>
            <el-radio label="false">未删除</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addcenterDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 流水明细 -->
    <el-dialog title="流水查询" :visible.sync="datailcenterDialogVisible" width="30%" left>
      <el-form status-icon :label-position="labelPosition" label-width="80px">
        <el-collapse accordion>
          <div v-for="(item, index) in detailList" :key="index">
            <el-collapse-item>
              <template slot="title">
                {{ item.gmtCreate }}<i class="el-icon-s-shop" style="margin-left:15%"></i>{{ item.description }}
                -{{ item.orderMoney }}
              </template>
              <div><i class="el-icon-s-shop"></i>{{ item.description }}</div>
              <div>
                <h4>-{{ item.orderMoney }}</h4>
              </div>
              <div>交易成功</div>
              <div>
                <span style="margin-left:-10%">付款方式</span> <span style="margin-left:25%">{{ item.payMethod }}</span>
              </div>
              <div>
                <span style="margin-left:-10%">交易流水号</span><span style="margin-left:25%">{{ item.orderNumber }}</span>
              </div>
              <div>
                <span style="margin-left:-5%"> 创建时间</span><span style="margin-left:18%">{{ item.gmtCreate }}</span>
              </div>
            </el-collapse-item>
          </div>
        </el-collapse>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="datailcenterDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <div class="tab-hearder">
      <el-row style="margin-left:-80%;margin-top:1%">
        <el-button size="mini" ty pe="primary" @click="addcenterDialogVisible = true">增加</el-button>
        <el-button size="mini" type="warning" disabled>修改</el-button>
        <el-button size="mini" type="danger" disabled>删除</el-button>
        <el-button type="success" size="mini">导出</el-button>
      </el-row>
    </div>

    <!-- 表格展示 -->
    <el-table :data="cardList" style="margin-top:2%;width:100%">
      <el-table-column label="卡号" width="150">
        <template slot-scope="scope">
          <span style="margin-left:-5%">{{ scope.row.cardNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="卡密" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.cardPassword }}</span>
        </template>
      </el-table-column>
      <el-table-column label="绑定账号" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.jobNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="余额" width="150">
        <template slot-scope="scope">
          <span>{{ scope.row.cardBalance }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180" :formatter="onLineStatus">
        <template> </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{ scope.row.gmtCreate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="primary" @click="handleDetail(scope.$index, scope.row)">流水账单</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 删除提示框 -->
    <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
      <div class="del-dialog-cnt">一卡通信息删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
    <div class="block" style="margin-top:2%">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      cardList: [],
      detailList: [],
      currentPage: 0,
      total: 40,
      pageSize: 10,
      updatecenterDialogVisible: false,
      addcenterDialogVisible: false,
      datailcenterDialogVisible: false,
      delVisible: false, //删除提示弹框的状态
      value1: '',
      input: '',
      msg: '', //记录每一条的信息，便于取id
      ruleForm: {
        pass: '',
        checkPass: '',
        balance: '',
        jobnumber: ''
      },
      ruleForm1: {
        jobNumber: '',
        cardNumber: '',
        cardPassword: '',
        date2: '',
        date1: '',
        status: '',
        isdeleted: '',
        cardbalance1: ''
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getCardAll()
  },
  watch: {
    pageSize: function() {
      this.getCardAll()
    },
    currentPage: function() {
      this.getCardAll()
    },
    total: function() {}
  },
  methods: {
    //激活状态
    onLineStatus: function(row, column) {
      console.log(column)
      return row.status == 1 ? '激活' : row.status == 0 ? '未激活' : 'aaa'
    },
    // 分页查询所有
    getCardAll() {
      this.axios({
        method: 'post',
        url: 'http://localhost:8080/card/all',
        data: {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
      })
        .then((res) => {
          this.cardList = res.data.data
          console.log(res.data.data.length)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    // 当前页展示数据
    handleSizeChange: function(pageSize) {
      this.pageSize = pageSize
    },
    // 当前页
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage
    },
    //单行删除
    handleDelete(index, row) {
      this.idx = index
      this.msg = row //每一条数据的记录
      this.delVisible = true
    },
    // 确定删除
    deleteRow() {
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/card/deletion/{pk_card_id}',
        params: {
          pk_card_id: this.msg.pkCardId
        }
      })
        .then((res) => {
          if (res.data) {
            this.getCardAll()
            this.$message.success('删除成功')
          }
        })
        .catch((error) => {
          console.log(error)
          this.$message.error('一卡通信息删除失败')
        })
      this.delVisible = false //关闭删除提示模态框
    },
    //编辑
    handleUpdate(index, row) {
      this.idx = index
      this.msg = row //每一条数据的记录
      this.updatecenterDialogVisible = true
    },
    //修改一卡通信息
    confirmUpdate() {
      this.axios({
        method: 'put',
        url: 'http://localhost:8080/card/modification',
        data: {
          pkCardId: this.msg.pkCardId,
          status: this.msg.status,
          cardPassword: this.ruleForm.checkPass,
          jobNumber: this.ruleForm.jobnumber,
          cardBalance: this.ruleForm.balance
        }
      })
        .then((res) => {
          this.updatecenterDialogVisible = false
          this.getCardAll()
          if (res.data.data == null) {
            this.$message.success('该一卡通未激活，信息修改失败')
          } else {
            this.$message.success('信息修改成功')
          }
          console.log(res)
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    //新增一卡通
    confirmAdd() {
      this.axios({
        method: 'post',
        url: 'http://localhost:8080/card/increase',
        data: {
          cardNumber: this.ruleForm1.cardNumber,
          status: this.ruleForm1.status,
          cardPassword: this.ruleForm1.cardPassword,
          jobNumber: this.ruleForm1.jobNumber,
          cardBalance: this.ruleForm1.cardbalance1,
          isDeleted: this.ruleForm1.isdeleted,
          gmtCreate: '2020-05-27 08:36:50'
        }
      })
        .then((res) => {
          this.addcenterDialogVisible = false
          this.getCardAll()
          if (res.data.data == null) {
            this.$message.success('该一卡通账号已存在，请勿重复新增')
          } else {
            this.$message.success('一卡通添加成功')
          }
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    //明细
    handleDetail(index, row) {
      this.idx = index
      this.msg = row //每一条数据的记录
      this.datailcenterDialogVisible = true
      this.getDetail()
    },
    //清单明细
    getDetail() {
      console.log(this.msg.jobNumber)
      this.axios({
        method: 'get',
        url: 'http://localhost:8080/card/consume',
        params: {
          job_number: this.msg.jobNumber
        }
      })
        .then((res) => {
          this.detailList = res.data.data
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped lang="scss"></style>
