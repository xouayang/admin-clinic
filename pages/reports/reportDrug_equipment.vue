<template>
  <div class="mt-3 mb-5">
    <div class="d-flex justify-space-between align-center">
      <v-breadcrumbs :items="items">
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
      <div class="d-flex justify-end">
        <v-col md="6">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            dense
            label="ຄົ້ນຫາ"
          />
        </v-col>
      </div>
      <v-data-table :headers="headers" :items="medicines" :search="search">
        <template slot="item.index" scope="props">
          {{ props.index + 1 }}
        </template>
        <template #[`item.price`]="{ item }">
          {{ toCurrencyString(item.price) }}
        </template>
        <template #[`item.image`]="{ item }">
          <v-img :src="item.image" max-height="40" max-width="89" />
        </template>
      </v-data-table>
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
  name: 'ReportDrugEquipment',
  data() {
    return {
      value: '',
      search: '',
      headers: [
        { text: 'ຮູບພາບ', value: 'image' },
        { text: 'ປະເພດຢາ', value: 'type_name' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ຈຳນວນ', value: 'amount' },
        { text: 'ລາຄາ', value: 'price' },
        { text: 'ຫົວໜ່ວຍ', value: 'unit' },
      ],
      items: [
        {
          text: 'ລາຍງານ',
          disabled: false,
          href: '/reports/reportTable',
        },
        {
          text: 'ລາຍງານຂໍ້ມູນຢາ',
          disabled: false,
        },
      ],
    }
  },
  computed: {
    medicines() {
      return this.$store.state.reports.Data
    },
  },
  async mounted() {
    await this.$store.dispatch('reports/getAll')
  },
  methods: {
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
    back() {
      this.$router.push('/reports/reportTable')
    },
    generateAndPrintBill() {
      const rows = this.medicines
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
          .image{
            width:60px
          }
        </style>
      `)
      printWindow.document.write('</head><body >')
      printWindow.document.write(` 
    <div class="shop-info">
      <div class="shop-details">
        <h2 class="text">ລາຍງານຂໍ້ມູນຢາ</h2>
      </div>
    </div>
  `)
      const tableHeader = `
        <tr>
          <th>ຮູບພາບ</th>
          <th>ປະເພດຢາ</th>
          <th>ຊື່</th>
          <th>ຈຳນວນ</th>
          <th>ລາຄາ</th>
          <th>ຫົວໜ່ວຍ</th>
        </tr>
      `

      printWindow.document.write('<table>')
      printWindow.document.write(tableHeader)

      for (const row of rows) {
        const rowContent = `
          <tr>
            <td><img class="image" src='${row.image}'/></td>
              <td>${row.type_name}</td>
              <td>${row.name}</td>
              <td>${row.amount}</td>
            <td class="item-price">${this.toCurrencyString(
              parseInt(row.price)
            )}</td>
            <td> ${row.unit}</td>
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
