<template >
  <div>
    <div class="mt-5 mb-3 pb-2 ml-2 font-weight-bold">ຕັ້ງຄ່າລະບົບ</div>
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
            ><span style="color: white">ເພີ່ມຜູ້ໃຊ້</span>
            <v-icon color="white">mdi-plus-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="items"
        :items-per-page="5"
        color="#9155FD"
        :search="searchTerm"
      >
        <template #[`item.action`]>
          <v-tooltip top color="error">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="error" @click="showDailog = !showDailog"
                  >mdi-trash-can-outline</v-icon
                >
              </v-btn>
            </template>
            <span>ລຶບ</span>
          </v-tooltip>
          <v-tooltip top color="#9155FD">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="#9155FD" @click="dialog = !dialog"
                  >mdi-pencil-outline</v-icon
                >
              </v-btn>
            </template>
            <span>ເເກ້ໄຂ</span>
          </v-tooltip>
        </template>
        <template #[`item.avatar`]>
          <v-avatar>
            <v-img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
            ></v-img>
          </v-avatar>
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
              >ຊື່ <br />
              XOUAYANG
            </v-card-text>
            <v-card-text class="mb-2"
              >ທີ່ຢູ່ <br />
              XAYSOMBOUN</v-card-text
            >
          </div>
          <div class="d-flex align-center justify-space-around text-center">
            <v-card-text class="mb-2"
              >ເບີໂທລະສັບ<br />
              02054116066
            </v-card-text>
            <v-card-text class="mb-2"
              >ວັນ ເດືອນ ປີ ເກີດ <br />
              04/12/2000
            </v-card-text>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" width="100" @click="showDailog = false">
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
            <div>ເພິ່ມຜູ້ໃຊ້</div>
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
              label="ຊື່"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              outlined
              dense
              hide-details="auto"
              label="ຕຳເເໜ່ງ"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              outlined
              dense
              hide-details
              label="ທີ່ຢູ່"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              outlined
              dense
              hide-details
              label="ເບີໂທລະສັບ"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              outlined
              dense
              hide-details
              label="ວັນ ເດືອນ ປີ ເກີດ "
              color="#9155FD"
            />
          </v-col>
          <v-spacer></v-spacer>
          <div class="d-flex justify-end pa-4">
            <v-btn
              color="#9155FD"
              width="100"
              class="white--text"
              @click="dialog = false"
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
            <div>ເພິ່ມຜູ້ໃຊ້</div>
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
              label="ຊື່"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-select
              outlined
              dense
              hide-details="auto"
              label="ຕຳເເໜ່ງ"
              color="#9155FD"
              :items="position"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              outlined
              dense
              hide-details
              label="ທີ່ຢູ່"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              outlined
              dense
              hide-details
              label="ເບີໂທລະສັບ"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              outlined
              dense
              hide-details
              label="ວັນ ເດືອນ ປີ ເກີດ "
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-select
              outlined
              dense
              hide-details
              label="ກຳນົດສິດທິ"
              color="#9155FD"
              :items="position"
            />
            <div style="color: red">* ກະລຸນາກຳນົດສິດທິ</div>
          </v-col>
          <v-spacer></v-spacer>
          <div class="d-flex justify-end pa-4">
            <v-btn
              color="#9155FD"
              width="100"
              class="white--text"
              @click="showAddDialog = false"
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
  name: "SettingPages",
  data() {
    return {
      searchTerm: "",
      showDailog: false,
      dialog: false,
      showAddDialog: false,
      showPermission: false,
      position: ["ທ່ານໝໍ", "ພະຍານບານ", "ພະນັກງານ"],
      headers: [
        { text: "ລະຫັດຜູ້ໃຊ້", value: "ລະຫັດຜູ້ໃຊ້" },
        { text: "ຮູບພາບ", value: "avatar" },
        { text: "ຊື່", value: "ຊື່" },
        { text: "ເບີໂທລະສັບ", value: "ເບີໂທລະສັບ" },
        { text: "ຕຳເເໜ່ງ", value: "ຕຳເເໜ່ງ" },
        { text: "ທີ່ຢູ່", value: "ທີ່ຢູ່" },
        { text: "ຈັດການສິດທິ", value: "action" },
      ],
      items: [
        {
          ລະຫັດຜູ້ໃຊ້: "U001",
          ຮູບພາບ: "XXXXXXXX",
          ຊື່: "XOUAYANG",
          ເບີໂທລະສັບ: "02054116066",
          ຕຳເເໜ່ງ: "Doctor",
          ທີ່ຢູ່: "XAYSOMBOUN",
        },
        {
          ລະຫັດຜູ້ໃຊ້: "U002",
          ຮູບພາບ: "XXXXXXXX",
          ຊື່: "Dao",
          ເບີໂທລະສັບ: "02077975212",
          ຕຳເເໜ່ງ: "Doctor",
          ທີ່ຢູ່: "XAYSOMBOUN",
        },
      ],
      permission: ["none", "ພະຍາບານ", "ທ່ານໝໍ"],
    };
  },
};
</script>
