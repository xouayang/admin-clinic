<template>
<div>
  <div>
    <v-row class="col-12 d-flex align-center">
      <v-col cols="12" md="6" sm="6">
        <div class="pl-5 font-weight-bold" style="color: #9155fd">
          ໜ້າຫຼັກ
        </div>
        </v-col
      >
    </v-row>
    <div>
      <v-row class="col-12">
        <v-col cols="12" md="6" sm="12">
          <v-row class="col-12">
            <v-col cols="12" md="6" sm="12">
              <v-card height="100" class="pt-3 pl-3"
                >ລາຍຮັບ
                <v-row align="center">
                  <v-col class="d-flex align-center justify-space-between">
                    <div class="mt-3 text-h6">
                      {{
                        toCurrencyString(parseInt(total_income.total_income))
                      }}
                    </div>
                  </v-col>
                  <v-col>
                    <v-btn rounded color="success">
                      <v-icon>mdi-currency-usd</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
              <v-card height="100" class="mt-5 pt-3 pl-3">
                ລາຍຈ່າຍ
                <v-row align="center">
                  <v-col
                    ><div class="mt-3 text-h6">
                      {{ toCurrencyString(parseInt(total_outcome.outcome)) }}
                    </div></v-col
                  >
                  <v-col>
                    <v-btn color="error" rounded
                      ><v-icon>mdi-currency-usd</v-icon></v-btn
                    >
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-card height="100" class="pt-3 pl-3" to="/patients/Patient"
                >ລາຍການປີ່ນປົວໃໝ່

                <v-row align="center">
                  <v-col
                    ><div class="mt-3 text-h4">
                      {{ showPatiented?.length }}
                    </div></v-col
                  >
                  <v-col class="mt-2">
                    <v-btn text small fab color="#9155FD">
                      <v-badge
                        :content="
                          showPatiented?.length ? showPatiented?.length : '0'
                        "
                        color="error"
                      >
                        <v-icon>mdi-bell-plus-outline</v-icon>
                      </v-badge></v-btn
                    >
                    <!-- <v-btn color="success" rounded>{{showPatiented?.count}}++</v-btn> -->
                  </v-col>
                </v-row>
              </v-card>
              <v-card
                height="100"
                class="mt-5 pt-3 pl-3"
                to="/patients/allPatient"
                >ລາຍການປີ່ນປົວທັງໝົດ
                <v-row align="center">
                  <v-col
                    ><div class="mt-3 text-h4">
                      {{ resultData?.length }}
                    </div></v-col
                  >
                  <v-col>
                    <v-btn text small fab rounded color="#9155FD"
                      ><v-badge
                        :content="resultData?.length ? resultData?.length : '0'"
                        color="error"
                      >
                        <v-icon>mdi-bell-plus-outline</v-icon>
                      </v-badge></v-btn
                    >
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-row class="col-12">
            <v-col cols="12" md="6" sm="12">
              <v-card height="100" class="pt-3 pl-3" to="/staff/male">
                ພະນັກງານ (ຊາຍ)
                <v-row align="center">
                  <v-col
                    ><div class="mt-3 text-h4">
                      {{ dataMale?.count }}
                    </div></v-col
                  >
                  <v-col>
                    <v-btn color="success" rounded
                      >{{ dataMale?.count }}++</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card>
              <v-card height="100" class="mt-5 pt-3 pl-3" to="/staff/female"
                >ພະນັກງານ (ຍິງ)
                <v-row align="center">
                  <v-col
                    ><div class="mt-3 text-h4">
                      {{ dataFemal?.count }}
                    </div></v-col
                  >
                  <v-col>
                    <v-btn style="background-color: #9155fd" rounded
                      ><span style="color: white"
                        >{{ dataFemal?.count }}++</span
                      ></v-btn
                    >
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-card height="100" class="pt-3 pl-3" to="/appointment/history"
                >ລາຍການນັດໝາຍໃໝ່

                <v-row align="center">
                  <v-col
                    ><div class="mt-3 text-h4">
                      {{ dataAppoint?.count }}
                    </div></v-col
                  >
                  <v-col class="mt-2">
                    <v-btn text small fab color="#9155FD">
                      <v-badge
                        :content="dataAppoint?.count ? dataAppoint?.count : '0'"
                        color="error"
                      >
                        <v-icon>mdi-bell-plus-outline</v-icon>
                      </v-badge></v-btn
                    >
                  </v-col>
                </v-row>
              </v-card>
              <v-card height="100" class="mt-5 pt-3 pl-3" to="/medicines_type">
                ປະເພດຢາ
                <v-row align="center">
                  <v-col
                    ><div class="mt-3 text-h4">
                      {{ countShow?.count }}
                    </div></v-col
                  >
                  <v-col>
                    <v-btn color="success" rounded
                      >{{ countShow?.count }}++</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div class="mb-2">
        <v-row class="col-12">
          <v-col cols="12" md="12" sm="12">
            <v-card class="container" rounded="lg">
              <div class="container">ປະຫວັດປີ່ນປົວຄົນເຈັບລ່າສຸດ</div>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="ຄົ້ນຫາ"
                outlined
                hide-details
                dense
                color="#9155FD"
              />
              <v-data-table
                :headers="headers"
                :items="historyPatientLimit"
                :search="search"
              >
                <template #[`item.more`]="{ item }">
                  <v-tooltip top color="#9155FD">
                    <template #activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-bind="attrs"
                        v-on="on"
                        @click="showData(item)"
                      >
                        <v-icon color="#9155FD">mdi-eye-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>ລາຍລະອຽດ</span>
                  </v-tooltip>
                </template>
                <template #[`item.created_at`]="{ item }">
                  {{ $moment(item.created_at).format('DD-MM-YYYY h:mm:ss a') }}
                </template>
              </v-data-table>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <v-dialog v-model="dialog" width="640" activator="parent" persistent>
        <v-card>
          <v-toolbar dark color="#9155FD">
            <v-card-title>ລາຍລະອຽດ</v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="dialog = !dialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <div class="d-flex justify-space-between container">
            <span> ຊື່:{{ historyPatient.name }}</span>
            <span> ລະຫັດໃບບິນ : {{ historyPatient.billNumber }}</span>
          </div>
          <div class="d-flex justify-space-between container">
            <span>ທີ່ຢຸູ:{{ historyPatient.address }}</span>
            <span>ເບີໂທລະສັບ:{{ historyPatient.tel }}</span>
          </div>
          <div class="d-flex justify-space-between container">
            <span
              >ລາຄາລວມ :{{
                toCurrencyString(parseInt(historyPatient.total_price))
              }}</span
            >
          </div>
          <v-data-table :headers="headers1" :items="historyPatient.rows">
            <template #[`item.price`]="{ item }">
              <span style="color: red">{{ toCurrencyString(item.price) }}</span>
            </template>
          </v-data-table>
        </v-card>
      </v-dialog>
    </div>
  </div>
</div>
</template>
<script>
import laoCurrency from '@lailao10x/lao-currency'
export default {
  name: 'Homepages',
  // middleware: 'auth',
  data() {
    return {
      interval: {},
      search: '',
      search1: '',
      dialog: false,
      value: 0,
      financialRole:'',
      headers: [
        { text: 'ລະຫັດໃບບິນ', value: 'bill_number' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ອາການເບື້ອງຕົ້ນ', value: 'details' },
        { text: 'ເບີໂທລະສັບ', value: 'tel' },
        { text: 'ວັນທີ່', value: 'created_at' },
        { text: 'ລາຍລະອຽດ', value: 'more' },
      ],
      headers1: [
        { text: 'ລາຍການກວດ', value: 'details' },
        { text: 'ລາຄາ', value: 'price' },
      ],
      headers2: [
        { text: 'ຊື່', value: 'name' },
        { text: 'ເບີໂທລະສັບ', value: 'tel' },
        { text: 'ວັນທີ່ ເດືອນ ປີ ນັດມາຍ', value: 'date' },
      ],
    }
  },
  beforeUnmount() {
    clearInterval(this.interval)
  },
  computed: {
    dataMale() {
      return this.$store.state.user.maleData
    },
    dataFemal() {
      return this.$store.state.user.femaleData
    },
    countShow() {
      return this.$store.state.user.dataCount
    },
    showPatients() {
      return this.$store.state.user.Patients
    },
    showPatiented() {
      return this.$store.state.result.history1
    },
    resultData() {
      return this.$store.state.result.history
    },
    historyPatient() {
      return this.$store.state.user.dataById
    },
    historyPatientLimit() {
      return this.$store.state.result.dataHistory
    },
    dataAppoint() {
      return this.$store.state.appointment.appointmentData
    },
    total_income() {
      return this.$store.state.user.Income
    },
    total_outcome() {
      return this.$store.state.user.Outcome
    },
  },
  async mounted() {
    this.interval = setInterval(() => {
      if (this.value === 100) {
        return (this.value = 0)
      }
      this.value += 10
    }, 1000)
    await this.$store.dispatch('user/male')
    await this.$store.dispatch('user/female')
    await this.$store.dispatch('user/countType')
    await this.$store.dispatch('user/getPatients')
    await this.$store.dispatch('user/getPatiented')
    await this.$store.dispatch('result/getHistory')
    await this.$store.dispatch('appointment/getAll')
    await this.$store.dispatch('user/allIncome')
    await this.$store.dispatch('user/allOutcome')
    await this.$store.dispatch('result/getHistory2')
    await this.$store.dispatch('result/getHistory1')
    // check role
    const check = this.$cookies.get('role')
    if(check === 'financial') {
      console.log(check)
    }
  },
  methods: {
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
    async showData(data) {
      const id = data.id
      await this.$store.dispatch('user/getById', id)
      this.dialog = true
    },
  },
}
</script>

