import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    projects: []
  },
  actions: {
    LOAD_PROJECT_LIST: function ({ commit }) {
      axios.get('/secured/projects').then((response) => {
        commit('SET_PROJECT_LIST', { list: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    ADD_NEW_PROJECT: function ({ commit }) {
      axios.post('/secured/projects').then((response) => {
        commit('ADD_PROJECT', { project: response.data })
      }, (err) => {
        console.log(err)
      })
    },
    TOGGLE_COMPLETED: function ({ commit, state }, { item }) {
      axios.put('/secured/projects/' + item.id, item).then((response) => {
        commit('UPDATE_PROJECT', { item: response.data })
      }, (err) => {
        console.log(err)
      })
    }
  },
  mutations: {
    SET_PROJECT_LIST: (state, { list }) => {
      state.projects = list
    },
    ADD_PROJECT: (state, { project }) => {
      state.projects.push(project)
    },
    UPDATE_PROJECT: (state, { item }) => {
      let idx = state.projects.map(p => p.id).indexOf(item.id)
      state.projects.splice(idx, 1, item)
    }
  },
  getters: {
    completedProjects: state => {
      return state.projects.filter(project => project.completed).length
    },
    projectCount: state => {
      return state.projects.length
    }
  }
})

export default store
