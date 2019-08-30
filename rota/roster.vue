<template>
    <el-container>
        <el-header class="roster-header">医生值班表</el-header>
        <el-main>
            <el-table
                    id="roster-table"
                    :data="doctorList"
                    border
                    stripe
                    style="width: 100%">
                <el-table-column
                        :formatter="formatter"
                        :key="item.prop"
                        v-for="item in tableProps"
                        :prop="item.prop"
                        :label="item.date"
                        align="center">
                </el-table-column>
            </el-table>
        </el-main>
        <el-footer class="roster-footer">
            <el-button
                    type="primary"
                    plain
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
        doctorList: [], // 医生列表
        tableProps: [] // 值班表表头
      }
    },
    created() {
      this.$emit('curStep', 2)
      this.fetchList()
    },
    methods: {
      // 根据科室ID获取医生列表
      fetchList() {
        const id = this.$route.params.id
        axios.post(`/rota/findRotaBySubject?subjectId=${ id }`).then((res) => {
          if (!res.data.length) { // 如果没有返回数据
            return
          }
          const tableProps = Object.keys(res.data[0])
          this.tableProps = this.initTableProps(tableProps)
          this.doctorList = this.initDoctorList(res.data)
          this.$nextTick(() => {
            const ary = document.getElementsByClassName('cell')
            const cell = Array.from(ary)
            cell.forEach((item) => {
              item.innerHTML = item.innerText
            })
            const table = document.getElementById('roster-table')
            const _this = this
            if (table) {
              table.addEventListener('click', function (e) {
                const tar = e.target
                if (tar.className.indexOf('roster-doctor') > -1) {
                  const id = tar.getAttribute('docid')
                  const date = tar.getAttribute('date')
                  const state = tar.getAttribute('state')
                  const day = tar.getAttribute('day')
                  _this.$emit('curStep', 3)
                  _this.$router.push(`/rota/order/${ id }?date=${ date }&state=${ state }&day=${ day }`)
                }
              })
            }
          })
        }).catch()
      },
      // 初始化tableProps(表头)
      initTableProps(tableProps) {
        tableProps.push('noon')
        tableProps = tableProps.map((item) => {
          switch (item) {
            case 'noon':
              return {
                date: '时间段',
                prop: 'noon',
                index: 0,
              }
            case 'monday':
              return {
                date: '星期五',
                prop: item,
                index: 1,
              }
            case 'tuesday':
              return {
                date: '星期六',
                prop: item,
                index: 2,
              }
            case 'wednesday':
              return {
                date: '星期日',
                prop: item,
                index: 3,
              }
            case 'thursday':
              return {
                date: '星期一',
                prop: item,
                index: 4,
              }
            case 'friday':
              return {
                date: '星期二',
                prop: item,
                index: 5,
              }
            case 'saturday':
              return {
                date: '星期三',
                prop: item,
                index: 6,
              }
            case 'sunday':
              return {
                date: '星期四',
                prop: item,
                index: 7,
              }
            default:
              return null
          }
        })
        tableProps = tableProps.filter(function (n) {
          return n
        })
        tableProps.sort(function (item1, item2) {
          return item1.index - item2.index
        })
        return tableProps
      },
      // 初始化医生列表
      initDoctorList(data) {
        const ary = [{ noon: '上午' }, { noon: '下午' }]
        data.forEach((item) => {
          for (let key in item) {
            if (key === 'doctorId' || key === 'doctorName' || key === 'time') {
              continue
            }
            if (item[key] && item.hasOwnProperty(key)) {
              const curAry = item[key].split('/')
              if (parseInt(curAry[0])) {
                if (ary[0][key] === undefined) {
                  ary[0][key] = '' + item.doctorName + `-${ item.doctorId }-${ key }-0`
                } else {
                  ary[0][key] += ',' + item.doctorName + `-${ item.doctorId }-${ key }-0`
                }
              }
              if (parseInt(curAry[1])) {
                if (ary[1][key] === undefined) {
                  ary[1][key] = '' + item.doctorName + `-${ item.doctorId }-${ key }-1`
                } else {
                  ary[1][key] += ',' + item.doctorName + `-${ item.doctorId }-${ key }-1`
                }
              }
            }
          }
        })
        return ary
      },
      // 处理表格
      formatter(row, column, cellValue) {
        if (!cellValue) {
          return null
        }
        if (cellValue === '上午' || cellValue === '下午') {
          return cellValue
        }
        // 判断是否有多个医生在同一个时间段
        if (cellValue.indexOf(',') > -1) {
          const doctor = cellValue.split(',')
          let char = ''
          doctor.forEach((item) => {
            const value = item.split('-')
            const date = this.convertDate(value[2])
            const state = value[3]
            char += `<div><span docid="${ value[1] }" date="${ date }" state="${ state }" day="${ value[2].substring(0, 3) }"
                class="roster-doctor">${ value[0] }</span></div>`
          })
          return char
        } else {
          const doctor = cellValue.split('-')
          const date = this.convertDate(doctor[2])
          const state = doctor[3]
          return `<div><span docid="${ doctor[1] }" date="${ date }" state="${ state }" day="${ doctor[2].substring(0, 3) }"
                class="roster-doctor">${ doctor[0] }</span></div>`
        }
      },
      convertDate(time) {
        let date = new Date()
        let day = 0 // 增加的天数
        switch (time) {
          case 'tuesday':
            day = 1
            break
          case 'wednesday':
            day = 2
            break
          case 'thursday':
            day = 3
            break
          case 'friday':
            day = 4
            break
          case 'saturday':
            day = 5
            break
          case 'sunday':
            day = 6
            break
        }
        date.setDate(date.getDate() + day)
        date = `${ date.getFullYear() }/${ (date.getMonth() + 1) }/${ date.getDate() }`
        return date
      },
      back() {
        this.$emit('curStep', 1)
        this.$router.back()
      }
    }
  }
</script>

<!--解析style的时候还没有roster-doctor类，所以要改为全局css-->
<style lang="scss">
    .roster-header {
        margin-top: 20px;
    }

    .roster-doctor:hover {
        cursor: pointer;
        color: #5e8ecf;
    }

    .roster-footer {
        margin-top: 150px;
    }

</style>