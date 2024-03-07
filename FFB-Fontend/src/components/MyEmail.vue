<template>
    <div class="emailbox  " >
            <fa v-if="profilePicture === null"  class="emailicon"  icon="user" /> 
            <img v-if="profilePicture !== null" :src="profilePicture" alt="Profile picture" style="height: 70px; width: 70px; border-radius: 50%;" >
            <div class="emailabout">
                <div class="emailaddres">
                    <h3>{{ uname }}</h3>
                </div>
                <div class="booksnumber">
                    <a href="#">Read later: {{ numbers[0] }} </a>
                    <a href="#">Proccess of reading: {{ numbers[1] }} </a>
                    <a href="#">Already read: {{ numbers[2] }} </a>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            uname: '',
            profilePicture: null,
            numbers: []
        }
    },
    methods: {
        countlistItems() {
            fetch('http://localhost:3000/countitems', {
                method: 'POST',
                credentials: 'include',
                headers: {
          'Content-Type': 'application/json',
        }
            })
            .then(response => response.json())
            .then(data => {
                this.numbers = JSON.parse(data.Narray)
                console.log(this.numbers)
            })
            .catch(error => {
                console.error('There is error when counting list items', error)
            })
        }
    },
    mounted() {
        fetch('http://localhost:3000/getusername', {
            method: 'POST',
            credentials: 'include',
            headers: {
          'Content-Type': 'application/json',
        },
        })
        .then(response => response.json())
        .then(data => {
            this.countlistItems()
            this.uname = data.username
            this.profilePicture = data.image
            console.log(this.profilePicture)
        })
        .catch(error => {
            console.error('Error when return username', error);
        })
    }
    }
</script>

<style scoped>
    .emailbox {
        display: flex;
        flex-direction: row;
        padding: 20px 20px 20px 20px;
        align-items: center;
        width: 100%;
        justify-content: center;
    }
    .emailicon {
        color: #00068C;
        font-size: 70px;
    }
    .emailabout {
        width: 36%;
        height: 100%;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
    }
    .emailaddres {
        width: 100%;
        text-align: start;
    }
    .emailaddres h3 {
        color: #00068C;
        font-size: 30px;
        font-weight: 500;
        margin-left: 20px;
    }
    .booksnumber {
        width: 100%;
        display: flex;
        flex-direction: row;
        margin-top: 5px;
    }
    .booksnumber a {
        text-decoration: none;
        color: rgba(0, 48, 13, 0.84);
        font-size: 14px;
        font-weight: 500;
        margin-left: 20px;
    }
    @media screen and (max-width: 1500px) and (min-width: 1086px) {
        .emailabout {
            width: 50%;
        }
    }
    @media screen and (max-width: 1086px) {
        .emailabout {
            margin-top: 10px;
            width: 100%;
        }
        .emailaddres {
            display: flex;
            justify-content: center;
        }
        .booksnumber {
            justify-content: center;
        }
        .emailbox {
            flex-direction: column;
        }
    }
    @media screen and (max-width: 600px) and (min-width: 400px){

        h3 {
            font-size: 25px !important ;
        }
        a {
            font-size: 10px !important ;
        }

    }
    @media screen and (max-width: 400px) {
        .emailbox {
            padding: 0px 0px 0px 0px !important;
        }
        .emailabout {
            margin-left: 0px !important;
        }

        h3 {
            font-size: clamp(15px, 16px, 18px) !important ;
        }
        a {
            margin-left: 10px !important;
            font-size: 10px !important ;
        }
    }


</style>