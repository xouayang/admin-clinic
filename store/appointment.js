export const state = () => ({
  // dataDisase: [],
  appointmentData: [],
})
export const mutations = {
  // getDiseas(state, data) {
  //   state.dataDisase = data
  // },
  setAppoint(state, data) {
    state.appointmentData = data
  },
}

export const actions = {
  async postAppointment({ commit }, form) {
    console.log(form)
    await this.$axios
      .post('http://localhost:7000/create-appointment', form)
      .then(() => {
        this.$toast.success('ບັນທືກຂໍ້ມູນສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'check',
        })
      })
      .catch(() => {
        this.$toast.error('ບັນທືກຂໍ້ມູນບໍ່ສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'close',
        })
      })
  },
  async getAll({ commit }) {
    await this.$axios
      .get(`http://localhost:7000/get-appointment`)
      .then((res) => {
        commit('setAppoint', res.data)
        console.log(res.data)
      })
  },
  async deleteData({ commit }, id) {
    await this.$axios
      .delete(`http://localhost:7000/delete-appointment/${id}`)
      .then(() => {
        this.$toast.success('ລືບຂໍ້ມູນສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'check',
        })
      })
      .catch(() => {
        this.$toast.error('ລືບບໍ່ຂໍ້ມູນສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'close',
        })
      })
  },
  async updateData({ commit }, appointment) {
    const data1 = appointment.data
    const id = appointment.id
    await this.$axios
      .put(`http://localhost:7000/update-appointment/${id}`, data1)
      .then(() => {
        this.$toast.success('ເເກ້ໄຂຂໍ້ມູນສຳເລັດ', {
          duration: 3000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'check',
        })
      })
      .catch(() => {
        this.$toast.error('ບໍ່ສາມາດເເກ້ໄຂຂໍ້ມູນ?', {
          duration: 3000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'close',
        })
      })
  },
}
