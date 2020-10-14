<template>
  <!-- 登录弹出框 -->
  <v-bottom-sheet v-model="visible" inset>
    <v-form class="pa-4 white" @submit.prevent="login">
      <v-text-field label="用户名" v-model="loginModel.username"></v-text-field>
      <v-text-field label="密码" type="password" v-model="loginModel.password"></v-text-field>
      <v-btn color="success" type="submit">登录</v-btn>
    </v-form>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      visible: false,
      loginModel: {},
    }
  },
  methods: {
    async login() {
      console.log(this.$axios)
      // try {
      //   await this.$auth.loginWith('local', { data: this.loginModel })
      //   this.visible = false
      // } catch (err) {
      //   console.log(err)
      // }
    }
  }
}
</script>
