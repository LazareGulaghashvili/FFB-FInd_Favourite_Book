<template>
    <div class="inner" v-if="Object.keys(onebook).length !== 0 " >
      <div class="aboutbook">
        <div style="display: flex; padding: 10px 10px 10px 10px !important; margin: 0px 0px 0px 0px  !important; justify-content: center; width: 26vw;  height: 100%; align-items: center;" class="imagediv container" >
          <img class="thumbnail" :src="onebook.volumeInfo.imageLinks.thumbnail + '&fife=w1200-h1400'" alt="BOOK">
        </div>
        <div class="about">
          <h2>{{ onebook.volumeInfo.title }}</h2>
          <p><b>Author(s):</b> <a v-for="(item, index) in onebook.volumeInfo.authors" :key="index">{{ item }}</a></p>
          <p><b>Year:</b> {{ onebook.volumeInfo.publishedDate }}</p>
          <p><b>Genre(s):</b> <a v-for="(item, index) in onebook.volumeInfo.categories" :key="index"> {{item}}/</a></p>
          <p><b>pages:</b> {{ onebook.volumeInfo.pageCount }}</p>
          <p  class="description" style="overflow-y: scroll; max-height: 400px; " ><b>review:</b> <a v-html='this.onebook.volumeInfo.description' ></a></p>
          <div class="groups">
            <div class="threebut" v-if="togglearray.length !== 0" >
              <button v-for="(book, index) in listtitles" :key="index" @click="buttonToggle(index)">{{ book }}
              <fa icon="circle-check" v-show="togglearray[index]"/> 
              </button>
            </div>
          </div>
        </div>
        <div class="similar big">
          <div class="header">
            <button @click="show = true" >Same author</button>
            <button @click="show= false">Similars</button>
          </div>
          <div class="list" v-if="show">
            <div class="card"  v-for="(book, index) in samebooks" :key="index" @click="changeid(book.id)" >
              <img :src="book.volumeInfo.imageLinks.thumbnail + '&fife=w800-h1000'" alt="">
              <div class="title">
                <h2 class="text-center" >{{ book.volumeInfo.title }}</h2>
                <p class="tex-center" v-for="(item, index) in book.volumeInfo.authors" :key="index" >{{ item }}</p>
              </div>
            </div>
          </div>
          <div class="list" v-if="!show">
            <div class="card"  v-for="(book, index) in similars" :key="index" @click="changeid(book.id)" >
              <img :src="book.volumeInfo.imageLinks.thumbnail + '&fife=w800-h1000'" alt="">
              <div class="title">
                <h2 class="text-center" >{{ book.volumeInfo.title }}</h2>
                <p class="tex-center" v-for="(item, index) in book.volumeInfo.authors" :key="index" >{{ item }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section small">
        <div class="header">
            <button @click="show = true" >Same author</button>
            <button @click="show= false">Similars</button>        
        </div>
        <div class="Books">
            <swiper class="container" v-if="show"
    :slides-per-view="findnumber"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide class="bookbox" v-for="(book, index) in samebooks" :key="index" @click="BookData = book" >
      <img :src="book.volumeInfo.imageLinks.thumbnail + '&fife=w800-h1000'" alt="">
    </swiper-slide>
    </swiper>
    <swiper class="container" v-if="!show"
    :slides-per-view="findnumber"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide class="bookbox" v-for="(book, index) in similars" :key="index" @click="BookData = book" >
      <img :src="book.volumeInfo.imageLinks.thumbnail + '&fife=w800-h1000'" alt="">
    </swiper-slide>
    </swiper>
        </div>
    </div>
      <div class="sameauthor"></div>
    </div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';
  import {fetchBook} from '../index'

export default {
    data() {
        return {
          scrwidth: screen.width,
            apiKey: process.env.VUE_APP_API_KEY,
            onebook: {},
            errorMessage: '',
            id:  this.$route.query.id,
            samebooks: [],
            APIURL:'',
            similars: [],
            show: true,
            listtitles:  this.$store.state.listnamearr || [],
            togglearray: []
        }
    },
    computed: {
      findnumber() {
      if (this.scrwidth > 1300) {
        return 6
      } else if (this.scrwidth < 1300 && this.scrwidth > 1060) {
        return 5
      }
      else if (this.scrwidth < 1060 && this.scrwidth > 830) {
        return 4
      }  else if (this.scrwidth < 830 && this.scrwidth > 620) {
        return 3
      } else /* if (this.scrwidth < 620 && this.scrwidth > 414)*/ {
        return 2
       } // else {
      //   return 1
      // }
    }
    },
    components: {
        Swiper,
        SwiperSlide
    },
    watch: {
    id: {
      handler: function(){
        this.fetchOneBook();
        setTimeout(() => {
          fetchBook(10, 'https://www.googleapis.com/books/v1/volumes?q=inauthor:' + this.onebook.volumeInfo.authors[0] + '&key=' + this.apiKey + '&maxResults=10', this.samebooks);
          fetchBook(10, `https://www.googleapis.com/books/v1/volumes?q=related:{` + this.onebook.id + `}&key=${this.apiKey}`, this.similars);
        }, 2000);
      }
    },
    },
    methods: {
    buttonToggle(num) {
      if (!this.togglearray[num]) {
        this.addlist(num)
      } else {
        this.deletebooklist(num)
      }
      this.togglearray[num] = !this.togglearray[num] 
    },
      addlist(i) {
        fetch('http://localhost:3000/addlist', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            listname: i,
            book: this.onebook,
          })
        })
        .catch(err => {
          console.error('This data could not add', err)
        })
      },

      deletebooklist(i) {
        fetch('http://localhost:3000/deleteB', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            listnumber: i,
            bookId: this.onebook.id,
          })
        })
        .catch(err => {
          console.error('This data could not removed', err)
        })
      },
      isbooklist() {
        fetch('http://localhost:3000/checkbook', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bookId: this.onebook.id,
          })
        })
        .then(response => response.json())
        .then(data => {
          this.togglearray = data.boolarray
        })
        .catch(err => {
          console.error('I can not check', err)
        })
      },
      onScreenResize() {
      window.addEventListener("resize", () => {
        this.updateScreenWidth();
      });
    },
    updateScreenWidth() {
      this.scrwidth = window.innerWidth;
    },
      changeid(newid) {
        window.location.assign(`/inner?id=${newid}`)
        // this.$router.push({name: 'Inner', query: {id: newid}})
        this.id = newid
      },
        fetchOneBook() {
      const apiUrl = 'https://www.googleapis.com/books/v1/volumes/' + this.id + '?key=' + this.apiKey;
        
        fetch(apiUrl)
          .then(response => {

            if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            return response.json();
          })
          .then(data => {
                  this.onebook = data
          })
          .catch(error => {
            this.errorMessage = `Error fetching data: ${error.message}`;
          });
      },
    },
    mounted() {
      if (this.$store.state.sessionExists) {
        setTimeout(() => {
          this.isbooklist()
        }, 3000);
      }
      this.updateScreenWidth(),
this.onScreenResize()
      // this.returnone()
        this.fetchOneBook();
        setTimeout(() => {
          fetchBook(10, 'https://www.googleapis.com/books/v1/volumes?q=inauthor:' + this.onebook.volumeInfo.authors[0] + '&key=' + this.apiKey + '&maxResults=10', this.samebooks)
          fetchBook(10, `https://www.googleapis.com/books/v1/volumes?q=related:{` + this.onebook.id + `}&key=${this.apiKey}`, this.similars);
        }, 2000);
    },
    setup() {
      const onSwiper = (swiper) => {
        // console.log(swiper);
        return swiper
      };
      const onSlideChange = () => {
        // console.log('slide change');
        return 10

      };
      return {
        onSwiper,
        onSlideChange,
      };
    },
  }
</script>

<style scoped >

      h2 {
  color: #00300D;
font-family: inherit;
font-size: 25px;
font-weight: 500;
margin-top: 5px;
    }
.inner {
  display: flex;
  height: 87vh;
  width: 100%;
  padding: 10px 10px 10px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
    .aboutbook {
      max-height: 700px;
      max-width: 1500px;
      align-items: center;
      display: flex;
      flex-direction: row;
      width: 100%;
      height: 100%;
      justify-content: space-evenly;
      padding: 10px 10px 10px 10px;
    }
    .thumbnail {
      width: 100%;
      max-width: 380px;
      min-width: 250px;
      object-fit: cover;
    }
    .about {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
    }
    .small {
      margin-top: 20px;
    }
    .about .groups {
      /* margin-top: 10px; */
      width: 100%;
      height: 40px;
      display: flex;
      border-top: 1px solid black;
      padding-top: 10px;
    }
    .about .groups .three {
      width: 80%;
      display: flex;
      justify-content: space-around;
    }
    .groups button {
      border: none;
      background-color: transparent;
      color: #00300D;
      font-weight: 600;
    }
    .similar {
      overflow-y: scroll;
      width: 20%;
      height: 100%;
    }
    .header {
      width: 100%;
      height: 35px;
      display: flex;
      flex-direction: row;
      position: sticky;
      top: 0px;
      z-index: 99;
      background-color: #F4F6F8;
      padding-bottom: 10px;
    }
    .header button {
      width: 50%;
      height: 100%;
      border: none;
      background-color: transparent;
    }
    .header button:nth-child(1) {
      border-right: 1px solid #00300D;
    }
    .list {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .list .card {
      margin-top: 20px;
      width: 199px;
      height: 295px;
      cursor: pointer;
      display: flex;
      justify-content: center;
    }
    .card img {
      position: absolute;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: 0.5s;
    }
    .card .title {
      display: none;
      width: 100%;
      justify-content: center;
      align-items: center;
      flex-direction: column;

    }
    .card:hover > img {
      opacity: 0.2;
    }
    .card:hover > .title {
      display: flex;
    }
     .description::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
 .description {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.similar::-webkit-scrollbar {
  display: none;
}
.similar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none; 
}
/* section */

.swiper-slide {
display: flex;

}
.swiper-slide img {
object-fit: cover;
}
.section {
    display: none;
    flex-direction: column;
}
.secticon {
    color: #00300D;
    font-size: 30px;
    margin-right: 20px;
    margin-top: 2px;
}

    .swiper {
  max-width: 100% !important;
height: 360px !important ;
padding: 34px 37px 31px 35px;
margin-top: -40px;
}
.swiper-wrapper {
  height: 100% !important ;
}
.swiper-slide {
border-radius: 10px;
background-color: transparent !important;
cursor: pointer;
}
.swiper-slide img {
height: 100% !important ;
width: 100% !important;
border-radius: 10px !important;
transition: 0.5s;
}
/* media tags for resposivnes */

/* swipper responsivnes in mobile devices */
@media screen and (min-width: 321px) {
  .swiper-slide {
  margin-right: 50px !important ;
  }
}
@media screen and (max-width: 320px) and (min-width: 300px) {
  .swiper-slide {
    width: 120px !important;
    margin-right: 30px !important ;
  }
}
@media screen and (max-width: 300px)  {
.swiper-slide {
  max-width: 170px !important;
    margin-right: 30px !important ;
    min-width: 150px;
}
}
@media screen and  (max-width: 620px) and (min-width: 515px) {
  .swiper {
    width: 90% !important;
  }
}
@media screen and (max-width: 420px) {
  .swiper-slide {
    margin-right: 20px !important;
    width: 160px !important;
  }
  .swiper {
    padding: 34px 20px 31px 18px;
  }

}
/* mobile swipper  */
@media screen and (max-height: 1100px) and (max-width: 1100px){
  .inner {
    min-height: 10vh;
    height: auto;
  }
  .description {
    max-height: 212px !important;
  }
  .aboutbook {
    max-height: 680px;
  }
}

@media screen and (max-width: 1100px) and (min-height: 1100px) {
  .aboutbook {
    max-height: 500px !important;
    max-width: none;
  }
}

@media screen and (max-width: 1100px) {
  .inner {
    align-items: normal;
  }
  .big {
  display: none !important;
}
.section {
  display: flex !important ;
}
}

/* other */
@media screen and (max-width: 710px) {
  .about {
    width: 90%
  }
  .thumbnail {
    max-height: none;
    min-height: 200px;
    min-width: 150px;
  }
  .small {
    margin-top: 60px;
  }
}

@media screen and (max-width: 710px) and (min-width: 400px) {
  .aboutbook {
    margin-top: 30px;
    height: 100%;
    align-items: center;
  }
  h2, p {
    text-align: center;
  }
  .aboutbook {
    flex-direction: column;
  }
}
@media screen and (max-width: 400px) {
  .aboutbook {
    height: 100%;
    align-items: center;
  }
  .description {
    max-height: 300px !important ;
  }
  .small {
    margin-top: 120px;
  }
  h2, p {
    text-align: center;
  }
  .inner {
    min-height: 180vh;
  }
  .aboutbook {
    flex-direction: column;
  }
}
</style>