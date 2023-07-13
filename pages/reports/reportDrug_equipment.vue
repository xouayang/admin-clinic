<template>
  <div class="mt-3">
    <v-card>
      <div class="pa-2 ml-1 text-center mb-2">ລາຍງານຂໍ້ມູນຢາ</div>
      <!-- <v-row class="col-12 d-flex justify-center"> -->
      <!-- <v-col cols="12" sm="12" md="6">
          <DataPicker v-model="value" />
        </v-col>
        <v-col cols="12" sm="12" md="6" class="text-center">
          <div>
            ຄົ້ນຫາວັນທີ ເດືອນ ປີ : <span style="color: red">{{ value }}</span>
          </div>
        </v-col>
      </v-row> -->
      <v-data-table :headers="headers" :items="medicines">
        <template slot="item.index" scope="props">
          {{ props.index + 1 }}
        </template>
        <template #[`item.price`]="{ item }"> {{toCurrencyString(item.price)}} </template>
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
      headers: [
        { text: 'ລ/ດ', value: 'index' },
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
  },
}
</script>
