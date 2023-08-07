<template>
  <div class="mt-2 ml-2">
    <!-- {{prescrition}} -->
    <div style="font-size: 20px; color: #9155fd" class="mb-7 ml-4">
      ລາຍການສັ່ງຊື້ຢາ
    </div>
    <v-card class="mt-3 text-center mb-10">
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
        <template #[`item.create_at`]="{ item }">
          {{ $moment(item.create_at).format('YYYY-MM-DD') }}
        </template>
        <template #[`item.actions`]="{ item }">
          <div class="d-flex">
            <div v-if="item.status == 1">
              <v-btn rounded color="error" @click="accept(item)">
                <v-icon>mdi-dots-horizontal</v-icon>
                <span>ລໍຖ້ານໍາອະນຸມັດ</span>
              </v-btn>
            </div>
            <div>
              <v-btn rounded color="#9155FD" @click="data(item)">
                <v-icon color="white">mdi-eye</v-icon>
                <span style="color: white">ລາຍລະອຽດ</span>
              </v-btn>
            </div>
          </div>
        </template>
        <template #[`item.price`]="{ item }">
          <span style="color: red">{{ toCurrencyString(item.price) }}</span>
        </template>
      </v-data-table>
      <v-row>
        <v-dialog
          v-model="dialog"
          width="600"
          transition="dialog-bottom-transition"
          persistent
        >
          <v-card>
            <v-toolbar dark color="#9155FD">
              <div>ລາຍລະອຽດໃບສັ່ງຊື້້ຢາ</div>
              <v-spacer></v-spacer>
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-col cols="12">ລະຫັດໃບບິນ : {{ allData.bill_number }}</v-col>
            <v-col cols="12">ຜູ້ສະໜອງ : {{ allData.supplier_name }}</v-col>
            <v-col cols="12">ພະນັກງານສັ່ງຊື້ : {{ allData.staff_name }}</v-col>
            <v-col cols="12"
              >ລາຄາທັງໝົດ : {{ toCurrencyString(parseInt(allData.sum)) }}</v-col
            >
            <v-divider></v-divider>
            <div>
              <v-data-table :headers="headers1" :items="allData.rows">
                <template #[`item.create_at`]="{ item }">
                  {{ $moment(item.create_at).format('DD-MM-YYYY') }}
                </template>
                <template #[`item.price`]="{ item }">
                  {{ toCurrencyString(parseInt(item.price)) }}
                </template>
              </v-data-table>
            </div>
            <div class="d-flex justify-end container">
              <v-btn color="#9155FD" @click="generateAndPrintBill"
                ><span style="color: white">ພິມ</span>
                <v-icon color="white">mdi-printer-outline</v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-dialog>
      </v-row>
      <v-row>
        <v-dialog
          v-model="acceptDialog"
          width="600"
          transition="dialog-bottom-transition"
          persistent
        >
          <v-card>
            <v-toolbar dark color="#9155FD">
              <div>ອະນຸມັດສັ່ງຊື້້ຢາ</div>
              <v-spacer></v-spacer>
              <v-btn icon dark @click="acceptDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <div class="container">
              <div class="mt-6 mb-6 container">ລະຫັດ : {{ bill.id }}</div>
              <div class="mt-6 mb-6 container">
                ລະຫັດໃບບິນ : {{ bill.bill_number }}
              </div>
            </div>
            <div class="container d-flex justify-end">
              <v-btn color="#9155FD" @click="acceptedAll(bill.id)">
                <span style="color: white">ຢືນຢັນ</span>
              </v-btn>
            </div>
          </v-card>
        </v-dialog>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import laoCurrency from '@lailao10x/lao-currency'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs
export default {
  data() {
    return {
      search: '',
      allData: [],
      dialog: false,
      acceptDialog: false,
      bill: '',
      headers: [
        { text: 'ລະຫັດ', value: 'id' },
        { text: 'ລະຫັດໃບບິນ', value: 'bill_number' },
        { text: 'ຊື່ພະນັກງານ', value: 'staff_name' },
        { text: 'ຜູ້ສະໜອງ', value: 'supplier_name' },
        { text: 'ວັນ ເດືອນ ປີ ສັ່ງຊຶ້', value: 'create_at' },
        { text: 'ສະຖານະ', value: 'actions' },
      ],
      headers1: [
        { text: 'ປະເພດຢາ', value: 'type_name' },
        { text: 'ຊື່ຢາ', value: 'name' },
        { text: 'ຈຳນວນ', value: 'amount' },
        { text: 'ລາຄາ', value: 'price' },
        { text: 'ວັນ ເດືອນ ປີ ສັ່ງຊຶ້', value: 'create_at' },
      ],
    }
  },
  computed: {
    history() {
      return this.$store.state.user.historyData1
    },
  },
  async mounted() {
    await this.$store.dispatch('user/getHistory1')
  },
  methods: {
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
    async data(info) {
      this.dialog = true
      const number = info.bill_number
      await this.$axios
        .get(`http://localhost:7000/get-by-bill/${number}`)
        .then((data) => {
          this.allData = data.data
        })
    },
    accept(data) {
      this.bill = data
      this.acceptDialog = true
    },
    async acceptedAll(id) {
      await this.$axios
        .put(`http://localhost:7000/update-prescriptions/${id}`)
        .then(() => {
          this.acceptDialog = false
          this.$store.dispatch('user/getHistory1')
        })
    },
    generateAndPrintBill1(callback) {
      const table = document.querySelector('.v-data-table__wrapper table')
      const clonedTable = table.cloneNode(true)
      const headers = clonedTable.querySelectorAll('thead th')
      const actionsIndex = Array.from(headers).findIndex(
        (header) => header.textContent.trim() === 'Actions'
      )
      if (actionsIndex !== -1) {
        headers[actionsIndex].remove()
        const rows = clonedTable.querySelectorAll('tbody tr')
        rows.forEach((row) => row.children[actionsIndex].remove())
      }

      const printWindow = window.open('', '', 'height=500,width=800')
      printWindow.document.write(
        '<html><head><title>ລາຍລະອຽດໃບສັ່ງຊື້້ຢາ</title>'
      )
      printWindow.document.write(`
    <style>
      @font-face {
        font-family: 'Noto Sans Lao Looped';
        src: url('assets/fonts/NotoSerifLao.ttf') format('truetype');
      }
      
      table {
        border-collapse: collapse;
        margin: 0 auto;
        font-family: 'Noto Sans Lao Looped', serif;
        width: 100%;
      }
      td, th {
        border: 1px solid black;
        padding: 0.5rem;
      }
      .logo {
        width: 80px;
        height: auto;
        margin-right: 10px;
      }
      .shop-info {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
      }
      .shop-details {
        margin-top: 10px;
      }
      .bill-date {
        margin-bottom: 10px;
      }
      .total-price {
        font-weight: bold;
        margin-bottom: 10px;
      }
    </style>
  `)
      printWindow.document.write('</head><body >')

      // Add shop information
      printWindow.document.write(`
    <div class="shop-info">
      <img src="/logo.png" alt="Shop Logo" class="logo" />
      <div class="shop-details">
        <h2>LM Computer</h2>
        <p>Dongdok, Saythany, Vientiane Capital</p>
        <p>Phone: (020) 7878-1525</p>
      </div>
    </div>
  `)

      // Add bill date
      // printWindow.document.write(
      //   `<p class="bill-date">ວັນທີຂາຍ: ${
      //     this.getSale.sale_date
      //   }</p>`
      // )
      printWindow.document.write(
        `<p class="bill-date">ພະນັກງານຂາຍ: ${this.allData.bill_number}</p>`
      )
      printWindow.document.write(`<div v-for="" class="bill-date"></div>`)
      // printWindow.document.write(
      //   `<p class="bill-date">ເບີ: ${this.getSale.customertel}</p>`
      // )

      // Add table
      // printWindow.document.write(clonedTable.outerHTML)

      // Add total price
      // printWindow.document.write(
      //   `<p class="total-price">Total Price: ${this.
      //     this.getSale.Totalkip
      //   }ກີບ</p>`
      // )

      printWindow.document.write('</body></html>')
      printWindow.document.close()
      printWindow.print()

      // Clear the value after printing is complete
      setTimeout(() => {
        this.value = ''
      }, 1000) // Wait for 1 second before clearing the value

      if (typeof callback === 'function') {
        callback()
      }
    },
    generateAndPrintBill() {
      const rows = this.allData.rows
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
        </style>
      `)
      printWindow.document.write('</head><body >')
      printWindow.document.write(` 
    <div class="shop-info">
      <div class="shop-details">
        <h2 class="text">ໃບບິນສັ່ງຊື້ຢາ</h2>
        <p class="text">ຄຣິນິກ ດຣ ມົວວ່າງ </p>
        <p>ບ້ານ: ພູຫົວຊ້າງ, ເມືອງ: ອະນຸວົງ,ແຂວງ: ໄຊສົມບູນ</p>
      </div>
    </div>
  `)
      printWindow.document.write(
        `<p class="bill-date">ລະຫັດໃບບິນ: ${this.allData.bill_number}</p>`
      )
      printWindow.document.write(
        `<p class="bill-date">ຊື່ພະນັກງານ: ${this.allData.staff_name}</p>`
      )
      printWindow.document.write(
        `<p class="bill-date">ຊື້ຈາກຜູ້ສະໜອງ: ${this.allData.supplier_name}</p>`
      )
      printWindow.document.write(
        `<p class="bill-date">ລາຄາທັງໝົດ: ${this.toCurrencyString(
          parseInt(this.allData.sum)
        )}</p>`
      )

      const tableHeader = `
        <tr>
          <th>ປະເພດຢາ</th>
          <th>ຊື່ຢາ</th>
          <th>ລາຄາ</th>
          <th>ຈຳນວນ</th>
          <th>ວັນ ເດືອນ ປີ ສັ່ງຊຶ້</th>
        </tr>
      `

      printWindow.document.write('<table>')
      printWindow.document.write(tableHeader)

      for (const row of rows) {
        const rowContent = `
          <tr>
            <td>${row.type_name}</td>
            <td>${row.name}</td>
              <td>${row.amount}</td>
            <td class="item-price">${this.toCurrencyString(
              parseInt(row.price)
            )}</td>
            <td> ${this.$moment(row.create_at).format('DD-MM-YYYY')}</td>
          </tr>
        `

        printWindow.document.write(rowContent)
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