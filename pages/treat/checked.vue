<template>
  <div class="mt-2 ml-2">
    <div style="font-size: 20px; color: #9155fd" class="mb-7 ml-4">
      ລາຍການຜົນກວດພະຍາດ
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
      <v-data-table :headers="headers" :items="resultData" :search="search">
        <template #[`item.created_at`]="{ item }">
          {{ $moment(item.created_at).format('DD-MM-YYYY h:mm:ss a') }}
        </template>
        <template #[`item.total_price`]="{ item }">
          <span class="font-weight-bold" style="color: red">{{
            toCurrencyString(item.total_price)
          }}</span>
        </template>
        <template #[`item.actions`]="{ item }">
          <div class="d-flex">
            <div class="mr-2">
              <v-btn rounded color="#9155fd" @click="showDetails(item)">
                <v-icon color="white">mdi-eye-outline</v-icon>
                <span style="color: white">ລາຍລະອຽດຜົນກວດ</span>
              </v-btn>
            </div>
            <div v-if="item.status == 2" class="mr-2">
              <v-btn text rounded color="success">
                <v-icon>mdi-check</v-icon>
                <span>ຊຳລະເງິນເເລ້ວ</span>
              </v-btn>
            </div>
            <div class="mr-2">
              <v-btn rounded color="#9155fd" @click="save(item)">
                <v-icon color="white">mdi-eye-outline</v-icon>
                <span style="color: white">ວາງຢາ</span>
              </v-btn>
            </div>
          </div>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" width="640" activator="parent" persistent>
      <v-card>
        <v-toolbar dark color="#9155FD">
          <v-card-title>ລາຍລະອຽດຜົນກວດ</v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = !dialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <div class="d-flex justify-space-between container">
          <span> ຊື່:{{ Id.name }}</span>
          <span> ລະຫັດໃບບິນ : {{ Id.bill_number }}</span>
        </div>
        <v-data-table :headers="headers1" :items="Id.rows">
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
  name: 'Checked_Pages',
  data() {
    return {
      search: '',
      dialog: false,
      headers: [
        { text: 'ລະຫັດໃບບິນ', value: 'bill_number' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ລາຄາລວມທີ່ຊຳລະເເລ້ວ', value: 'total_price' },
        { text: 'ວັນທີ່', value: 'created_at' },
        { text: 'ສະຖານະ', value: 'actions' },
      ],
      headers1: [
        { text: 'ລາຍການກວດ', value: 'result_details' },
        { text: 'ລາຄາ', value: 'price' },
        { text: 'ຜົນກວດ', value: 'result' },
      ],
    }
  },
  computed: {
    resultData() {
      return this.$store.state.result.setDataResult
    },
    Id() {
      return this.$store.state.result.idData
    },
  },
  async mounted() {
    await this.$store.dispatch('result/getAll')
  },
  methods: {
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
    // async details(id) {
    //   await this.$store.dispatch('user/getById', id)
    //   this.dialog = true
    // },
    save(data) {
      this.$store.commit('result/getDataId', data)
      this.$router.push('/treat/_id')
    },
    async showDetails(data) {
      const id = data.bill_id
      await this.$store.dispatch('result/getId', id)
      this.dialog = true
    },
  },
}
</script>

<style>
</style>