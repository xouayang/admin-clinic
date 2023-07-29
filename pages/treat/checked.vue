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
        <div class="d-flex justify-space-between container">
          <span
            >ລາຄາທັງໝົດ : {{ toCurrencyString(parseInt(Id.total_price)) }}</span
          >
          <span>ອາການເບື້ອງຕົ້ນ : {{ Id.details }}</span>
        </div>
        <div class="d-flex justify-space-between container">
          <span>ທີ່ຢູ່ : {{ Id.address }}</span>
          <span>ເບີໂທລະສັບ : {{ Id.tel }}</span>
        </div>
        <v-divider />
        <v-data-table :headers="headers1" :items="Id.rows">
          <template #[`item.price`]="{ item }">
            <span style="color: red">{{ toCurrencyString(item.price) }}</span>
          </template>
          <template slot="item.index" scope="props">
            {{ props.index + 1 }}
          </template>
        </v-data-table>
        <div class="d-flex justify-end container">
          <v-btn color="#9155FD" @click="generateAndPrintBill"
            ><span style="color: white">ພິມ</span>
            <v-icon color="white">mdi-printer-outline</v-icon>
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import laoCurrency from '@lailao10x/lao-currency'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs
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
        { text: 'ລ/ດ', value: 'index' },
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
      console.log(data)
      const id = data.bill_id
      await this.$store.dispatch('result/getId', id)
      this.dialog = true
    },
    generateAndPrintBill() {
      const rows = this.Id.rows
      const printWindow = window.open('', '', 'height=500,width=800')
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
          .text-1{
            text-align:center;
            padding-left:400px;
            margin-top:20px;
          }
        </style>
      `)
      printWindow.document.write('</head><body >')
      printWindow.document.write(` 
    <div class="shop-info">
      <div class="shop-details">
        <h2 class="text">ຜົນກວດ</h2>
        <p class="text">ຄຣິນິກ ດຣ ມົວວ່າງ </p>
        <p>ບ້ານ: ພູຫົວຊ້າງ, ເມືອງ: ອະນຸວົງ,ແຂວງ: ໄຊສົມບູນ</p>
      </div>
    </div>
  `)
      printWindow.document.write(
        `<p class="bill-date">ລະຫັດໃບບິນ: ${this.Id.bill_number}</p>`
      )
      printWindow.document.write(
        `<p class="bill-date">ຊື່ຜູ້ປີ່ນປົວ: ${this.Id.name}</p>`
      )
      printWindow.document.write(
        `<p class="bill-date">ເບີໂທລະສັບ: ${this.Id.tel}</p>`
      )
      printWindow.document.write(
        `<p class="bill-date">ລາຄາທັງໝົດ: ${this.toCurrencyString(
          parseInt(this.Id.total_price)
        )}</p>`
      )

      const tableHeader = `
        <tr>
          <th>ລາຍການກວດ</th>
          <th>ລາຄາ</th>
          <th>ຜົນກວດ</th>
          <th>ວັນ ເດືອນ ປີ ກວດ</th>
        </tr>
      `

      printWindow.document.write('<table>')
      printWindow.document.write(tableHeader)

      for (const row of rows) {
        const rowContent = `
          <tr>
            <td>${row.result_details}</td>
            <td class="item-price">${this.toCurrencyString(
              parseInt(row.price)
            )}</td>
             <td>${row.result}</td>
            <td> ${this.$moment(row.create_at).format(
              'DD-MM-YYYY h:mm:ss a'
            )}</td>
          </tr>
        `

        printWindow.document.write(rowContent)
      }
      printWindow.document.write('</table>')

      printWindow.document.write(`<h5 class="text-1">ແພດວິເຄາະ</h5>`)
      printWindow.document.write('</body></html>')
      printWindow.document.close()
      printWindow.print()
    },
  },
}
</script>

<style>
</style>