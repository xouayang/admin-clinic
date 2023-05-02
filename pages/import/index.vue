<template >
  <div>
    <div class="mt-2 mb-3 ml-2 font-weight-bold container">ກວດສອບນຳເຂົ້າ</div>
    <!-- <div>ກວດສອບນຳເຂົ້າ</div> -->
    <v-card>
      <v-row class="d-flex justify-end col-12">
        <v-col cols="12" md="12" sm="12">
          <v-card-title>
            <v-text-field
              prepend-inner-icon="mdi-barcode"
              label="ກວດສອບ"
              outlined
              hide-details
              dense
              small
              color="#9155FD"
            />
          </v-card-title>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="data" color="#9155FD">
        <template slot="item.indx" scope="props">
          {{ props.index + 1 }}
        </template>
      </v-data-table>
      <v-divider></v-divider>
    </v-card>
    <v-row class="mt-3">
      <v-col cols="12" class="text-end">
        <v-btn  color="#9155FD">
          <span style="color:white">ບັນທຶກການນຳເຂົ້າ</span>
          <v-icon color="white">mdi-content-save-check-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-dialog
        v-model="dialog"
        width="600"
        transition="dialog-bottom-transition"
        persistent
      >
        <v-card>
          <v-toolbar dark color="#9155FD">
            <div>ນຳເຂົ້າຢາ</div>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-form ref="anyName">
            <v-col cols="12">
              <v-text-field
                outlined
                dense
                hide-details="auto"
                label="ລະຫັດນຳເຂົ້າ"
                color="#9155FD"
                prepend-inner-icon="mdi-barcode"
                v-model="item.id"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                outlined
                dense
                hide-details="auto"
                label="ຊື່ຢາ"
                color="#9155FD"
                prepend-inner-icon="mdi-alpha-m-circle-outline"
                v-model="item.name"
              />
            </v-col>
            <v-col cols="12">
              <v-select
                outlined
                dense
                hide-details
                label="ປະເພດຢາ"
                color="#9155FD"
                prepend-inner-icon="mdi-format-list-bulleted-type"
                v-model="item.category"
              />
            </v-col>
            <v-col cols="12">
              <v-select
                outlined
                dense
                hide-details
                label="ຫົວໜ່ວຍ"
                color="#9155FD"
                prepend-inner-icon="mdi-hours-24"
                v-model="item.unit"
              />
            </v-col>
            <v-col cols="12">
              <v-text-field
                outlined
                dense
                hide-details
                label="ວັນ ເດືອນ ປີ ໝົດອາຍຸ"
                color="#9155FD"
                v-model="value"
              >
                <template #append>
                  <DataPicker v-model="value" />
                </template>
              </v-text-field>
            </v-col>
          </v-form>
          <v-spacer></v-spacer>
          <div class="d-flex justify-end pa-4">
            <v-btn color="#9155FD" @click="showData"
              ><span style="color: white">ບັນທຶກການນຳເຂົ້າ</span>
              <v-icon color="white">mdi-content-save-check-outline</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "Import_pages",
  data() {
    return {
      value: null,
      value1: null,
      searchTerm: "",
      showDailog: false,
      dialog: false,
      showAddDialog: false,
      search:'',
      data: [],
      headers: [
        { text: "ລຳດັບ", value: "indx" },
        { text: "ລະຫັດນຳເຂົ້າ ", value: "IMPORT_CODE" },
        { text: "ຊື່ ພະນັກງານນຳເຂົ້າ", value: "STAFF" },
        { text: "ຊື່ຢາ", value: "ຊື່ຢາ" },
        { text: "ປະເພດ", value: "ປະເພດ" },
        { text: "ຫົວໜ່ວຍ", value: "ປະເພດ" },
        { text: "ວັນ ເດືອນ ປີ ນຳເຂົ້າ", value: "import_date" },
        { text: "ວັນ ເດືອນ ປີ ໝົດອາຍຸ", value: "expired_date" },
      ],
      item: {
        id: "",
        name: "",
        category: "",
        unit: "",
        expired_date: "",
      },
    };
  },
  methods: {
    showData() {
    //  const id =  this.data.push(this.item.id)
    //   console.log(id)
      this.dialog = false
      this.$refs.anyName.reset();
    },
  },
};
</script>
<style scoped>
.font {
  font-family: "Noto Serif Lao", serif;
}
</style>
