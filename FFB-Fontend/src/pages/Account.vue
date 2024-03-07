<template>
    <div v-if="this.$store.state.sessionExists">
        <div class="buttonss" style="position: absolute; display: flex; justify-content: space-between; width: 100%; background: transparent; " >
            <button class="out but " @click="signout('/')" >Sign out</button>
            <button class="delete but" @click="deleteacc()">Delete account</button>
        </div>
        <MyEmail/>
        <h2 class="text-center" >Your Favourite</h2>
        <FavouriteBox/>
        <MyFooter/>
    </div>
</template>

<script>
import MyEmail from '../components/MyEmail.vue'
import FavouriteBox from '../components/FavouriteBox.vue'
import MyFooter from '../components/MyFooter.vue';

export default {
    data() {
        return {
            result: '',
            info: {
                name: localStorage.getItem('user-name')
            }
        }
    },
    components: {
        MyEmail,
        FavouriteBox,
        MyFooter,
    },
    methods: {
        deleteacc() {
            fetch('http://localhost:3000/delete', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.info)
            })
            .then(response => response.json)
            .then(data => {
                this.result = data.result
            })
            .catch(error => {
          console.error('Account have not delated', error);
        });
            this.signout('/SignUp')
        },
        signout(link) {
            fetch('http://localhost:3000/signout', {
                method: 'POST', 
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .catch(err => {
                console.error('There is error when sign out', err)
            })
            window.location.assign(link)
        }
    },
    mounted() {
            if (!this.$store.state.sessionExists) {
      window.location.assign('/SignIn')
    } 
    },
}
</script>

<style scoped>
.but {
    position: relative;
    border-radius: 10px;
    border: 1px solid #00068C;
    background: rgba(0, 123, 33, 0.179);
    background-color: transparent;
    display: flex;
    width: auto;
    height: 44px;
    padding: 8px 10px 7px 10px;
    justify-content: center;
    align-items: center;
    color: #00068C;
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 26px;
    margin-top: 25px;
    transition: 0.5s;
}
.but:hover {
    background-color: #00078c29;
}
.out {
    margin-left: 30px;
}
.delete {
    margin-right: 30px;
}
h2 {
    color: rgba(0, 48, 13, 0.942);
    margin-bottom: 20px;
}
@media screen and (max-width: 480px) {
    .buttonss {
        position: relative !important ;
        margin-bottom: 20px;
        justify-content: space-evenly !important ;
    }
    .but {
        /* margin-left: 20px; */
        font-size: 14px;
    }
    .out{
        margin-left: 0px;
    }
    .delete{
        margin-right: 0px;
    }
}
</style>