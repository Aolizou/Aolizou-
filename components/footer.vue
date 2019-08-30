<template>
    <div>
        <div class="footer">
           <el-row>
                <el-col :span="3"><div class="grid-content bg-purple-light">友情链接</div></el-col>
                <el-col :span="8"><div class="grid-content bg-purple-light">中华人名共和国健康卫生委员会</div></el-col>
                <!-- <el-col :span="4"><div class="grid-content bg-purple"></div></el-col> -->
                <el-col :span="4"><div class="grid-content bg-purple-light">中国医学科学院</div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple-light">山财化妆品</div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple-light">山财科技发展有限公司</div></el-col>
           </el-row>
           <div class="left">
               <el-row>
                    <el-col :span="6"><div class="grid-content bg-purple">网站地图导航   |   关于我们</div></el-col>
                    <el-col :span="18"><div class="grid-content bg-purple">地址：山东省济南市姚家街道山东财经大学燕山校区斜对面</div></el-col>
               </el-row>
               <el-row>
                   <el-col :span="24"><div class="grid-content bg-purple-dark">联系热线：  4008208820</div></el-col>
               </el-row>
           </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.footer {
    width: 100%
}
.el-row {
    // margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
}
.bg-purple-dark {
    background: rgb(232, 232, 232);
    padding-top: 6px
}
.bg-purple {
    background:	rgb(232, 232, 232);
}
.bg-purple-light {
    background:	rgb(232, 232, 232);
}
.grid-content {
    // border-radius: 4px;
    min-height: 36px;
    padding-top: 6px
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>
