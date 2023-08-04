export const state = () => ({
  setDataResult: [],
  dataId: '',
  historyDataId :'',
  dataHistory: [],
  idData: [],
  resultData:[],
  history:[],
  history1:[]
})

export const mutations = {
  setResult(state, data) {
    state.setDataResult = data
  },
  getDataId(state, data) {
    state.dataId = data
  },
  getHistoryDataId(state, data) {
    state.historyDataId = data
  },
  setHistory(state, data) {
    state.dataHistory = data
  },
  setId(state, data) {
    state.idData = data
  },
  setDataDetails(state,data) {
    state.resultData = data
  },
  setHistory1(state,data) {
    state.history = data
  },
  setHistory2(state,data) {
    state.history1 = data
  },
  

}

export const actions = {
  async createResult({ commit }, data) {
    const token = this.$cookies.get('token')
    try {
      await this.$axios
        .post('http://localhost:7000/create-result', data, {
          headers: {
            Authorization: `CLINIC ${token}`,
          },
        })
        .then((res) => {
          this.$toast.success('ປ້ອນຜົນກວດສຳເລັດ', {
            duration: 3000,
            position: 'top-right',
            iconPack: 'mdi',
            icon: 'check',
          })
        })
        .catch(() => {
          this.$toast.error('ປ້ອນຜົນກວດບໍ່ສຳເລັດ', {
            duration: 3000,
            position: 'top-right',
            iconPack: 'mdi',
            icon: 'close',
          })
        })
    } catch (error) {
      console.log(error)
    }
  },
  async getAll({ commit }) {
    try {
      await this.$axios.get('http://localhost:7000/only-bill').then((data) => {
        commit('setResult', data.data)
        console.log('resultData', data.data)
      })
    } catch (error) {
      console.log(error)
    }
  },
  async getHistory({ commit }) {
    try {
      await this.$axios
        .get('http://localhost:7000/history-result')
        .then((data) => {
          commit('setHistory', data.data)
          // console.log("resultData",data.data)
        })
    } catch (error) {
      console.log(error)
    }
  },
  async getHistory1({ commit }) {
    try {
      await this.$axios
        .get('http://localhost:7000/all-history-result')
        .then((data) => {
          commit('setHistory1', data.data)
          // console.log("resultData",data.data)
        })
    } catch (error) {
      console.log(error)
    }
  },
  async getHistory2({ commit }) {
    try {
      await this.$axios
        .get('http://localhost:7000/get-only-today')
        .then((data) => {
          commit('setHistory2', data.data)
          // console.log("resultData",data.data)
        })
    } catch (error) {
      console.log(error)
    }
  },
  async getId({ commit }, id) {
    try {
      // let billId =''
      await this.$axios
        .get(`http://localhost:7000/get-result/${id}`)
        .then((data) => {
          commit('setId', data.data)
        })
    } catch (error) {
      console.log(error)
    }
  },
}
