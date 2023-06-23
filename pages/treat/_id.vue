<template>
  <v-card class="container mt-5">
    <!-- {{billData}} -->
    <v-row class="d-flex justify-end pa-2 mb-4">
      <div class=" mr-4">
        <div>ລະຫັດປີ່ນປົວ : {{billData.billNumber}}</div>
        <div>ວັນທີ່ : {{$moment(Date.now()).format('DD/MM/YYYY')}}</div>
      </div>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" sm="12">
        <v-select label="ເລືອກ" dense outlined></v-select>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="12" md="4" sm="12">
        <div>ລາຍການຢາທີ່ເລືອກ :</div>
         <div>ຈໍານວນ : 5</div>
        <div style="color:red">ລາຄາລວມ : 100000</div>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="12" md="4" sm="12">
       <div>ລາຍການກວດພະຍາດ :
        <div v-for="data in billData.rows" :key="data.id">
          <ul>
            <li>
              {{data.details}}
            </li>
          </ul>
        </div>
       </div>
        <v-btn color="#9155FD" class="mt-8 d-flex justify-end">
            <span style="color:white">ບັນທຶກ</span>
            <v-icon color="white">
                mdi-content-save-check-outline
            </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  name: 'medicinesPages',
  data() {
    return {
        
    }
  },
  computed:{
    billId(){
        return this.$route.query.bill
    },
    T_id(){
      return this.$route.query.treat_id
    },
    billData(){
      return this.$store.state.treat.billData
    }
  },
  mounted() {
    this.$store.dispatch('treat/getMedicines',this.billId)
    console.log(this.T_id)
      },
 
}
</script>
