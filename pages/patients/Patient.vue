<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-2">
      <div class="mt-5 mb-3 pb-2 ml-2 font-weight-bold">
        ລາຍການປີ່ນປົວມື້້ນີ້
      </div>
      <div>
        <v-btn color="#9155FD" @click="back">
          <v-icon color="white">mdi-chevron-left</v-icon>
          <span style="color: white">ກັບຄືນ</span>
        </v-btn>
      </div>
    </div>
    <v-card>
      <!-- search button------------------------------- -->
      <v-row class="d-flex align-center col-12">
        <v-col cols="12" md="12" sm="12">
          <v-card-title>
            <v-text-field
              v-model="searchTerm"
              prepend-inner-icon="mdi-magnify"
              label="ຄົ້ນຫາ"
              outlined
              hide-details
              dense
              small
              color="#9155FD"
            />
          </v-card-title>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="datPatients"
        :items-per-page="5"
        color="#9155FD"
        :search="searchTerm"
      >
        <template #[`item.created_at`]="{ item }">
          {{ $moment(item.created_at).format('DD-MM-YYYY') }}
        </template>
        <template #[`item.weight`]="{ item }"> {{ item.weight }} Kg </template>
        <template #[`item.height`]="{ item }"> {{ item.height }} Cm </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" width="640" activator="parent" persistent>
    </v-dialog>
  </div>
</template>
<script>
import laoCurrency from '@lailao10x/lao-currency'
export default {
  name: 'PatientsPages',
  data() {
    return {
      showDeleteData: '',
      showEditData: '',
      searchTerm: '',
      dialog: false,
      headers: [
        { text: 'ລະຫັດ', value: 'id' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ອາການເບື້ອງຕົ້ນ', value: 'details' },
        { text: 'ລວງສູງ', value: 'height' },
        { text: 'ນໍ້າໜົກ', value: 'weight' },
        { text: 'ເບີໂທລະສັບ', value: 'tel' },
        { text: 'ວັນທີ່ ເດືອນ ປີ ກວດພະຍາດ', value: 'created_at' },
      ],
    }
  },
  computed: {
    datPatients() {
      return this.$store.state.result.history1
    },
  },
  async mounted() {
    await this.$store.dispatch('result/getHistory2')
  },
  methods: {
    back() {
      this.$router.push('/')
    },
    async showData(data) {
      const id = data.id
      await this.$store.dispatch('user/getById', id)
      this.dialog = true
    },
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
  },
}
</script>