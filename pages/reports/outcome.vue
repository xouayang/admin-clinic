<template>
  <div class="mt-2">
    <div class="d-flex justify-space-between align-center">
      <v-breadcrumbs :items="item">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item :href="item.href" :disabled="item.disabled">
            <h2>{{ item.text.toUpperCase() }}</h2>
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
      <v-btn color="#9155FD" @click="back"
        ><v-icon color="white">mdi-chevron-left</v-icon
        ><span style="color: white">ກັບຄືນ</span></v-btn
      >
    </div>
    <v-card>
      <v-row class="col-12 d-flex align-center justify-center">
        <v-col cols="12" sm="12" md="5">
          <DataPicker v-model="startDate" />
        </v-col>
        <v-col cols="12" sm="12" md="5">
          <DataPicker4 v-model="endDate" />
        </v-col>
        <v-col cols="12" sm="12" md="2">
          <v-btn color="#9155fd" @click="showData">
            <v-icon color="white">mdi-magnify</v-icon>
            <span style="color: white">ຄົ້ນຫາ</span>
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="allData.rows">
        <template #[`item.createdAt`]="{ item }">
          {{ $moment(item.createdAt).format('DD-MM-YYYY') }}
        </template>
        <template #[`item.price`]="{ item }">
          {{ toCurrencyString(item.price) }}
        </template>
      </v-data-table>
      <div class="container">
        <span style="color: red; border-bottom: 3px solid #9155fd"
          >ລາຍຮັບທັງໝົດ :
          {{
            allData?.sum
              ? toCurrencyString(parseInt(allData?.sum))
              : toCurrencyString(0)
          }}</span
        >
      </div>
    </v-card>
    <div class="d-flex justify-end mt-1 mb-5">
      <v-btn large color="success" @click="generateAndPrintBill"
        ><span>ພິມ</span><v-icon>mdi-printer-outline</v-icon></v-btn
      >
    </div>
  </div>
</template>
<script>
import laoCurrency from '@lailao10x/lao-currency'
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs
export default {
  name: 'ReportsIncome',
  data() {
    return {
      items: [],
      startDate: '',
      endDate: '',
      allData: [],
      headers: [
        { text: 'ຊື່ຢາ', value: 'name' },
        { text: 'ຈຳນວນ', value: 'amount' },
        { text: 'ລາຄາ', value: 'price' },
        { text: 'ວັນທີ່ ເດືອນ ປີ', value: 'createdAt' },
      ],
      item: [
        {
          text: 'ລາຍຮັບ',
          disabled: false,
          href: '/reports/allIncome',
        },
        {
          text: 'ລາຍງານສະຫຼຸບລາຍຮັບຂາຍຢາ',
          disabled: false,
        },
      ],
    }
  },
  methods: {
    async showData() {
      const start = this.startDate
      const end = this.endDate
      await this.$axios
        .get(`http://localhost:7000/get-income?start='${start}'&end='${end}'`)
        .then((data) => {
          this.allData = data.data
        })
    },
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
    back() {
      this.$router.push('/reports/allIncome')
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
        <h2 class="text">ລາຍງານລາຍຮັບ</h2>
      </div>
    </div>
  `)
      printWindow.document.write(
        `<p class="bill-date">ວັນທີ່ : ${this.startDate} ຫາ ${this.endDate}</p>`
      )
      printWindow.document.write(
        `<p class="bill-date">ລາຍຈ່າຍທັງໝົດ: ${this.toCurrencyString(
          parseInt(this.allData.sum)
        )}</p>`
      )
      const tableHeader = `
        <tr>
          <th>ຊື່ຢາ</th>
          <th>ລາຄາ</th>
          <th>ຈຳນວນ</th>
          <th>ວັນ ເດືອນ ປີ</th>
        </tr>
      `

      printWindow.document.write('<table>')
      printWindow.document.write(tableHeader)

      for (const row of rows) {
        const rowContent = `
          <tr>
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
