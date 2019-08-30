<template>
  <div>
    <el-container>
      <el-header class="notice-header">预约须知</el-header>
      <el-main class="notice-main">
        <P>各位病友： 感谢您对我院的信任，为保证您顺利预约挂号、就诊，请您认真阅读并遵守此就诊须知，充分理解各条款内容。</P>
        <P>1、预约挂号一律采用实名制，请病人用本人身份证或本院的就诊卡号预约，并登记有效手机号码利于联系。</P>
        <P>2、省、市医保病人，用医保卡于就诊当天在门诊自助机取号；自费病人，用就诊卡和病人本人身份证于就诊当天在门诊自助机取号；</P>
        <P>3、初诊持特种病历的病人、无医保卡的医保病人和自费未带身份证的病人于就诊当天在门诊收费窗口取号。</P>
        <P>4、上午就诊号10:00前取，下午就诊号15:00前取，过时预约号作废。</P>
        <P>
            5、预约成功后必须按时取号就诊，若遇特殊情况无法按时取号就诊，必须提前取消预约，取消预约时间截止于就诊前一天的17:00，请通过您原来的预约途径进行取消预约操作，否则按爽约处理，二次爽约在三个月内不能预约；就诊当日不予取消预约，如您需取消，请至医院作退号处理。</P>
        <P>6、如预约的专家因特殊情况当天不能出诊，医院安排同专科同级别的专家接诊。</P>
      </el-main>
      <el-footer>
        <el-radio v-model="radio" label="1">同意</el-radio>
        <el-radio v-model="radio" label="0">不同意</el-radio>
        <el-row class="notice-button">
            <el-button :type="btnType" @click="next" :disabled="disabled">下一步</el-button>
        </el-row>
      </el-footer>
    </el-container>
    <app-footer class="app-footer"></app-footer>
  </div>
  
</template>

<script>
import AppFooter from '@/components/footer'

  export default {
    components: {
    AppFooter
    },
    data() {
      return {
        radio: '1'
      }
    },
    methods: {
      next() {
        if (parseInt(this.radio) === 1) {
          this.$emit('curStep', 1)
          this.$router.push('/rota/subject')
        }
      },
    },
    computed: {
      btnType: function () {
        if (this.radio === '0') {
          return 'info'
        } else {
          return 'primary'
        }
      },
      disabled: function () {
        return this.radio === '0'
      }
    }
  }
</script>
<style lang="scss" scoped>
.notice-header {
    margin-top: 20px;
}
.notice-main {
    margin-bottom: 20px;
    padding-top: 0;
    border: 1px solid #e6e6e6;

    p {
        text-align: left;
    }
}
.notice-button {
    margin-top: 30px;
}
.app-footer {
  padding-top: 200px;
}
</style>
