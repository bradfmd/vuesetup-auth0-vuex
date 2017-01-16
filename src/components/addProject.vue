<template lang="html">
  <button type="button" class="button" @click="addProject()">Add New Project</button>
</template>

<script>
export default {
  name: 'addProject',
  methods: {
    addProject () {
      this.$store.dispatch('ADD_NEW_PROJECT')
    }
  }
}
</script>

<style lang="css">
</style>
