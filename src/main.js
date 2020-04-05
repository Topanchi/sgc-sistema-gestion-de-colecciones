import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret,faTrashAlt, faEdit, faCheck, faEye, faSignInAlt} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUserSecret,faTrashAlt,faEdit, faCheck, faEye, faSignInAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

var firebase = require("firebase/app");

require("firebase/auth");
//require("firebase/database");
require("firebase/firestore");
//require("firebase/messaging");
//require("firebase/functions");

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA3EsfRQD0F4pnbfoSfUMvNW2sDOoxoY_g",
    authDomain: "sgc-control-de-colecciones.firebaseapp.com",
    databaseURL: "https://sgc-control-de-colecciones.firebaseio.com",
    projectId: "sgc-control-de-colecciones",
    storageBucket: "sgc-control-de-colecciones.appspot.com",
    messagingSenderId: "817288793511",
    appId: "1:817288793511:web:ee1c94a6301e2811ee7a82",
    measurementId: "G-ZE5N95MP77"

};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore()
export default firebaseApp.firestore()

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged((user)=>{
  console.log(user);
  if(user){
    store.dispatch('detectarUsuario', {email:user.email, uid: user.uid})
  }else{
    store.dispatch('detectarUsuario', null)
  }

  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')

})
