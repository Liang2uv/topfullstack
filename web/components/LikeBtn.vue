<template>
  <v-btn text icon :color="status ? 'pink' : ''" @click="toggle">
    <v-icon>mdi mdi-heart</v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    object: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      status: false
    }
  },
  methods: {
    async getStatus() {
      const ret = await this.$axios.$get('actions/status', {
        params: {
          type: this.type,
          object: this.object,
          name: 'like'
        }
      })
      this.status = ret.status
    },
    async toggle() {
      const ret = await this.$axios.$post('actions/toggle', {
        type: this.type,
        object: this.object,
        name: 'like'
      })
      this.status = ret.status
    }
  },
  mounted() {
    this.$store.state.auth.loggedIn && this.getStatus()
  }
}
</script>

<style>

</style>