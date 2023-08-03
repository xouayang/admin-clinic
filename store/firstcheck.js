export const state = () => ({
  dataStore: [],
  datas: [],
})
export const mutations = {
  getData(state, data) {
    state.dataStore = data
  },
  // getSingData(state, data) {
  //   state.datas = data
  // }
}

export const actions = {
  async postData({ commit }, form) {
    await this.$axios
      .post('http://localhost:7000/create-firstCheck', form)
      .then(() => {
        this.$toast.success('ບັນທືກຂໍ້ມູນສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'check',
        })
      })
      .catch(() => {
        this.$toast.error('ບັນທືກບໍ່ຂໍ້ມູນສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'close',
        })
      })
  },
  async getAll({ commit }) {
    await this.$axios
      .get(`http://localhost:7000/get-firstCheck`)
      .then((storeData) => {
        commit('getData', storeData.data)
      })
  },
  async updateData({ commit }, dataFirstcheck) {
    const data1 = dataFirstcheck.data
    const id = dataFirstcheck.id
    await this.$axios
      .put(`http://localhost:7000/update-firstCheck/${id}`, data1)
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
  async deleteData({ commit }, id) {
    await this.$axios
      .put(`http://localhost:7000/delete-firstCheck/${id}`)
      .then(() => {
        this.$toast.success('ລຶບຂໍ້ມູນສຳເລັດ', {
          duration: 3000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'check',
        })
      })
      .catch(() => {
        this.$toast.error('ລຶບບໍ່ຂໍ້ມູນສຳເລັດ?', {
          duration: 3000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'close',
        })
      })
  },
}
