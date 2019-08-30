<template>
  <div class="user-center">
    <div style="width: 20%;max-width: 250px;">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        @select="handleSelect"
      >
        <el-menu-item v-for="(item, index) in list" :key="item.activePath" :index="index + ''">{{item.text}}</el-menu-item>
      </el-menu>
    </div>
    <router-view style="flex: 1;"></router-view>
  </div>
</template>

<script>

let list = [
  {
    text: '患者管理',
    path: '/usercenter/user',
    activePath: '/usercenter/user',
  },
  {
    text: '预约管理',
    path: '/usercenter/appointment',
    activePath: '/usercenter/appointment',
  },
  {
    text: '密码修改',
    path: '/usercenter/pwd',
    activePath: '/usercenter/pwd',
  },
];

export default {
  created() {
    let path = this.$route.path;
    list.forEach((item, index) => {
      if(path.startsWith(item.activePath)) {
        this.activeIndex = index + "";
      }
    });
  },
  data() {
    return {
      list,
      activeIndex: -1,
    };
  },
  methods: {
    handleSelect(key) {
      let item = this.list[key];
      this.noPadding = item.noPadding;
      this.$router.push(item.path);
    },
  },
}
</script>
<style lang="scss" scoped>
  .user-center{
    display: flex;
  }
</style>
