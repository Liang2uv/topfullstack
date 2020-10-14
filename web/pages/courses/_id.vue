<template>
  <div class="pa-3">
    <h3>课程详情 - {{ course.name }}</h3>
    <template v-if="course.episodes.length > 0">
      <v-row>
        <v-col :md="8">
          <video :src="episode.file" controls width="100%"></video>
          <h3>{{ course.name }}</h3>
          <v-select
            v-model="currentIndex"
            :items="course.episodes.map((v, i) => ({ text: v.name, value: i }))"
          ></v-select>
        </v-col>
        <v-col :md="4">
          <comment-list type="Episode" :object="episode._id"/>
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <v-alert border="top" color="red lighten-2" dark class="mt-3">
        暂无课时
      </v-alert>
    </template>
  </div>
</template>

<script>
import LikeBtn from '../../components/LikeBtn'
import CommentList from '../../components/CommentList'
export default {
  async asyncData({ params, $axios }) {
    const { id } = params
    const course = await $axios.$get(`courses/${id}`, {
      params: {
        query: { populate: 'episodes' },
      },
    })
    return {
      course,
    }
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  computed: {
    episode() {
      return this.course.episodes[this.currentIndex] || {}
    },
  },
}
</script>

<style></style>
