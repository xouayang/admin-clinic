<template>
  <div class="mt-3">
    <!-- <div>{{ dataTreat }}</div> -->
    <v-card>
      <div class="pa-2 ml-1 font-weight-bold" style="color: #9155fd">
        ລາຍການບັນທຶກຂໍ້ມູນປີ່ນປົວ
      </div>
      <v-data-table :headers="headers" :items="dataTreat.rows">
        <template slot="item.index" scope="props">
          {{ props.index + 1 }}
        </template>
        <template #[`item.action`]="{ item }">
          <v-tooltip left color="success">
            <template #activator="{ on, attrs }">
              <v-btn
                color="#9155FD"
                v-bind="attrs"
                v-on="on"
                @click="showDetails(item)"
              >
                <v-icon color="white">mdi-check-outline</v-icon>
              </v-btn>
            </template>
            <span>ກວດ</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>

    <!-- dialog show treat -->
    <template>
      <!-- <div>{{showDiseas}}</div> -->
      <v-row justify="center" class="col-12">
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-toolbar dark color="#9155FD">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>ກວດພະຍາດ</v-toolbar-title>
            </v-toolbar>
            <!-- {{showDiseas.rows}} -->
            <v-row class="mt-2">
              <v-col cols="12" md="6" sm="12">
                <v-list>
                  <div class="font-weight-bold container">ຂໍ້ມູນລາຍການກວດ</div>
                  <div class="container">
                    <v-row>
                      <v-col>
                        <v-select
                          v-model="diseaseId"
                          label="ເລືອກລາຍການກວດ"
                          multiple
                          outlined
                          dense
                          color="#9155FD"
                          :items="showDiseas.rows"
                          item-text="name"
                          item-value="id"
                          return-object
                          hide-details="auto"
                        />
                        <div style="color: red">*ກະລຸນາເລືອກລາຍການກວດ</div>
                      </v-col>
                    </v-row>
                  </div>
                </v-list>
                <div
                  class="container"
                  v-for="data in standareData"
                  :key="data.id"
                >
                  <v-checkbox :label="data.name" />
                </div>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="12" md="6" sm="12">
                <v-list>
                  <v-row class="container mb-5">
                    <v-col>
                      <span class="font-weight-bold">ຂໍ້ມູນປີ່ນປົວ</span></v-col
                    >
                    <v-col>
                      <span
                        >ອາການເບື້ອງຕົ້ນ : {{ storeData.details }}</span
                      ></v-col
                    >
                  </v-row>
                  <v-list-item>
                    <v-row class="d-flex align-center">
                      <v-col md="6">
                        <div>ຊື່ : {{ storeData.name }}</div>
                      </v-col>
                      <v-col md="6">
                        <div>ເບີໂທລະສັບ : {{ storeData.tel }}</div>
                      </v-col>
                      <v-col md="6">
                        <div>ທີ່ຢູ່ : {{ storeData.address }}</div>
                      </v-col>
                      <v-col md="6">
                        <div>ນໍ້າໜັກ : {{ storeData.weight }} Kg</div>
                      </v-col>
                      <v-col md="6">
                        <div>ລວງສູງ : {{ storeData.height }} Cm</div>
                      </v-col>
                      <v-col md="6">
                        <div>
                          <!-- {{diseaseId}} -->
                          ລາຄາລວມ :
                          <span style="color: red" class="font-weight-bold">{{
                            toCurrencyString(
                              diseaseId.reduce(
                                (sum, data) => data.price + sum,
                                0
                              )
                            )
                          }}</span>
                        </div>
                      </v-col>
                      <v-col md="6">
                        <div>
                          ລາຍການທີ່ເລືອກກວດ :
                          <div>
                            <div v-for="data in diseaseId" :key="data.id">
                              <ul>
                                <li>
                                  {{ data.name }} :
                                  {{ toCurrencyString(parseInt(data.price)) }}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-col class="d-flex justify-space-between">
                  <div>
                    <v-btn large color="#9155FD" @click="getHistoryPatient"
                      ><span style="color: white">ເບີ່ງປະຫວັດປີ່ນປົວ</span>
                      <v-icon color="white">mdi-eye-outline</v-icon>
                    </v-btn>
                  </div>
                  <div>
                    <v-btn large color="#9155FD" @click="save"
                      ><span style="color: white">ບັນທືກ</span>
                      <v-icon color="white"
                        >mdi-content-save-check-outline</v-icon
                      >
                    </v-btn>
                  </div>
                </v-col>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
        <v-dialog
          v-model="dialogBill"
          persistent
          max-width="750px"
          transition="dialog-transition"
        >
          <v-card class="pa-5">
            <div class="text-center mt-3 mb-16" style="font-size: 16px">
              <span>ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ</span><br />
              <span>ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນາຖາວອນ</span>
            </div>
            <!-- <v-row>
              <v-col md="6">asdf</v-col>
              <v-col md="6">ຄີຣນິກ ດຣ ມົວວ່າງ ເຊຍປາວ</v-col>
            </v-row> -->
            <v-row class="d-flex justify-space-between">
              <div class="d-flex align-center col-7">
                <v-col md="3">
                  <v-img
                    width="60"
                    class="images mx-auto"
                    :src="require(`../../assets/logo.svg`)"
                    alt="logo_clinic"
                  />
                  <!-- <div>ຄີຣນິກ ດຣ ມົວວ່າງ ເຊຍປາວ</div> -->
                </v-col>
                <v-col md="9">
                  <div>ຄີຣນິກ ດຣ ມົວວ່າງ ເຊຍປາວ</div>
                  <div>ບ້ານ:ພູຫົວຊ້າງ,ເມືອງ: ອະນຸວົງ,ແຂວງ: ໄຊສົມບູນ</div>
                  <div>
                    ເບີໂທລະສັບ : 020 54116066,<br />
                    020 77975212
                  </div>
                </v-col>
              </div>
              <v-col md="5" class="text-end"
                >ລະຫັດໃບບີນ : {{ bill.billNumber }}
              </v-col>
            </v-row>
            <div
              class="text-center font-weight-bold mt-16"
              style="font-size: 20px"
            >
              ໃບບິນລາຍການກວດ
            </div>
            <v-row class="d-flex container">
              <v-col>
                <div>
                  <span>ຊື່: {{ bill.name }}</span
                  >,
                  <span>ທີ່ຢຸູ: {{ bill.address }}</span>
                </div>
                <div>
                  ລາຄາລວມ:
                  <span style="color: red">{{
                    toCurrencyString(parseInt(bill.total_price))
                  }}</span>
                </div>
              </v-col>
            </v-row>
            <div class="col-md-12 font-weight-bold mb-5">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">ລ/ດ</th>
                      <th class="text-left">ລາຍການກວດພະຍາດ</th>
                      <th class="text-left">ລາຄາ</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(data, index) in bill.rows" :key="data.id">
                      <td>{{ index + 1 }}</td>
                      <td>{{ data.details }}</td>
                      <td>{{ toCurrencyString(parseInt(data.price)) }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="red" dark @click="dialogBill = false"
                >ຍົກເລີກ</v-btn
              >
              <v-btn color="blue" dark @click="route">ພິມໃບບິນ</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <div>
        <v-row>
          <v-dialog
            v-model="historyDialog"
            width="640"
            activator="parent"
            persistent
          >
            <v-card hidden>
              <v-toolbar dark color="#9155FD">
                <v-btn icon dark @click="historyDialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>ປະຫວັດປີ່ນປົວຄົນເຈັບ</v-toolbar-title>
              </v-toolbar>
              <div v-if="history_data != 0">
                <div class="d-flex justify-space-between mt-2">
                  <v-col>ຊື່: {{ history_data.firstcheck_name }}</v-col>
                  <v-col>ລະຫັດໃບບິນ : {{ history_data.bill_number }}</v-col>
                </div>
                <div class="d-flex justify-space-between mt-2">
                  <v-col>ເບີໂທລະສັບ: {{ history_data.tel }}</v-col>
                  <v-col>ລາຍລະອຽດ : {{ history_data.details }}</v-col>
                </div>
                <div class="d-flex justify-space-between mt-2">
                  <v-col
                    >ລາຄາລວມ:{{
                      toCurrencyString(parseInt(history_data.total_price))
                    }}</v-col
                  >
                  <v-col
                    >ວັນທີ່ :
                    {{
                      $moment(history_data.created_at).format('DD-MM-YYYY')
                    }}</v-col
                  >
                </div>
                <div>
                  <v-data-table :headers="headers1" :items="history_data.rows">
                    <template slot="item.index" scope="props">
                      {{ props.index + 1 }}
                    </template>
                    <template #[`item.price`]="{ item }">
                      {{ toCurrencyString(parseInt(item.price)) }}
                    </template>
                  </v-data-table>
                </div>
              </div>
              <div v-else>
                <h4 class="text-center pt-16 pb-16">ບໍ່ມີປະຫວັດປີ່ນປົວ !</h4>
              </div>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
    </template>
  </div>
</template>
<script>
import laoCurrency from '@lailao10x/lao-currency'
export default {
  name: 'DataTreat',
  data() {
    return {
      dialog: false,
      historyDialog: false,
      notifications: false,
      dialogNoData: false,
      standareData: null,
      sound: true,
      widgets: false,
      selectedDiseases: [],
      diseaseId: [],
      storeData: '',
      firstcheckid: '',
      dialogBill: false,
      appointMentData: {
        treat_id: '',
        name: '',
        tel: '',
        date: '',
      },
      headers: [
        { text: 'ລຳດັບ', value: 'index' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ທີ່ຢູ່', value: 'address' },
        { text: 'ເບີໂທລະສັບ', value: 'tel' },
        { text: 'ລາຍລະອຽດ', value: 'details' },
        { text: 'ນໍ້າໜັກ', value: 'weight' },
        { text: 'ລວງສູງ', value: 'height' },
        { text: 'ຄວາມດັນ', value: 'chip_life' },
        { text: 'action', value: 'action' },
      ],
      headers1: [
        { text: 'ລຳດັບ', value: 'index' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ລາຄາ', value: 'price' },
      ],
    }
  },
  computed: {
    dataTreat() {
      return this.$store.state.firstcheck.dataStore
    },
    showDiseas() {
      return this.$store.state.disease.dataDisase
    },
    bill() {
      return this.$store.state.treat.bill
    },
    history_data() {
      return this.$store.state.treat.History
    },
  },
  async mounted() {
    await this.$store.dispatch('disease/getAll')
    await this.$store.dispatch('firstcheck/getAll')
    // await this.$store.dispatch('')
  },
  methods: {
    async showMore(e) {
      const id = e[0]?.disease_id
      if (id === null || id === '') {
        console.log('not found')
      } else {
        await this.$axios
          .get(`http://localhost:7000/get-standare/${id}`)
          .then((data) => {
            this.standareData = data.data
          })
      }
    },
    route() {
      this.$router.push('/treat/pay')
  //     // const rows = this.allData.rows
  //     const printWindow = window.open('', '', 'height=500,width=800')
  //     printWindow.document.write('<html><head><title>Printable Table</title>')
  //     printWindow.document.write(`
  //       <style>
  //       *{
  //       font-family: 'phetsarath ot', serif;
  //       }
  //         table {
  //           border-collapse: collapse;
  //           width: 100%;
  //         }
  //         th, td {
  //           border: 1px solid black;
  //           padding: 8px;
  //           text-align: left;
  //           word-break: break-all; /* To wrap long text within cells */
  //         }
  //         th {
  //           background-color: #f2f2f2; /* Header background color */
  //         }
  //         .item-create-at,
  //         .item-price {
  //           min-width: 100px; /* Set a minimum width for date and price columns */
  //           width: 20%; /* Set a fixed width for date and price columns */
  //         }
  //         .text{
  //           text-align:center
  //         }
  //       </style>
  //     `)
  //     printWindow.document.write('</head><body >')
  //     printWindow.document.write(` 
  //   <div class="shop-info">
  //     <div class="shop-details">
  //       <span>ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ</span><br />
  //       <span>ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນາຖາວອນ</span>
  //     </div>
  //   </div>
  // `)
      // printWindow.document.write(
      //   `<p class="bill-date">ວັນທີ່ : ${this.startDate} ຫາ ${this.endDate}</p>`
      // )
      // printWindow.document.write(
      //   `<p class="bill-date">ລາຄາທັງໝົດ: ${this.toCurrencyString(
      //     parseInt(this.allData.total_price)
      //   )}</p>`
      // )
      // const tableHeader = `
      //   <tr>
      //     <th>ຊື່</th>
      //     <th>ລາຍການກວດ</th>
      //     <th>ທີ່ຢູ່</th>
      //     <th>ລາຄາ</th>
      //     <th>ເບີໂທລະສັບ</th>
      //     <th>ວັນ ເດືອນ ປີ ກວດ</th>
      //   </tr>
      // `

      // printWindow.document.write('<table>')
      // printWindow.document.write(tableHeader)

      // for (const row of rows) {
      //   const rowContent = `
      //     <tr>
      //       <td>${row.name}</td>
      //         <td>${row.disase_name}</td>
      //          <td>${row.address}</td>
      //       <td class="item-price">${this.toCurrencyString(
      //         parseInt(row.price)
      //       )}</td>
      //       <td>${row.tel}</td>
      //       <td> ${this.$moment(row.create_at).format('DD-MM-YYYY')}</td>
      //     </tr>
      //   `

      //   printWindow.document.write(rowContent)
      // }

      // printWindow.document.write('</table>')
      // printWindow.document.write('</body></html>')
      // printWindow.document.close()
      // printWindow.print()
    },
    showDetails(data) {
      console.log(data)
      this.firstcheckid = data.id
      this.storeData = data
      if (this.storeData) {
        this.appointMentData.treat_id = this.storeData.id
        this.appointMentData.name = this.storeData.name
        this.appointMentData.tel = this.storeData.tel
      }
      this.dialog = true
    },
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
    async save() {
      const testData = []
      await this.diseaseId.map((res) => {
        return testData.push({ disease_id: res.disease_id, details: res.name })
      })

      const data = {
        firstcheck_id: this.firstcheckid,
        item: testData,
        total_price: this.diseaseId.reduce((sum, res) => res.price + sum, 0),
      }
      await this.$store.dispatch('treat/createTreat', { ...data })
      this.dialog = false
      this.$router.push('/treat/pay')
    },
    async getHistoryPatient() {
      const tel = this.storeData.tel
      this.historyDialog = true
      await this.$store.dispatch('treat/getHistoryOfPatient', tel)
    },
  },
}
</script>
