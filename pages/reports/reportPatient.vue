<template>
  <div class="mt-3">
    <v-card>
      <div class="pa-2 ml-1">ລາຍງານຂໍ້ມູນຄົນເຈັບ</div>
      <v-row class="col-12 d-flex justify-center">
        <v-col cols="12" sm="12" md="6">
          <v-text-field
            v-model="value"
            clearable
            outlined
            dense
            color="#9155FD"
            label="ວັນ ເດືອນ ປີ"
          >
            <template #append>
              <DataPicker v-model="value" />
            </template>
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="6" class="text-center">
          <div>ຄົ້ນຫາວັນທີ ເດືອນ ປີ : {{ value }}</div>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="patient.rows"> </v-data-table>
    </v-card>
    <div class="mt-5">
      <v-row>
        <v-col cols="12" md="12" sm="12" class="d-flex justify-end">
          <v-btn large color="#9155FD" class="mr-5">
            <span style="color: white">ພິມອອກ</span>
            <v-icon color="white">mdi-printer-outline</v-icon>
          </v-btn>
          <v-btn large color="success">
            <span style="color: white">ດາວໂຫຼດ</span>
            <v-icon color="white">mdi-download-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ReportsPatients',
  data() {
    return {
      value: '',
      headers: [
        { text: 'ລຳດັບ', value: 'id' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ທີ່ຢູ່', value: 'address' },
        { text: 'ເບີໂທລະສັບ', value: 'tel' },
        { text: 'ລາຍລະອຽດ', value: 'details' },
        { text: 'ວັນ ເດືອນ ປີ ເກີດ', value: 'birtday' },
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
}
</script>
