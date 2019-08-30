<template>
  <div>
    <!-- 头部 -->
    <div class="header">
      <div class="header-left">
        <el-menu 
          :default-active="activeIndex" 
          class="el-menu-demo" 
          mode="horizontal"
          @select="handleSelect"
          :background-color="'rgb(0,82,67)'"
          :active-text-color="'		#5CACEE'"
          style="padding: 0 5%;"
        >
          <el-menu-item v-for="(item, index) in list" :key="item.activePath" :index="index + ''">{{item.text}}</el-menu-item>
        </el-menu>
      </div>
      <!-- 未登录 -->
      <div class="header-right" v-if="!userId">
        <el-button type="text" @click='funClick("/login")'>登陆</el-button>
        <el-button type="text" @click='funClick("/register")'>注册</el-button>
      </div>
      <!-- 已登陆 -->
      <div class="header-right" v-else>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{userId}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 尾部 -->
    <!-- <div class="footer">
      <el-row>
        <el-col :span="3"><div class="grid-content bg-purple">友情链接</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple-light">中华人名共和国健康卫生委员会</div></el-col> -->
        <!-- <el-col :span="4"><div class="grid-content bg-purple"></div></el-col> -->
        <!-- <el-col :span="4"><div class="grid-content bg-purple">中国医学科学院</div></el-col>
        <el-col :span="4"><div class="grid-content bg-purple-light">山财化妆品</div></el-col>
        <el-col :span="5"><div class="grid-content bg-purple">山财科技发展有限公司</div></el-col>
      </el-row>
      <div class="left">
        <el-row>
          <el-col :span="6"><div class="grid-content bg-purple">网站地图导航   |   关于我们</div></el-col>
          <el-col :span="18"><div class="grid-content bg-purple-light">地址：山东省济南市姚家街道山东财经大学燕山校区斜对面</div></el-col>
        </el-row>
        <el-row>
          <el-col :span="24"><div class="grid-content bg-purple-dark">联系热线：  4008208820</div></el-col>
        </el-row>
      </div>
    </div> -->
    <!-- 主体路由 -->
    <div :style="noPadding ? '' : 'padding: 20px 10%;'">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

let list = [
  {
    text: '首页',
    path: '/homepage',
    activePath: '/homepage',
  },
  {
    text: '医院介绍',
    path: '/introduce',
    activePath: '/introduce',
  },
  // {
  //   text: 'aaa',
  //   path: '/aaa',
  //   activePath: '/aaa',
  // },
  // {
  //   text: '科室分类',
  //   path: '/officetype',
  //   activePath: '/officetype',
  // },
  {
    text: '预约挂号',
    path: '/rota',
    activePath: '/rota',
  },
  {
    text: '系统帮助',
    path: '/help/usualHelp',
    activePath: '/help',
  },
  {
    text: '用户中心',
    path: '/usercenter/user',
    activePath: '/usercenter',
    noPadding: true,
  },
];
export default {
  created() {
    let path = this.$route.path;
    list.forEach((item, index) => {
      if(path.startsWith(item.activePath)) {
        this.activeIndex = index + "";
        this.noPadding = item.noPadding;
      }
    });
  },
  computed: {
    userId() {
      return this.$store.state.userId;
    },
  },
  data() {
    return {
      list,
      activeIndex: "-1",
      noPadding: false,
    };
  },
   methods: {
    handleSelect(key) {
      this.activeIndex = key;
      let item = this.list[key];
      this.noPadding = item.noPadding;
      this.$router.push(item.path);
    },
    funClick(path) {
      this.$router.push(path);
    },
    logout(){
      this.$store.commit("setUserId", "");
      this.$router.push("/login");
    },
  },
  watch: {
    $route() {
      let path = this.$route.path;
      list.forEach((item, index) => {
        if(path.startsWith(item.activePath)) {
          this.activeIndex = index + "";
          this.noPadding = item.noPadding;
        }
      });
    },
  },
}
</script>
<style lang="scss" scoped>
.header{
  display: flex;
  background: rgb(0,82,67);
  .header-left{
    width: 80%;
  }
  .header-right{
    width: 20%;
    border-bottom: solid 1px #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>
