export const state = () => ({
  medicinesData: [],
  singleData: [],
  dataId: '',
  status: [],
  Data: [],
  dataMedicinesStatus: [],
})
export const mutations = {
  getMedicinesData(state, data) {
    state.medicinesData = data
  },
  getStatus(state, data) {
    state.status = data
  },
  getsingleData(state, data) {
    state.singleData = data
  },
  getDataId(state, data) {
    state.dataId = data
  },
  getMAllData(state, data) {
    state.Data = data
  },
  getMedicinesStatus(state, data) {
    state.dataMedicinesStatus = data
  },
}

export const actions = {
  // post data
  async postData({ commit }, form) {
    await this.$axios
      .post('http://localhost:7000/medicins-type', form)
      .then(() => {
        this.$toast.success('ບັນທືກຂໍ້ມູນສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'check',
        })
      })
      .catch(() => {
        this.$toast.error('ບັນທືກບໍ່ຂໍ້ມູນສຳເລັດ?', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'close',
        })
      })
  },
  // get data
  async medicinesTypeData({ commit }) {
    await this.$axios.get('http://localhost:7000/count').then((data) => {
      commit('getMedicinesData', data.data)
    })
  },
  // // delete data
  async deleteData({ commit }, id) {
    await this.$axios
      .delete(`http://localhost:7000/delete-type/${id}`)
      .then(() => {
        this.$toast.success('ລືບຂໍ້ມູນສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'check',
        })
      })
      .catch(() => {
        this.$toast.error('ລືບຂໍ້ມູນບໍ່ສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'check',
        })
      })
  },
  // update data
  async updateData({ commit }, info) {
    const data1 = info.data
    const id = info.id
    await this.$axios
      .put(`http://localhost:7000/update-type/${id}`, data1)
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
  async postMedicines({ commit }, form) {
    await this.$axios
      .post('http://localhost:7000/medicins', form)
      .then(() => {
        this.$toast.success('ບັນທືກຂໍ້ມູນສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'check',
        })
      })
      .catch(() => {
        this.$toast.error('ບັນທືກບໍ່ຂໍ້ມູນສຳເລັດ?', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'close',
        })
      })
  },
  //   http://localhost:7000/get-medicins
  async medicinesAllData({ commit }) {
    await this.$axios.get('http://localhost:7000/get-medicins').then((data) => {
      commit('getMAllData', data.data)
    })
  },
  async deletdMedicines({ commit }, data) {
    await this.$axios
      .delete(`http://localhost:7000/delete-medicines-data/${data}`)
      .then((data) => {
        this.$toast.success('ລືບຂໍ້ມູນສຳເລັດ', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'check',
        })
      })
      .catch(() => {
        this.$toast.error('ລືບບໍ່ຂໍ້ມູນສຳເລັດ?', {
          duration: 2000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'close',
        })
      })
  },
  async medicinesOfferStatus({ commit }) {
    await this.$axios
      .get('http://localhost:7000/get-offer-status1')
      .then((data) => {
        console.log(data.data)
        commit('getMedicinesStatus', data.data)
      })
  },
  async updateOfferStatus({ commit }, id) {
    await this.$axios
      .put(`http://localhost:7000/update-medicines-status/${id}`)
      .then((data) => {
        console.log(data)
        this.$toast.success('ສຳເລັດ', {
          duration: 3000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'check',
        })
      }).catch(() => {
        this.$toast.error('ບໍ່ສຳເລັດ', {
          duration: 3000,
          position: 'top-right',
          iconPack: 'mdi',
          icon: 'close',
        })
      })
  },
}
