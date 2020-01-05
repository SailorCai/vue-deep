<!--
 * @Author: SailorCai
 * @Date: 2019-09-15 12:24:14
 * @LastEditors  : SailorCai
 * @LastEditTime : 2020-01-05 10:26:04
 * @FilePath: /vue-deep/src/App.vue
 -->
<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import cPromise from './utils/moduleDemo';
import { mapState } from 'vuex';

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  computed: {
    ...mapState(['name']),
  }, 
  mounted() {
    console.log(this.name);
  },
  methods: {
    /* testPromise() {
      new Promise((resolve, reject) => {
        sss
        setTimeout(function() {
          resolve('yes');
          console.log('ddd');
        }, 2000);
      }).then(res => {
        console.log(res);
          return 'yes2';
      }).then(res => {
        console.log(res);
      }).catch(err => {
        console.error(err);
      });
    } */
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
