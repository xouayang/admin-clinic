<template>
  <div class="mt-2 ml-2">
    <div style="font-size: 20px; color: #9155fd" class="mb-7 ml-4">
      ລາຍການຊຳລະເງິນແລ້ວ(ລາຍການກວດພະຍາດ)
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
            <template #[`item.createdAt`]="{ item }">
              {{ $moment(item.createdAt).format('DD-MM-YYYY , h:mm:ss a') }}
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="dataStatus" :search="search">
        <template #[`item.date`]="{ item }">
          {{ $moment(item.date).format('DD-MM-YYYY') }}
        </template>
        <template #[`item.total_price`]="{ item }">
          <span class="font-weight-bold" style="color: red">{{
            toCurrencyString(item.total_price)
          }}</span>
        </template>
        <template #[`item.actions`]="{ item }">
          <div class="d-flex">
            <div v-if="item.status == 0" class="mr-2">
              <v-btn text rounded color="success">
                <v-icon>mdi-check</v-icon>
                <span>ຊຳລະເງີນເເລ້ວ</span>
              </v-btn>
            </div>
            <div class="mr-2">
              <v-btn rounded color="#9155fd" @click="details(item.id)">
                <v-icon color="white">mdi-eye-outline</v-icon>
                <span style="color: white">ລາຍລະອຽດ</span>
              </v-btn>
            </div>
            <div>
              <!-- <v-btn rounded color="#9155fd" @click="details(item.id)"> -->
              <v-btn rounded color="#9155fd" @click="show(item.id)">
                <v-icon color="white">mdi-pen</v-icon>
                <span style="color: white">ປ້ອນຜົນກວດ</span>
              </v-btn>
            </div>
          </div>
        </template>
      </v-data-table>
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
            <span> ຊື່:{{ billIdData.name }}</span>
            <span> ລະຫັດໃບບິນ : {{ billIdData.billNumber }}</span>
          </div>
          <div class="d-flex justify-space-between container">
            <span>ທີ່ຢຸູ:{{ billIdData.address }}</span>
            <span>ເບີໂທລະສັບ:{{ billIdData.tel }}</span>
          </div>
          <v-data-table :headers="headers1" :items="billIdData.rows">
            <template #[`item.price`]="{ item }">
              <span style="color: red">{{ toCurrencyString(item.price) }}</span>
            </template>
          </v-data-table>
        </v-card>
      </v-dialog>
      <!-- update data id  -->
      <v-dialog v-model="resultDialog" width="640" persistent>
        <v-card>
          <v-toolbar dark color="#9155FD">
            <v-card-title>ປ້ອນຜົນກວດ</v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="resultDialog = !resultDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-col>
            <!-- <div class="ml-2 mb-3">ປ້ອນຜົນກວດ</div>
            <v-text-field v-model="result" outlined  label="ປ້ອນຜົນກວດ" ></v-text-field>
            <div>
            </div> -->
            <v-data-table :headers="headers2" :items="billIdData.rows">
              <template #[`item.results`]="{ item }">
                <v-select
                  v-model="item.results"
                  label="ເລືອກ"
                  dense
                  outlined
                  :items="['positive', 'Negative']"
                ></v-select>
              </template>
            </v-data-table>

            <!-- <div>{{ data_by_id.firstcheck_id }}</div>
            <div>{{ data_by_id.id }}</div> -->
          </v-col>
          <v-card-actions class="d-flex justify-end">
            <v-btn color="error" @click="clearData">
              <span>ລ້າງຂໍ້ມູນ</span>
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>
            <v-btn color="#9155FD">
              <span style="color: white" @click="save">ບັນທືກ</span>
              <v-icon color="white">mdi-content-save-check-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- <v-dialog
        v-model="detailsDialog"
        width="640"
        activator="parent"
        persistent
      >
        <v-card class="container">
          <v-select
            label="ເລືອກ"
            dense
            outlined
            :items="['positive', 'Negative']"
          ></v-select>
          <v-card-actions>
            <v-btn @click="detailsDialog = false">cancel</v-btn>
            <v-btn @click="detailsDialog = false">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->
    </v-card>
  </div>
</template>

<script>
import laoCurrency from '@lailao10x/lao-currency'
export default {
  data() {
    return {
      search: '',
      dialog: false,
      resultDialog: false,
      detailsDialog: false,
      bill_id: '',
      firstcheck_id: '',
      billIdData: {},
      results: [],
      headers: [
        { text: 'ລະຫັດໃບບິນ', value: 'bill_number' },
        { text: 'ລາຍລະອຽດ', value: 'details' },
        { text: 'ລາຄາລວມ', value: 'total_price' },
        { text: 'ວັນທີ່', value: 'date' },
        { text: 'ສະຖານະ', value: 'actions' },
      ],
      headers1: [
        { text: 'ລາຍການກວດ', value: 'details' },
        { text: 'ລາຄາ', value: 'price' },
      ],
      headers2: [
        { text: 'ລາຍການກວດ', value: 'details' },
        { text: 'ປ້ອນຜົນກວດ', value: 'results' },
      ],
    }
  },
  computed: {
    bill() {
      return this.$store.state.user.billData
    },
    // data_by_id() {
    //   return this.$store.state.user.dataById
    // },
    dataStatus() {
      return this.$store.state.user.dataStatus
    },
  },
  async mounted() {
    await this.$store.dispatch('user/getBill')
    await this.$store.dispatch('user/getStatus')
    // await this.$store.dispatch('user/getById')
  },
  methods: {
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
    async details(id) {
      await this.$store.dispatch('user/getById', id)
      this.dialog = true
    },
    async show(id) {
      await this.$axios
        .get(`http://localhost:7000/bill-data/${id}`)
        .then((data) => {
          this.billIdData = data?.data
        })
      // await this.$store.dispatch('user/getById', id)
      // this.bill_id = this.data_by_id.id
      // this.firstcheck_id = this.data_by_id.firstcheck_id
      this.resultDialog = true
    },
    clearData() {
      this.result = ''
    },
    async save() {
      const data = {
        firstcheck_id: this.billIdData.firstcheck_id,
        bill_id: this.billIdData.id,
        item: this.billIdData.rows,
      }
     await console.log(data)
      await this.$store.dispatch('result/createResult', { ...data })
      this.$router.push('/treat/checked')
    },
  },
}
</script>

<style>
</style>