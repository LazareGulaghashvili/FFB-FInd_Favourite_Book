import { createApp} from 'vue'
import App from './App.vue'
// font awesome 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)
// bootstrap
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import 'bootstrap-icons/font/bootstrap-icons.css'
// router
import router from './router'

// vuex store
import store from './store/stores'

// global variables
const app = createApp(App)

app
.component('fa', FontAwesomeIcon )
.use(router)


store.dispatch('checkSession').then(() => {
  if (store.state.sessionExists === true) {
    store.dispatch('fetchLists').then(() => {
      app.use(store).mount('#app');
    });
  } else {
    console.log('nono')
    app.use(store).mount('#app');
  }
});

