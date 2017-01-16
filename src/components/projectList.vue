<template lang="html">
  <div class="">
    <table class="table">
      <thead>
        <tr>
          <th>Project Name</th>
          <th>Assigned To</th>
          <th>Priority</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in projects">
          <td><span :class="{'completed': item.completed}">{{item.name}}</span></td>
          <td><span :class="{'completed': item.completed}">{{item.assignedTo}}</span></td>
          <td><span :class="{'completed': item.completed}">{{item.priority}}</span></td>
          <td><complete-toggle :item="item" /></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import completeToggle from './completeToggle'

export default {
  name: 'projectList',
  components: {
    completeToggle
  },
  computed: mapState([
    'projects'
  ])
}
</script>

<style lang="css">
  .completed {
    text-decoration: line-through;
  }
</style>
