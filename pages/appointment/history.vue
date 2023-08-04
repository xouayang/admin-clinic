<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-2">
      <div class="mt-5 mb-3 pb-2 ml-2 font-weight-bold">ລາຍການນັດໝາຍທັງໝົດ</div>
      <div>
        <v-btn color="#9155FD" @click="back">
          <v-icon color="white">mdi-chevron-left</v-icon>
          <span style="color: white">ກັບຄືນ</span>
        </v-btn>
      </div>
    </div>
    <v-card>
      <!-- search button------------------------------- -->
      <v-row class="d-flex align-center col-12">
        <v-col cols="12" md="12" sm="12">
          <v-card-title>
            <v-text-field
              v-model="searchTerm"
              prepend-inner-icon="mdi-magnify"
              label="ຄົ້ນຫາ"
              outlined
              hide-details
              dense
              small
              color="#9155FD"
            />
          </v-card-title>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers2"
        :items="dataMale.rows"
        :items-per-page="5"
        color="#9155FD"
        :search="searchTerm"
      >
        <template #[`item.createdAt`]="{ item }">
          {{ $moment(item.createdAt).format('DD-MM-YYYY') }}
        </template>
        <template #[`item.sendData`]="{ item }">
          <v-btn color="success" @click="sendData(item)">
            <v-icon>mdi-check-outline</v-icon>
            <span>ກວດ</span>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'AppointPages',
  data() {
    return {
      showDeleteData: '',
      showEditData: '',
      searchTerm: '',
      headers2: [
        { text: 'ລະຫັດ', value: 'id' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ເບີໂທລະສັບ', value: 'tel' },
        { text: 'ວັນທີ່ ເດືອນ ປີ ນັດມາຍ', value: 'createdAt' },
        { text: 'ບັນທຶກ', value: 'sendData' },
      ],
    }
  },
  computed: {
    dataMale() {
      return this.$store.state.appointment.appointmentData
    },
  },
  async mounted() {
    await this.$store.dispatch('appointment/getAll')
  },
  methods: {
    back() {
      this.$router.push('/')
    },
    sendData(data) {
      this.$store.commit('appointment/getDataId', data)
      this.$router.push('/appointment/form_check')
    },
  },
}
</script>