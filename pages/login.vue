<template>
  <v-app class="background">
    <v-main class="d-flex justify-center align-center">
      <v-col cols="10" lg="4" md="6" sm="12" class="mx-auto">
        <v-card class="pa-4" elevation="5">
          <div class="d-flex justify-center align-center">
            <div>
              <v-img
                class="images mx-auto"
                :src="require(`../assets/logo.svg`)"
                alt="logo_clinic"
              />
            </div>
            <div class="ml-3" style="color: #9155fd">
              ຄີຣນິກ ດຣ ມົວວ່າງ ເຊຍປາວ
            </div>
          </div>
          <div class="d-flex justify-center">
            <v-card-title style="color: #9155fd"
              >ຍິນດີຕ້ອນຮັບເຂົ້າສູ່ລະບົບ !</v-card-title
            >
          </div>
          <!-- <v-form > -->
          <v-card-text>
            <v-text-field
              v-model="signInData.tel"
              :rules="rules"
              outlined
              dense
              append-icon="mdi-phone-outline"
              type="text"
              label="ເບີໂທລະສັບ"
              placeholder="02054116088"
              required
              color="#9155fd"
            />
            <v-text-field
              v-model="signInData.password"
              :rules="rules1"
              :type="hidePassword ? 'text' : 'password'"
              label="ລະຫັດຜ່ານ"
              outlined
              dense
              hide-details="auto"
              required
              color="#9155fd"
            >
              <template #append>
                <v-btn
                  icon
                  style="color: #9155fd"
                  @click="hidePassword = !hidePassword"
                >
                  <v-icon class="pb-2">{{
                    hidePassword ? 'mdi-eye' : 'mdi-eye-off'
                  }}</v-icon>
                </v-btn>
              </template>
            </v-text-field>
            <v-spacer></v-spacer>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn block type="submit" color="#9155fd" @click="onLogin">
              <span class="white--text px-8">ເຂົ້າສູ່ລະບົບ</span>
            </v-btn>
          </v-card-actions>
          <div class="d-flex justify-end">
            <div class="text">
              ບໍ່ມີບັນຊີ ?
              <v-btn text style="color: #9155fd; cursor: pointer" to="/signUp"
                >ລົງທະບຽນ</v-btn
              >
            </div>
          </div>
          <!-- </v-form> -->
        </v-card>
      </v-col>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: 'LoginPages',
  layout: 'blank',
  middleware: 'onlogin',
  //  middleware: 'auth',
  data() {
    return {
      hidePassword: false,
      signInData: {
        tel: '',
        password: '',
      },
      rules: [
        (value) => !!value || '*Required.',
        (value) => (value && value.length >= 11) || 'Min 11 characters',
      ],
      rules1: [
        (value) => !!value || '*Required.',
        (value) => (value && value.length >= 6) || 'Min 6 characters',
      ],
    }
  },
  methods: {
    onLogin() {
      this.$store.dispatch('login/signIn', { ...this.signInData })
    },
  },
}
</script>
<style  scoped>
* {
  font-family: 'Noto Sans Lao';
}
.text {
  font-size: 16px;
}
.pointer {
  cursor: pointer;
  color: #9155fd;
}
.images {
  width: 60px;
  height: 60px;
}
</style>>
  
</style>