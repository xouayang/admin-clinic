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
        <template #[`item.price`]="{ item }">
          {{ toCurrencyString(parseInt(item.price)) }}
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
import laoCurrency from '@lailao10x/lao-currency'
export default {
  name: 'History_Imports',
  data() {
    return {
      search: '',
      headers: [
        { text: 'ລະຫັດໃບບິນ', value: 'bill_number' },
        { text: 'ປະເພດຢາ', value: 'type_name' },
        { text: 'ຊື່ຢາ', value: 'primacy_name' },
        { text: 'ຈຳນວນ', value: 'amount' },
        { text: 'ລາຄາ', value: 'price' },
        { text: 'ຫົວໜ່ວຍ', value: 'unit' },
        { text: 'ພະນັກງານນໍາເຂົ້າ', value: 'name' },
        { text: 'ວັນ ເດືອນ ປີ ໝົດອາຍຸ', value: 'expire_date' },
      ],
    }
  },
  computed: {
    history() {
      return this.$store.state.user.importHistory
    },
  },
  async mounted() {
    await this.$store.dispatch('user/getImportHistory')
  },
  methods: {
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
  },
}
</script>