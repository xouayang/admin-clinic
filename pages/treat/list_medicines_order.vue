<template >
  <div>
    <div class="mt-2 mb-3 ml-2 font-weight-bold container">
      ລາຍການຊຳລະເງິນ (ລາຍການຢາ)
    </div>
    <!-- <div>ກວດສອບນຳເຂົ້າ</div> -->
    <v-card>
      <v-row class="d-flex justify-end col-12">
        <v-col cols="12" md="12" sm="12">
          <v-card-title>
            <v-text-field
              v-model="search"
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
        :items="medicines_ordder_status.rows"
        :search="search"
        color="#9155FD"
      >
        <template #[`item.created_at`]="{ item }">
          {{ $moment(item.createdAt).format('YYYY-MM-DD') }}
        </template>
        <template #[`item.total_price`]="{ item }">
          <span style="color: red">
            {{ toCurrencyString(item.total_price) }}</span
          >
        </template>
        <template #[`item.actions`]="{ item }">
          <v-btn v-if="item.status === 1" text rounded color="error">
            <v-icon>mdi-dots-horizontal</v-icon>
            <span> ລໍຖ້າຊຳລະເງິນ</span>
          </v-btn>
          <v-btn rounded color="success" @click="updateId(item)">
            <v-icon>mdi-check</v-icon>
            <span style="color: white">ຢືນຢັນຊຳລະເງິນ</span>
          </v-btn>
          <v-btn rounded color="#9155FD" @click="showDetails(item)">
            <v-icon color="white">mdi-eye-outline</v-icon>
            <span style="color: white">ລາຍລະອຽດ</span>
          </v-btn>
        </template>
      </v-data-table>
      <v-divider></v-divider>
    </v-card>
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
    <v-dialog
      v-model="showDetailsDialog"
      width="940"
      activator="parent"
      persistent
    >
      <v-card>
        <v-toolbar dark color="#9155FD">
          <v-card-title>ລາຍລະອຽດລາຍການສັ່ງຢາ</v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="showDetailsDialog = !showDetailsDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <div class="d-flex justify-space-between container">
          <span>
            ລາຄາທັງໝົດ :
            {{ toCurrencyString(parseInt(dataDetails.total_price)) }}</span
          >
          <span> ໃບບິນເລກທີ:{{ dataDetails.bill }}</span>
        </div>
        <v-data-table :headers="headers1" :items="dataDetails.rows">
          <template #[`item.price`]="{ item }">
            <span style="color: red">{{ toCurrencyString(item.price) }}</span>
          </template>
          <template #[`item.created_at`]="{ item }">
            {{ $moment(item.created_at).format('DD-MM-YYYY') }}
          </template>
        </v-data-table>
        <div class="d-flex justify-end container">
          <v-btn color="#9155FD" @click="generateAndPrintBill">
            <v-icon color="white">mdi-printer-outline</v-icon>
            <span style="color: white">ພິມໃບບິນ</span>
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="showUpdateStatus"
      width="540"
      activator="parent"
      persistent
    >
      <v-card>
        <v-toolbar dark color="#9155FD">
          <v-card-title>ຢືນຢັນຊຳລະເງິນ</v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="showUpdateStatus = !showUpdateStatus">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <div class="d-flex justify-space-between container">
          <span> ລະຫັດໃບບິນ:{{ dataUpdateStatus[0]?.treat_id }}</span>
        </div>
        <div class="d-flex justify-end container mt-10">
          <v-btn color="#9155FD" @click="editData(dataUpdateStatus)">
            <v-icon color="white">mdi-content-save-check-outline</v-icon>
            <span style="color: white">ຢືນຢັນ</span>
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
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
      showDetailsDialog: false,
      showUpdateStatus: false,
      dataDetails: {},
      data: [],
      dataUpdateStatus: [],
      headers: [
        { text: 'ລະຫັດໃບບິນ ', value: 'treat_id' },
        { text: 'ຊື່', value: 'firstcheck_name' },
        { text: 'ລາຄາທັງໝົດ', value: 'total_price' },
        { text: 'ວັນ ເດືອນ ປີ ສັ່ງຊື້', value: 'created_at' },
        { text: 'ລາຍລະອຽດ', value: 'actions' },
      ],
      headers1: [
        { text: 'ລະຫັດໃບບິນ ', value: 'treat_id' },
        { text: 'ປະເພດຢາ ', value: 'type_name' },
        { text: 'ຊື່ຢາ', value: 'name' },
        { text: 'ລາຄາທັງໝົດ', value: 'price' },
        { text: 'ຈຳນວນ', value: 'amount' },
        { text: 'ຫົວໜ່ວຍ', value: 'unit' },
        { text: 'ວັນ ເດືອນ ປີ ສັ່ງຊື້', value: 'created_at' },
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
  computed: {
    medicines_ordder_status() {
      return this.$store.state.medicinesType.dataMedicinesStatus
    },
  },
  async mounted() {
    await this.$store.dispatch('medicinesType/medicinesOfferStatus')
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
      this.$axios
        .get(`http://localhost:7000/getPriscriptions/${e.target.value}`, {
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
    async showDetails(data) {
      const id = data.treat_id
      await this.$axios
        .get(`http://localhost:7000/get-offer-status/${id}`)
        .then((data) => {
          this.dataDetails = data?.data
        })
        .catch((error) => {
          console.log(error)
        })
      this.showDetailsDialog = true
    },
    updateId(id) {
      this.showUpdateStatus = true
      this.dataUpdateStatus.push(id)
    },
     editData(data) {
      try {
        const id = data[0]?.treat_id
        this.showUpdateStatus = false
        this.$axios.put(`http://localhost:7000/update-medicines-status/${id}`)
      .then((data) => {
        // console.log(data)
        this.$toast.success('ສຳເລັດ', {
          duration: 3000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'check',
        })
      })
       
    
        this.$store.dispatch('medicinesType/medicinesOfferStatus')
      } catch (error) {
        console.log(error)
      }
    },

    // bill order medicines
    generateAndPrintBill() {
      const rows = this.dataDetails.rows
      const printWindow = window.open('', '', 'height=500,width=1000')
      printWindow.document.write('<html><head><title>Printable Table</title>')
      printWindow.document.write(`
        <style>
        *{
        font-family: 'phetsarath ot', serif;
        }
          table {
            border-collapse: collapse;
            width: 100%;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
            word-break: break-all; /* To wrap long text within cells */
          }
          th {
            background-color: #f2f2f2; /* Header background color */
          }
          .item-create-at,
          .item-price {
            min-width: 100px; /* Set a minimum width for date and price columns */
            width: 20%; /* Set a fixed width for date and price columns */
          }
          .text{
            text-align:center
          }
          .image{
            width:60px
          }
          .bill-details{
            text-align:center;
            margin-bottom:50px
          }
          tr{
            font-size:12px
          }
          .info-clinic{
            display:flex ;
            margin-top:20px
          }
          img {
           content: attr(data);
           }
           .text-end{
            display:flex;
            justify-content:end;
            width:100%;
           }
           .head-info{
            margin-bottom:20px
           }
           .text-right{
            text-align:right;
            
           }
           .text-red{
            color:red
           }
        </style>
      `)
      printWindow.document.write('</head><body >')
      printWindow.document.write(` 
      <div class="bill-details">
        <span>ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ</span><br />
        <span>ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນາຖາວອນ</span>
      </div>
      <h4 class="text">ໃບບິນສັ່ງຢາ</h4>
      <div class="info-clinic">
          <div class="head-info">
             <div>ຄີຣນິກ ດຣ ມົວວ່າງ ເຊຍປາວ</div>
             <div>ບ້ານ:ພູຫົວຊ້າງ,ເມືອງ: ອະນຸວົງ,ແຂວງ: ໄຊສົມບູນ</div>
            <div>
            ເບີໂທລະສັບ : 020 54116066,<br />
            020 77975212
            </div>
      </div>
                  <div class="text-end">
            ເລກທີໃບບິນ:${this.dataDetails.bill}
            </div>
      </div>
      <div class="text-right">ລາຄາທັງໝົດ: 
      <span class="text-red">${this.toCurrencyString(
        parseInt(this.dataDetails.total_price)
      )}</span>
      </div>
  `)
      const tableHeader = `
        <tr>
          <th>ລ/ດ</th>
          <th>ລະຫັດໃບບິນ</th>
          <th>ປະເພດຢາ</th>
          <th>ຊື່ຢາ</th>
          <th>ລາຄາ</th>
          <th>ຈຳນວນ</th>
          <th>ຫົວໜ່ວຍ</th>
          <th>ວັນທີ່ ເດືອນ ປີ ສັ່ງຊຶ້</th>
        </tr>
      `

      printWindow.document.write('<table>')
      printWindow.document.write(tableHeader)
      let index = 1
      for (const row of rows) {
        const rowContent = `
            <tr>
                <td>${index}</td>
                <td>${row.treat_id}</td>
                <td>${row.type_name}</td>
                <td>${row.name}</td>
                <td>${this.toCurrencyString(parseInt(row.price))}</td>
                <td>${row.amount}</td>
                <td>${row.unit}</td>
                 <td> ${this.$moment(row.create_at).format('DD-MM-YYYY')}</td>
            </tr>
          `

        printWindow.document.write(rowContent)
        index++
      }

      printWindow.document.write('</table>')
      printWindow.document.write('</body></html>')
      printWindow.document.close()
      printWindow.print()
    },
  },
}
</script>
<style scoped>
.font {
  font-family: 'Noto Serif Lao', serif;
}
</style>
