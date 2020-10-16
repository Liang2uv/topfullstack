<template>
  <!-- 登录弹出框 -->
  <v-dialog :value="$store.state.loginVisible" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">请先登录</span>
      </v-card-title>
      <v-card-text>
        <v-form class="pa-4 white">
          <v-text-field
            label="用户名"
            v-model="loginModel.username"
          ></v-text-field>
          <v-text-field
            label="密码"
            type="password"
            v-model="loginModel.password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">
          关闭
        </v-btn>
        <v-btn color="blue darken-1" text @click="login"> 登录 </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginModel: {},
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', { data: this.loginModel })
        location.reload()
        this.close()
      } catch (err) {
        console.log(err)
      }
    },
    close() {
      this.$store.commit('SET_LOGINVISIBLE', false)
    }
  },
}
</script>
