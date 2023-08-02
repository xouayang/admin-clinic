<template>
  <div class="mt-2 ml-2">
    <div style="font-size: 20px; color: #9155fd" class="mb-7 ml-4">
      ລາຍການຊຳລະເງິນ (ລາຍການກວດພະຍາດ)
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
              {{ $moment(item.createdAt).format('DD-MM-YYY') }}
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="bill" :search="search">
        <template #[`item.date`]="{ item }">
          {{ $moment(item.date).format('DD-MM-YYYY h:mm:ss a') }}
        </template>
        <template #[`item.total_price`]="{ item }">
          <span class="font-weight-bold" style="color: red">{{
            toCurrencyString(item.total_price)
          }}</span>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-btn rounded color="success" @click="updateId(item)">
            <v-icon>mdi-check</v-icon>
            <span style="color: white">ຢືນຢັນຊຳລະເງິນ</span>
          </v-btn>
          <v-btn rounded color="#9155fd" @click="details(item)">
            <v-icon color="white">mdi-eye-outline</v-icon>
            <span style="color: white">ລາຍລະອຽດ</span>
          </v-btn>
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
            <span> ຊື່:{{ data_by_id.name }}</span>
            <span> ລະຫັດໃບບິນ : {{ data_by_id.billNumber }}</span>
          </div>
          <div class="d-flex justify-space-between container">
            <span>ທີ່ຢຸູ:{{ data_by_id.address }}</span>
            <span>ເບີໂທລະສັບ:{{ data_by_id.tel }}</span>
          </div>
          <v-data-table :headers="headers1" :items="data_by_id.rows">
            <template #[`item.price`]="{ item }">
              <span style="color: red">{{ toCurrencyString(item.price) }}</span>
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
      <!-- update data id  -->
      <v-dialog v-model="updateDataId" width="440" persistent>
        <v-card>
          <v-toolbar dark color="#9155FD">
            <v-card-title>ຢືນຢັນ</v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="updateDataId = !updateDataId">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <div class="d-flex justify-space-around container">
            <span>
              ລາຄາລວມ:{{
                toCurrencyString(parseInt(sendData.total_price))
              }}</span
            >
            <span> ລະຫັດໃບບິນ : {{ sendData.bill_number }}</span>
          </div>
          <v-card-actions class="d-flex justify-end">
            <v-btn color="#9155FD" @click="updaetStatus(sendData.id)">
              <span style="color: white">ຢືນຢັນ</span>
              <v-icon color="white">mdi-content-save-check-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      updateDataId: false,
      sendData: '',
      sum:0,
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
    }
  },
  computed: {
    bill() {
      return this.$store.state.user.billData
    },
    data_by_id() {
      return this.$store.state.user.dataById
    },
  },
  async mounted() {
    await this.$store.dispatch('user/getBill')
    // await this.$store.dispatch('user/getById')
  },
  methods: {
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
    async details(data) {
     const id = data.id
      await this.$store.dispatch('user/getById', id)
      this.dialog = true
    },
    updateId(item) {
      this.sendData = item
      this.updateDataId = true
    },
    async updaetStatus(id) {
      await this.$store.dispatch('user/updateBill', id)
      await this.$store.dispatch('user/getBill')
      await this.$router.push('/treat/payed')
      this.updateDataId = false
    },
    generateAndPrintBill() {
      const rows = this.data_by_id.rows
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
            display:flex;
            justify-content:space-between;
            margin-bottom:10px
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
      <h4 class="text">ໃບບິນກວດພະຍາດ</h4>
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
             ເລກທີໃບບິນ:${this.data_by_id.billNumber}
            </div>
      </div>
      <div class="text-right">
      <div>ຊື່: ${this.data_by_id.name},ທີ່ຢູ່ : ${this.data_by_id.address},ເບີໂທລະສັບ:
      ${this.data_by_id.tel}</div>
      <div>ລາຄາທັງໝົດ:${this.toCurrencyString(parseInt(this.data_by_id.total_price))}</div>
      </div>
  `)
      const tableHeader = `
        <tr>
          <th>ລ/ດ</th>
          <th>ລາຍການກວດ</th>
          <th>ລາຄາ</th>
          <th>ວັນທີ່ ເດືອນ ປີ ກວດພະຍາດ</th>
        </tr>
      `

      printWindow.document.write('<table>')
      printWindow.document.write(tableHeader)
      let index = 1
      let sum1 = 0
      rows.forEach(item => {
       sum1 += item.price
      });
      this.sum = sum1
      for (const row of rows) {
        const rowContent = `
            <tr>
                <td>${index}</td>
                <td>${row.details}</td>
                <td>${this.toCurrencyString(parseInt(row.price))}</td>
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

<style>
</style>