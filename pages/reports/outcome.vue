<template>
  <div class="mt-3">
    <div class="d-flex justify-end">
      <v-btn color="#9155FD" @click="back"
        ><v-icon color="white">mdi-keyboard-backspace</v-icon
        ><span style="color: white">ກັບຄືນ</span></v-btn
      >
    </div>
    <v-card>
      <div class="pa-2 ml-1">ລາຍງານສະຫຼຸບລາຍຮັບ</div>
      <v-row class="col-12 d-flex align-center justify-center">
        <v-col cols="12" sm="12" md="5">
          <DataPicker v-model="startDate" />
        </v-col>
        <v-col cols="12" sm="12" md="5">
          <DataPicker4 v-model="endDate" />
        </v-col>
        <v-col cols="12" sm="12" md="2">
          <v-btn color="#9155fd" @click="showData">
            <span style="color: white">ຄົ້ນຫາ</span>
            <v-icon color="white">mdi-magnify</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="allData.rows">
        <template #[`item.createdAt`]="{ item }">
          {{ $moment(item.createdAt).format('DD-MM-YYYY') }}
        </template>
        <template #[`item.price`]="{ item }">
          {{ toCurrencyString(item.price) }}
        </template>
      </v-data-table>
      <div class="container">
        <span style="color: red; border-bottom: 3px solid #9155fd"
          >ລາຍຮັບທັງໝົດ :
          {{
            allData?.sum
              ? toCurrencyString(parseInt(allData?.sum))
              : toCurrencyString(0)
          }}</span
        >
      </div>
    </v-card>
  </div>
</template>
<script>
import laoCurrency from '@lailao10x/lao-currency'
export default {
  name: 'ReportsIncome',
  data() {
    return {
      items: [],
      startDate: '',
      endDate: '',
      allData: [],
      headers: [
        { text: 'ຊື່ຢາ', value: 'name' },
        { text: 'ຈຳນວນ', value: 'amount' },
        { text: 'ລາຄາ', value: 'price' },
        { text: 'ວັນທີ່ ເດືອນ ປີ', value: 'createdAt' },
      ],
    }
  },
  methods: {
    async showData() {
      const start = this.startDate
      const end = this.endDate
      await this.$axios
        .get(`http://localhost:7000/get-income?start='${start}'&end='${end}'`)
        .then((data) => {
          this.allData = data.data
        })
    },
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
    back() {
      this.$router.push('/reports/reportTable')
    },
  },
}
</script>
