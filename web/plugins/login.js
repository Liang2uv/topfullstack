import Login from '../components/Login/index'
import Vue from 'vue'
Vue.use(Login)

export default (context, inject) => {
  console.log('注入', Vue.prototype.$login)
  inject('login', Vue.prototype.$login)
}
