<template>
  <div>
    <div class="register">
      <div class="head">注册</div>
      <el-form ref="form" :model="form">
        <el-form-item label="手机号" label-width="70px" >
          <el-input v-model="form.tel" placeholder="请输入手机号" class="tel-input" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="70px">
          <el-input type="password" v-model="form.pwd" placeholder="请输入6位数密码" class="tel-input" clearable></el-input>
        </el-form-item>
        <el-form-item label="" label-width="70px" style="text-align: right;">
          <el-button type="text" @click='$router.push("/login")'>已有账号？去登录</el-button>
        </el-form-item>
        <div class="butt">
          <el-form-item>
            <el-button type="success" @click='funClick'>注册</el-button>
            <!-- <el-button @click='funClick("/login")'>登陆</el-button> -->
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { register } from '@/api/api';

export default {
  data() {
    return {
      form: {
        tel: '',
        pwd: '',
      }
    }
  },
  methods: {
    funClick(path) {
      if(this.form.tel.length < 6 || this.form.tel.length > 16){
        this.$message.error("请输入6-16位账号");
        return;
      }
      if(this.form.pwd.length < 6 || this.form.pwd.length > 16){
        this.$message.error("请输入6-16位密码");
        return;
      }
      let params = {
        userId: parseInt(this.form.tel),
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
      let success = () => {
        loading.close();
        this.$message.success("恭喜您注册成功，请登录");
        this.$router.push('/login');        
      };
      // 失败的回调
      let fail = (msg) => {
        this.$message.error(msg || "发生异常请重试");
        loading.close();
      };
      register(params, success, fail);
      // this.$router.push(path);
    }
  }
}
</script>

<style lang="scss" scoped>
.register {
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