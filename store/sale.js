export const state = () => ({
  prescrition: [],
  statusData: [],
})

export const mutations = {
  setPrescrition(state, data) {
    state.prescrition = data
  },
  setOrderStatus(state, data) {
    state.statusData = data
  },
}

export const actions = {
  async getPrescrition({ commit }, id) {
    await this.$axios
      .get(`http://localhost:7000/get-offerrId/${id}`)
      .then((res) => {
        commit('setPrescrition', res.data)
      })
  },
  async saveSale({ commit }, data) {
    const token = this.$cookies.get('token')
    console.log(token)
    try {
      await this.$axios
        .post('http://localhost:7000/create-saleDetails', data, {
          headers: {
            Authorization: `CLINIC ${token}`,
          },
        })
        .then(() => {
          this.$toast.success('ບັນທຶກສຳເລັດ', {
            duration: 3000,
            position: 'top-right',
            iconPack: 'mdi',
            icon: 'check',
          })
        })
    } catch (error) {
      this.$toast.error('ບັນທຶກບໍ່ສຳເລັດ', {
        duration: 3000,
        position: 'top-right',
        iconPack: 'mdi',
        icon: 'close',
      })
    }
  },
  async getDataStatus({ commit }) {
    await this.$axios
      .get(`http://localhost:7000/get-offer-status`)
      .then((res) => {
        commit('setOrderStatus', res.data)
        console.log('data ?????????', res.data)
      })
  },
}
