<template>
  <div class="mt-3">
    <div class="d-flex justify-end mb-1">
      <v-btn color="#9155FD" @click="back"
        ><v-icon color="white">mdi-keyboard-backspace</v-icon
        ><span style="color: white">ກັບຄືນ</span></v-btn
      >
    </div>
    <v-card>
      <div class="d-flex align-center">
        <v-col class="pa-2 ml-1 mb-2">ລາຍງານຂໍ້ມູນຢາ</v-col>
        <v-col>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            dense
            label="ຄົ້ນຫາ"
          />
        </v-col>
      </div>
      <v-data-table :headers="headers" :items="medicines" :search="search">
        <template slot="item.index" scope="props">
          {{ props.index + 1 }}
        </template>
        <template #[`item.price`]="{ item }">
          {{ toCurrencyString(item.price) }}
        </template>
        <template #[`item.image`]="{ item }">
          <v-img :src="item.image" max-height="40" max-width="89"/>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import laoCurrency from '@lailao10x/lao-currency'
export default {
  name: 'ReportDrugEquipment',
  data() {
    return {
      value: '',
      search: '',
      headers: [
        { text: 'ຮູບພາບ', value: 'image' },
        { text: 'ປະເພດຢາ', value: 'type_name' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ຈຳນວນ', value: 'amount' },
        { text: 'ລາຄາ', value: 'price' },
        { text: 'ຫົວໜ່ວຍ', value: 'unit' },
      ],
    }
  },
  computed: {
    medicines() {
      return this.$store.state.reports.Data
    },
  },
  async mounted() {
    await this.$store.dispatch('reports/getAll')
  },
  methods: {
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
    back() {
      this.$router.push('/reports/reportTable')
    },
  },
}
</script>
