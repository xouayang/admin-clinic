export const state = () => ({})
export const mutations = {}

export const actions = {
  async signIn({ commit }, form) {
    await this.$axios
      .post('http://localhost:7000/signIn', form)
      .then((data) => {
        // console.log(data.data)
        const tokens = data.data.token
        const data1 = JSON.parse(Buffer.from(tokens.split('.')[1],'base64').toString())
        // console.log(data1)
        this.$cookies.set('name', data1.NAME)
        this.$cookies.set('token', data.data.token)
        this.$router.push('/')
        this.$toast.success('ເຂົ້າສູ່ລະບົບສຳເລັດ')
      })
  },
}
