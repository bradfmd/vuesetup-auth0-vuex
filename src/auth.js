import axios from 'axios'

/* eslint no-undef: "off" */
const auth0 = new Auth0({
  domain: 'YOUR_DOMAIN',
  clientID: 'YOUR_CLIENT_ID',
  responseType: 'token',
  callbackURL: window.location.origin + '/'
})

let checkAuth = () => {
  if (localStorage.getItem('id_token')) {
    return true
  } else {
    return false
  }
}

let login = (username, password) => {
  auth0.login({
    connection: 'Username-Password-Authentication',
    responseType: 'token',
    email: username,
    password: password,
    scope: 'openid email user_metadata app_metadata'
  },
  function (err) {
    if (err) alert('something went wrong: ' + err.message)
  })
}

let logout = () => {
  localStorage.removeItem('id_token')
  localStorage.removeItem('profile')
}

// set auth header on start up if token is present
if (localStorage.getItem('id_token')) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')
}

// function to check for user authentication
let requireAuth = (to, from, next) => {
  if (!checkAuth()) {
    console.log('auth failed ...')
    let path = '/login'
    // auth0 uses a redirect back to the app after authentication is successful,
    // if the user is unauthorized and the url has a hash, we parse it looking for the token
    let result = auth0.parseHash(window.location.hash)
    if (result && result.idToken) {
      // set token in local storage
      localStorage.setItem('id_token', result.idToken)

      // redirect to home page
      path = '/'

      // set auth headers
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')

      // get user profile data
      auth0.getProfile(result.idToken, function (err, profile) {
        if (err) {
          // handle error
          alert(err)
        }
        let user = JSON.stringify(profile)
        localStorage.setItem('profile', user)
      })
    }
    next({
      path: path
    })
  } else {
    next()
  }
}

export default {
  checkAuth,
  login,
  logout,
  requireAuth
}
