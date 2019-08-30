<template>
    <el-container>
        <el-main>
            <el-card>
                <p>医生姓名：{{ bookingData.doctorName }}</p>
                <p>预约时间：{{ bookingData.orderTime }}</p>
                <p>预约人名字：{{ bookingData.patientName }}</p>
                <p>就诊时间：{{ bookingData.bookingTime }}</p>
                <el-button type="primary" @click="confirm">确认预约</el-button>
            </el-card>
        </el-main>
    </el-container>
</template>

<script>
  import axios from '../../api/rota'

  export default {
    data() {
      return {
        bookingData: {}
      }
    },
    created() {
      this.$emit('curStep', 4)
      this.fetchBookingData()
    },
    methods: {
      fetchBookingData() {
        const bookingId = this.$route.params.id
        axios.post(`/booking/confirmBooking?bookingId=${ bookingId }`)
            .then((res) => {
              this.bookingData = res.data
            }).catch()
      },
      confirm() {
        this.$router.push('/usercenter/appointment')
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>
