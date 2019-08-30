<template>
    <div>
        <el-steps :active="active" finish-status="success" align-center>
            <el-step title="预约须知"></el-step>
            <el-step title="选择科室"></el-step>
            <el-step title="选择医生"></el-step>
            <el-step title="预约"></el-step>
        </el-steps>
        <router-view @curStep="listenOrderStep"></router-view>
    </div>
</template>

<script>

  export default {
    data() {
      return {
        active: 0
      }
    },
    methods: {
      // 监听当前预约步骤
      listenOrderStep(val) {
        this.active = val
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
