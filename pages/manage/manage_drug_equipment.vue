<template >
  <div>
    <div class="mt-5 mb-3 pb-2 ml-2 font-weight-bold">ຈັດການຂໍ້ມູນຢາ</div>
    <v-card>
      <!-- search button------------------------------- -->
      <v-row class="d-flex align-center col-12">
        <v-col cols="12" md="10" sm="12">
          <v-card-title>
            <v-text-field
              v-model="searchTerm"
              prepend-inner-icon="mdi-magnify"
              label="ຄົ້ນຫາ"
              outlined
              hide-details
              dense
              small
              color="#9155FD"
            />
          </v-card-title>
        </v-col>
        <v-col cols="12" md="2" sm="3" class="d-flex justify-end">
          <v-btn
            style="width: 100"
            color="#9155FD"
            @click="showAddDialog = !showAddDialog"
            ><span style="color: white">ເພີ່ມຂໍ້ມູນ</span>
            <v-icon color="white">mdi-plus-outline</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-data-table
        :headers="headers"
        :items="Info"
        :items-per-page="5"
        color="#9155FD"
        :search="searchTerm"
      >
        <template #[`item.action`]="{ item }">
          <v-tooltip top color="error">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="error" @click="deleteData(item.medicines_id)"
                  >mdi-trash-can-outline</v-icon
                >
              </v-btn>
            </template>
            <span>ລຶບ</span>
          </v-tooltip>
          <v-tooltip top color="#9155FD">
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
                <v-icon color="#9155FD" @click="dialog = !dialog"
                  >mdi-pencil-outline</v-icon
                >
              </v-btn>
            </template>
            <span>ເເກ້ໄຂ</span>
          </v-tooltip>
        </template>
        <template #[`item.date`]="{ item }">
          {{ $moment(item.date).format('DD-MM-YYYY') }}
        </template>
        <template slot="item.index" scope="props">
          {{ props.index + 1 }}
        </template>
        <template #[`item.price`]="{ item }">
          {{ toCurrencyString(item.price) }}
        </template>
        <template #[`item.image`]="{ item }">
          <v-img :src="item.image" max-height="40" max-width="89" />
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="showDailog" width="540" activator="parent" persistent>
      <v-card>
        <v-toolbar dark color="#9155FD">
          <v-card-title>ທ່ານເເນ່ໃຈບໍ ?</v-card-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="showDailog = !showDailog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-divider></v-divider>
        <div class="container text-center">ຕ້ອງການລຶບຂໍ້ມູນບໍ ?</div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" width="100" @click="removedata(dataId)">
            <div class="text--white">ລຶບ</div>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- form edit -->
    <v-row>
      <v-dialog
        v-model="dialog"
        width="600"
        transition="dialog-bottom-transition"
        persistent
      >
        <v-card>
          <v-toolbar dark color="#9155FD">
            <div>ແກ້ໄຂຂໍ້ມູນຄົນເຈັບ</div>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-col cols="12">
            <v-text-field
              placeholder="XOUAYANG"
              outlined
              dense
              hide-details="auto"
              label="ຊື່"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              placeholder="XOUAYANG"
              outlined
              dense
              hide-details
              label="ທີ່ຢູ່"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              placeholder="XOUAYANG"
              outlined
              dense
              hide-details
              label="ເບີໂທລະສັບ"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              placeholder="XOUAYANG"
              outlined
              dense
              hide-details
              label="ວັນ ເດືອນ ປີ ເກີດ "
              color="#9155FD"
            />
          </v-col>
          <v-spacer></v-spacer>
          <div class="d-flex justify-end pa-4">
            <v-btn
              color="#9155FD"
              width="100"
              class="white--text"
              @click="dialog = false"
              >ບັນທືກ</v-btn
            >
          </div>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row>
      <v-dialog
        v-model="showAddDialog"
        width="600"
        transition="dialog-bottom-transition"
        persistent
      >
        <v-card>
          <v-toolbar dark color="#9155FD">
            <div>ເພີ່ມຂໍ້ມູນຢາ</div>
            <v-spacer></v-spacer>
            <v-btn icon dark @click="showAddDialog = !showAddDialog">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-col cols="12">
            <v-text-field
              v-model="name"
              outlined
              dense
              hide-details="auto"
              label="ຊື່ຢາ"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="medicines_type_id"
              :items="dataMedicines.rows"
              item-text="type_name"
              item-value="id"
              outlined
              dense
              return-object
              hide-details
              label="ປະເພດຢາ"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="unit"
              :items="dataMedicines.rows"
              item-text="unit"
              item-value="unit"
              outlined
              dense
              hide-details
              label="ຫົວໜ່ວຍ"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="amount"
              outlined
              dense
              hide-details
              label="ຈຳນວນ"
              color="#9155FD"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="price"
              outlined
              dense
              hide-details
              label="ລາຄາ"
              color="#9155FD"
            />
          </v-col>
          <!-- <v-col cols="12">
            <v-text-field
              v-model="expired_date"
              outlined
              dense
              hide-details
              label="ວັນ ເດືອນ ປີ ເກີດ ໝົດອາຍຸ "
              color="#9155FD"
            />
          </v-col> -->
          <v-file-input
            id="file"
            v-model="file"
            :rules="imageRules"
            label="Image"
            class="d-none"
            prepend-icon="mdi-camera"
            @change="onFileChange"
          ></v-file-input>
          <v-spacer></v-spacer>
          <div class="d-flex justify-space-between align-center pa-4">
            <v-btn class="mt-2" color="#9155FD" @click="upload">
              <v-icon color="white">mdi-tray-arrow-up</v-icon>
              <span style="color: white">ອັບໂຫຼດຮູບພາບ</span>
            </v-btn>

            <div class="justify-center text-center mt-5">
              <div>
                <v-avatar
                  size="130"
                  style="
                    border-radius: 10%;
                    border: 3px solid #9155fd;
                    box-shadow: 12px;
                  "
                >
                  <v-img v-if="url" :src="url"></v-img>
                  <v-img v-else src="/images/logo.png"></v-img>
                </v-avatar>
              </div>
            </div>
          </div>

          <div class="container d-flex justify-end">
            <v-btn
              color="#9155FD"
              width="100"
              class="white--text"
              @click="insertData"
              >ບັນທືກ</v-btn
            >
          </div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import laoCurrency from '@lailao10x/lao-currency'
export default {
  name: 'ManageDrugEquipment',
  data() {
    return {
      file: null,
      urlImage: null,
      searchTerm: '',
      showDailog: false,
      dialog: false,
      showAddDialog: false,
      name: '',
      medicines_type_id: '',
      unit: '',
      amount: 0,
      price: 0,
      expired_date: '',
      dataId: '',
      url: null,
      headers: [
        { text: 'ຮູບພາບ', value: 'image' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ປະເພດຢາ', value: 'type_name' },
        { text: 'ລາຄາ', value: 'price' },
        { text: 'ຈຳນວນ', value: 'amount' },
        { text: 'ຫົວໜ່ວຍ', value: 'unit' },
        { text: 'ວັນທີ່', value: 'date' },
        { text: 'Actions', value: 'action' },
      ],
      imageRules: [
        (value) =>
          !value ||
          value.size < 2000000 ||
          'Image size should be less than 2 MB!',
        (value) =>
          !value ||
          ['image/jpeg', 'image/png'].includes(value.type) ||
          'Only JPEG/PNG images are allowed!',
      ],
    }
  },
  computed: {
    dataMedicines() {
      return this.$store.state.medicinesType.medicinesData
    },
    Info() {
      return this.$store.state.medicinesType.Data
    },
  },
  async mounted() {
    await this.$store.dispatch('medicinesType/medicinesTypeData')
    await this.$store.dispatch('medicinesType/medicinesAllData')
  },
  methods: {
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
    async insertData() {
      const file = this.file
      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        try {
          const response = await this.$axios.post(
            'http://localhost:7000/upload/image',
            formData
          )
          this.urlImage = response?.data?.url
        } catch (error) {
          this.$toast.error('File upload failed', error)
        }
      }
      const data = {
        name: this.name,
        medicines_type_id: this.medicines_type_id.id,
        unit: this.unit,
        amount: this.amount,
        price: this.price,
        image: this.urlImage,
      }
      await this.$store.dispatch('medicinesType/postMedicines', { ...data })
      await this.$store.dispatch('medicinesType/medicinesAllData')
      this.showAddDialog = false
    },
    onFileChange(e) {
      if (e) {
        this.url = URL.createObjectURL(e)
      }
    },

    upload() {
      document.getElementById('file').click()
    },
    deleteData(id) {
      this.dataId = id
      this.showDailog = true
    },
    async removedata(id) {
      if (id) {
          await this.$store.dispatch('medicinesType/deletdMedicines',id)
          await this.$store.dispatch('medicinesType/medicinesAllData')
          this.showDailog = false

      }
    },
  },
}
</script> 