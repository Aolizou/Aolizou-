<template>
  <div>
    <div  :style="backgroundDiv" class="background">
      <div class="butt clear">
        <div class="logo">
          <img src="../../picture/logo.png">
        </div>
        <div v-if="!userId">
          <div class="login">
            <el-button type="success" plain @click="tologin()">登录</el-button>
          </div>
          <div class="login">
            <el-button type="success" plain @click="toregister()">注册</el-button>
          </div>
        </div>
      </div>
      <div class="bodya">
        <ul class="enter" >
          <li class="li info">
            <span class="pic ">
              <img src="../../picture/info1.png">
            </span>
            <a @click="tointroduce()" class="enters infoa">医院信息</a>
          </li>
          <li class="li booking">
            <span class="pic">
              <img src="../../picture/listener.png">
            </span>
            <a @click="toRota()" class="enters bookinga">预约挂号</a>
          </li>
          <li class="li center">
            <span class="pic">
              <img src="../../picture/people.png">
            </span>
            <a @click="tousercenter()" class="enters centera">个人中心</a>
          </li>
          <li class="li help">
            <span class="pic">
              <img src="../../picture/help.png">
            </span>
            <a @click="tohelp()" class="enters helpa">系统帮助</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import { ClientRequest } from 'http'
export default {
  computed: {
    userId() {
      return this.$store.state.userId;
    },
  },
  methods:{
    tohome(){
      this.$router.push("/home");
    },
    tologin(){
      this.$router.push("/login");
    },
    toregister(){
      this.$router.push("/register");
    },
    tointroduce(){
      this.$router.push("/introduce");
    },
    toRota(){
      this.$router.push("/rota/notice")
    },
    tousercenter(){
      this.$router.push("/usercenter/user");
    },
    tohelp(){
      this.$router.push("/help/usualHelp");
    }
  },  
  data() {
    return {
      backgroundDiv: {
        backgroundImage:'url(' + require('../../picture/homepage6.jpg') + ')',
        backgroundRepeat:'no-repeat',
        backgroundSize:"100%"
      }
    }
  } 
}
</script>
<style lang="scss" scoped>
  .bodya{
   
  }
  .butt
  {
    margin: 30px 130px 0px 130px;
  }
  .clear::after
  {
    display: block;
    content: "";
    clear: both;
  }
  .logo
  {
    float: left; 
  }
  .login
  {
    float: right;
    padding: 0px 20px;
    margin-top: 60px;
  }
  .background
  {
    position: absolute;
    width: 100%;
    height: 100%;
    background: center;
  }
  .enter{
    list-style: none outside none;
    position: absolute;
    top: 250px;
  }
  .li{
    position: absolute;
    border-radius: 10px;
    box-shadow: 0px 25px 30px 0px rgba(0, 0, 0, 0.3) ;
    transition: all 0.6s;
  }
  .li:hover{
    transform: scale(1.1);
  }
  .pic{
    display: block;
    width: 75px;
    height: 75px;
    margin: 50px auto 30px;
  }
  .p{
    margin-top: 18px;
    line-height: 40px;
    font-size: 35px;  
  }
  .info{
    width: 240px;
    height: 260px;
    left:190px;
    background-color: rgba(250, 250, 250, 0.9); 
  }
  .infoa{
     background-color: rgb(250, 250, 250);
     color: rgb(21,126,72);
  }
  .booking{
    width: 260px;
    height: 290px;
    left: 410px;
    top: 40px;
    background-color:rgba(218, 193, 137,0.9);
  }
   .bookinga{
    background-color: rgb(218, 193, 137);
    color: #fff;
  }
  .center{
    width: 280px;
    height: 260px;
    left: 650px;
    top: 80px;
    background-color:rgba(100, 173, 178,0.9);
  }
  .centera{
    background-color: rgb(100, 173, 178);
    color: #fff;
  }
  .help{
    width: 220px;
    height: 240px;
    left: 910px;
    top:-20px;
    background-color: rgba(21,126,72,0.9);
  }
  .helpa{
    color: #fff;
    background-color: rgb(21,126,72);
  }
  .enters{
    display:block;
    width: 120px;
    height: 30px;
    margin: auto;
    border-radius: 15px;
    box-shadow: 0px 0px 15px 0px rgba(2, 2, 2, 0.1);
    font-size: 14px;
    line-height: 30px;
    text-decoration: none;
    cursor: pointer;
  }
</style>