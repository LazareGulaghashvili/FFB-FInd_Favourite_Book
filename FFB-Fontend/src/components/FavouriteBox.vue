<template>
<div class="favouritesbox container-" >
    <div class="favbox" @click="togglegenresbox()" >
        <h3 class="text-center" >Genres</h3>
        <div class="favlist">
            <button v-for="(item, index) in favgenres" :key="index" >{{ item }} </button>
        </div>
    </div>
    <!-- make genres list -->
    <div class="genre-list" v-if="showgenre" >
        <fa icon="close" @click="togglegenresbox()" style="position: absolute; margin-left: 94%; color: #00068C; font-size: 25px; margin-top: 5px; cursor: pointer;" />
        <div class="all">
            <h2 class="text-center">All genres</h2>
            <div class="buttons">
                <button class="genrebut" v-for="(item, index) in genres" :key="index" @click="addfavgenre(item)"> {{ item }} </button>
            </div>
        </div>
        <div class="fav">
            <h2 class="text-center">Add favourite genres</h2>
            <div class="favbuttons">
                <button v-for="(item, index) in favgenres" :key="index" class="genrebut" >{{ item }}</button>
            </div>
            <button class="add" @click="addFavgenre(); togglegenresbox()"  >Save</button>
        </div>
    </div>
    <div class="favbox" @click="toggleAddList" >
        <h3 class="text-center" >Autors</h3>
        <div class="favlist">
            <div v-if="removed">
                <button type = "submit" v-for="(item, index) in Autors" :key="index" @click="removeAuthor(item)">{{ item }}</button>
            </div>
        </div>
    </div>
    <div class="addlisr" v-if="show" style="background: transparent; backdrop-filter: blur(10px); box-shadow: 0px 5px 7px rgb(193, 193, 193); border: 1px solid #00078c29; " >
      <h2 class="text-center" >Add author</h2>
      <input type="text" placeholder="Author name" v-model="author">
      <button @click="addauthor(); toggleAddList()">{{ value }}</button>
    </div>
</div>
</template>

<script>

export default {
    data() {
        return {
            removed: true,
            showgenre: false,
            show: false,
            author: '',
            value: 'Close',
            genres: [
                'Advanture',
                'Horror',
                'Comedy',
                'Family',
                'Relationships',
                'Sci-Fi',
                'Drama'
            ],
            favgenres: [],
            Autors: []
        }
    },
    props: {
        header: {
            require: true
        }, 
        arrname: {
            require: true
        }
    },
    watch: {
        author: {
            handler: function() {
                if (this.author === '') {
                    this.value = 'Close'
                } else {
                    this.value = 'Add'
                }
            }
        }
    },
    methods: {
        togglegenresbox() {
            this.showgenre = !this.showgenre
        },
        addfavgenre(genre) {
            var array = this.favgenres.filter((gen) => gen === genre)
            if (array.length === 0) {
                this.favgenres.push(genre)
            }
        },
        removefavgenre(genre) {
            this.favgenres = this.favgenres.filter((gen) => gen !== genre)
        },
        toggleAddList() {
      this.show = !this.show;
    },
    removeAuthor(author) {
        fetch('http://localhost:3000/removeAuthor', {
            method: 'POST',
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            authorName: author,
            array: this.Autors
          })
        })
        .then(response => response.json())
        .then(data => {
            this.removed = data.boolen
        })
        .catch(error => {
            console.error('There is error related to remove author from list', error)
        })
    },
    addFavgenre() {
        fetch('http://localhost:3000/addfavgenre', {
            method: 'POST',
        credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            favgenres: JSON.stringify(this.favgenres),
          })
        })
        .then(response => response.json())
        .then(data => {
            this.favgenres = JSON.parse(data.genarray)
        })
        .catch(err => {
          console.error('Your genre could not add', err)
        })
    },
    addauthor() {
        fetch('http://localhost:3000/addauthor', {
          method: 'POST',
        credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            author: this.author,
          })
        })
        .then(response => response.json())
        .then(data => {
            this.Autors = JSON.parse(data.authors)
        })
        .catch(err => {
          console.error('Your author could not add', err)
        })
    }
    
    },
    mounted() {
            this.addauthor();
            this.addFavgenre();
    }
    
}
</script>

<style scoped>
/* choose genres box */
.genre-list {
    display: flex;
    flex-direction: row;
    position: fixed;
    left: 35%;
    top: 15%;
    width: 500px;
    height: 300px;
    background-color: #FFF;
    border-radius: 20px;
    border: 1px solid rgb(0, 48, 13);
}
.all, .fav {
    display: flex;
    flex-direction: column;
    padding: 20px 20px 20px 20px;
    height: 100%;
    width: 50%;
}
.favbuttons {
    overflow-y: scroll;
    max-height: 60%;
}
.add {
    margin-top: 20px;
    text-decoration: none;
    justify-self: center;
    display: flex;
    padding: 0px 10px 0px 10px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 10px;
    height: 40px;
    background: #00068C;
    border: none;
    color: #FFF;
    text-align: center;
    font-family: sans-serif;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 2px;
}
.buttons {
    overflow-y: scroll;
    max-height: 80%;
}
.favbuttons::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.favbuttons {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.buttons::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.buttons {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
h3 {
    color: #00068C;
}

    .favouritesbox {
    display: flex;
    flex-direction: row;
    margin-bottom: 20px;
    justify-content: center;
}
.favbox {
    /* cursor: pointer; */
    margin-right: 40px;
    height: 348px;
    display: flex;
width: 295px;
padding: 12px 41px 26px 41px;
flex-direction: column;
align-items: center;
gap: 22px;
border-radius: 20px;
background: #FFF;
}
.favlist {
    width: 100%;
    display: grid;
    grid-template-columns: auto ;
    gap: 20px;
    overflow-y: scroll;
}
.genrebut {
    margin-top: 20px;
}
.favlist button, .all button, .genrebut {
    width: 100%;
    border-radius: 10px;
border: 1px solid rgba(0, 48, 13, 0.84);
background: rgba(0, 123, 33, 0.179);
    display: flex;
    height: 44px;
padding: 8px 24px 7px 25px;
justify-content: center;
align-items: center;
color: rgba(0, 48, 13, 0.84);

text-align: center;
font-size: 18px;
font-style: normal;
font-weight: 600;
line-height: 26px; /* 144.444% */
/* letter-spacing: 1.42px; */

}
/* Hide scrollbar for Chrome, Safari and Opera */
.favlist::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.favlist {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
@media screen and (max-width: 752px) {
    .favouritesbox {
        align-items: center;
        flex-direction: column;
    }
    .favbox {
        border-radius: 0px !important;
        margin-right: 0px;
        margin-top: 20px;
    }
}
</style>