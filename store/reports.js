export const state = () => ({
    // dataDisase: [],
    Data:[]
  })
  export const mutations = {
    setReports(state, data) {
      state.Data = data
    }
  }
  
  export const actions = {
    async getAll({ commit }) {
      await this.$axios.get(`http://localhost:7000/report-medicines`).then((res) => {
        commit('setReports', res.data)
        console.log(res.data)
      })
    },
  }
  