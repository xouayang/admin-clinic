<template >
  <div>
    <div class="mt-4 mb-3 ml-2 font-weight-bold container">ກວດສອບຂໍ້ມູນຢາ</div>
    <!-- <div>ກວດສອບນຳເຂົ້າ</div> -->
    <!-- {{medicines}} -->
    <v-card class="pa-10">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="searchTerm"
            prepend-inner-icon="mdi-magnify"
            label="ຄົ້ນຫາ"
            outlined
            hide-details
            dense
            small
            color="#9155FD"
            class="mb-2"
          />
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="supId"
            :items="supData"
            outlined
            dense
            item-text="supplier_name"
            item-value="id"
            label="ເລືອກຜູ້ສະໜອງ"
          ></v-select>
        </v-col>
      </v-row>

      <v-col>
        <v-data-table
          v-model="selectedItems"
          :headers="headers"
          :items="medicines"
          show-select
          item-key="medicines_id"
        >
          <template #[`item.indx`]="{ index }">
            {{ index + 1 }}
          </template>
          <template #[`item.price`]="{ item }">
            <span style="color: red">{{ toCurrencyString(item.price) }}</span>
          </template>
        </v-data-table>
      </v-col>

      <v-divider></v-divider>
    </v-card>
    <v-row class="mt-3 mb-8">
      <v-col cols="12" class="text-end">
        <v-btn color="#9155FD" @click="getSelectedItems">
          <span style="color: white">ບັນທຶກການສັ່ງຊື້</span>
          <v-icon color="white">mdi-content-save-check-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog"
      persistent
      :overlay="false"
      max-width="800px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title> insert data </v-card-title>
        <v-card-text>
          <v-data-table :headers="headers" :items="selectedItems">
            <template #[`item.indx`]="{ index }">
              {{ index + 1 }}
            </template>
            <template #[`item.amount`]="{ item }">
              <v-text-field
                v-model="item.amount"
                type="number"
                hide-details="auto"
                dense
                style="width: 50px"
              ></v-text-field>
            </template>
            <template #[`item.price`]="{ item }">
              <span style="color: red">{{ toCurrencyString(item.price) }}</span>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red " outlined @click="dialog = false">cancel</v-btn>
          <v-btn color="success white--text " @click="order">ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import laoCurrency from '@lailao10x/lao-currency'
export default {
  name: 'OrderPages',
  data() {
    return {
      supId: '',
      token: this.$cookies.get('token'),
      amount: [],
      selectedItems: [],
      medicines: [],
      supData: [],
      value: null,
      value1: null,
      searchTerm: '',
      dialog: false,
      showAddDialog: false,
      search: '',
      data: [],
    }
  },
  computed: {
    headers() {
      return [
        { text: 'ລຳດັບ', value: 'indx' },
        { text: 'ປະເພດ ', value: 'type_name' },
        { text: 'ຊື່ຢາ', value: 'name' },
        { text: 'ຈຳນວນ', value: 'amount' },
        { text: 'ລາຄາ', value: 'price' },
        { text: 'ຫົວໜ່ວຍ', value: 'unit' },
      ]
    },
  },
  mounted() {
    this.$axios.get('http://localhost:7000/getMedicines').then((res) => {
      this.medicines = res.data
    })

    this.$axios.get('http://localhost:7000/get-suppliers').then((res) => {
      this.supData = res.data.rows
    })
  },
  methods: {
    async order() {
      const data = {
        supplier_id: this.supId,
        item: this.selectedItems,
        // token: this.token
      }
      await this.$axios
        .post('http://localhost:7000/create-prescription', data, {
          headers: {
            Authorization: `CLINIC ${this.token}`,
          },
        })
        .then((res) => {
          this.$router.push('/orders/historyOrder')
          this.$toast.success('ສັ່ງຊື້ສຳເລັດ', {
            duration: 2000,
            position: 'top-right',
            iconPack: 'mdi',
            icon: 'check',
          })
        })
        .catch(() => {
          this.$toast.error('ສັ່ງຊື້ບໍ່ສຳເລັດ', {
            duration: 2000,
            position: 'top-right',
            iconPack: 'mdi',
            icon: 'close',
          })
        })
      this.dialog = false
    },
    onAmountEdit(item) {
      console.log(`Edited amount value: ${item.amount}`)
    },
    showData() {
      this.dialog = false
      this.$refs.anyName.reset()
    },
    getSelectedItems() {
      this.dialog = true
    },
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
  },
}
</script>
<style scoped>
.font {
  font-family: 'Noto Serif Lao', serif;
}
</style>



