<template>
    <div v-if="this.$store.state.sessionExists" >
    <MyLists v-for="(item, index) in listnamearr" :key="index"  :title="item" :index="index" :listarr="list[index]" :icon="'trash'" :sort="'relevance'" @listname="newlists"/>
    <span class="add"  @click="toggleAddList" > <fa icon="add" /> </span>
    <div class="addlisr" v-if="show" >
      <h2 class="text-center" >Add new list</h2>
      <input type="text" placeholder="list name" v-model="newlistname">
      <button @click="addlist(); toggleAddList()" >create</button>
    </div>
    </div>
</template>

<script>
import MyLists from '../components/MyLists.vue';

export default {
  data() {
    return {
      show: false,
      newlistname: '',
      list: this.$store.state.list || [],
      uname: '',
      listnamearr: this.$store.state.listnamearr || []
    }
  },
  components: {
    MyLists,
  },
  methods: {
    newlists(value) {
      this.listnamearr = value
    },
    toggleAddList() {
      // Toggles the value of addlist when the span is clicked
      this.show = !this.show;
    },
    addlist() {
      if (this.newlistname !== '') {
        fetch('http://localhost:3000/addnewlist', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            listname: this.newlistname,
          })
        })
        .then(response => response.json())
        .then(data => {
          this.$store.commit('SET_LIST_NAMES', JSON.parse(data.newlistnames));
          this.listnamearr = JSON.parse(data.newlistnames)
        })
        .catch(err => {
          console.error('Your list could not created', err)
        })
      }
    },
    fetchlists() {
      fetch('http://localhost:3000/lists', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => {
        this.list = JSON.parse(data.list)
        this.listnamearr = JSON.parse(data.listnames)
      })
      .catch(err => {
        console.error('Server can not reach your lists ', err);
      })
    }
  },
  mounted() {
    if (!this.$store.state.sessionExists) {
      window.location.assign('/SignIn')
    } else {
      this.fetchlists();

    }
  },
}
</script>
<style>
  .addlisr {
    left: 40%;
    bottom: 50%;
    background-color: #fff;
    position: fixed;
    z-index: 99;
    padding: 30px 20px 30px 20px;
    border-radius: 20px;
  }
  .addlisr h2 {
    color: #00300D;
    font-family: inherit;
    font-size: 25px;
    font-weight: 500;
    margin-top: 5px;
  }
  .addlisr input {
    border: 1px solid #00068C;
    height: 35px;
    border-radius: 5px;
    outline: none;
    background: transparent;
  }
  .addlisr button {
    background-color: transparent;
    height: 35px;
    border-radius: 5px;
    border: 1px solid #00068C;
    margin-left: 10px;
    color: #00068C;
    font-weight: 600;
  }

</style>
<style scoped>
  .add {
    right: 56px;
    bottom: 44px;
    position: fixed;
    z-index: 99;
    background-color: #fff;
    border-radius: 50%;
    cursor: pointer;
    font-size: 30px;
    padding: 5px 15px 5px 15px;
    color: #00068C;
    box-shadow: 0px 5px 7px  rgb(193, 193, 193);
    animation: rotate;
    animation-duration: 2s;
  }
  @keyframes rotate {
    0% {rotate: 0deg;}
    100% {rotate: 720deg;}
  }  
</style>