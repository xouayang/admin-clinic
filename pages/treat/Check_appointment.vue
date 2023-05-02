<template>
  <div>
    <v-card>
      <v-toolbar color="#9155FD">
        <v-toolbar-title style="color: white" class="ml-6"
          >ກວດການັດໝາຍ</v-toolbar-title
        >
      </v-toolbar>
      <v-row class="col-12 container">
        <v-col cols="12" md="6" sm="12">
          <div class="mt-1 mb-2 text-center">ລາຍການນັດໝໍທັງໝົດ</div>
          <div>
            <v-card>
              <v-col cols="12" md="12" sm="12" class="d-flex justify-end">
                <v-col cols="12" md="12" sm="12">
                  <v-text-field
                  v-model="search"
                  outlined
                  dense
                  label="ຄົ້ນຫາ"
                  prepend-inner-icon="mdi-magnify"
                />
                </v-col>
              </v-col>
              <v-data-table
                :headers="headers"
                :items="items"
                :items-per-page="5"
                color="#9155FD"
                :search="search"
              >
              <template slot = "item.pk" scope="props">{{props.index + 1}}</template>
              </v-data-table>
            </v-card>
          </div>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col cols="12" md="6" sm="12">
          <div class="mt-1 mb-2 text-center">ລາຍການນັດໝໍໃໝ່</div>
          <div>
            <v-card>
              <v-col cols="12" md="12" sm="12" class="d-flex justify-end">
                <v-col sm="12" cols="12" md="10">
                  <v-text-field
                   v-model="search1"
                    outlined
                    dense
                    label="ຄົ້ນຫາ"
                    prepend-inner-icon="mdi-magnify"
                  />
                </v-col>
                <v-col sm="12" cols="12" md="2">
                  <v-btn text small fab color="#9155FD">
                    <v-badge content="5" color="error">
                      <v-icon>mdi-bell-plus-outline</v-icon>
                    </v-badge></v-btn
                  >
                </v-col>
              </v-col>
              <v-data-table
                :headers="headers"
                :items="items"
                :items-per-page="5"
                 color="#9155FD"
                 :search="search1"
              >
              <template slot = "item.pk" scope="props">
                {{props.index + 1}}
              </template>
              </v-data-table>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Check_appointment",
  data() {
    return {
      search:'',
      search1:'',
      tab: null,
      list_items: ["ລາຍການນັດໝໍ", "ນັດໝາຍໝໍ"],
      check_appointment: false,
      headers: [
        { text: "ລຳດັບ", value: "pk" },
        { text: "ຊື່", value: "ຊື່" },
        { text: "ທີ່ຢູ່", value: "ທີ່ຢູ່" },
        { text: "ເບີໂທລະສັບ", value: "ເບີໂທລະສັບ" },
        { text: "ວັນ ເດືອນ ປີ", value: "ວັນ_ເດືອນ_ປີ_ເກີດ" },
      ],
      items: [
        {

          ຊື່: "XOUAYANG",
          ທີ່ຢູ່: "XAYSOMBOUN",
          ເບີໂທລະສັບ: "02054116066",
          ວັນ_ເດືອນ_ປີ_ເກີດ: "04/12/2000",
        },
        {

          ຊື່: "DDDDD",
          ທີ່ຢູ່: "XAYSOMBOUN",
          ເບີໂທລະສັບ: "02077975212",
          ວັນ_ເດືອນ_ປີ_ເກີດ: "04/12/2000",
        },
        {

          ຊື່: "EEEE",
          ທີ່ຢູ່: "XAYSOMBOUN",
          ເບີໂທລະສັບ: "02054116066",
          ວັນ_ເດືອນ_ປີ_ເກີດ: "04/12/2000",
        },
        {

          ຊື່: "FFFF",
          ທີ່ຢູ່: "XAYSOMBOUN",
          ເບີໂທລະສັບ: "02054116066",
          ວັນ_ເດືອນ_ປີ_ເກີດ: "04/12/2000",
        },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>