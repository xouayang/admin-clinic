<template>
  <div class="mt-2 ml-2">
    <!-- {{prescrition}} -->
    <div style="font-size: 20px; color:#9155FD" class="mb-7 ml-4">ຂາຍຢາ</div>
    <v-card class="mt-3 text-center">
      <v-row class="col-12">
        <v-col cols="12" md="10" sm="12" class="d-flex">
          <v-col cols="12" md="8">
            <v-text-field
            v-model="treatId"
              id="sale"
              name="sale"
              label="ລະຫັດບາໂຄດ"
              prepend-inner-icon="mdi-barcode"
              outlined
              dense
              @keydown.enter="getPrescrition"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              label="ຈຳນວນ"
              name="amount"
              outlined
              dense
            ></v-text-field>
          </v-col>
        </v-col>
        <v-col cols="12" md="2" sm="12" class="mt-3">
          <v-btn color="#9155FD">
            <span style="color: white">ໃຊ້ບາໂຄດ </span>
            <v-icon color="white">mdi-barcode</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-data-table
      :headers="headers"
      :items="prescrition?.rows"
      > </v-data-table>
      <v-row class="col-12 mt-3">
        <v-col cols="12" class="text-end">
          <v-btn color="#9155FD"
            ><span style="color: white">ພິມໃບບິນ</span>
            <v-icon color="white">mdi-printer-outline</v-icon>
          </v-btn>
          <v-btn color="success" class="ml-5" @click="saveSale"
            ><span style="color: white">ບັນທຶກຂາຍຢາ</span>
            <v-icon color="white">mdi-content-save-check-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treatId:'',
      headers:[
        {text:'name', value:'name'},
        {text:'amount', value:'amount'},
        {text:'price', value:'price'},
        {text:'createdAt', value:'createdAt'},
  
      ]
    }
  },
  computed:{
    prescrition(){
      return this.$store.state.sale.prescrition
    }
  },
  mounted(){
  
  },
  methods:{
    getPrescrition(e){
      const id = e.target.value;
      this.$store.dispatch('sale/getPrescrition',id)
    },
    async saveSale(){
      const data = {
        treat_id: this.treatId,
        item:this.prescrition.rows
      }
     await this.$store.dispatch('sale/saveSale', data)
      location.reload()
     
    }
  }
};
</script>

<style>
</style>