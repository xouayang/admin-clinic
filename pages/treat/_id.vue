<template>
  <div>
    <div class="container font-weight-bold" style="color:#9155FD">ວາງຢາ</div>
    <v-card class="container">
      <v-row class="d-flex justify-end pa-2 mb-4">
        <div class="mr-4">
          <div>ລະຫັດໃບບິນ :{{ dataFrom_checked.bill_number }}</div>
          <div>
            ວັນທີ່ :
            {{
              $moment(dataFrom_checked.created_at).format('DD-MM-YYYY h:mm:ss a')
            }}
          </div>
        </div>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" sm="12">
          <v-select
            :items="medicinesType"
            item-value="id"
            item-text="type_name"
            label="ເລືອກ"
            dense
            outlined
            @change="selectMedicines"
          ></v-select>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="12" md="4" sm="12">
          <div>
            ລາຍການຢາທີ່ເລືອກ :
            <div v-for="data in allData" :key="data.id">
              <ul>
                <li>
                  {{ data?.name }}
                </li>
              </ul>
            </div>
          </div>
          <div>
            ຈໍານວນ : {{ allData.reduce((sum, data) => data.amount + sum, 0) }}
          </div>
          <div>
            ລາຄາລວມ :
            <span style="color: red" class="font-weight-bold">{{
              toCurrencyString(allData.reduce((sum, data) => data.amount * data.price + sum, 0))
            }}</span>
          </div>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="12" md="4" sm="12">
          <div>
            ຜົນກວດກວດພະຍາດ :
            <div>
              <span>{{ dataFrom_checked.result }}</span>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>

    <v-card v-if="medicines.length > 0" class="mt-5">
      <v-card-text>
        <v-row>
          <v-col v-for="data in medicines" :key="data.id" cols="12" md="3">
            <v-card @click="showMedicines(data)">
              <v-card-title> ຊື່ຢາ: {{ data.name }} </v-card-title>
              <div class="pa-1">ລາຄາ: {{ toCurrencyString(data.price) }}</div>
              <div class="pa-1">ຈຳນວນໃນ(stock): {{ data.amount }}</div>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-row class="mt-2">
      <v-col class="mt-8 d-flex justify-end">
        <v-btn color="#9155FD" @click="saveData">
          <span style="color: white">ບັນທຶກ</span>
          <v-icon color="white"> mdi-content-save-check-outline </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title> ຊື່ຢາ: {{ dataMedisinesOne.name }} </v-card-title>
        <v-card-title> ປະເພດຢາ: {{ dataMedisinesOne.type_name }} </v-card-title>
        <v-card-text> ລາຄາ: {{ dataMedisinesOne.price }} </v-card-text>
        <v-card-text>
          ຈຳນວນ:
          <v-text-field
            v-model="qty"
            outlined
            dense
            placeholder="ຈຳນວນ"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red white--text" outlined @click="dialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="success white--text" @click="sendDataArray">ບັນທຶກ</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import laoCurrency from '@lailao10x/lao-currency'
export default {
  name: 'medicinesPages',
  data() {
    return {
      qty: null,
      dialog: false,
      dataMedisinesOne: {},
      allData: [],
    }
  },
  computed: {
    // billId() {
    //   return this.$route.query.bill
    // },
    // T_id() {
    //   return this.$route.query.treat_id
    // },
    // billData() {
    //   return this.$store.state.treat.billData
    // },
    medicinesType() {
      return this.$store.state.treat.medicinesType
    },
    medicines() {
      return this.$store.state.treat.medicines
    },
    dataFrom_checked() {
      return this.$store.state.result.dataId
    },
  },
  mounted() {
    // this.$store.dispatch('treat/getMedicines', this.billId)
    this.$store.dispatch('treat/getMedicinesType')
  },
  methods: {
    async saveData() {
     await console.log(this.dataFrom_checked.id)
      // const readyData = {
      //   treat_id:this.dataFrom_checked.id,
      //   item: this.allData,
      // }

      // await this.$store.dispatch('treat/saveOffer', readyData)
      // this.allData = []
    },
    sendDataArray() {
      const medicinesData = {
        medicines_id: this.dataMedisinesOne.medicines_id,
        amount: parseFloat(this.qty),
        name: this.dataMedisinesOne.name,
        price: this.dataMedisinesOne.price,
      }
      this.allData.push(medicinesData)
      this.qty = ''
      this.dialog = false
    },
    showMedicines(data) {
      console.log(data)
      this.dataMedisinesOne = data
      this.dialog = true
    },
    selectMedicines(e) {
      this.$store.dispatch('treat/getMedicinesAllById', e)
    },
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
  },
}
</script>
