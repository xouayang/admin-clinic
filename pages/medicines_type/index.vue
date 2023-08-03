<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-2">
      <div class="mt-5 mb-3 pb-2 ml-2 font-weight-bold">ຂໍ້ມູນປະເພດຢາ</div>
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
        :items="dataMedicines.rows"
        :items-per-page="5"
        color="#9155FD"
        :search="searchTerm"
      >
        <template #[`item.created_at`]="{ item }">
          {{ $moment(item.created_at).format('DD-MM-YYYY') }}
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'ManageType',
  data() {
    return {
      showDeleteData: '',
      showEditData: '',
      searchTerm: '',
      headers2: [
        { text: 'ລະຫັດ', value: 'id' },
        { text: 'ຊື່ປະເພດຢາ', value: 'type_name' },
        { text: 'ຫົວໜ່ວຍ', value: 'unit' },
        { text: 'ວັນທີ່ ເດືອນ ປີ', value: 'created_at' },
      ],
    }
  },
  computed: {
    dataMedicines() {
      return this.$store.state.medicinesType.medicinesData
    },
  },
  async mounted() {
    await this.$store.dispatch('medicinesType/medicinesTypeData')
  },
  methods: {
    showDelete(data) {
      this.showDeleteData = data
      this.showDailog = true
    },
    async deleteData(id) {
      await this.$store.dispatch('medicinesType/deleteData', id)
      await this.$store.dispatch('medicinesType/medicinesTypeData')
      this.showDailog = false
    },
    showEdit(data) {
      this.showEditData = data
      this.editDialog = true
      if (this.showEditData) {
        this.dataPrepare.type_name = this.showEditData.type_name
        this.dataPrepare.unit = this.showEditData.unit
      }
    },
    async editData(id) {
      const data = this.dataPrepare
      await this.$store.dispatch('medicinesType/updateData', { data, id })
      await this.$store.dispatch('medicinesType/medicinesTypeData')
      this.editDialog = false
    },
    insertData() {
      this.addDataDialog = true
    },
    async insertData1() {
      await this.$store.dispatch('medicinesType/postData', { ...this.addData })
      await this.$store.dispatch('medicinesType/medicinesTypeData')
      this.addDataDialog = false
      this.addData.type_name = ''
      this.addData.unit = ''
    },
    back() {
        this.$router.push('/')
    }
  },
}
</script>