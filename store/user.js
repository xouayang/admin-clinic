export const state = () => ({
  number:10 ,
  suppliers:[],
  loading:false,
  datas:[],
  maleData:[],
  femaleData:[]
  
})
export const mutations = {
   changeNumber(state,data) {
       state.number = data
   },
   setUser(state,data) {
       state.suppliers = data
   },
   setLoading(state,data) {
       state.loading = data
   },
   setData(state,data) {
    state.datas = data
   },
   MaleDatas(state,data) {
    state.maleData = data
   },
   FeMaleDatas(state,data) {
    state.femaleData = data
   }

}

export const actions = {
 async showUser({commit}) {
     await  this.$axios.get('http://localhost:7000/get-suppliers').then(user => {
           commit("setUser", user.data)
       })
   },

 async singleData({commit},params) {
     await  this.$axios.get('http://localhost:7000/get-single', {params}).then(user => {
            commit("datas", user.data)
       })
   },
   async male({commit}) {
    await  this.$axios.get('http://localhost:7000/statff-male').then(data => {
           commit("MaleDatas", data.data)
      })
  },
  async female({commit}) {
    await  this.$axios.get('http://localhost:7000/statff-female').then(data => {
           commit("FeMaleDatas", data.data)
      })
  },

}