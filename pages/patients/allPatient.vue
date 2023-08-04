<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-2">
      <div class="mt-5 mb-3 pb-2 ml-2 font-weight-bold">
        ລາຍການປີ່ນປົວທັງໝົດ
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
        <template #[`item.more`]="{ item }">
          <v-tooltip top color="#9155FD">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" @click="showData(item)">
                <v-icon color="#9155FD">mdi-eye-outline</v-icon>
              </v-btn>
            </template>
            <span>ລາຍລະອຽດ</span>
          </v-tooltip>
        </template>

        <template #[`item.sendData`]="{ item }">
          <v-btn color="success" @click="sendData(item)">
            <v-icon>mdi-check-outline</v-icon>
            <span>ກວດ</span>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
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
          <span> ຊື່:{{ details.name }}</span>
          <span> ລະຫັດໃບບິນ : {{ details.billNumber }}</span>
        </div>
        <div class="d-flex justify-space-between container">
          <span>ທີ່ຢຸູ:{{ details.address }}</span>
          <span>ເບີໂທລະສັບ:{{ details.tel }}</span>
        </div>
        <div class="d-flex justify-space-between container">
          <span
            >ລາຄາລວມ :{{
              toCurrencyString(parseInt(details.total_price))
            }}</span
          >
        </div>
        <v-data-table :headers="headers1" :items="details.rows">
          <template #[`item.price`]="{ item }">
            <span style="color: red">{{ toCurrencyString(item.price) }}</span>
          </template>
        </v-data-table>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import laoCurrency from '@lailao10x/lao-currency'
export default {
  name: 'AllPatients',
  data() {
    return {
      showDeleteData: '',
      showEditData: '',
      searchTerm: '',
      dialog: false,
      headers: [
        { text: 'ລະຫັດໃບບິນ', value: 'bill_number' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ທີ່ຢູ່', value: 'address' },
        { text: 'ອາການເບື້ອງຕົ້ນ', value: 'details' },
        { text: 'ເບີໂທລະສັບ', value: 'tel' },
        { text: 'ວັນທີ່', value: 'created_at' },
        { text: 'ລາຍລະອຽດ', value: 'more' },
        { text: 'ບັນທຶກ', value: 'sendData' },
      ],
      headers1: [
        { text: 'ລາຍການກວດ', value: 'details' },
        { text: 'ລາຄາ', value: 'price' },
      ],
    }
  },
  computed: {
    datPatients() {
      return this.$store.state.result.history
    },
    details() {
      return this.$store.state.user.dataById
    },
  },
  async mounted() {
    await this.$store.dispatch('result/getHistory1')
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
    sendData(data) {
      this.$store.commit('result/getHistoryDataId', data)
      this.$router.push('/treat/history_basic_record')
    },
  },
}
</script>