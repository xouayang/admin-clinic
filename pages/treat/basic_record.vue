<template>
  <div>
    <v-card class="container">
      <div
        v-if="staffData"
        class="font-weight-blod ml-3"
        style="color: #9155fd; font-size: 18px"
      >
        ບັນທຶກຂໍ້ມູນພື້ນຖານ (ຂໍ້ມູນຄົນເຈັບ)
      </div>
      <div
        v-else
        class="font-weight-blod ml-3"
        style="color: #9155fd; font-size: 18px"
      >
        ບັນທຶກຂໍ້ມູນກວດເບື້ອງຕົ້ນ
      </div>
      <v-row v-if="doctorData" class="d-flex align-center col-12">
        <v-col cols="12" md="6" sm="12">
          <v-text-field
            v-model="showDatId.id"
            label="ລະຫັດຄົນເຈັບ"
            disabled
            prepend-inner-icon="mdi-account-outline"
            outlined
            dense
            color="#9155FD"
          />
          <v-text-field
            v-model="showDatId.details"
            label="ອາການເບື້ອງຕົ້ນ"
            prepend-inner-icon="mdi-doctor"
            outlined
            dense
            disabled
            color="#9155FD"
          />
        </v-col>
        <v-col cols="12" md="6" sm="12">
          <v-text-field
            v-model="checkData.weight"
            label="ນໍ້າໜັກ"
            prepend-inner-icon="mdi-weight-lifter"
            outlined
            dense
            color="#9155FD"
          />
          <v-text-field
            v-model="checkData.height"
            label="ລວງສູງ"
            prepend-inner-icon="mdi-human-male-height"
            outlined
            dense
            color="#9155FD"
          />
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn large color="error" class="mr-5" @click="clearCheckData">
            <span style="color: white">ລ້າງຂໍ້ມູນ</span>
            <v-icon color="white">mdi-close-box-outline</v-icon>
          </v-btn>
          <v-btn large color="#9155FD" @click="addDataCheckFirst">
            <span style="color: white">ບັນທຶກຂໍ້ມູນ</span>
            <v-icon color="white">mdi-content-save-check-outline</v-icon>
          </v-btn>
        </v-col>
        <!-- <v-col>
          <v-select
            v-model="treat_data.list_check"
            label="ເລືອກລາຍການກວດ"
            multiple
            outlined
            dense
            color="#9155FD"
            :items="diseases"
            item-text="name"
            :item-value="id"
            return-object
          />
        </v-col> -->
      </v-row>
      <v-row v-else class="d-flex align-center col-12">
        <v-col cols="12" md="12" sm="12">
          <v-text-field
            v-model="treat_data.name"
            label="ຊື່ ເເລະ ນາມສະກຸນ"
            prepend-inner-icon="mdi-account-outline"
            outlined
            dense
            color="#9155FD"
          />
          <v-text-field
            v-model="treat_data.address"
            label="ທີ່ຢູ່"
            prepend-inner-icon="mdi-map-marker-outline"
            outlined
            dense
            color="#9155FD"
          />
          <v-text-field
            v-model="treat_data.tel"
            label="ເບີໂທລະສັບ"
            prepend-inner-icon="mdi-phone-outline"
            outlined
            dense
            color="#9155FD"
          />
          <v-text-field
            v-model="treat_data.details"
            label="ອາການເບື້ອງຕົ້ນ"
            prepend-inner-icon="mdi-doctor"
            outlined
            dense
            color="#9155FD"
          />
        </v-col>
      </v-row>
      <v-row v-if="staffData" class="col-12">
        <v-col cols="12" md="12" sm="12" class="d-flex justify-end">
          <div class="pr-6">
            <v-btn large color="error" @click="clearData">
              <span style="color: white">ລ້າງຂໍ້ມູນ</span>
              <v-icon color="white">mdi-backspace-outline</v-icon>
            </v-btn>
          </div>
          <div>
            <v-btn large color="#9155FD" @click="addPatientsData">
              <span style="color: white">ບັນທຶກຂໍ້ມູນ</span>
              <v-icon color="white">mdi-content-save-check-outline</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <div></div>
    <!-- <div>
      <div v-if="doctorData" class="d-flex justify-end">
        <v-card class="mt-5 col-8">
          <div class="d-flex justify-space-between">
            <div class="ml-3">ລາຍການ</div>
          </div>
          <v-row class="col-12 d-flex justify-center">
            <v-col cols="12" md="6" sm="12">
              <div>ຊື່ ເເລະ ນາມສະກຸນ : {{ showDatId.name }}</div>
              <div class="mt-5">ເບີໂທລະສັບ: {{ showDatId.tel }}</div>
              <div class="mt-5">
                ລາຄາກວດທັງໝົດ:
                <span style="color: red">
                  {{ toCurrencyString(totalPrice) }}</span
                >
              </div>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <div>ອາການເບື້ອງຕົ້ນ : {{ showDatId.details }}</div>
              <div class="mt-5">ລາຍການທີ່ເລືອກກວດ : {{ selectedDiseases }}</div>
            </v-col>
            <v-col class="d-flex justify-end">
              <v-btn color="#9155FD" to="/bill"
                ><span style="color: white">ອອກໃບບິນຈ່າຍເງິນ</span></v-btn
              >
            </v-col>
          </v-row>
        </v-card>
      </div>
      <div v-else></div>
    </div> -->
  </div>
</template>
<script>
import laoCurrency from '@lailao10x/lao-currency'
export default {
  name: 'BasicRecordPages',
  data() {
    return {
      treat_data: {
        name: '',
        address: '',
        details: '',
        tel: '',
        list_check: '',
      },
      checkData: {
        height: '',
        weight: '',
        patientId: '',
        details: '',
      },
      staffData: '',
      doctorData: '',
      diseaseData: '',
      selectedDiseaseIds: '',
    }
  },
  computed: {
    diseases() {
      return this.$store.state.disease.datas.map((disease) => ({
        id: disease.disease_id,
        name: disease.name,
      }))
    },
    selectedDiseases() {
      console.log(this.treat_data.list_check)
      let data
      if (this.treat_data.list_check) {
        data = this.treat_data.list_check.map((disease) => disease.name)
      } else {
        data = null
      }
      return data
    },
    showDatId() {
      return this.$store.state.patient.dataId
    },
  },
  async mounted() {
    await this.$store.dispatch('disease/getSingData')
    const check = this.$cookies.get('role')
    if (check === 'doctor' || check === 'admin') {
      this.doctorData = check
    }
    if (check === 'staff') {
      this.staffData = check
    }
  },
  methods: {
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
    async addPatientsData() {
      await this.$store.dispatch('patient/postData', { ...this.treat_data })
      this.treat_data.name = ''
      this.treat_data.address = ''
      this.treat_data.details = ''
      this.treat_data.tel = ''
      this.$router.push('/treat/Check_appointment')
    },
    clearData() {
      this.treat_data.name = ''
      this.treat_data.address = ''
      this.treat_data.details = ''
      this.treat_data.tel = ''
    },
    clearCheckData() {
      this.checkData.height = ''
      this.checkData.weight = ''
    },
    async addDataCheckFirst() {
      if (this.showDatId) {
        this.checkData.patientId = this.showDatId.id
        this.checkData.details = this.showDatId.details
      }
      await this.$store.dispatch('firstcheck/postData', {
        ...this.checkData,
      })
    },
  },
}
</script>
<style>
</style>