<template>
  <div class="mt-1">
    <div class="d-flex justify-end mb-1">
      <v-btn color="#9155FD" @click="back"
        ><v-icon color="white">mdi-keyboard-backspace</v-icon
        ><span style="color: white">ກັບຄືນ</span></v-btn
      >
    </div>
    <v-card>
      <div class="d-flex align-center">
        <v-col class="pa-2 ml-1 mb-2">ລາຍງານຂໍ້ມູນຄົນເຈັບ</v-col>
        <v-col>
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
    <!-- <div class="d-flex justify-end container mb-5">
      <v-btn x-large color="success" @click="generateAndPrintBill">
        <span style="color: white">ພິມ</span>
        <v-icon color="white">mdi-printer-outline</v-icon>
      </v-btn>
    </div> -->
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
    generateAndPrintBill(callback) {
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
      printWindow.document.write('<html><head><title>ບິນຂາຍຮ້ານເມໄໝ</title>')
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
      //   `<p class="bill-date">ວັນທີຂາຍ: ${this.formatDateLo(
      //     this.getSale.sale_date
      //   )}</p>`
      // )
      // printWindow.document.write(
      //   `<p class="bill-date">ພະນັກງານຂາຍ: ${this.getSale.employeefirst_name}</p>`
      // )
      // printWindow.document.write(
      //   `<p class="bill-date">ຜູ້ຊີ້: ${this.getSale.customerFname}</p>`
      // )
      // printWindow.document.write(
      //   `<p class="bill-date">ເບີ: ${this.getSale.customertel}</p>`
      // )

      // Add table
      printWindow.document.write(clonedTable.outerHTML)

      // Add total price
      // printWindow.document.write(
      //   `<p class="total-price">Total Price: ${this.formatPrice(
      //     this.getSale.Totalkip
      //   )}ກີບ</p>`
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
  },
}
</script>
