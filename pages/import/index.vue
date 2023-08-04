<template >
  <div>
    <div class="mt-2 mb-3 ml-2 font-weight-bold container">ກວດສອບນຳເຂົ້າ</div>
    <!-- <div>ກວດສອບນຳເຂົ້າ</div> -->
    <v-card>
      <v-row class="d-flex justify-end col-12">
        <v-col cols="12" md="6" sm="12">
          <v-card-title>
            <!-- <v-select
              id="sale"
              v-model="bill_number"
              item-value="treat_id"
              item-text="treat_id"
              name="sale"
              label="ລະຫັດບາໃບບິນຈັດຊື້ຢາ"
              prepend-inner-icon="mdi-barcode"
              outlined
              dense
            >
            </v-select> -->
            <v-select
              id="sale"
              v-model="billId"
              :items="billData"
              item-value="bill_number"
              item-text="bill_number"
              name="bill_number"
              label="ລະຫັດໃບບິນສັ່ງຢາ"
              prepend-inner-icon="mdi-barcode"
              outlined
              dense
              @change="searchData"
            />
            <!-- v-model="billId"
              prepend-inner-icon="mdi-barcode"
              label="ກວດສອບ"
              outlined
              hide-details
              dense
              small
              color="#9155FD" -->
            <!-- @change="searchData" -->
          </v-card-title>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="importData.rows" color="#9155FD">
        <template #[`item.amount`]="{ item }">
          <v-text-field
            v-model="item.amount"
            type="number"
            hide-details="auto"
            dense
            style="width: 50px"
            @keydown.native="validateNumber"
            hide-spin-buttons
          ></v-text-field>
        </template>
        <template #[`item.expired_date`]="{ item }">
          <DataPicker v-model="item.expired_date" />
        </template>
        <template #[`item.createdAt`]="{ item }">
          {{ $moment(item.createdAt).format('YYYY-MM-DD') }}
        </template>
        <template #[`item.price`]="{ item }">
          <span style="color: red"> {{ toCurrencyString(item.price) }}</span>
        </template>
      </v-data-table>
      <v-divider></v-divider>
    </v-card>
    <v-row class="mt-3">
      <v-col cols="12" class="text-end">
        <v-btn color="#9155FD" @click="saveImport">
          <span style="color: white">ບັນທຶກການນຳເຂົ້າ</span>
          <v-icon color="white">mdi-content-save-check-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-dialog
        v-model="dialog"
        width="600"
        transition="dialog-bottom-transition"
        persistent
      >
        <v-card>
          <v-toolbar dark color="#9155FD">
            <div>ນຳເຂົ້າຢາ</div>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-form ref="anyName">
            <v-col cols="12">
              <v-text-field
                v-model="item.id"
                outlined
                dense
                hide-details="auto"
                label="ລະຫັດນຳເຂົ້າ"
                color="#9155FD"
                prepend-inner-icon="mdi-barcode"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="item.name"
                outlined
                dense
                hide-details="auto"
                label="ຊື່ຢາ"
                color="#9155FD"
                prepend-inner-icon="mdi-alpha-m-circle-outline"
              />
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="item.category"
                outlined
                dense
                hide-details
                label="ປະເພດຢາ"
                color="#9155FD"
                prepend-inner-icon="mdi-format-list-bulleted-type"
              />
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="item.unit"
                outlined
                dense
                hide-details
                label="ຫົວໜ່ວຍ"
                color="#9155FD"
                prepend-inner-icon="mdi-hours-24"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="value"
                outlined
                dense
                hide-details
                label="ວັນ ເດືອນ ປີ ໝົດອາຍຸ"
                color="#9155FD"
              >
                <template #append>
                  <DataPicker v-model="value" />
                </template>
              </v-text-field>
            </v-col>
          </v-form>
          <v-spacer></v-spacer>
          <div class="d-flex justify-end pa-4">
            <v-btn color="#9155FD" @click="showData"
              ><span style="color: white">ບັນທຶກການນຳເຂົ້າ</span>
              <v-icon color="white">mdi-content-save-check-outline</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import laoCurrency from '@lailao10x/lao-currency'
export default {
  name: 'ImportPages',
  data() {
    return {
      billId: '',
      bill_number: '',
      importData: [],
      expired_date: '',
      token: this.$cookies.get('token'),
      value: null,
      value1: null,
      searchTerm: '',
      showDailog: false,
      dialog: false,
      showAddDialog: false,
      search: '',
      billData: [],
      data: [],
      headers: [
        { text: 'ລະຫັດນຳເຂົ້າ ', value: 'bill_number' },
        { text: 'ປະເພດ', value: 'type_name' },
        { text: 'ຊື່ຢາ', value: 'name' },
        { text: 'ຈຳນວນ', value: 'amount' },
        { text: 'ລາຄາ', value: 'price' },
        { text: 'ຫົວໜ່ວຍ', value: 'unit' },
        { text: 'ວັນ ເດືອນ ປີ ສັ່ງຊື້', value: 'createdAt' },
        { text: 'ວັນ ເດືອນ ປີ ໝົດອາຍຸ', value: 'expired_date' },
      ],
      item: {
        id: '',
        name: '',
        category: '',
        unit: '',
        expired_date: '',
      },
    }
  },
  computed: {},
  async mounted() {
    await this.$axios
      .get(`http://localhost:7000/get-prescriptions`)
      .then((data) => {
        console.log(data.data)
        this.billData = data.data
      })
  },
  methods: {
    validateNumber(e) {
      if (e.key === '-') {
        e.preventDefault()
      }
    },
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
    saveImport() {
      const dataIn = []
      this.importData?.rows?.map((el) => {
        const res = {
          amount: parseFloat(el.amount),
          bill_number: el.bill_number,
          id: el.id,
          medicines_id: el.medicines_id,
          name: el.name,
          prescription_id: el.prescription_id,
          price: el.price,
          type_name: el.type_name,
          unit: el.unit,
          expire_date: el.expired_date,
        }
        return dataIn.push(res)
      })
      this.$axios
        .post(
          'http://localhost:7000/createImport',
          { item: dataIn },
          {
            headers: {
              Authorization: `CLINIC ${this.token}`,
            },
          }
        )
        .then((res) => {
          this.importData = []
          this.expired_date = ''
          this.billId = ''
          this.$toast.success('ນຳເຂົ້າສຳເລັດ', {
            duration: 2000,
            position: 'top-right',
            iconPack: 'mdi',
            icon: 'check',
          })
          this.$router.push('/Import/historyImport')
        })
    },
    searchData(e) {
      console.log(e)
      this.$axios
        .get(`http://localhost:7000/getPriscriptions/${e}`, {
          headers: {
            Authorization: `CLINIC ${this.token}`,
          },
        })
        .then((res) => {
          this.importData = res.data
        })
    },
    showData() {
      this.dialog = false
      this.$refs.anyName.reset()
    },
  },
}
</script>
<style scoped>
.font {
  font-family: 'Noto Serif Lao', serif;
}
</style>
