<template>
  <div>
    <div class="d-flex justify-space-between align-center">
      <v-breadcrumbs :items="items">
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item :href="item.href" :disabled="item.disabled">
            <h2>{{ item.text.toUpperCase() }}</h2>
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </div>
    <div class="container d-flex">
      <v-col cols="12" md="3" sm="12">
        <v-card
          rounded="lg"
          style="cursor: pointer"
          class="pa-3"
          to="/reports/outcome"
        >
          <div class="d-flex justify-space-around align-center">
            <v-card-subtitle>ລາຍຮັບຂາຍຢາ</v-card-subtitle>
            <v-btn fab small color="success">
              <v-icon>mdi-currency-usd</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="3" sm="12">
        <v-card
          rounded="lg"
          style="cursor: pointer"
          class="pa-3"
          to="/reports/check"
        >
          <div class="d-flex justify-space-around align-center">
            <v-card-subtitle>ລາຍຮັບກວດພະຍາດ</v-card-subtitle>
            <v-btn fab small color="success">
              <v-icon>mdi-currency-usd</v-icon>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AllIncome',
  data() {
    return {
      items: [
        {
          text: 'ລາຍງານ',
          disabled: false,
          href: '/reports/reportTable',
        },
        {
          text: 'ລາຍງານລາຍຮັບ',
          disabled: false,
        },
      ],
    }
  },
  methods: {
  },
}
</script>
