<template>
  <div class="pa-3">
    <h3>热门课程</h3>
    <v-row>
      <v-col md="3" v-for="c in courses" :key="c._id">
        <v-card max-width="344">
          <v-img
            :src="c.cover"
            contain
          ></v-img>

          <v-card-title> {{ c.name }} </v-card-title>

          <v-card-subtitle> {{ c.createdAt }} </v-card-subtitle>

          <v-card-actions>
            <like-btn type="Course" :object="c._id"></like-btn>
            <v-btn color="orange lighten-2" text :to="`/courses/${c._id}`"> 点击查看 </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LikeBtn from '../../components/LikeBtn'
export default {
  async asyncData({ $axios }) {
    const data = await $axios.$get('courses')
    return {
      courses: data.data
    }
  }
}
</script>

<style></style>
