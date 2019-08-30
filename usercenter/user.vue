<template>
  <div class="table">
    <el-button class="btn" type="primary" @click="dialog2.show = true">新增患者</el-button>
    <!-- 患者管理 -->
    <el-table
      :data="list"
    >
      <el-table-column
        prop="patientId"
        label="患者id"
        align="center"
      />
      <el-table-column
        prop="patientName"
        label="患者姓名"
        align="center"
      />
      <el-table-column
        label="性别"
        align="center"
      >
        <template slot-scope="scope">
          {{parseInt(scope.row.patientSex) === 1 ? "男" : ""}}
          {{parseInt(scope.row.patientSex) === 0 ? "女" : ""}}
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <!-- 删除 -->
          <el-button @click="del(scope.row)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 对话框1，提示是否删除患者的信息 -->
    <el-dialog
      title="提示"
      :visible="dialog1.show"
      width="30%"
      :before-close="cancel1"
    >
      <span>您确认要删除<span class="red">{{dialog1.row && dialog1.row.patientName}}</span>这名患者吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel1()">取 消</el-button>
        <el-button type="primary" @click="confirm1">确 认</el-button>
      </span>
    </el-dialog>
    <!-- 对话框3，新增患者 -->
    <el-dialog
      title="新增患者"
      :visible="dialog2.show"
      :before-close="cancel2"
      class="dialog2"
    >
      <div class="form-item">
        <div class="label">患者身份证号：</div>
        <el-input v-model="dialog2.id"></el-input>
      </div>
      <div class="form-item">
        <div class="label">患者姓名：</div>
        <el-input v-model="dialog2.name"></el-input>
      </div>
      <div class="form-item">
        <div class="label">患者性别：</div>
        <div style="width: 100%;">
          <el-radio v-model="dialog2.sex" label="1">男</el-radio>
          <el-radio v-model="dialog2.sex" label="0">女</el-radio>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel2()">取 消</el-button>
        <el-button type="primary" @click="confirm2">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import  {
  getPatientList,
  deletePatient,
  addPatient,
} from '@/api/api';
export default {
  created() {
    this.getList();
  },
  data() {
    return {
      // list: [
      //   {
      //     patientId: 222201195511300000,
      //     patientName: '张狗蛋',
      //     patientSex: 1,
      //   },
      //   {
      //     patientId: 222201195511300001,
      //     patientName: "李全蛋",
      //     patientSex: 1,
      //   },
      // ],
      list: [],
      dialog1: { show: false, },
      dialog2: {
        show: false, // 新增患者对话框
        id: '',
        name: '',
        sex: '1',
      },
    };
  },
  methods: {
    getList() {
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let params = {
        userId: this.$store.state.userId,
      };
      // 成功的回调
      let success = (data) => {
        loading.close();
        this.list = data;
      };
      // 失败的回调
      let fail = (msg) => {
        this.$message.error(msg || "发生异常请重试");
        loading.close();
      };
      getPatientList(params, success, fail);
    },
    del(row) {
      this.dialog1.row = row;
      this.dialog1.show = true;
    },
    confirm1() {
      let params = {
        patientId: this.dialog1.row.patientId,
      };
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      // 成功的回调
      let success = () => {
        this.$message.success("删除成功");
        loading.close();
        this.getList();
      };
      // 失败的回调
      let fail = (msg) => {
        this.$message.error(msg || "发生异常请重试");
        loading.close();
      };
      deletePatient(params, success, fail);
      this.dialog1.show = false;
    },
    cancel1() {
      this.dialog1.show = false;
    },
    confirm2() {
      if(!this.$store.state.userId) {
        this.$message.error("请重新登陆");
        return;
      }
      // 网上找的身份证号正则表达式
      const idReg =  /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      if(!idReg.test(this.dialog2.id)){
        this.$message.error("请输入合法身份证号码");
        return;
      }
      if(this.dialog2.name.length > 10 || this.dialog2.name < 2) {
        this.$message.error("请输入合法姓名");
        return;
      }
      let params = {
        patientId: this.dialog2.id,
        patientName: this.dialog2.name,
        patientSex: parseInt(this.dialog2.sex),
        userId: this.$store.state.userId,
      };
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      // 成功的回调
      let success = () => {
        this.dialog2.show = false;
        this.$message.success("添加成功");
        loading.close();
        this.getList();
      };
      // 失败的回调
      let fail = (msg) => {
        this.$message.error(msg || "发生异常请重试");
        loading.close();
      };
      addPatient(params, success, fail);
    },
    cancel2() {
      this.dialog2.show = false;
      this.dialog2.id = "";
      this.dialog2.name = "";
      this.dialog2.sex = "1";
    },
  },
}
</script>
<style lang="scss" scoped>
.table{
  width: 100%;
  box-sizing: border-box;
  padding: 20px 15% 0 10%;
  text-align: left;
}
.btn{
  margin-bottom: 30px;
}
.red{
  color: red;
}

.dialog2{
  .form-item{
    display: flex;
    align-items: center;
    width: 70%;
    margin: 20px auto;
    .label{
      margin-right: 20px;
      width: 40%; /* el-input占100.. */
      text-align: right;
    }
  }
}
</style>
