<template lang="html">
  <button type="button" class="button"  @click="toggle(item)">
    <i class="fa fa-undo" v-if="item.completed"></i>
    <i class="fa fa-check-circle" v-else></i>
  </button>
</template>

<script>
export default {
  name: 'completeToggle',
  props: ['item'],
  methods: {
    toggle (item) {
      this.$store.dispatch('TOGGLE_COMPLETED', { item: item })
    }
  }
}
</script>

<style lang="css">
</style>
