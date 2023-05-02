export const state = () => ({
  number:10 ,
  suppliers:[],
  loading:false,
  datas:[]
  
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
   }
}

export const actions = {
 async showUser({commit}) {
     await  this.$axios.get('http://localhost:7000/get-suppliers').then(user => {
           commit("setUser", user.data)
          //  console.log(user.data.rows)
       })
   },

 async singleData({commit},params) {
     await  this.$axios.get('http://localhost:7000/get-single', {params}).then(user => {
            commit("datas", user.data)
       })
   }
}