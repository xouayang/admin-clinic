<template>
  <div class="mt-3">
    <v-card>
      <div class="pa-2 ml-1">ລາຍການບັນທຶກຂໍ້ມູນປີ່ນປົວ</div>
      <v-data-table :headers="headers" :items="dataTreat"> 
        <template slot="item.index" scope="props">
           {{props.index + 1}}
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'DataTreat',
  data() {
    return {
      headers: [
        { text: 'ລຳດັບ', value: 'index' },
        { text: 'ຊື່', value: 'name' },
        { text: 'ທີ່ຢູ່', value: 'address' },
        { text: 'ເບີໂທລະສັບ', value: 'tel' },
        { text: 'ລາຍລະອຽດ', value: 'details' },
        { text: 'ວັນ ເດືອນ ປີ ເກີດ', value: 'birtday' },
        { text: 'ນໍ້າໜັກ', value: 'weight' },
        { text: 'ລວງສູງ', value: 'height' },
      ],
    }
  },
  computed: {
    dataTreat() {
      return this.$store.state.firstcheck.dataStore
    },
  },
  async mounted() {
    await this.$store.dispatch('firstcheck/getAll')
  },
}
</script>
