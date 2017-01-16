<template lang="html">
  <article class="message">
    <div class="message-header">
      <p>Project Status:</p>
    </div>
    <div class="message-body">
      <div class="control">
        <span class="tag is-info is-large">Number of projects: {{projectCount}}</span>
      </div>
      <div class="control">
        <span class="tag is-success is-large">Completed: {{completedProjects}}</span>
      </div>
    </div>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'projectStatus',
  computed: {
    ...mapGetters([
      'completedProjects',
      'projectCount'
    ])
  }
}
</script>

<style lang="css">
</style>
