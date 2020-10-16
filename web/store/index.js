export const state = () => ({
  loginVisible: false
})

export const mutations = {
  SET_LOGINVISIBLE(state, value) {
    state.loginVisible = value
  }
}