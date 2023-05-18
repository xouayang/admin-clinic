<template>
  <div>
    <div class="mt-5 mb-3 pb-2 ml-2 font-weight-bold">
      ຈັດການຂໍ້ມູນລາຍການກວດ
    </div>
    <v-card>
      <!-- search button------------------------------- -->
      <v-row class="d-flex align-center col-12">
        <v-col cols="12" md="10" sm="12">
          <v-card-title>
            <v-text-field
              prepend-inner-icon="mdi-magnify"
              v-model="searchTerm"
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
            ><span style="color: white">ເພີ່ມຂໍ້ມູນລາຍການກວດ</span>
            <v-icon color="white">mdi-plus-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="showDiseas.rows"
        :items-per-page="5"
        color="#9155FD"
        :search="searchTerm"
      >
        <template #[`item.action`]="{ item }">
          <v-tooltip top color="error">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="error" @click="showDelete(item)"
                  >mdi-trash-can-outline</v-icon
                >
              </v-btn>
            </template>
            <span>ລຶບ</span>
          </v-tooltip>
          <v-tooltip top color="#9155FD">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="#9155FD" @click="dataEdit(item)"
                  >mdi-pencil-outline</v-icon
                >
              </v-btn>
            </template>
            <span>ເເກ້ໄຂ</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>
    <!-- show delete data -->
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
              >ຊື່ລາຍການກວດ :<br />
              {{ storeDeleteData.name }}
            </v-card-text>
            <v-card-text class="mb-2"
              >ລາຄາລາຍການກວດ : <br />
              {{ storeDeleteData.price }}
            </v-card-text>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            width="100"
            @click="deleteData(storeDeleteData.disease_id)"
          >
            <div class="text--white">ລຶບ</div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- show edit data -->
    <v-row>
      <v-dialog
        v-model="dialog"
        width="600"
        transition="dialog-bottom-transition"
        persistent
      >
        <v-card>
          <v-toolbar dark color="#9155FD">
            <div>ແກ້ໄຂຂໍ້ມູນລາຍການກວດ</div>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-col cols="12">
            <v-text-field
              outlined
              dense
              hide-details="auto"
              label="ຊື່ລາຍການກວດ"
              color="#9155FD"
              v-model="editInformation.name"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              outlined
              dense
              hide-details
              label="ລາຄາ"
              color="#9155FD"
              v-model="editInformation.price"
            />
          </v-col>
          <v-spacer></v-spacer>
          <div class="d-flex justify-end pa-4">
            <v-btn
              color="#9155FD"
              width="100"
              class="white--text"
              @click="editInfo(storeEditData.disease_id)"
              >ບັນທືກ</v-btn
            >
          </div>
        </v-card>
      </v-dialog>
    </v-row>

    <!-- post data  -->
    <v-row>
      <v-dialog
        v-model="showAddDialog"
        width="600"
        transition="dialog-bottom-transition"
        persistent
      >
        <v-card>
          <v-toolbar dark color="#9155FD">
            <div>ເພີ່ມຂໍ້ມູນລາຍການກວດ</div>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="showAddDialog = !showAddDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-col cols="12">
            <v-text-field
              outlined
              dense
              hide-details="auto"
              label="ຊື່ລາຍການກວດ"
              color="#9155FD"
              v-model="storeData.name"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              outlined
              dense
              hide-details
              label="ລາຄາ"
              color="#9155FD"
              v-model="storeData.price"
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
  name: 'Manage_checklistsPages',
  data() {
    return {
      searchTerm: '',
      showDailog: false,
      dialog: false,
      showAddDialog: false,
      storeDeleteData: {},
      storeEditData: {},
      storeData: {
        name: '',
        price: '',
      },
      editInformation: {
        name: '',
        price: '',
      },

      headers: [
        { text: 'ລະຫັດ', value: 'ລະຫັດ' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ລາຄາ', value: 'price' },
        { text: 'Actions', value: 'action' },
      ],
    }
  },
  methods: {
    async addData() {
      await this.$store.dispatch('disease/postDiseas', { ...this.storeData })
      this.storeData.name = ''
      this.storeData.price = ''
      await this.$store.dispatch('disease/getAll')
      this.showAddDialog = false
    },
    showDelete(data) {
      this.storeDeleteData = data
      this.showDailog = true
    },
    async deleteData(id) {
      await this.$store.dispatch('disease/deleteData', id)
      await this.$store.dispatch('disease/getAll')
      this.showDailog = false
    },
    // show Data edit
    dataEdit(data1) {
      this.storeEditData = data1
      this.dialog = true
      if (this.storeEditData) {
        this.editInformation.name = this.storeEditData.name
        this.editInformation.price = this.storeEditData.price
      }
    },
    async editInfo(id) {
      const data = this.editInformation;
      await this.$store.dispatch('disease/updateData', { data, id });
      await this.$store.dispatch('disease/getAll');
      this.dialog = false;
    },
  },
  computed: {
    showDiseas() {
      return this.$store.state.disease.dataDisase
    },
  },
  async mounted() {
    await this.$store.dispatch('disease/getAll')
  },
}
</script>