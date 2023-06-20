<template>
  <div class="mt-3">
    <!-- <div>{{ dataTreat }}</div> -->
    <v-card>
      <div class="pa-2 ml-1 font-weight-bold" style="color: #9155fd">
        ລາຍການບັນທຶກຂໍ້ມູນປີ່ນປົວ
      </div>
      <v-data-table :headers="headers" :items="dataTreat">
        <template slot="item.index" scope="props">
          {{ props.index + 1 }}
        </template>
        <template #[`item.action`]="{ item }">
          <v-tooltip left color="success">
            <template #activator="{ on, attrs }">
              <v-btn
                color="#9155FD"
                v-bind="attrs"
                v-on="on"
                @click="showDetails(item)"
              >
                <v-icon color="white">mdi-check-outline</v-icon>
              </v-btn>
            </template>
            <span>ກວດ</span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-card>

    <!-- dialog show treat -->
    <template>
      <!-- <div>{{showDiseas}}</div> -->
      <v-row justify="center" class="col-12">
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <v-card>
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title>ປີ່ນປົວ</v-toolbar-title>
            </v-toolbar>
            <!-- {{showDiseas.rows}} -->
            <v-row class="mt-2">
              <v-col cols="12" md="6" sm="12">
                <v-list>
                  <div class="font-weight-bold container">ຂໍ້ມູນລາຍການກວດ</div>
                  <div class="container">
                    <v-row>
                      <v-col>
                        <v-select
                          v-model="diseaseId"
                          label="ເລືອກລາຍການກວດ"
                          multiple
                          outlined
                          dense
                          color="#9155FD"
                          :items="showDiseas.rows"
                          item-value="disease_id"
                          item-text="name"
                          return-object
                        />
                      </v-col>
                    </v-row>
                  </div>
                </v-list>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="12" md="6" sm="12">
                <v-list>
                  <div class="font-weight-bold container mb-5">
                    ຂໍ້ມູນປີ່ນປົວ
                  </div>
                  <v-list-item>
                    <v-row class="d-flex align-center">
                      <v-col md="6">
                        <div>ຊື່ : {{ storeData.name }}</div>
                      </v-col>
                      <v-col md="6">
                        <div>ເບີໂທລະສັບ : {{ storeData.tel }}</div>
                      </v-col>
                      <v-col md="6">
                        <div>ທີ່ຢູ່ : {{ storeData.address }}</div>
                      </v-col>
                      <v-col md="6">
                        <div>ນໍ້າໜັກ : {{ storeData.weight }} Kg</div>
                      </v-col>
                      <v-col md="6">
                        <div>ລວງສູງ : {{ storeData.height }} Cm</div>
                      </v-col>
                      <v-col md="6">
                        <div>
                          ລາຄາລວມ :
                          <span style="color: red" class="font-weight-bold">{{
                            toCurrencyString(
                              diseaseId.reduce(
                                (sum, data) => data.price + sum,
                                0
                              )
                            )
                          }}</span>
                        </div>
                      </v-col>
                      <v-col md="6">
                        <div>
                          ລາຍການທີ່ເລືອກກວດ :

                          <div v-for="data in diseaseId" :key="data.id">
                            <ul>
                              <li>
                                {{ data.name }}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-col class="d-flex justify-end">
                  <v-btn large color="#9155FD"
                    ><span style="color: white">ບັນທືກ</span>
                    <v-icon color="white"
                      >mdi-content-save-check-outline</v-icon
                    >
                  </v-btn>
                </v-col>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>
  </div>
</template>
<script>
import laoCurrency from '@lailao10x/lao-currency'
export default {
  name: 'DataTreat',
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      selectedDiseases: [],
      diseaseId: [],
      storeData: '',
      firstcheckData:{
        firstCheck_id:'',
        disease_id:'',
        details:''
      },
      headers: [
        { text: 'ລຳດັບ', value: 'index' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ທີ່ຢູ່', value: 'address' },
        { text: 'ເບີໂທລະສັບ', value: 'tel' },
        { text: 'ລາຍລະອຽດ', value: 'details' },
        { text: 'ວັນ ເດືອນ ປີ ເກີດ', value: 'birtday' },
        { text: 'ນໍ້າໜັກ', value: 'weight' },
        { text: 'ລວງສູງ', value: 'height' },
        { text: 'action', value: 'action' },
      ],
    }
  },
  computed: {
    dataTreat() {
      return this.$store.state.firstcheck.dataStore
    },
    showDiseas() {
      return this.$store.state.disease.dataDisase
    },
  },
  async mounted() {
    await this.$store.dispatch('disease/getAll')
    await this.$store.dispatch('firstcheck/getAll')
  },
  methods: {
    showDetails(data) {
      console.log(data)
      this.storeData = data
      if(this.storeData.length > 0) {
        this.firstcheckData.firstCheck_id = this.storeData.firstcheckid
      }
        this.dialog = true
        console.log('firstcheckData',this.firstcheckData)
    },
    toCurrencyString(number) {
      return laoCurrency(number).format('LAK S')
    },
  },
}
</script>
