<template>
  <div>
    <div class="search">
      <el-input class="input" v-model="search.input" placeholder="请输入您要查询的医生或科室"></el-input>
      <el-button class="btn" type="success" plain @click="query">查询</el-button>
    </div>

    <!-- 轮播图（跑马灯） -->
    <intro-swiper />


    <h1 class="text-left">医院简介</h1>
    <div class="introduce-item">
      杉菜大第一附属医院是一所位于济南市历下区，集医疗、科研、教学为一体的大型综合医院。它隶属于中国协和医科大学(2013年改为山财大第一附属医院)，是其临床医学院，同时也是中国医学科学院的临床医学研究所，中华人民共和国卫生部指定的诊治疑难重症的技术指导中心之一。山财大第一附属医院在中国乃至世界享有盛名。医院成立于1998年。现任院长王雨子。山财大第一附属医院是中国最早承担外宾医疗任务的单位，医院专门设立外宾和高干门诊部，开设专门的高干、外宾、特需病区。
    </div>
    <h1 class="text-left">科室列表</h1>
    <div class="list">
      <div v-for="(item, index) in list" :key="index" class="item" @click="$router.push('/subjectDetail/' + item.subjectId)">
        {{item.subjectName}}
      </div>
    </div>


    <app-footer class="app-footer"></app-footer>
  </div>
</template>

<script>
import introSwiper from '@/components/introSwiper';
import AppFooter from '@/components/footer';
import {
  findAllSubject,
} from '@/api/api';

export default {
  components: {
    introSwiper,
    AppFooter,
  },
  created() {
    // 初始化加载科室列表
    this.getList();
  },
  data() {
    return {
      search: { input: '' },
      // list: ["1", "2", "3", "4", "5", "6", "1", "2", "3", "4", "5", "6"], // 科室列表
      list: [],
    };
  },
  methods: {
    getList(){
      let success = (data) => {
        this.list = data;
      };
      let fail = () => {};
      findAllSubject({}, success, fail);
    },
    // 查询
    query() {
      if(!this.search.input){
        this.$message.error("请输入查询内容");
        return;
      }
      this.$router.push("/searchdetail/" + this.search.input);
    },
  },
}
</script>
<style lang="scss" scoped>

.search{
  display: flex;
  margin-bottom: 30px;

  .input {
    width: 300px;
  }
  .btn{
    margin-left: 40px;
  }
}

.text-left{
  text-align: left;
}
.introduce-item {
  text-align: left;
}
.list{
  display: flex;
  flex-wrap: wrap;
  .item{
    width: 150px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-right: 30px;
    margin-bottom: 30px;
    border: 1px solid #b3b3b3;
    border-radius: 8px;
    cursor: pointer;
    user-select: none;
    &:hover{
      color: #409EFF;
      border-color: #409EFF;
    }
  }
}
.app-footer {
  padding-top: 300px;
}
</style>
