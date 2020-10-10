<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-container class="py-0 fill-height">
        <v-avatar
          class="mr-10"
          color="grey darken-1"
          size="32"
        ></v-avatar>

        <h2>全栈之巅视频网站</h2>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item
                  v-for="(n, i) in menus"
                  :key="i"
                  link
                  :to="n.link"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ n.text }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <!-- <v-divider class="my-2"></v-divider> -->

                <!-- <v-list-item
                  link
                  color="grey lighten-4"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      Refresh
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item> -->
              </v-list>
            </v-sheet>
          </v-col>

          <v-col>
            <nuxt-child />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data: () => ({
      menus: [
        {
          text: '首页',
          link: '/'
        },
        {
          text: '热门课程',
          link: '/courses'
        },
        {
          text: '热门评论',
          link: '/comments'
        }
      ]
    }),
  }
</script>