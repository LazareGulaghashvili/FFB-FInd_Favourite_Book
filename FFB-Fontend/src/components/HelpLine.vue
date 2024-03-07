<template>
    <div class="container " >
        <div>
           <p class="desc" >{{ title }}</p>
        </div>
        <router-link :to='link' class="button" >
            <button>
            {{ button }}
        </button>
        </router-link>
        
    </div>
</template>

<script>
export default {
    data() {
        return {
            link: '',
        }
    },
    props: {
        title: {
           require: true
        },
        button: {
            require: false 
        },
    },
    mounted() {
        if (this.button === 'Sign up') {
            this.link = "/SignUp"
        } else {
            this.link = "/SignIn"
        }
    }
}
</script>

<style >
    .desc {
    color: rgba(0, 48, 13, 0.84);
font-family: serif;
font-size: 18px;
font-weight: 600;
line-height: 26px;
}
@media screen and (max-width: 575px) and (min-width: 320px){
    .desc {
        font-size: 14px !important ;
        line-height: 22px !important ;
    }
}
@media screen and (max-width: 320px) {
    .desc {
        font-size: 14px !important ;
        line-height: 22px !important ;
    }
}
</style>

<style scoped>
.container {
    display: grid;
}
.button, button {
    text-decoration: none;
    justify-self: center;
    display: flex;
width: 260px;
height: 49px;
padding: 0px 10px 0px 10px;
justify-content: center;
align-items: center;
flex-shrink: 0;
border-radius: 20px;
background: #00068C;
border: none;
color: #FFF;
text-align: center;
font-family: sans-serif;
font-size: 20px;
font-weight: 600;
letter-spacing: 2px;
}
@media screen and (min-width: 768px) {
  .container div {
    width: 586px;
  }
}
@media screen and (max-width: 768px) and (min-width: 575px) {
.container div {
  width: 450px;
}
}
@media screen and (max-width: 575px) and (min-width: 320px){
    .container div {
        max-width: 300px;
  min-width: 150px;
}
}
@media screen and (max-width: 320px) {
    .container div {
        max-width: 300px;
  min-width: 150px;
}

    button {
        width: 50%;
font-size: 17px;
letter-spacing: 1px;
font-weight: 500;
    }
}
</style>