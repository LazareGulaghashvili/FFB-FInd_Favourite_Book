import { createWebHistory, createRouter } from "vue-router";
import Home from "./pages/First.vue";
import Books from "./pages/Books.vue"
import MyBooks from "./pages/MyBooks.vue"
import Account from "./pages/Account.vue"
import Offers from "./pages/Offers.vue"
import Inner from "./pages/Inner.vue"
import Sign from './pages/Sign.vue'

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  }, 
  {
    path: "/Books",
    name: "Books",
    component: Books,
  },
  {
    path: "/SignUp",
    name: "Up",
    component: Sign,
  },   
  {
    path: "/SignIn",
    name: "In",
    component: Sign,
  }, 
  {
    path: "/Filter",
    name: "Filter",
    component: Books,
  }, 
  {
    path: "/MyBooks",
    name: "MyBooks",
    component: MyBooks,
  },  
  {
    path: "/Account",
    name: "Account",
    component: Account,
  },
  {
    path: "/Offers",
    name: "Offers",
    component: Offers,
  },
  {
    path: "/Inner",
    name: 'Inner',
    component: Inner,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;