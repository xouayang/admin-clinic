export const state = () => ({
   dataStaff : []
    
  })
  export const mutations = {
     getStaff(state,data) {
         state.dataStaff = data
     }
  }
  
  export const actions = {
   async staffInfo({commit}) {
       await  this.$axios.get('http://localhost:7000/get-staff').then(statffData => {
              commit("getStaff", statffData.data)
              console.log(statffData.data)
         })
     }
  }