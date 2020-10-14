<template>
  <v-card tile class="pa-3">
    <v-form @submit.prevent="send">
      <v-text-field
        label="说点啥吧..."
        required
        append-icon="mdi-send"
        v-model="content"
        @click:append="send"
      ></v-text-field>
    </v-form>
    <v-list two-line>
      <v-list-item :key="item._id" v-for="item in comments">
        <v-list-item-avatar color="blue">
          <span class="white--text">{{ item.user.username[0].toUpperCase() }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.content }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.user.username }}<span>{{ item.createdAt }}</span></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    object: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      content: null,
      comments: [],
    }
  },
  watch: {
    object: {
      handler: 'fetch',
      immediate: true
    }
  },
  methods: {
    async send() {
      await this.$axios.$post('comments', {
        type: this.type,
        object: this.object,
        content: this.content,
      })
      this.content = null
      await this.fetch()
    },
    async fetch() {
      this.comments = await this.$axios.$get('comments', {
        params: {
          object: this.object,
        },
      })
    },
  }
}
</script>

<style></style>
