export const state = () =>({
    prescrition:{}
})

export const mutations = {
setPrescrition(state,data){
    state.prescrition = data
}
}

export const actions = {
    async getPrescrition({commit}, id){
        await this.$axios.get(`http://localhost:7000/get-offerrId/${id}`)
        .then((res)=>{
            console.log(res.data)
            commit('setPrescrition',res.data)
        })
    },
    async saveSale({commit}, data){
        const token = this.$cookies.get('token')
        console.log(token)
      try {
        await this.$axios.post('http://localhost:7000/create-saleDetails',
         data,
        {
            headers:{
            Authorization:`CLINIC ${token}`
         },
        })
        .then((res)=>{
            console.log(res.data)
            this.$toast.success("success")
        })
      } catch (error) {
        console.log(error)
      }
    }
}