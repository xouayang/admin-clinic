<template>
  <div class="mt-5 text d-flex justify-center">
    <v-card width="600" class="ml-16">
      <div class="container font-weight-bold" style="color: #9155fd">
        {{ title }}
      </div>
      <v-row class="container">
        <v-col cols="12" sm="12" md="12">
          <v-text-field v-model="appointData.name" outlined dense label="ຊື່" type="text" hide-details="auto" />
        </v-col>
        <v-col cols="12" sm="12" md="12">
          <v-text-field v-model="appointData.tel" outlined dense label="ເບີໂທລະສັບ" type="number" hide-details="auto" />
        </v-col>
        <v-col cols="12" sm="12" md="12">
        <DataPicker3 v-model="appointData.appoints"/>
        </v-col>
      </v-row>
      <div class="container d-flex justify-end">
        <v-btn color="#9155fd" @click="save">
          <span style="color:white">ບັນທຶກ</span>
          <v-icon color="white">mdi-content-save-check-outline</v-icon>
        </v-btn>
      </div>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'AppointmentPages',
  data() {
    return {
      title: 'ນັດໝາຍ',
      appointData : {
        name:'',
        tel:'',
        appoints:''
      }
    }
  },
  methods: {
   async save() {
    await this.$store.dispatch('appointment/postAppointment', {...this.appointData}) 
    this.appointData.name = ''
    this.appointData.tel = ''
    this.appointData.appoints = ''
    }
  },
}
</script>
<style>
</style>