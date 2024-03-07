<template>
<div class="sign" v-if="!this.$store.state.sessionExists" >
    <img src="../../public/images/logo.webp" alt="LOGO">
    <h2>{{ sign }} to FFB</h2>
     <div class="signbox">
        <form action="http://localhost:3000/" method="POST" @submit.prevent="fetcherr()" >
            <div class="form-floating mb-3" v-if="$route.path === '/SignUp' && !entercode" >
  <input type="text" v-model="userinfo.username" class="form-control username" id="Username" placeholder="Password" required>
  <label for="Username">Username</label>
</div>
        <div class="form-floating mb-3" v-if="!entercode" >
  <input type="email" v-model="userinfo.email" class="form-control email" id="floatingInput" placeholder="name@example.com" required>
  <label for="floatingInput">Email address</label>
</div>
<div class="form-floating mb-3" v-if="!entercode" >
  <input type="password" v-model="userinfo.password" class="form-control pas" id="floatingPassword" placeholder="Password" required>
  <fa :icon="icon" class="eyeicon" @click="passhow()" />
  <label for="floatingPassword">Password  </label>
</div>
<!-- code -->
<div class="form-floating mb-3" v-if="entercode" >
  <input type="text" v-model="userinfo.code" class="form-control email" id="floatingInput" placeholder="code" required>
  <label for="floatingInput">Verification code</label>
</div>
<p v-if="error !== '' && error !== 'Welcome'" class="text-center"> {{ error }} </p>
<p class="text-center" >{{ text }} <router-link :to="link">{{ signop }}</router-link></p>
<button class="google" @click="continuegoogle()" type="button" > <fa icon="table"/>  Continue with google</button>
<button class="submit" v-if="rote === '/SignUp'" type="submit" >{{ sign }}</button>
<button class="submit" @click="pasval(); emailval(); " v-if="rote === '/SignIn'" type="submit">{{ sign }}</button>
        </form>
     </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            entercode: false,
            sign: '',
            text: '',
            link: '',
            signop: '',
            rote: this.$route.path,
            icon: 'eye-slash',
            error: '',
            userinfo: {
                username: '',
                email: '',
                password: '',
                code: ''
            }
        }
    },
    watch: {
        error: {
            handler: function () {
                if(this.error === 'Welcome') {
                    window.location.assign(this.link)
                } 
            }
        },
        getrote: {
            handler: function() {
                if (this.$route.path === '/SignUp') {
            this.sign = 'Sign up'
            this.signop = 'Sign in'
            this.text = 'If you already have account, plaese go to'
            this.link = '/SignIn'
        } else {
            this.sign = 'Sign in'
            this.signop = 'Sign up'
            this.text = "If you don't have account yet plaese go to"
            this.link = '/SignUp'
        }
            }
        }
    },
    computed: {
        getrote() {
            return this.$route.path
        }
    },
    mounted() {
        if (this.$store.state.sessionExists) {
            window.location.assign('/Account')
        }
        if (this.$route.path === '/SignUp') {
            this.sign = 'Sign up'
            this.signop = 'Sign in'
            this.text = 'If you already have account, plaese go to'
            this.link = '/SignIn'
        } else {
            this.sign = 'Sign in'
            this.signop = 'Sign up'
            this.text = "If you don't have account yet plaese go to"
            this.link = '/SignUp'
        }
    },
    methods: {
        continuegoogle() {
            window.location.assign('http://localhost:3000/oauth/google')
        },
        getusername() {
                if (this.error !== "Your password or email is incorrect! Please try agein"  && this.$route.path === '/SignIn') {
                    window.location.assign('/Account')
                }
        },
        fetcherr() {
            if (!this.entercode && this.$route.path === '/SignUp' ) {
                fetch('http://localhost:3000/sendcode', {
                  method: 'POST',
                  credentials: 'include',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({email: this.userinfo.email}),
                })
                  .then(response => response.json())
                  .then(data => {
                    this.entercode = data.sendcode
                })
                  .catch(error => {
                    console.error('Error submitting code:', error);
                  });
            } else {
                fetch('http://localhost:3000/sign', {
                  method: 'POST',
                  credentials: 'include',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(this.userinfo),
                })
                  .then(response => response.json())
                  .then(data => {
                    this.error = data.err;
                    if (this.userinfo.username === '') {
                      this.getusername()
                    }
                  })
                  .catch(error => {
                    console.error('Error submitting form:', error);
                  });
            }
    },
        pasval() {
            var alphanumericlet = /^[a-zA-Z0-9]+$/;
            if (document.querySelector('.pas').value.length > 8 && alphanumericlet.test(document.querySelector('.pas').value)) {
                document.querySelector('.pas').style.borderColor = '#00300D'
            } else {
                document.querySelector('.pas').style.borderColor = 'red'
            }
        },   
        usernameval() {
            var alphanumericlet = /^[a-zA-Z]+$/;
            if (document.querySelector('.username').value.length > 0 && alphanumericlet.test(document.querySelector('.username').value)) {
                document.querySelector('.username').style.borderColor = '#00300D'
            } else {
                document.querySelector('.username').style.borderColor = 'red'
            }
        },
        emailval() {
            if (document.querySelector('.email').value.length > 0) {
                document.querySelector('.email').style.borderColor = '#00300D'
            } else {
                document.querySelector('.email').style.borderColor = 'red'

            }
        },
        passhow() {
    var passwordInput = document.querySelector('.pas');
    var currentType = passwordInput.type;


    if (currentType === 'password') {
        passwordInput.type = 'text';
        this.icon='eye'
    } else {
        passwordInput.type = 'password';
        this.icon='eye-slash'
    }
}
    },
}
</script>

<style scoped>
.eyeicon {
    position: absolute;
    z-index: 99;
    bottom: 35%;
    left: 89%;
    cursor: pointer;
}
a{
    color: #00300D;
}
h2 {
    color: #00300D;
    font-family: inherit;
    font-size: 25px;
    font-weight: 500;
    margin-top: 5px;
}

/* Style the submit button if needed */
.sign {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 80vh;
    background-color: #fff;
}
img {
    width: 200px;
}
.signbox {
    width: 500px;
    border-radius: 20px;
    padding: 10px 50px 50px 50px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
}
.form-floating, input, label {
    color: #00300D;
    width: 100%
}
input {
    border: 1px solid #00300D;
} 
form {
    display: grid !important;
}
.google {
    border: 1px solid #00068C;
    border-radius: 20px;
    height: 49px;
    color: #00068C;
    background-color: transparent;
    margin-bottom: 15px;
}
.submit {
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
@media screen and (max-width: 470px) and (min-width: 340px){
    .signbox {
        width: 400px;
    }
}
@media screen and (max-width: 340px) {
    .signbox {
        width: 350px;
    }
}
</style>