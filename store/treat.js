export const state = () => ({
    bill:{},
    billData:{}
})

export const mutations = {
    setBill(state, data){
        state.bill = data
    },
    setBillData(state, data){
        state.billData = data
    }
}

export const actions = {
  async createTreat({ commit }, data) {
    const res = {
      firstcheck_id: data.firstcheck_id,
      total_price: data.total_price,
    }
    //   await console.log(res)
    const billId = await this.$axios
      .post('http://localhost:7000/create-bill', { ...res })
      .then((res) => {
        return res.data.id
      })
      .catch((err) => {
        console.log(err)
      })

    if (billId) {
      const itemBillId = {
        bill_id: billId,
        item: data.item,
      }
      console.log('bill id', itemBillId)
      await this.$axios
        .post('http://localhost:7000/post-data', itemBillId)
        .then((res) => {
        //   console.log(res.data)
        })

      await this.$axios
        .get(`http://localhost:7000/bill-data/${billId}`)
        .then((res) => {
        //   console.log(res.data)
        commit('setBill',res.data)
        })
    }
  },
  async getMedicines({commit}, id){
    await this.$axios
        .get(`http://localhost:7000/bill-data/${id}`)
        .then((res) => {
          console.log(res.data)
        commit('setBillData',res.data)
        })
  }
}
