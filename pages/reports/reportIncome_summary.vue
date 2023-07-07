<template>
  <div class="mt-3">
    <v-card>
      <div class="pa-2 ml-1">ລາຍງານສະຫຼຸບລາຍຮັບ</div>
      <v-row class="col-12 d-flex justify-center">
        <v-col cols="12" sm="12" md="6">
          <DataPicker v-model="value" />
        </v-col>
        <v-col cols="12" sm="12" md="6" class="text-center">
          <div>
            ຄົ້ນຫາວັນທີ ເດືອນ ປີ : <span style="color: red">{{ value }}</span>
          </div>
        </v-col>
      </v-row>
      <v-data-table > </v-data-table>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'ReportsIncome',
  data() {
    return {
      items: [],
      value: '',
    }
  },
}
</script>
