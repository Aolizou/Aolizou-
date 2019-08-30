<template>
    <el-container>
        <el-header class="order-header">
            预约
        </el-header>
        <el-main class="order-main">
            <el-card>
                <p class="doctor-left img fl"><img
                        src='@/assets/images/default.jpg'
                        width="150"></p>
                <div class="doctor-right">
                    <div class="block-font line-nr">
                        <p>姓名：{{ doctorData.doctorName }}</p>
                        <p>所属科室：{{ doctorData.subjectName }}</p>
                    </div>
                    <div class="block-font infor">
                        <p>医生简介：{{ doctorData.doctorBrief }}</p>
                        <p>擅长领域：{{ doctorData.doctorStrength }}</p>
                    </div>
                </div>
            </el-card>
            <el-card class="order-timeline">
                <div slot="header" class="clearfix">
                    <span>{{ date }}{{ state }}</span>
                </div>
                <el-row :gutter="20">
                    <el-col :span="4"
                            :key="item"
                            v-for="item in timeline">
                        <el-radio v-model="orderData.timeline" :label="item" border>{{ item }}</el-radio>
                    </el-col>
                </el-row>
            </el-card>
        </el-main>
        <el-footer>
            <el-card v-if="onAdd">
                <el-form :model="formData" ref="ruleForm" label-width="100px">
                    <el-form-item label="身份证号" prop="name">
                        <el-input v-model="formData.id"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="formData.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="region">
                        <el-select v-model="formData.sex" placeholder="请选择性别">
                            <el-option label="男" value="0"></el-option>
                            <el-option label="女" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>选择预约人</span>
                    <el-button @click="addPerson"
                               style="float: right; padding: 3px 0"
                               type="text">新增预约人
                    </el-button>
                </div>
                <el-row :gutter="20" class="order-person">
                    <el-col
                            v-for="item in patients"
                            :key="item.patientId"
                            :span="5">
                        <el-button @click="handleParClick(item.patientId)" class="order-patients">
                            姓名：{{item.patientName}}<br />性别：{{ !item.patientSex?'男':'女' }}
                        </el-button>
                    </el-col>
                </el-row>
                <el-button
                        type="primary"
                        plain
                        @click="back"
                >返回上一步
                </el-button>
                <el-button type="primary" class="order-confirm" @click="handleOrderClick">
                    确定预约
                </el-button>
            </el-card>
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
        orderData: {
          day: '',
          timeline: '',
          doctorId: '',
          patientId: ''
        },
        doctorData: {},
        timeline: [],
        patients: [], // 用户的患者信息
        date: '', // 预约日期
        state: '下午', // 上午或下午
        formData: {
          id: '',
          name: '',
          sex: '',
          userId: ''
        },
        onAdd: false, // 是否为编辑状态
      }
    },
    created() {
      this.$emit('curStep', 3)
      this.fetchDoctor()
    },
    methods: {
      // 根据医生ID获取医生详情
      fetchDoctor() {
        const id = this.$route.params.id
        const { day, state } = this.$route.query
        // parDate是后台需要的周几
        let parDate = parseInt(state) + 1
        switch (day) {
          case 'tue':
            parDate += 2
            break
          case 'wed':
            parDate += 4
            break
          case 'thu':
            parDate += 6
            break
          case 'fri':
            parDate += 8
            break
          case 'sat':
            parDate += 10
            break
          case 'sun':
            parDate += 12
            break
        }
        axios.post(`/rota/findRotaBySubjectAndDate?doctorId=${ id }&state=1&date=${ parDate }`)
            .then((res) => {
                  // 如果没有数据
                  if (typeof res.data === 'string') {
                    return
                  }
                  this.doctorData = res.data
                  this.fetchTimeline()
                }
            ).catch()
      },
      // 获取医生一周的时间点表
      fetchTimeline() {
        const id = this.$route.params.id
        const { date, state, day } = this.$route.query
        this.date = date
        this.orderData.day = date
        this.orderData.doctorId = id
        if (parseInt(state)) {
          this.state = '下午'
        }
        const ary = []
        axios.post(`/timeline/findTimelineByDoctor?doctorId=${ id }`)
            .then((res) => {
              const data = res.data
              const threshold = 1200
              for (let key in data) {
                if (data.hasOwnProperty(key)) {
                  if (key.indexOf(day) > -1 && data[key]) {
                    let char = key.substring(3)
                    const val = char.substring(char.length - 2, char.length)
                    const cc = parseInt(char.substring(0, char.length - 2) + val)
                    if (parseInt(state)) {
                      if (cc <= threshold) {
                        continue
                      }
                    } else {
                      if (cc >= threshold) {
                        continue
                      }
                    }
                    char = char.substring(0, char.length - 2) + ':'
                    ary.push(char + val)
                  }
                }
              }
              ary.sort(function (item1, item2) {
                const item11 = parseInt(item1.replace(':', ''))
                const item22 = parseInt(item2.replace(':', ''))
                return item11 - item22
              })
              this.timeline = ary
              this.fetchPatients()
            }).catch()
      },
      // 获取用户的患者信息
      fetchPatients() {
        const userId = this.$store.state.userId
        axios.post(`/patient/findPatient?userId=${ userId }`).then((res) => {
          if (res.data.length) {
            this.patients = res.data
          }
        }).catch()
      },
      addPerson() {
        this.onAdd = true
      },
      handleParClick(val) {
        this.orderData.patientId = val
      },
      handleOrderClick() {
        const { patientId, day, doctorId, timeline } = this.orderData
        axios.post(`/booking/makeBooking?patientId=${ patientId }&day=${ day }&doctorId=${ doctorId }&timeline=${ timeline }`)
            .then((res) => {
              const { bookingId } = res.data
              this.$emit('curStep', 4)
              this.$router.push(`/rota/booking/${ bookingId }`)
            }).catch()
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const { id, name, sex } = this.formData
            const userId = this.$store.state.userId
            axios.post(`/patient/addPatient?patientId=${ id }&patientName=${ name }&patientSex=${ sex }&userId=${ userId }`)
                .then(() => {
                  this.onAdd = false
                  this.fetchPatients()
                }).catch()
          } else {
            return false;
          }
        });
      },
      cancel() {
        this.onAdd = false
      },
      back() {
        this.$emit('curStep', 2)
        this.$router.back()
      }
    }
  }
</script>

<style lang="scss" scoped>
    .order-header {
        padding-top: 20px;
    }

    .order-main {
        p {
            text-align: left;
        }
    }

    .line-nr {
        border-bottom: 1px solid #d2d2d2;
        overflow: hidden;
        padding-bottom: 10px;
        position: relative;
    }

    .block-font {
        line-height: 26px;
        font-size: 14px;
        color: #333;
    }

    .infor {
        padding-top: 10px;
    }

    .img {
        width: 145px;
        margin: 35px;
    }

    .fl {
        float: left !important;
    }

    .doctor-right {
        margin-left: 215px;
    }

    .clearfix {
        text-align: left;
    }

    .order-timeline {
        margin-top: 20px;
    }

    .order-patients {
        text-align: left;
    }

    .order-confirm {
        margin-top: 35px;
    }

    .order-person {
        div {
            margin-top: 10px;
        }
    }

</style>