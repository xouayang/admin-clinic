<template>
<div>
  <v-card class="container mt-5">
    <!-- {{medicines}} -->
    <v-row class="d-flex justify-end pa-2 mb-4">
      <div class=" mr-4">
        <div>ລະຫັດປີ່ນປົວ : {{billData.billNumber}}</div>
        <div>ວັນທີ່ : {{$moment(Date.now()).format('DD/MM/YYYY')}}</div>
      </div>
    </v-row>
    <v-row>
      <v-col cols="12" md="4" sm="12">
        <v-select 
        :items="medicinesType"
        item-value="id"
        item-text="type_name"
        label="ເລືອກ" 
        dense 
        outlined
        @change="selectMedicines"
        ></v-select>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="12" md="4" sm="12">
        <div>ລາຍການຢາທີ່ເລືອກ :
             <div v-for="data in allData" :key="data.id">
              <ul>
                <li>

              {{data?.name}}
                </li>
              </ul>
            </div>
        </div>
         <div>ຈໍານວນ : {{allData.reduce((sum , data)=> data.amount + sum,0)}}</div>
        <div style="color:red">ລາຄາລວມ : {{allData.reduce((sum , data)=> data.amount * data.price + sum, 0)}}</div>
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
        <v-btn color="#9155FD" class="mt-8 d-flex justify-end" @click='saveData'>
            <span style="color:white">ບັນທຶກ</span>
            <v-icon color="white">
                mdi-content-save-check-outline
            </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
<!-- {{medicines}} -->
  <v-card v-if="medicines.length > 0" class="mt-5">
    <v-card-text>
      <v-row>
        <v-col v-for="data in medicines" :key="data.id" cols="12" md='3'>
          <v-card @click="showMedicines(data)">
            <v-card-title>
             Name: {{data.name}}
            </v-card-title>
            <v-card-text>
             Price: {{data.price}}
            </v-card-text>
           
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

<v-dialog
  v-model="dialog"
  persistent
  max-width="500px"
  transition="dialog-transition"
>
    <v-card >
            <v-card-title>
             Name: {{dataMedisinesOne.name}}
            </v-card-title>
            <v-card-text>
             Price: {{dataMedisinesOne.price}}
            </v-card-text>
            <v-card-text>
             Amount: 
             <v-text-field
              placeholder="amount"
              v-model="qty"
             ></v-text-field>
            </v-card-text>
           <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red white--text" outlined @click="dialog = false">cancel</v-btn>
            <v-btn color="success white--text" @click="sendDataArray">OK</v-btn>
           </v-card-actions>
          </v-card>
</v-dialog>

</div>
</template>
<script>
export default {
  name: 'medicinesPages',
  data() {
    return {
        qty:null,
        dialog : false,
        dataMedisinesOne:{},
        allData:[]

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
    },
    medicinesType(){
      return this.$store.state.treat.medicinesType
    }, 
    medicines(){
      return this.$store.state.treat.medicines
    },
   
  },
  mounted() {
    this.$store.dispatch('treat/getMedicines',this.billId)
    this.$store.dispatch('treat/getMedicinesType')
    console.log('---------------->',this.allData)
      },
      methods:{
       async saveData(){
          const readyData = {
            treat_id:this.T_id,
            item:this.allData
          }

          await this.$store.dispatch('treat/saveOffer', readyData)
          this.allData = []
          this.$router.back();
          // console.log('data----------------------->',readyData)

        },
        sendDataArray(){
            const medicinesData = {
              medicines_id:this.dataMedisinesOne.medicines_id,
              amount:parseFloat(this.qty),
              name:this.dataMedisinesOne.name,
              price: this.dataMedisinesOne.price
            }
            this.allData.push(medicinesData)
            this.qty = ''
            this.dialog = false
        },
        showMedicines(data){
          console.log(data)
          this.dataMedisinesOne = data
          this.dialog = true
        },
        selectMedicines(e){
          this.$store.dispatch('treat/getMedicinesAllById', e)
        }
      }
 
}
</script>
