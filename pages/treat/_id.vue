<template>
  <div>
    <div class="container font-weight-bold" style="color: #9155fd">ວາງຢາ</div>
    <v-card class="container">
      <v-row class="d-flex justify-end pa-2 mb-4">
        <div class="mr-4">
          <div>ລະຫັດໃບບິນ :{{ dataFrom_checked.bill_number }}</div>
          <div>
            ວັນທີ່ :
            {{
              $moment(dataFrom_checked.created_at).format(
                'DD-MM-YYYY h:mm:ss a'
              )
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
              toCurrencyString(
                allData.reduce((sum, data) => data.amount * data.price + sum, 0)
              )
            }}</span>
          </div>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="12" md="4" sm="12">
          <div>
            ຜົນກວດກວດພະຍາດ :
            <div v-for="data in resultData" :key="data.id">
              <ul>
                <li>{{ data.result_details }}</li>
                >
                {{
                  data.result
                }}
              </ul>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <v-card v-if="medicines.length > 0" class="mt-5">
      <v-card-text>
        <v-row>
          <v-col v-for="data in medicines" :key="data.id" cols="12" md="3">
            <v-card
              title
              :disabled="data?.amount === 0"
              @click="showMedicines(data)"
            >
              <v-img :src="data.image" />
              <div class="pa-1">ຊື່ຢາ: {{ data.name }}</div>
              <div class="pa-1">ປະເພດຢາ: {{ data.type_name }}</div>
              <div class="pa-1">ຫົວໜ່ວຍ: {{ data.unit }}</div>
              <div class="pa-1">
                ລາຄາ:
                <span style="color: red">{{
                  toCurrencyString(data.price)
                }}</span>
              </div>
              <div class="pa-1">ຈຳນວນໃນ(stock): {{ data.amount }}</div>
              <v-fab-transition v-if="data.amount === 0">
                <v-btn
                  text
                  color="red"
                  dark
                  absolute
                  top
                  left
                >
                 <h1>ໝົດ</h1>
                </v-btn>
              </v-fab-transition>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-row class="mb-2">
      <v-col class="mt-4 d-flex justify-end">
        <v-btn color="success" @click="saveData" class="ml-9">
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
        <v-card-text> ປະເພດຢາ: {{ dataMedisinesOne.type_name }} </v-card-text>
        <v-card-text> ຫົວໜ່ວຍ: {{ dataMedisinesOne.unit }} </v-card-text>
        <v-card-text>
          ລາຄາ:<span style="color: red">
            {{ toCurrencyString(parseInt(dataMedisinesOne.price)) }}</span
          >
        </v-card-text>
        <v-card-text>
          ຈຳນວນ:
          <v-text-field
            v-model="qty"
            type="number"
            outlined
            dense
            min="1"
            placeholder="ຈຳນວນ"
            hide-spin-buttons
            @keydown="handleKeyDown"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red white--text" outlined @click="dialog = false"
            >ຍົກເລິກ</v-btn
          >
          <v-btn color="success white--text" @click="sendDataArray"
            >ບັນທຶກ</v-btn
          >
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
      resultData: [],
    }
  },
  computed: {
    medicinesType() {
      return this.$store.state.treat.medicinesType
    },
    medicines() {
      return this.$store.state.treat.medicines
    },
    dataFrom_checked() {
      return this.$store.state.result.dataId
    },
    // dataResult() {
    //   return this.$store.state.result.resultData
    // },
  },
  async mounted() {
    // this.$store.dispatch('treat/getMedicines', this.billId)
    await this.$store.dispatch('treat/getMedicinesType')
    // this.$store.dispatch('result/getId')
    const id = await this.dataFrom_checked.bill_id
    await this.$axios
      .get(`http://localhost:7000/get-result/${id}`)
      .then((data) => {
        this.resultData = data?.data?.rows
        console.log(data?.data?.rows)
      })
  },
  methods: {
    async saveData() {
      await console.log('data >>>>>>>>>>>>>>>', this.dataFrom_checked)
      const readyData = {
        treat_id: this.dataFrom_checked.bill_id,
        item: this.allData,
      }
      //  await console.log(readyData)
      await this.$store.dispatch('treat/saveOffer', readyData)
      this.allData = []
      this.$router.push('/appointment')
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
      this.dataMedisinesOne = data
      this.dialog = true
    },
    selectMedicines(e) {
      console.log('ID>>>>>>>>>>>', this.dataMedisinesOne.medicines_id)
      this.$store.dispatch('treat/getMedicinesAllById', e)
    },
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
    handleKeyDown(event) {
      if (
        event.key === '0' ||
        event.key === '-' ||
        event.key === '+' ||
        event.key === '*' ||
        event.key === '/'
      ) {
        event.preventDefault()
      }
    },
  },
}
</script>
