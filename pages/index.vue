<template>
  <div>
    <v-row class="col-12 d-flex align-center">
      <v-col cols="12" md="6" sm="6"
        ><div class="text-body-1 pl-5" style="font-size: 20">
          Dashboard
        </div></v-col
      >
    </v-row>
    <div>
      <v-row class="col-12">
        <v-col cols="12" md="6" sm="12">
          <v-row class="col-12">
            <v-col cols="12" md="6" sm="12">
              <v-card elevation="0" rounded="xl">
                <div class="text-center pt-3">
                  <v-progress-circular
                    :rotate="360"
                    :size="100"
                    :width="15"
                    :value="dataMale?.count"
                    color="success"
                    >50</v-progress-circular
                  >
                </div>
                <div class="text-center d-flex flex-column justify-center mt-2">
                  <div style="margin-right: 27px">
                    <v-icon color="#9155FD" size="50">mdi-circle-small</v-icon>
                    <span>ຍິງ</span>
                  </div>
                  <div style="margin-right: 20px">
                    <v-icon color="success" size="50">mdi-circle-small</v-icon>
                    <span>ຊາຍ</span>
                  </div>
                </div>
              </v-card>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <v-card height="100" rounded="xl" class="pt-3 pl-3" elevation="0"
                >ລາຍການປີ່ນປົວໃໝ່

                <v-row align="center">
                  <v-col
                    ><div class="mt-3 text-h4">
                      {{ showPatiented?.count }}
                    </div></v-col
                  >
                  <v-col class="mt-2">
                    <v-btn text small fab color="#9155FD">
                      <v-badge
                        :content="
                          showPatiented?.count ? showPatiented?.count : '0'
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
                rounded="xl"
                class="mt-5 pt-3 pl-3"
                elevation="0"
                >ລາຍການປີ່ນປົວທັງໝົດ
                <v-row align="center">
                  <v-col
                    ><div class="mt-3 text-h4">
                      {{ showPatients?.count }}
                    </div></v-col
                  >
                  <v-col>
                    <v-btn style="background-color: #9155fd" rounded
                      ><span style="color: white"
                        >{{ showPatients?.count }}++</span
                      ></v-btn
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
              <v-card height="100" rounded="xl" class="pt-3 pl-3" elevation="0">
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
              <v-card
                height="100"
                rounded="xl"
                class="mt-5 pt-3 pl-3"
                elevation="0"
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
              <v-card height="100" rounded="xl" class="pt-3 pl-3" elevation="0">
                ປະເພດ (ອຸປະກອນ ເເລະ ຢາ)
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
              <!-- <v-card
                height="100"
                rounded="xl"
                class="mt-5 pt-3 pl-3"
                elevation="0"
                style="cursor: pointer"
                >ປະເພດ (Category)
                <v-row align="center">
                  <v-col><div class="mt-3 text-h4">100</div></v-col>
                  <v-col>
                    <v-btn style="background-color: #9155fd" rounded
                      ><span style="color: white">50++</span></v-btn
                    >
                  </v-col>
                </v-row>
              </v-card> -->
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <div class="mb-2">
        <v-row class="col-12">
          <v-col cols="12" md="6" sm="12">
            <v-card class="container" rounded="lg">
              <div class="container">ລາຍການນັດໝາຍຄົນເຈັບ</div>
              <v-text-field
                v-model="search1"
                append-icon="mdi-magnify"
                label="ຄົ້ນຫາ"
                outlined
                hide-details
                dense
                color="#9155FD"
              />
              <v-data-table
                :headers="headers2"
                :items="dataAppoint"
                :search="search1"
              >
                <template #[`item.date`]="{ item }">
                  {{ $moment(item.date).format('DD-MM-YYYY') }}
                </template>
              </v-data-table>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <v-card class="container" rounded="lg">
              <div class="container">ປະຫວັດປີ່ນປົວຄົນເຈັບ</div>
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
                :items="resultData"
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
      search1:'',
      dialog: false,
      value: 0,
      headers: [
        { text: 'ຊື່', value: 'name' },
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
      return this.$store.state.user.Patiented
    },
    resultData() {
      return this.$store.state.result.dataHistory
    },
    historyPatient() {
      return this.$store.state.user.dataById
    },
    dataAppoint() {
      return this.$store.state.appointment.appointmentData
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

