<template>
    <el-container>
        <el-header class="subject-header">
            <span>选择科室</span>
        </el-header>
        <el-main class="subject-main">
            <el-row :gutter="20">
                <el-col :span="4"
                        :key="item.subjectName"
                        v-for="item in subjectList">
                    <el-popover
                            placement="bottom-start"
                            width="300"
                            trigger="hover"
                            :title="item.subjectName"
                            :content="item.subjectBrief">
                        <el-button
                                @click="handleSubClick(item.subjectId)"
                                slot="reference"> {{ item.subjectName }}
                        </el-button>
                    </el-popover>
                </el-col>
            </el-row>
        </el-main>
        <el-footer>
            <el-button
                    type="primary"
                    plain
                    class="subject-btn"
                    @click="back"
            >返回上一步
            </el-button>
        </el-footer>
        <app-footer class="app-footer"></app-footer>
    </el-container>
</template>

<script>
  import axios from '../../api/rota';
  import AppFooter from '@/components/footer';

  export default {
    components: {
    AppFooter,
    },
    data() {
      return {
        subjectList: []
      }
    },
    created() {
      this.$emit('curStep', 1)
      axios.post('/subject/findAllSubject').then((res) => {
        this.subjectList = res.data
      }).catch()
    },
    methods: {
      handleSubClick(id) {
        this.$emit('curStep', 2)
        this.$router.push(`/rota/roster/${ id }`)
      },
      back() {
        this.$emit('curStep', 0)
        this.$router.back()
      }
    }
  }
</script>

<style lang="scss" scoped>
    .subject-header {
        margin-top: 20px;

        span {
            float: left;
        }
    }

    .subject-main {
        border: 1px solid #e6e6e6;
    }

    .subject-btn {
        margin-top: 150px;
    }
</style>