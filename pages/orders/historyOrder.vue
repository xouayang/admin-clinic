<template>
  <div class="mt-2 ml-2">
    <!-- {{prescrition}} -->
    <div style="font-size: 20px; color: #9155fd" class="mb-7 ml-4">
      ປະຫວັດຈັດຊື້ຢາ
    </div>
    <v-card class="mt-3 text-center">
      <v-row class="col-12">
        <v-col cols="12" md="12" sm="12">
          <v-text-field
            v-model="search"
            name="sale"
            label="ຄົ້ນຫາ"
            prepend-inner-icon="mdi-magnify"
            outlined
            dense
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="history" :search="search">
        <template #[`item.create_at`]="{ item }">
          {{ $moment(item.create_at).format('YYYY-MM-DD') }}
        </template>
        <template #[`item.actions`]="{ item }">
          <div class="d-flex">
            <div v-if="item.status == 1">
              <v-btn text rounded color="error">
                <v-icon>mdi-dots-horizontal</v-icon>
                <span >ລໍຖ້ານໍາເຂົ້າ</span>
              </v-btn>
            </div>
            <div v-if="item.status == 0">
              <v-btn text rounded color="success">
                <v-icon>mdi-check</v-icon>
                <span>ນໍາເຂົ້າແລ້ວ</span>
              </v-btn>
            </div>
            <div>
              <v-btn rounded color="#9155FD" @click="data(item)">
                <v-icon color="white">mdi-eye</v-icon>
                <span style="color: white">ລາຍລະອຽດ</span>
              </v-btn>
            </div>
          </div>
        </template>
        <template #[`item.price`]="{ item }">
          <span style="color: red">{{ toCurrencyString(item.price) }}</span>
        </template>
      </v-data-table>
      <v-row>
        <v-dialog
          v-model="dialog"
          width="600"
          transition="dialog-bottom-transition"
          persistent
        >
          <v-card>
            <v-toolbar dark color="#9155FD">
              <div>ລາຍລະອຽດໃບສັ່ງຊື້້ຢາ</div>
              <v-spacer></v-spacer>
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-col cols="12">ລະຫັດໃບບິນ : {{ allData.bill_number }}</v-col>
            <v-col cols="12">ຜູ້ສະໜອງ : {{ allData.supplier_name }}</v-col>
            <v-col cols="12">ພະນັກງານສັ່ງຊື້ : {{ allData.staff_name }}</v-col>
            <v-col cols="12">ລາຄາທັງໝົດ : {{ toCurrencyString(parseInt(allData.sum))}}</v-col>
            <v-divider></v-divider>
            <div>
              <v-data-table :headers="headers1" :items="allData.rows">
                <template #[`item.create_at`]="{ item }">
                  {{ $moment(item.create_at).format('DD-MM-YYYY') }}
                </template>
                <template #[`item.price`]="{ item }">
                  {{ toCurrencyString(parseInt(item.price)) }}
                </template>
              </v-data-table>
            </div>
          </v-card>
        </v-dialog>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import laoCurrency from '@lailao10x/lao-currency'
export default {
  data() {
    return {
      search: '',
      allData: [],
      dialog: false,
      headers: [
        { text: 'ລະຫັດໃບບິນ', value: 'bill_number' },
        { text: 'ຊື່ພະນັກງານ', value: 'staff_name' },
        { text: 'ຜູ້ສະໜອງ', value: 'supplier_name' },
        { text: 'ວັນ ເດືອນ ປີ ສັ່ງຊຶ້', value: 'create_at' },
        { text: 'ສະຖານະ', value: 'actions' },
      ],
      headers1: [
        { text: 'ປະເພດຢາ', value: 'type_name' },
        { text: 'ຈຳນວນ', value: 'amount' },
        { text: 'ລາຄາ', value: 'price' },
        { text: 'ວັນ ເດືອນ ປີ ສັ່ງຊຶ້', value: 'create_at' },
      ],
    }
  },
  computed: {
    history() {
      return this.$store.state.user.historyData
    },
  },
  async mounted() {
    await this.$store.dispatch('user/getHistory')
  },
  methods: {
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
    async data(info) {
      this.dialog = true
      const number = info.bill_number
      await this.$axios
        .get(`http://localhost:7000/get-by-bill/${number}`)
        .then((data) => {
          this.allData = data.data
        })
    },
  },
}
</script>

<style>
</style>