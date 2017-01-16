<template lang="html">
  <nav class="nav has-shadow" v-if="isLoggedIn()">
    <div class="nav-left">
      <router-link class="nav-item is-brand" to="/">
        Vue Project
      </router-link>
      <router-link class="nav-item is-tab" to="/dashboard">
        <i class="fa fa-dashboard"></i> Dashboard
      </router-link>
      <router-link class="nav-item is-tab" to="/projects">
        <i class="fa fa-list-alt"></i> Project List
      </router-link>
    </div>
    <div class="nav-right">
      <span class="nav-item">
        <a class="button" @click="logout()">Logout</a>
      </span>
    </div>
  </nav>
</template>

<script>
import auth from '../auth'
export default {
  name: 'navbar',
  methods: {
    logout () {
      auth.logout()
      this.$router.go('/login')
    },
    isLoggedIn () {
      return auth.checkAuth()
    }
  }
}
</script>

<style lang="css">

</style>
