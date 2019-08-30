<template>
    <div>
        <div class="helpText">
            <h5>一、选择科室</h5>
            <h5>二、选择预约医生</h5>
            <h5>三、选择预约时间</h5>
        </div>
        <app-footer class="app-footer"></app-footer>
    </div>
</template>

<script>
import AppFooter from '@/components/footer';

export default {
    components: {
    AppFooter,
  },
}
</script>

<style>
.helpText {
    text-align: left;
    padding-left: 20px
}
.app-footer {
    padding-top: 600px;
}
</style>
