<template>
  <div class="mt-3">
    <div class="ml-1 mb-7 font-weight-bold">ລາຍງານ</div>
    <v-row>
      <v-col cols="12" md="3" sm="12">
        <v-card rounded="lg" style="cursor:pointer" class="pa-3" to="/reports/reportIncome_summary">
          <div class="d-flex justify-space-around align-center">
            <v-card-subtitle>ລາຍງານສະຫຼຸບລາຍຮັບ</v-card-subtitle>
            <v-btn fab small color="success">
              <v-icon>mdi-currency-usd</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" sm="12">
        <v-card rounded="lg" style="cursor:pointer" class="pa-3" to="/reports/reportDrug_equipment">
          <div class="d-flex justify-space-around align-center">
            <v-card-subtitle>ລາຍງານຂໍ້ມູນຢາ-ອຸປະກອນ</v-card-subtitle>
            <v-btn fab small color="#9155FD">
              <v-icon color="white">mdi-medical-cotton-swab</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" sm="12" >
        <v-card rounded="lg" style="cursor:pointer" class="pa-3" to="/reports/reportPatient" >
          <div class="d-flex justify-space-around align-center">
            <v-card-subtitle>ລາຍງານຂໍ້ມູນຄົນເຈັບ</v-card-subtitle>
            <v-btn fab small color="#9155FD">
              <v-icon color="white">mdi-account-group-outline</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" sm="12">
        <v-card rounded="lg" style="cursor:pointer" class="pa-3" to="/reports/Treatment_infomation">
          <div class="d-flex justify-space-around align-center">
            <v-card-subtitle>ລາຍງານຂໍ້ມູນການປີ່ນປົວ</v-card-subtitle>
            <v-btn fab small color="#9155FD">
              <v-icon color="white">mdi-account-injury-outline</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <!-- <v-card>
      <v-row class="col-12">
        <v-col cols="12" sm="12" md="9">
          <v-select
            clearable
            outlined
            dense
            color="#9155FD"
            label="ເລືອກລາຍການລາຍງານ"
            :items="item"
          ></v-select>
        </v-col>
        <v-col cols="12" sm="12" md="3">
          <v-text-field
            clearable
            outlined
            dense
            color="#9155FD"
            label="ວັນ ເດືອນ ປີ"
            v-model="value"
          >
          <template #append >
              <DataPicker v-model="value" />
          </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="items"> </v-data-table>
    </v-card> -->

    <!-- <v-row class="col-12 mt-4">
      <v-col cols="12" md="12" sm="6" class="d-flex justify-end">
        <v-btn color="#9155FD">
          <span style="color: white"
            >ພີມລາຍງານ
            <v-icon>mdi-printer-outline</v-icon>
          </span>
        </v-btn>
      </v-col>
    </v-row> -->
    <!--show story detail ------------------------------->
  </div>
</template>
  
  <script>
export default {
  name: "Report_Pages",

  data() {
    return {
      showDialog: false,
      show: false,
      value: "",
      headers: [],
      items: [],
      item: [
        "ລາຍງານສະຫຼຸບລາຍຮັບ",
        "ລາຍງານຂໍ້ມູນຢາ-ອຸປະກອນ",
        "ລາຍງານຂໍ້ມູນຄົນເຈັບ",
        "ລາຍງານຂໍ້ມູນການປີ່ນປົວ",
      ],
    };
  },

  mounted() {},
};
</script>
  
  <style lang="scss" scoped></style>