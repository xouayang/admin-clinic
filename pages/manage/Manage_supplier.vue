<template >
  <div>
    <div class="mt-5 mb-3 pb-2 ml-2 font-weight-bold">ຈັດການຂໍ້ມູນຜູ້ສະໜອງ</div>
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
        <v-col cols="12" md="2" sm="3" class="d-flex justify-end">
          <v-btn
            style="width: 100"
            color="#9155FD"
            @click="showAddDialog = !showAddDialog"
            ><span style="color: white">ເພີ່ມຂໍ້ມູນຜູ້ສະໜອງ</span>
            <v-icon color="white">mdi-plus-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
        :headers="headers"
        :items="supplier.rows"
        :items-per-page="5"
        color="#9155FD"
        :search="searchTerm"
      >
        <template #[`item.action`]="{ item }">
          <v-tooltip top color="error">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" @click="showSupplier(item)">
                <v-icon color="error">mdi-trash-can-outline</v-icon>
              </v-btn>
            </template>
            <span>ລຶບ</span>
          </v-tooltip>
          <v-tooltip top color="#9155FD">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" @click="showEdit(item)">
                <v-icon color="#9155FD">mdi-pencil-outline</v-icon>
              </v-btn>
            </template>
            <span>ເເກ້ໄຂ</span>
          </v-tooltip>
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
          <div class="d-flex align-center justify-space-between text-center">
            <v-card-text class="mb-2"
              >ຊື່ <br />
              {{ showData.supplier_name }}
            </v-card-text>
            <v-card-text class="mb-2"
              >ທີ່ຢູ່ <br />
              {{ showData.supplier_address }}
            </v-card-text>
          </div>
          <div class="d-flex align-center text-center">
            <v-card-text class="mb-2"
              >ເບີໂທລະສັບ<br />
              {{ showData.supplier_tel }}
            </v-card-text>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" width="100" @click="deleteData(showData.id)">
            <div class="text--white">ລຶບ</div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-row>
      <v-dialog
        v-model="dialog"
        width="600"
        transition="dialog-bottom-transition"
        persistent
      >
        <v-card>
          <v-toolbar dark color="#9155FD">
            <div>ແກ້ໄຂຂໍ້ມູນຄົນເຈັບ</div>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-col cols="12">
            <v-text-field
              v-model="supplierUpdate.supplier_name"
              outlined
              dense
              hide-details="auto"
              label="ຊື່"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="supplierUpdate.supplier_address"
              outlined
              dense
              hide-details
              label="ທີ່ຢູ່"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="supplierUpdate.supplier_tel"
              outlined
              dense
              hide-details
              label="ເບີໂທລະສັບ"
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
        v-model="showAddDialog"
        width="600"
        transition="dialog-bottom-transition"
        persistent
      >
        <v-card>
          <v-toolbar dark color="#9155FD">
            <div>ເພີ່ມຂໍ້ມູນຄົນເຈັບ</div>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="showAddDialog = !showAddDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-col cols="12">
            <v-text-field
              v-model="supplierInfo.supplier_name"
              outlined
              dense
              hide-details="auto"
              label="ຊື່"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="supplierInfo.supplier_address"
              outlined
              dense
              hide-details
              label="ທີ່ຢູ່"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="supplierInfo.supplier_tel"
              outlined
              dense
              hide-details
              label="ເບີໂທລະສັບ"
              color="#9155FD"
            />
          </v-col>
          <v-spacer></v-spacer>
          <div class="d-flex justify-end pa-4">
            <v-btn
              color="#9155FD"
              width="100"
              class="white--text"
              @click="addData"
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
  name: 'ManageSupplier',
  data() {
    return {
      supplierInfo: {
        supplier_name: '',
        supplier_tel: '',
        supplier_address: '',
      },
      supplierUpdate: {
        supplier_name: '',
        supplier_tel: '',
        supplier_address: '',
      },
      searchTerm: '',
      showDailog: false,
      dialog: false,
      showAddDialog: false,
      showData: {},
      showEditData: {},
      headers: [
        { text: 'ລຳດັບ', value: 'index' },
        { text: 'ຊື່', value: 'supplier_name' },
        { text: 'ເບີໂທລະສັບ', value: 'supplier_tel' },
        { text: 'ທີ່ຢູ່', value: 'supplier_address' },
        { text: 'Actions', value: 'action' },
      ],
    }
  },
  computed: {
    supplier() {
      return this.$store.state.user.suppliers
    },
  },
  async mounted() {
    await this.$store.dispatch('user/showUser')
  },
  methods: {
    showSupplier(data) {
      this.showData = data
      this.showDailog = true
    },
    async deleteData(id) {
      await this.$store.dispatch('supplier/deleteData', id)
      this.showDailog = false
      this.$store.dispatch('user/showUser')
    },
    showEdit(dataEdit) {
      this.showEditData = dataEdit
      this.dialog = true
      if (this.supplierInfo) {
        this.supplierUpdate.supplier_name = this.showEditData.supplier_name
        this.supplierUpdate.supplier_address =
          this.showEditData.supplier_address
        this.supplierUpdate.supplier_tel = this.showEditData.supplier_tel
      }
    },
    async editData(id) {
      const data = this.supplierUpdate
      await this.$store.dispatch('supplier/updateData', { data, id })
      await this.$store.dispatch('user/showUser')
      this.dialog = false
    },
    async addData() {
      await this.$store.dispatch('supplier/postData', { ...this.supplierInfo })
      this.supplierInfo.supplier_name = ''
      this.supplierInfo.supplier_tel = ''
      this.supplierInfo.supplier_address = ''
      await this.$store.dispatch('user/showUser')
      this.showAddDialog = false
    },
  },
}
</script>
