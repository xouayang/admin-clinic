<template>
  <div>
    <div class="mt-5 mb-3 pb-2 ml-2 font-weight-bold">ຈັດການຂໍ້ມູນນົດໝາຍ</div>
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
        :items="dataAppoint.rows"
        :items-per-page="5"
        color="#9155FD"
        :search="searchTerm"
      >
        <template #[`item.action`]="{ item }">
          <v-tooltip top color="error">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" @click="showDelete(item)">
                <v-icon color="error"
                  >mdi-trash-can-outline</v-icon
                >
              </v-btn>
            </template>
            <span>ລຶບ</span>
          </v-tooltip>
        </template>
        <template #[`item.date`]="{ item }">
          {{ $moment(item.date).format('DD-MM-YYYY') }}
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="showDailog" width="540" activator="parent" persistent>
      <v-card>
        <v-toolbar dark color="#9155FD">
          <v-card-title>ທ່ານເເນ່ໃຈບໍ ?</v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="showDailog = !showDailog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="mt-2 col-12">
          <div class="d-flex align-center justify-space-around text-center">
            <v-card-text class="mb-2"
              >ຊື່ :<br />
              {{ showDeleteData.name }}
            </v-card-text>
            <v-card-text class="mb-2"
              >ເບີໂທລະສັບ : <br />
              {{ showDeleteData.tel }}
            </v-card-text>
          </div>
          <div class="d-flex align-center justify-space-around text-center">
            <v-card-text class="mb-2"
              >ວັນທີ່ ເດືອນ ປີ ນັດມາຍ : <br />
              {{ $moment(showDeleteData.date).format('DD-MM-YYYY') }}
            </v-card-text>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            width="100"
            @click="deleteData(showDeleteData.id)"
          >
            <div class="text--white">ລຶບ</div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'ManageAppointmentPages',
  data() {
    return {
      showDeleteData: '',
      showEditData: '',
      showDailog: false,
      searchTerm: '',
      headers2: [
        { text: 'ຊື່', value: 'name' },
        { text: 'ເບີໂທລະສັບ', value: 'tel' },
        { text: 'ວັນທີ່ ເດືອນ ປີ ນັດມາຍ', value: 'date' },
        { text: 'action', value: 'action' },
      ],
    }
  },
  methods: {
    showDelete(data) {
      this.showDeleteData = data
      this.showDailog = true
    },
    async deleteData(id) {
      await this.$store.dispatch('appointment/deleteData', id)
      await this.$store.dispatch('appointment/getAll')
      this.showDailog = false
    },
  },
  computed: {
    dataAppoint() {
      return this.$store.state.appointment.appointmentData
    },
  },
  async mounted() {
    await this.$store.dispatch('appointment/getAll')
  },
}
</script>