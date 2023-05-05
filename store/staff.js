export const state = () => ({
  dataStaff: [],
})
export const mutations = {
  getStaff(state, data) {
    state.dataStaff = data
  },
}

export const actions = {
  async staffInfo({ commit }) {
    await this.$axios
      .get('http://localhost:7000/get-staff')
      .then((statffData) => {
        commit('getStaff', statffData.data)
        console.log(statffData.data)
      })
  },
  async deleteData({ commit }, id) {
    await this.$axios
      .delete(`http://localhost:7000/delete-staff/${id}`)
      .then(() => {
        this.$toast.success('ລືບຂໍ້ມູນສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'check',
        })
      })
      .catch(() => {
        this.$toast.error('ລືບບໍ່ສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'close',
        })
      })
  },
  async postData({ commit }, form) {
    await this.$axios
      .post('http://localhost:7000/create-staff', form)
      .then((data) => {
        this.$toast.success('ບັນທືກຂໍ້ມູນສຳເລັດ', {
          duration: 3000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'check',
        })
      })
      .catch(() => {
        this.$toast.error('ກະລຸນາປ້ອນຂໍ້ມູນ?', {
          duration: 3000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'close',
        })
      })
  },
  async updateData({commit},info) {
    const data = info.ddd
    const id = info.id
    console.log(">>>>>>>>>>>>>",data)
    console.log(id)
    await this.$axios
      .put(`http://localhost:7000/update-staff/${id}`, data)
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
  }
}
