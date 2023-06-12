export const state = () => ({
    dataPatients : [],
    singleData: []
     
   })
   export const mutations = {
      getPatient(state,data) {
          state.dataPatients = data
      },
      getsingleData(state, data) {
        state.singleData = data
      }
   }
   
   export const actions = {
    async patientInfo({commit}) {
        await this.$axios.get('http://localhost:7000/get-patients').then(patients => {
               commit("getPatient", patients.data)
          })
      },
      async deleteData({commit}, id) {
        await this.$axios.delete(`http://localhost:7000/delete-patients/${id}`).then(() => {
          this.$toast.success('ລືບຂໍ້ມູນສຳເລັດ', {
            duration: 2000,
            position: 'top-right',
            iconPack: 'mdi',
            icon: 'check',
          })
        })
      },
      async updateData({commit},dataPatients) {
        const data1 = dataPatients.data
        const id = dataPatients.id
        await this.$axios
          .put(`http://localhost:7000/update-patients/${id}`, data1)
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
      }
   }