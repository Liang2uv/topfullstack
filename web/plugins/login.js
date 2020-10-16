export default (context, inject) => {
  const login = () => context.store.commit('SET_LOGINVISIBLE', true)
  inject('login', login)
}