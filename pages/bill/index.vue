<template>
  <div class="mt-5">
    <v-card width="1000" class="ml-16">
      <v-toolbar elevation="0" class="d-flex justify-center font-weight-bold">
        <div>{{ title }}</div>
      </v-toolbar>
      <div class="d-flex align-end col-12">
        <div class="col-md-12 ml-3">
          <div>ຄີຣນິກ ດຣ ສະຖຽນ</div>
          <div>ດົງໂດກ,ໄຊທານີ,ນະຄອນຫຼວງວຽງຈັນ</div>
        </div>
      </div>
      <v-divider color="grey"></v-divider>
      <div class="d-flex justify-space-around col-12 ml-10">
        <div class="col-md-6 ml-3 pl-10">
          <div>ຊື່ ເເລະ ນາມສະກຸນ: XOUAYANG</div>
          <div>ເບີໂທລະສັບ: 02054116066</div>
        </div>
        <div class="col-md-6 mr-3 d-flex flex-column pl-16">
          <div>ລະຫັດໃບບິນ:0012347</div>
          <div>ວັນທີ່: 19/3/2023</div>
        </div>
      </div>
      <div>
        <v-data-table
          :headers="headers"
          :items="items"
          :footer-props="{
            'items-per-page-options': [10],
            'disable-items-per-page': true,
          }"
        >
          <template slot="item.pk" scope="props">
            {{ props.index + 1 }}</template
          >
          <template #footer>
              <v-spacer/>
          </template>
        </v-data-table>
      </div>
    </v-card>
    <v-row class="col-12 mt-4">
      <v-col cols="12" md="12" sm="6" class="d-flex justify-center ml-10">
        <v-btn x-large color="#9155FD">
          <span style="color: white"
            >ພິມໃບບິນ
            <v-icon>mdi-printer-outline</v-icon>
          </span>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "Bill_pages",
  data() {
    return {
      title: "ໃບບິນຈ່າຍເງິນ",
      headers: [
        { text: "ລຳດັບ", value: "pk" },
        { text: "ລາຍການກວດ", value: "ລາຍການກວດ" },
        { text: "ລາຄາ", value: "ລາຄາ" },
        { text: "ຈຳນວນຄັ້ງກວດ", value: "ຈຳນວນຄັ້ງກວດ" },
        { text: "ລາຄາລວມ", value: "ລາຄາລວມ" },
      ],
      items: [
        {
          ລາຍການກວດ: "ກວດລະດັບນໍ້າຕານໃນເລືອດ",
          ລາຄາ: "1,000,000ກິບ",
          ຈຳນວນຄັ້ງກວດ: "01",
          ລາຄາລວມ: "1,000,000ກິບ",
        },
        {
          ລາຍການກວດ: "ກວດລະດັບນໍ້າຕານໃນເລືອດ",
          ລາຄາ: "1,000,000ກິບ",
          ຈຳນວນຄັ້ງກວດ: "01",
          ລາຄາລວມ: "1,000,000ກິບ",
        },
      ],
    };
  },
};
</script>
<style>
</style>