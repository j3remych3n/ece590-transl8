// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
// import './main.styl'

Vue.use(Vuetify, {
  theme: {
    blurple: {
      base: '#4F4FE9',
      darken1: '#3838BD',
      lighten1: '#6D6DFB'
    },
    hwhite: {
      base: '#FFFFFF',
      darken1: '#EBEBEB'
    }
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
