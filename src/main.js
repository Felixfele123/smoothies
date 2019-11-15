// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import firebase from 'firebase/app';
import 'firebase/firestore';

Vue.config.productionTip = false

firebase.initializeApp({

  apiKey: "AIzaSyDvGDBqXEKPRGlBcnBt9LI_WcBqlzjlkSg",
  authDomain: "smoothie-b21a3.firebaseapp.com",
  databaseURL: "https://smoothie-b21a3.firebaseio.com",
  projectId: "smoothie-b21a3",
  storageBucket: "smoothie-b21a3.appspot.com",
  messagingSenderId: "490142248799",
  appId: "1:490142248799:web:c41cfb079bc383588e50ea",
  measurementId: "G-SQN373L0Q2"
  

});

export const db = firebase.firestore();
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
