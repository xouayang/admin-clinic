<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="date"
    persistent
    width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        :label="label"
        prepend-inner-icon="mdi-calendar"
        readonly
        hide-details="auto"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" scrollable>
      <v-spacer></v-spacer>
      <v-btn text color="error" @click="modal = false"> ຍົກເລີກ </v-btn>
      <v-btn text color="primary" @click="saveDate"> ເລືອກ </v-btn>
    </v-date-picker>
  </v-dialog>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: "ວັນທີ ເດືອນ ປີ ນັດໝາຍ",
    },
    value: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    date: null,
    modal: false,
  }),
  mounted() {
    this.date = this.value;
  },
  methods: {
    saveDate() {
      this.$refs.dialog.save(this.date);
      this.$emit('input', this.date)
    },
 },
};
</script>
<!-- <template>
  <v-menu v-model="menu" offset-y :close-on-content-click="false">
    <template #activator="{ on }">
      <v-icon color="primary" v-on="on">mdi-calendar</v-icon>
    </template>
    <v-date-picker v-model="picker" @click="menu = false" />
  </v-menu>
</template>
<script>
export default {
  name:"DataPicker",
  props: {
    value: {
      type: String,
      default: new Date().toISOString().substr(0, 10),
    },
  },
  data() {
    return {
      menu: false,
    };
  },
  computed: {
    picker: {
      get() {
        return this.value;
      },
      set(val) {
        this.menu = false;
        this.$emit("input", val);
      },
    },
  },
};
</script> -->