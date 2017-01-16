import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import login from './containers/Login'
import home from './containers/Home'
import dashboard from './containers/dashboard'
import projects from './containers/projects'
import auth from './auth'

// application routes
const routes = [
  { path: '/login', component: login },
  { path: '/', component: home, beforeEnter: auth.requireAuth },
  { path: '/dashboard', component: dashboard, beforeEnter: auth.requireAuth },
  { path: '/projects', component: projects, beforeEnter: auth.requireAuth }
]

// export router instance
export default new Router({
  mode: 'history',
  routes,
  linkActiveClass: 'is-active'
})
