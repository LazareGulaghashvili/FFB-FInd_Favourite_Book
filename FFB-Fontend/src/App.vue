<template>
    <MyHeader/>
  <router-view/>
</template>

<script>
import MyHeader from './components/MyHeader.vue'
// import { getCurrentInstance } from 'vue';


export default {
  name: 'App',
  components: {
    MyHeader
  },
  mounted() {
    console.log(this.$store.state)
      },
      // setup() {
      //   const { appContext } = getCurrentInstance();
      //           setTimeout(() => {
      //     console.log( appContext.config.globalProperties.$sessionex.value)
      //   }, 2000);

      //   fetch('http://localhost:3000/check', {
      //   method: 'POST',
      //   credentials: 'include',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   }
      // })
      //   .then(response => response.json())
      //   .then(data => {
      //     appContext.config.globalProperties.$sessionex.value = data.idexistance;
      //     console.log( appContext.config.globalProperties.$sessionex)
      //   })
      //   .catch(error => {
      //     console.error('Error submitting form:', error);
      //   })
      // }
}
</script>

<style>
#app {
  background: #F4F6F8;
  
} 
</style>
