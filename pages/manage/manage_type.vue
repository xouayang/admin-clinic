<template>
  <div>
    <div class="mt-5 mb-3 pb-2 ml-2 font-weight-bold">ຈັດການຂໍ້ມູນປະເພດຢາ</div>
    <v-card>
      <!-- search button------------------------------- -->
      <v-row class="d-flex align-center col-12">
        <v-col cols="12" md="10" sm="12">
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
        <v-col cols="12" md="2" sm="12">
          <v-btn color="#9155FD" @click="insertData">
            <span style="color: white">ເພີ່ມຂໍ້ມູນ</span>
            <v-icon color="white">mdi-plus-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers2"
        :items="dataMedicines.rows"
        :items-per-page="5"
        color="#9155FD"
        :search="searchTerm"
      >
        <template #[`item.action`]="{ item }">
          <v-tooltip top color="error">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" @click="showDelete(item)">
                <v-icon color="error">mdi-trash-can-outline</v-icon>
              </v-btn>
            </template>
            <span>ລຶບ</span>
          </v-tooltip>
          <v-tooltip top color="#9155FD">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" @click="showEdit(item)">
                <v-icon color="#9155FD">mdi-pen</v-icon>
              </v-btn>
            </template>
            <span>ເເກ້ໄຂ</span>
          </v-tooltip>
        </template>
        <template #[`item.created_at`]="{ item }">
          {{ $moment(item.created_at).format('DD-MM-YYYY') }}
        </template>
        <template slot="item.index" scope="props">
          {{ props.index + 1 }}
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
              >ຊື່ປະເພດຢາ :<br />
              {{ showDeleteData.type_name }}
            </v-card-text>
            <v-card-text class="mb-2">
              ຫົວໜ່ວຍ: <br />
              {{ showDeleteData.unit }}
            </v-card-text>
          </div>
          <div class="d-flex align-center justify-space-around text-center">
            <v-card-text class="mb-2"
              >ວັນທີ່ ເດືອນ ປີ: <br />
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
    <v-row>
      <v-dialog
        v-model="editDialog"
        width="600"
        transition="dialog-bottom-transition"
        persistent
      >
        <v-card>
          <v-toolbar dark color="#9155FD">
            <div>ແກ້ໄຂຂໍ້ມູນປະເພດຢາ</div>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="editDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-col cols="12">
            <v-text-field
              v-model="dataPrepare.type_name"
              outlined
              dense
              hide-details="auto"
              label="ຊື່ປະເພດຢາ"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="dataPrepare.unit"
              outlined
              dense
              hide-details
              label="ຫົວໜວ່າຍ"
              color="#9155FD"
            />
          </v-col>
          <v-spacer></v-spacer>
          <div class="d-flex justify-end pa-4">
            <v-btn
              color="#9155FD"
              width="100"
              class="white--text"
              @click="editData(showEditData.id)"
              >ບັນທືກ</v-btn
            >
          </div>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row>
      <v-dialog
        v-model="addDataDialog"
        width="600"
        transition="dialog-bottom-transition"
        persistent
      >
        <v-card>
          <v-toolbar dark color="#9155FD">
            <div>ເພີ່ມຂໍ້ມູນປະເພດຢາ</div>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="addDataDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-col cols="12">
            <v-text-field
              v-model="addData.type_name"
              outlined
              dense
              hide-details="auto"
              label="ຊື່ປະເພດຢາ"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="addData.unit"
              outlined
              dense
              hide-details
              label="ຫົວໜ່ວຍ"
              color="#9155FD"
            />
          </v-col>
          <v-spacer></v-spacer>
          <div class="d-flex justify-end pa-4">
            <v-btn
              color="#9155FD"
              width="100"
              class="white--text"
              @click="insertData1"
              >ບັນທືກ</v-btn
            >
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'ManageType',
  data() {
    return {
      showDeleteData: '',
      showEditData: '',
      dataPrepare: {
        type_name: '',
        unit: '',
      },
      addData: {
        type_name: '',
        unit: '',
      },
      showDailog: false,
      editDialog: false,
      addDataDialog: false,
      searchTerm: '',
      headers2: [
        { text: 'ລ/ດ', value: 'index' },
        { text: 'ຊື່ປະເພດຢາ', value: 'type_name' },
        { text: 'ຫົວໜ່ວຍ', value: 'unit' },
        { text: 'ວັນທີ່ ເດືອນ ປີ', value: 'created_at' },
        { text: 'action', value: 'action' },
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
  },
}
</script>