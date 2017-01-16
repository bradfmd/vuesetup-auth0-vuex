<template lang="html">
  <div id="home">
    Home content will go here
    <div class="control">
      <button type="button" class="button" v-on:click="test()">Test API</button>
      <button type="button" class="button" v-on:click="testSecured()">Test API - Secured</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'home',
  methods: {
    test: function () {
      console.log('sending un-secured test call to api ...')
      axios.get('/ping').then((response) => {
        console.log(response)
      }, (response) => {
        console.log(response)
      })
    },
    testSecured: function () {
      console.log('sending secured test call to api ...')
      axios.get('/secured/ping').then((response) => {
        console.log(response)
      }, (response) => {
        console.log(response)
      })
    }
  }
}
</script>

<style lang="css">
</style>
