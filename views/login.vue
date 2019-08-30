<template>
  <div>
    <div class="login">
      <div class="head">登陆</div>
      <el-form ref="form" :model="form">
        <el-form-item label="手机号" label-width="70px" >
          <el-input v-model="form.tel" placeholder="请输入手机号" class="tel-input" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="70px">
          <el-input type="password" v-model="form.pwd" placeholder="请输入6位数密码" class="tel-input" clearable></el-input>
        </el-form-item>
        <el-form-item label="" label-width="70px" style="text-align: right;">
          <el-button type="text" @click='$router.push("/register")'>没有账号？去注册</el-button>
        </el-form-item>
        <div class="butt">
          <el-form-item>
            <el-button type="success" @click='funClick' >登陆</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/api';

export default {
  data() {
    return {
      form: {
        tel: '',
        pwd: '',
        type: [],
      }
    }
  },
  methods: {
    funClick() {
      if(!this.form.tel.length ){
        this.$message.error("请输入账号");
        return;
      }
      if(!this.form.pwd.length){
        this.$message.error("请输入密码");
        return;
      }
      let params = {
        userId: this.form.tel,
        password: this.form.pwd,
      };
      // 全局遮罩
      const loading = this.$loading({
          lock: true,
          text: '加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      // 成功的回调
      // todo: 这个地方是否要做token的缓存处理等等之类的信息
      let success = () => {
        loading.close();
        // this.$store.commit("setUserId", data.user_id);
        this.$store.commit("setUserId", this.form.tel);
        this.$router.push('/homepage');
      };
      // 失败的回调
      let fail = (msg) => {
        this.$message.error(msg || "发生异常请重试");
        loading.close();
      };
      login(params, success, fail);
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  width: 320px;
  margin: 30px auto;
  .head{
  margin-bottom: 30px;
  font-size: 20px;
  }
  .butt{
    margin: auto;
  }
  .tel-input{
    width: 220px;
  }
}
</style>
