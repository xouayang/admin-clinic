export const state = () => ({  
   })
   export const mutations = {
   }
   
   export const actions = {
      async deleteData({commit}, id) {
        await this.$axios.delete(`http://localhost:7000/delete-suppliers/${id}`).then(() => {
           console.log("Success") 
        })
      }
   }