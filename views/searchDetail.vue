<template>
  <div class="serach-detail">

    <el-button type="text" @click="$router.go(-1)">&lt;  返回上一级</el-button>

    <el-tabs v-model="activeName"  @tab-click="getList">
    
    <el-tab-pane label="科室列表" name="first">
      <!-- 查询科室的列表 -->
      <div class="main-content">

        <div v-for="(item, index) in list" class="subject-item" :key="index">
          <div class="under-line" v-if="index !== 0"></div>
          <div class="subject-title" @click="$router.push('/subjectDetail/' + item.subjectId)"><span v-html="item.subjectName"></span></div>
          <div class="subject-content"><span v-html="item.subjectBrief"></span></div>
        </div>
        
      </div>
    </el-tab-pane>

    <el-tab-pane label="医师列表" name="second">
      <!-- 查询医师的列表 -->
      <div class="main-content">

        <div v-for="(item, index) in list" class="doctor-item" :key="index">
          <div class="under-line" v-if="index !== 0"></div>
          <div class="doctor-title" @click="$router.push('/doctorDetail/' + item.doctorId)"><span v-html="item.doctorName"></span>-<span v-html="item.doctorPost"></span></div>
          <div class="doctor-content"><span v-html="item.doctorBrief"></span></div>
        </div>
        
      </div>

    </el-tab-pane>

  </el-tabs>

  <app-footer class="app-footer"></app-footer>
  </div>
</template>

<script>
import {
  getSubjectListByWords,
  getDoctorListByWords,
} from '@/api/api';
import AppFooter from '@/components/footer';

export default {
  components: {
    AppFooter,
  },
  created(){
    let text = this.$route.params.text;
    this.text = text;
    this.getList();
  },
  data() {
    return {
      text: '',
      activeName: "first",
      list: [],
    };
  },
  methods: {
    // 根据搜索词获取科室列表
    getListSubject() {
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let params = {
        // userId: this.$store.state.userId,
        subjectName: this.text,
      };
      // 成功的回调
      let success = (data) => {
        loading.close();
        data.forEach(item => {
          item.subjectName = item.subjectName.replace(this.text, `<span class="red">${this.text}</span>`);
          item.subjectBrief = item.subjectBrief.replace(this.text, `<span class="red">${this.text}</span>`);
        });
        this.list = data;
      };
      // 失败的回调
      let fail = (msg) => {
        this.$message.error(msg || "发生异常请重试");
        loading.close();
      };
      getSubjectListByWords(params, success, fail);
    },
    // 根据搜索词获取医生列表
    getListDoctor() {
      const loading = this.$loading({
        lock: true,
        text: '加载中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let params = {
        // userId: this.$store.state.userId,
        // subjectName: this.text,
        doctorName: this.text,
      };
      // 成功的回调
      let success = (data = []) => {
        loading.close();
        data.forEach(item => {
          item.doctorName = item.doctorName.replace(this.text, `<span class="red">${this.text}</span>`);
          item.doctorPost = item.doctorPost.replace(this.text, `<span class="red">${this.text}</span>`);
          item.doctorBrief = item.doctorBrief.replace(this.text, `<span class="red">${this.text}</span>`);
        });
        this.list = data;
      };
      // 失败的回调
      let fail = (msg) => {
        this.$message.error(msg || "发生异常请重试");
        loading.close();
      };
      getDoctorListByWords(params, success, fail);
    },
    getList(){
      // console.log(this.activeName)
      if(this.activeName === 'first') {
        this.getListSubject();
      }
      if(this.activeName === 'second') {
        this.getListDoctor();
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.serach-detail{
  text-align: left;
}

.main-content{
  padding: 20px 5%;
}

.subject-title{
  color: rgb(0,82,67);
  cursor: pointer;
  &:hover{
    text-decoration: underline;
  }
}

.doctor-content{
  margin-top: 15px;
  padding-left: 20px;
}

.doctor-title{
  color: rgb(0,82,67);
  cursor: pointer;
  &:hover{
    text-decoration: underline;
  }
}

.subject-content{
  margin-top: 15px;
  padding-left: 20px;
}

.under-line{
  width: 100%;
  height: 1px;
  background: #e3e3e3;
  margin: 15px 0;
}
.app-footer {
  padding-top: 500px;
}
</style>
<style lang="scss">
.red{
  color: red;
}
</style>
