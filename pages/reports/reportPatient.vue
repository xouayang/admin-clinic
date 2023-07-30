<template>
  <div class="mt-1">
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
      <!-- <v-row class="col-12 d-flex justify-center">
        <v-col cols="12" sm="12" md="6">
          <DataPicker2 v-model="value"/>
        </v-col>
        <v-col cols="12" sm="12" md="6" class="text-center">
          <div>ຄົ້ນຫາວັນທີ ເດືອນ ປີ : <span style="color:red">{{ value }}</span></div>
        </v-col>
      </v-row> -->
      <v-data-table :headers="headers" :items="patient.rows" :search="search">
        <template #[`item.create_at`]="{ item }">
          {{ $moment(item.create_at).format('DD-MM-YYYY') }}
        </template>
        <template slot="item.index" scope="props">
          {{ props.index + 1 }}
        </template>
      </v-data-table>
    </v-card>
    <div class="d-flex justify-end container mb-5">
      <v-btn x-large color="success" @click="generateAndPrintBill">
        <span style="color: white">ພິມ</span>
        <v-icon color="white">mdi-printer-outline</v-icon>
      </v-btn>
    </div>
  </div>
</template>
<script>
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs
export default {
  name: 'ReportsPatients',
  data() {
    return {
      value: '',
      search: '',
      headers: [
        { text: 'ລ/ດ', value: 'index' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ທີ່ຢູ່', value: 'address' },
        { text: 'ເບີໂທລະສັບ', value: 'tel' },
      ],
      items: [
        {
          text: 'ລາຍງານ',
          disabled: false,
          href: '/reports/reportTable',
        },
        {
          text: 'ລາຍງານຂໍ້ມູນຄົນເຈັບ',
          disabled: false,
        },
      ],
    }
  },
  computed: {
    patient() {
      return this.$store.state.patient.dataPatients
    },
  },
  async mounted() {
    await this.$store.dispatch('patient/patientInfo')
  },
  methods: {
    back() {
      this.$router.push('/reports/reportTable')
    },
    generateAndPrintBill() {
      const rows = this.patient.rows
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
        <h2 class="text">ລາຍງານຂໍ້ມູນຄົນເຈັບ</h2>
      </div>
    </div>
  `)
      const tableHeader = `
        <tr>
          <th>ລ/ດ</th>
          <th>ຊື່</th>
          <th>ທີ່ຢູ່</th>
          <th>ເບີໂທລະສັບ</th>
        </tr>
      `

      printWindow.document.write('<table>')
      printWindow.document.write(tableHeader)
      let index = 1
      for (const row of rows) {
        const rowContent = `
          <tr>
              <td>${index}</td>
              <td>${row.name}</td>
              <td>${row.address}</td>
              <td>${row.tel}</td>
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
