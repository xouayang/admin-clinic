<template>
  <div class="mt-3">
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
  </div>
</template>
<script>
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
  },
}
</script>
