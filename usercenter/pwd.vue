<template>
  <div class="pwd">
    <div class="label">请输入新密码</div>
    <el-input class="input" type="password" v-model="pwd1" placeholder="请输入新密码"></el-input>
    <div class="label">请再次输入新密码</div>
    <!-- <div class="new-pwd"> -->
    <el-input class="input1" type="password" v-model="pwd2" placeholder="请再次输入新密码"></el-input>
    <el-button class="btn" type="primary" size="mini" @click="confirm">确认修改</el-button>
    <!-- </div> -->
  </div>
</template>

<script>
import { updatePwd } from '@/api/api';
export default {
  data() {
    return {
      pwd1: '',
      pwd2: '',
    };
  },
  methods: {
    confirm() {
      if(this.pwd1.length < 6 || this.pwd1.length > 16) {
        this.$message.error("密码在6-16位之间");
        return;
      }
      if(this.pwd1 !== this.pwd2) {
        this.$message.error("两次密码输入不一致");
        return;
      }
      let params = {
        userId: parseInt(this.$store.state.userId),
        userPassword: this.pwd1,
      };
      const loading = this.$loading({
          lock: true,
          text: '加载中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      let success = () => {
        loading.close();
        this.$message.success("更新密码成功！");
        this.pwd1 = this.pwd2 = '';
      };
      let fail = (msg) => {
        loading.close();
        this.$message.error(msg || "发生异常请重试");
      };
      updatePwd(params, success, fail);
    },
  },
}
</script>
<style lang="scss" scoped>
.pwd{
  text-align: center;
  padding: 20px 15% 0 10%;
  // max-width: 400px;
  .label{
    // width: 500px;
    margin-bottom: 10px;
    color: #999
  }
  .input {
    width: 300px;
    margin-bottom: 20px;
  }
  // .new-pwd {
  //   text-align: center;
    // display: flex;
    // flex-wrap: wrap;
    .input1{
    width: 300px;
    margin-bottom: 20px;
    }
    .btn{
    position: absolute;
    margin: 80px 10px 10px -185px;
    // width: 400px;
    }
  // }
  
}
</style>
