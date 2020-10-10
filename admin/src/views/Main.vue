<template>
  <el-container>
    <el-aside width="200px">
      <el-menu style="height: 100vh" mode="vertical" :default-active="$route.path" router>
        <el-submenu
          v-for="(item, index) in menu.items"
          :index="`menu-item-${index}`"
          :key="`menu-item-${index}`"
        >
          <template slot="title">{{ item.title }}</template>
          <el-menu-item
            v-for="(subItem, subIndex) in item.items"
            :index="subItem.path"
            :key="`menu-item-${index}-${subIndex}`"
          >
            {{ subItem.title }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <h1>全栈之巅 - 后台管理界面</h1>
      </el-header>
      <el-main>
        <router-view :key="key"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({})
export default class Main extends Vue {
  menu = {
    items: [
      {
        title: "内容管理",
        items: [
          {
            title: "课程管理",
            path: "/courses/list",
          },
          {
            title: "课时管理",
            path: "/episodes/list",
          }
        ],
      },
      {
        title: "运营管理",
        items: [
          {
            title: "用户管理",
            path: "/users/list",
          },
        ],
      },
    ],
  };
  get key(): string {
    return this.$route.path
  }

}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
</style>
