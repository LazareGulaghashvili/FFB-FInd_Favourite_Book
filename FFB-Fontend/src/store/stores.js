import { createStore } from "vuex"

export default createStore({
    state: {
        sessionChecked: false,
        sessionExists: false,
        list: [],
        listnamearr: []      
      },
      mutations: {
        setSessionChecked(state, value) {
          state.sessionChecked = value;
        },
        setSessionExists(state, value) {
          state.sessionExists = value;
        },
        SET_LIST(state, list) {
          state.list = list;
        },
        SET_LIST_NAMES(state, listnamearr) {
          state.listnamearr = listnamearr;
        }
      
      },
      actions: {
        fetchLists({ commit }) {
          return new Promise((resolve, reject) => {
            fetch('http://localhost:3000/lists', {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
            })
            .then(response => response.json())
            .then(data => {
              const list = JSON.parse(data.list);
              const listnamearr = JSON.parse(data.listnames);
              
              commit('SET_LIST', list);
              commit('SET_LIST_NAMES', listnamearr);
      
              resolve(); // Resolve the promise after data is fetched and committed
            })
            .catch(err => {
              console.error('Server can not reach your lists ', err);
               reject(err); // Reject the promise if an error occurs
            });
          });
        },
        // chek if sign in
        async checkSession({ commit }) {
          try {
            const response = await fetch('http://localhost:3000/check', {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              }
            });
    
            const data = await response.json();
            commit('setSessionExists', data.idexistance);
            commit('setSessionChecked', true);
          } catch (error) {
            console.error('Error checking session:', error);
          }
        }
      },
      getters: {
        isSessionChecked(state) {
          return state.sessionChecked;
        },
        doesSessionExist(state) {
          return state.sessionExists;
        }
      } 
})