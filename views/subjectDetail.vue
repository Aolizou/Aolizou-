<template>
  <div class="subject-detail">
    <el-card shadow="always" v-if="detail != null">
      <h1>{{detail.subjectName}}</h1>
      <div class="detail-content" v-html="detail.subjectBrief"></div>
    </el-card>
    <h1 v-if="doctors.length > 0">医师介绍</h1>
    <div class="doctors" v-if="doctors.length > 0">
      <!-- <div class="doctor">
        <img :src="images.defaultAvaImg" alt="">
        <div class="info">
          <div class="name">李二狗</div>
          <div>主任医师  医师领袖</div>
        </div>
      </div> -->
      <div v-for="item in doctors" class="doctor" :key="item.doctorId" @click="$router.push('/doctorDetail/' + item.doctorId)">
        <img :src="item.doctorPicture || images.defaultAvaImg" alt="">
         <div class="info">
          <div class="name">{{ item.doctorName }}</div>
          <!-- 医生职位？ -->
          <div>{{item.doctorPost}}</div>
        </div>
      </div>
    </div>
    <app-footer class="app-footer"></app-footer>
  </div>
</template>

<script>
import defaultAvaImg from '@/assets/images/default.jpg';
import {
  findSubjectById,
  findDoctorsBySubject,
} from '@/api/api';
import AppFooter from '@/components/footer';

export default {
  components: {
    AppFooter,
  },
  created() {
    this.id = parseInt(this.$route.params.id);
    this.init();
  },
  data() {
    return {
      detail: null,
      id: '',
      doctors: [],
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
        subjectId: this.id,
      };
      // 成功的回调
      let success = (data) => {
        this.detail = data[0];
        loading.close();
      };
      // 失败的回调
      let fail = (msg) => {
        this.$message.error(msg || "发生异常请重试");
        loading.close();
      };
      findSubjectById(params, success, fail);
      this.getDoctors();
    },
    getDoctors() {
      let params = {
        subjectId: this.id,
      };
      // 成功的回调
      let success = (data) => {
        this.doctors = data;
        loading.close();
      };
      // 失败的回调
      let fail = (msg) => {
      };
      findDoctorsBySubject(params, success, fail);
    },
  },
}
</script>

<style lang="scss" scoped>
  .subject-detail{
    text-align: left;
  }
  .detail-content{
    margin-bottom: 50px;
  }
  .doctors{
    overflow-x: auto;
    overflow-y: hidden;
    width: 100%;
    white-space: nowrap;
    .doctor{
      width: 237px;
      height: 347px;
      position: relative;
      margin-right: 10px;
      display: inline-block;
      cursor: pointer;
      img{
        width: 100%;
        height: 100%;
      }
      .info{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 135px;
        background: rgba(0, 0, 0, 0.6);
        color: white;
        padding: 20px;
        text-align: center;
        .name{
          font-size: 24px;
        }
      }
    }
  }
</style>