<template>
  <div class="doctor-detail" v-if="detail != null">
    <div class="detail">
      <div class="left">
        <img :src="detail.doctorPicture || images.defaultAvaImg" alt="">
      </div>
      <div class="right">
        <div class="name">{{detail.doctorName}}</div>
        <div class="post">{{detail.doctorPost}}</div>
        <div class="sterngth">擅长：{{detail.doctorStrength}}</div>
        <el-divider />
        <div>{{detail.doctorName}}</div>
        <div class="brief">{{detail.doctorBrief}}</div>
      </div>
    </div>

    <div class="fee">
      <span>门诊费用：</span>
      <span style="color:red">{{detail.doctorFee}}</span>
    </div>
    <div class="other-title">医师履历</div>
    <div>{{detail.doctorBrief}}</div>
    <app-footer class="app-footer"></app-footer>
  </div>
</template>

<script>
import {
  findDoctorById,
} from '@/api/api';
import defaultAvaImg from '@/assets/images/default.jpg';
import AppFooter from '@/components/footer';

export default {
  components: {
    AppFooter,
  },
  created() {
    this.id = this.$route.params.id;
    this.init();
  },
  data() {
    return {
      id: '',
      detail: null,
      // detail: {
      //   doctorName: '张全蛋',
      //   doctorPost: '主任',
      //   doctorSterngth: "白内障，眼角膜，泪道以及表疾病的诊治",
      //   doctorBrief: "王XX教授",
      //   doctorFee: "99.00",
      // },
      images: {
        defaultAvaImg,
      },
    };
  },
  methods: {
    init() {
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let params = {
        doctorId: this.id,
      };
      // 成功的回调
      let success = (data) => {
        this.detail = data;
        loading.close();
      };
      // 失败的回调
      let fail = (msg) => {
        this.$message.error(msg || "发生异常请重试");
        loading.close();
      };
      findDoctorById(params, success, fail);
    },
  },
}
</script>

<style lang="scss" scoped>
.doctor-detail{
  text-align: left;
}
  .detail{
    display: flex;
    justify-content: space-between;
    // align-items: center;
    .left{
      width: 237px;
      height: 347px;
      overflow: none;
      img{
        width: 100%;
        height: 100%;;
      }
    }
    .right{
      flex: 1;
      margin-left: 30px;
      text-align: left;
    }

    .name{
      font-size: 34px;
      margin-top: 20px;
    }
    .post{
      font-size: 26px;
      margin-top: 20px;
    }
    .sterngth{
      margin-top: 20px;
      font-size: 18px;
    }
  }
  .fee{
    margin-top: 30px;
    font-size: 22px;
    text-align: left;
  }
  .other-title{
    font-size: 18px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
</style>