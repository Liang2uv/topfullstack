import LoginComponent from './Login.vue'

const Login = {}

Login.install = function(Vue) {
  console.log('安装了')
  // 生成vue的子类，该子类是一个构造器
  const LoginConstructor = Vue.extend(LoginComponent)
  // 生成实例
  const instance = new LoginConstructor()
  // 将实例挂载到页面上
  instance.$mount()
  if (process.client) {
    console.log('插入了')
    document.body.appendChild(instance.$el)
  }

  // 将调用方法注入到Vue原型上
  Vue.prototype.$login = () => {
    instance.visible = true
  }
}

export default Login
