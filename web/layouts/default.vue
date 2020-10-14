<template>
  <v-app id="inspire">
    <v-app-bar app flat>
      <v-container class="py-0 fill-height" fluid>
        <v-icon class="mx-4 blue--text">mdi mdi-image-filter-hdr</v-icon>

        <span class="subtitle-1 font-weight">全栈之巅视频网站</span>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            placeholder="搜索..."
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
        <v-spacer></v-spacer>
        <template v-if="!$store.state.auth.user">
          <v-btn small color="success" @click.prevent="isShowLoginForm=true">登录</v-btn>
        </template>
        <template v-else>
          <span class="mr-3">{{ $store.state.auth.user.username }}</span>
          <v-btn small color="warning" @click.prevent="loginOut">登出</v-btn>
        </template>
        <v-divider inset vertical class="mx-4"></v-divider>
        <v-switch v-model="$vuetify.theme.dark" hide-details/>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg" outlined>
              <v-list color="transparent">
                <v-list-item v-for="(n, i) in menus" :key="i" link :to="n.link" color="blue">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ n.text }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <nuxt-child />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <!-- 登录弹出框 -->
    <v-bottom-sheet v-model="isShowLoginForm" inset>
      <v-form class="pa-4 white" @submit.prevent="login">
        <v-text-field label="用户名" v-model="loginModel.username"></v-text-field>
        <v-text-field label="密码" type="password" v-model="loginModel.password"></v-text-field>
        <v-btn color="success" type="submit">登录</v-btn>
      </v-form>
    </v-bottom-sheet>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    isShowLoginForm: false,
    loginModel: {},
    menus: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '热门课程',
        link: '/courses',
      },
      {
        text: '热门评论',
        link: '/comments',
      },
    ],
  }),
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', { data: this.loginModel })
        this.isShowLoginForm = false
      } catch (err) {
      }
    },
    async loginOut() {
      await this.$auth.logout()
    }
  }
}
</script>
