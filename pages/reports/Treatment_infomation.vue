<template>
  <div class="mt-3">
    <v-card>
      <div class="pa-2 ml-1 text-center mb-2">ລາຍງານຂໍ້ມູນການປີ່ນປົວ</div>
      <v-row class="col-12 d-flex justify-center">
        <!-- <v-col cols="12" sm="12" md="6">
          <DataPicker v-model="value" />
        </v-col> -->
        <!-- <v-col cols="12" sm="12" md="6" class="text-center">
          <div>ຄົ້ນຫາວັນທີ ເດືອນ ປີ : {{ value }}</div>
        </v-col> -->
      </v-row>
      <v-data-table :headers="headers" :items="patient.rows">
          <template #[`item.create_at`] = "{item}">
            {{$moment(item.create_at).format('DD-MM-YYYY')}}
          </template>
         </v-data-table>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'ReportsTreatment',
  data() {
    return {
      value: '',
      headers: [
        { text: 'ຊື່', value: 'name' },
        { text: 'ທີ່ຢູ່', value: 'address' },
        { text: 'ເບີໂທລະສັບ', value: 'tel' },
        { text: 'ອາການເບື້ອງ', value: 'details' },
        { text: 'ນໍ້າໜັກ', value: 'weight' },
        { text: 'ລວງສູງ', value: 'height' },
        { text: 'ຊິບພະຈອນ', value: 'chip_life' },
        { text: 'ວັນທີ່ ເດືອນ ປີ', value: 'create_at' },
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
