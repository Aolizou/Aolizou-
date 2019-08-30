<template>
  <div class="block">
    <el-carousel trigger="click" height="450px">
      <el-carousel-item v-for="(item, index) in list" :key="index">
        <img :src="item" alt="" style="width: 100%; height: 100%;">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import img1 from '@/assets/images/img1.jpg';
import img2 from '@/assets/images/img2.jpg';
import img3 from '@/assets/images/img3.jpg';

export default {
  data() {
    return {
      list: [img1, img2, img3],
    };
  },
}
</script>
<style lang="scss" scoped>

</style>
