<template>
  <div class="container-fluid header ">
    <img class="logo" src="../../public/images/logo.webp" alt="logo">
    <div class="nav">
      <router-link to="/"><button>Home</button></router-link>
      <router-link to="/"> <button @click="scropos" >About</button> </router-link>
      <router-link to="/Books"><button>Books</button></router-link>
      <router-link to="/MyBooks"> <button>My Books</button> </router-link>
      <router-link to="/Account"> <button>Account</button> </router-link>
      <router-link to="/Offers"> <button>Offers</button> </router-link>
      <fa icon="bars" class="baricon" @click="showbar" />
    </div>
  </div>
  <div class="colapse">
    <router-link to="/"><button>Home</button></router-link>
      <button @click="scropos" >About</button>
      <router-link to="/Books"><button>Books</button></router-link>
      <router-link to="/MyBooks"> <button>My Books</button> </router-link>
      <router-link to="/Account"> <button>Account</button> </router-link>
      <router-link to="/Offers"><button>Offers</button></router-link>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    showbar() {
      $(".colapse").slideToggle();
        },
    scropos() {
      setTimeout(() => {
        window.scrollTo(0, 700)
      }, 1000);
    }
        
  },
  mounted() {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  display: inline-flex;
height: 88px;
align-items: flex-start;
background: #FFF;
justify-content: space-between;
}
.logo {
  height: 100%;
}
@media screen and (min-width: 1093px) {
.header {
padding: 0px 125px 0px 112px;
}
.nav button {
  background-color: transparent;
  border: none;
  height: 100%;
  margin-left: 34px;
  color: #00300D;
font-family:inherit;
font-size: 20px;
font-weight: 500;
}
.nav .baricon {
  display: none;
}
}
@media screen and (max-width: 1092px) and (min-width: 701px) {
  .nav button {
    display: none;
  }
  .baricon {
    display: flex;
  font-size: 40px;
  color: #00068c;
  }
  .header {
padding: 0px 77px 0px 41px;
}
}
@media screen and (max-width: 700px) {
  .header {
padding: 0px 27px 0px 12px;
}
.nav button {
    display: none;
  }
  .baricon {
    display: flex;
  font-size: 40px;
  color: #00068c;
  }
}
.nav {
  display: flex;
height: 88px;
padding: 0px 5px 0px 39px;
justify-content: flex-end;
align-items: center;
}
.colapse {
  width: 100%;
  min-height: 10px;
  display: flex;
  flex-direction: column;
  padding: 10px 100px 10px 10px;
  display: none;
}
.colapse button {
  width: 100%;
  margin-bottom: 20px;
  text-align: start;
  background-color: transparent;
  border: none;
  height: 100%;
  margin-left: 34px;
  color: #00300D;
font-family:inherit;
font-size: 20px;
font-weight: 400;
}
</style>
