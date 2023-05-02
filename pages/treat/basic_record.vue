<template>
  <div>
    <v-card class="container">
      <div
        class="font-weight-blod ml-3"
        style="color: #9155fd; font-size: 18px"
      >
        ບັນທຶກຂໍ້ມູນພື້ນຖານ
      </div>
      <v-row class="d-flex align-center col-12">
        <v-col cols="12" md="6" sm="12">
          <v-text-field
            label="ຊື່ ເເລະ ນາມສະກຸນ"
            prepend-inner-icon="mdi-account-outline"
            outlined
            dense
            color="#9155FD"
          />
          <v-text-field
            label="ອາການເບື້ອງຕົ້ນ"
            prepend-inner-icon="mdi-doctor"
            outlined
            dense
            color="#9155FD"
          />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field
            label="ເບີໂທລະສັບ"
            prepend-inner-icon="mdi-phone-outline"
            outlined
            dense
            color="#9155FD"
          />
          <v-select
            label="ເລືອກລາຍການກວດ"
            multiple
            outlined
            dense
            color="#9155FD"
            :items="item"
          />
        </v-col>
      </v-row>
    </v-card>
    <div class="d-flex justify-end">
      <v-card class="mt-5 col-8">
        <div class="d-flex justify-space-between">
          <div class="ml-3">ລາຍການ</div>
        </div>
        <v-row class="col-12 d-flex justify-center">
          <v-col cols="12" md="6" sm="12">
            <div>ຊື່ ເເລະ ນາມສະກຸນ : XOUAYANG</div>
            <div class="mt-5">ເບີໂທລະສັບ: 02054116066</div>
            <div class="mt-5">
              ລາຄາກວດທັງໝົດ: <span style="color: red">200000 LAK</span>
            </div>
          </v-col>
          <v-col cols="12" md="6" sm="12">
            <div>ຊື່ ເເລະ ນາມສະກຸນ : XOUAYANG</div>
            <div class="mt-5">
              ລາຍການທີ່ເລືອກກວດ : ກວດລະດັບນໍ້າຕານໃນເລືອດ,ກວດລະດັບໄຂມັນໃນເລືອດ,
              ກວດປັດສະວະ,ກວດຄວາມສົມບູນຂອງເລືອດ
            </div>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn color="#9155FD" to="/bill"
              ><span style="color: white">ອອກໃບບິນຈ່າຍເງິນ</span></v-btn
            >
          </v-col>
        </v-row>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "Basic_recordPages",
  data() {
    return {
      item: [
        "ກວດລະດັບນໍ້າຕານໃນເລືອດ",
        "ກວດລະດັບໄຂມັນໃນເລືອດ",
        "ກວດປັດສະວະ",
        "ກວດຄວາມສົມບູນຂອງເລືອດ",
      ],
    };
  },
};
</script>
<style>
</style>