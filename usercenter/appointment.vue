<template>
  <div class="appointment">
    <el-button class="btn" type="primary" @click="$router.push('/rota/notice')">预约挂号</el-button>

     <el-table
      :data="list"
    >
      <el-table-column
        prop="bookingId"
        label="预约单号"
        align="center"
      />
      <el-table-column
        prop="doctorName"
        label="预约医生"
        align="center"
      />
      <el-table-column
        prop="patientName"
        label="患者姓名"
        align="center"
      />

      <el-table-column
        prop="orderTime"
        label="预约时间"
        align="center"
      />

      <el-table-column
        prop="bookingTime"
        label="就诊时间"
        align="center"
      />

      <el-table-column
        label="查看详情"
        align="center"
        width="200px"
      >
        <template slot-scope="scope">
          <!-- 根据doctorId查询doctorname -->
          <el-button @click="detail(scope.row)" type="info" size="mini">查看详情</el-button>
          <el-button @click="del(scope.row)" type="danger" size="mini">取消预约</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <app-footer></app-footer> -->

    <!-- 对话框1，取消预约的弹窗 -->
    <el-dialog
      title="提示"
      :visible="dialog1.show"
      width="30%"
      :before-close="cancel1"
    >
      <span>您确认要取消<span class="red">{{dialog1.row && dialog1.row.bookingId}}</span>的预约吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel1()">取 消</el-button>
        <el-button type="primary" @click="confirm1">确 认</el-button>
      </span>
    </el-dialog>
    <!-- 对话框2， 查看预约 -->
    <el-dialog
      title="新增患者"
      :visible="dialog2.show"
      :before-close="cancel2"
      class="dialog2"
    >
      <div class="form-item">
        <div class="label">预约单号：</div>
        <el-input v-model="dialog2.row.bookingId" disabled=""></el-input>
      </div>
      <div class="form-item">
        <div class="label">预约患者id：</div>
        <el-input v-model="dialog2.row.patientId" disabled=""></el-input>
      </div>
      <div class="form-item">
        <div class="label">预约患者姓名：</div>
        <el-input v-model="dialog2.row.patientName" disabled=""></el-input>
      </div>
      <div class="form-item">
        <div class="label">预约医生姓名：</div>
        <el-input v-model="dialog2.doctorName" disabled=""></el-input>
      </div>
      <div class="form-item">
        <div class="label">预约订单时间：</div>
        <el-input v-model="dialog2.row.bookingTime" disabled=""></el-input>
      </div>
      <div class="form-item">
        <div class="label">预约就诊时间：</div>
        <el-input v-model="dialog2.row.orderTime" disabled=""></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel2()">关闭</el-button>
      </div>
    </el-dialog>
    
  </div>
</template>

<script>
import { 
  getBookingList,
  deleteBooking,
  findDoctorById,
} from '@/api/api';
// import AppFooter from '@/components/footer';

export default {
  // components: {
  //   AppFooter,
  // },
  created() {
    this.getList();
  },
  data() {
    return {
      list: [],
      dialog1: { show: false, },
      dialog2: { show: false, row: {}, },
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
        // loading.close();
        // let keys = Object.keys(data);
        // this.list = keys.map(key => ({...data[key], patientName: key}));
        loading.close();
        let list = [];
        let keys = Object.keys(data);
        keys.forEach(key => {
          let arr = data[key];
          if(arr.length === 0) {
            return;
          }
          arr.forEach(item => {
            list.push({ ...item, patientName: key, });
          });
        });
        this.list = list;
      };
      // 失败的回调
      let fail = (msg) => {
        this.$message.error(msg || "发生异常请重试");
        loading.close();
      };
      getBookingList(params, success, fail);
    },
    // 删除预约
    del(row) {
      this.dialog1.row = row;
      this.dialog1.show = true;
    },
    // 查看预约
    detail(row){
      this.dialog2.row = row;
      let params = {
        doctorId: row.doctorId,
      };
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      // 成功的回调
      let success = (data) => {
        loading.close();
        this.dialog2.doctorName = data.doctorName;
        this.dialog2.show = true;
      };
      // 失败的回调
      let fail = (msg) => {
        this.$message.error(msg || "发生异常请重试");
        loading.close();
      };
      // 获取doctor信息
      findDoctorById(params, success, fail);
    },
    confirm1() {
      let params = {
        bookingId: this.dialog1.row.bookingId,
      };
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      // 成功的回调
      let success = () => {
        this.$message.success("取消预约成功");
        loading.close();
        this.getList();
      };
      // 失败的回调
      let fail = (msg) => {
        this.$message.error(msg || "发生异常请重试");
        loading.close();
      };
      deleteBooking(params, success, fail);
      this.dialog1.show = false;
    },
    cancel1() {
      this.dialog1.show = false;
    },
    cancel2() {
      this.dialog2.show = false;
    },
  },
}
</script>
<style lang="scss" scoped>
.appointment{
  width: 100%;
  box-sizing: border-box;
  padding: 20px 15% 0 10%;
  text-align: left;
}
.btn{
  margin-bottom: 30px;
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
