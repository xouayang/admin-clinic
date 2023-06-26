<template>
  <div class="mt-2 ml-2">
    <!-- {{prescrition}} -->
    <div style="font-size: 20px; color: #9155fd" class="mb-7 ml-4">
      ປະຫວັດຈັດຊື້ຢາ
    </div>
    <v-card class="mt-3 text-center">
      <v-row class="col-12">
        <v-col cols="12" md="12" sm="12">
          <v-text-field
            v-model="search"
            name="sale"
            label="ຄົ້ນຫາ"
            prepend-inner-icon="mdi-magnify"
            outlined
            dense
          >
            <template #[`item.createdAt`]="{ item }">
              {{ $moment(item.createdAt).format('DD-MM-YYY') }}
            </template>
          </v-text-field>
        </v-col>
      </v-row>
      <v-data-table :headers="headers" :items="history" :search="search">
        <template #[`item.create_at`]="{ item }">
          {{ $moment(item.create_at).format('YYYY-MM-DD') }}
        </template>
        <template #[`item.actions`]="{ item }">
          <div v-if="item.status == 1">
            <v-btn rounded color="error">
              <v-icon>mdi-dots-horizontal</v-icon>
              <span style="color: white">ລໍຖ້ານໍາເຂົ້າ</span>
            </v-btn>
          </div>
          <div v-if="item.status == 0">
            <v-btn rounded color="success">
              <v-icon>mdi-check</v-icon>
              <span style="color: white">ນໍາເຂົ້າແລ້ວ</span>
            </v-btn>
          </div>

          <!-- <v-btn rounded color="#9155FD"
            ><span style="color: white">{{item.status == 1 ? "ລໍຖ້ານໍາເຂົ້າ" : "ນໍາເຂົ້າແລ້ວ"}}</span></v-btn
          > -->
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      headers: [
        { text: 'ລະຫັດໃບບິນ', value: 'bill_number' },
        { text: 'ປະເພດຢາ', value: 'type_name' },
        { text: 'ຊື່ຢາ', value: 'name' },
        { text: 'ຈຳນວນ', value: 'amount' },
        { text: 'ລາຄາ', value: 'price' },
        { text: 'ຫົວໜ່ວຍ', value: 'unit' },
        { text: 'ຜູ້ສະໜອງ', value: 'supplier_name' },
        { text: 'ວັນທີ່ສັ່ງຊື້', value: 'create_at' },
        { text: 'ສະຖານະ', value: 'actions' },
      ],
    }
  },
  computed: {
    history() {
      return this.$store.state.user.historyData
    },
  },
  async mounted() {
    await this.$store.dispatch('user/getHistory')
  },
  methods: {},
}
</script>

<style>
</style>