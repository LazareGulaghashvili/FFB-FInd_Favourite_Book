<template>
<swiper class="container"
    :slides-per-view="findnumber"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide v-for="(book, index) in books" :key="index" ><img :src="book.volumeInfo.imageLinks.smallThumbnail + '&fife=w200-h400' " alt="">
      <p class="text-center" >{{ book.volumeInfo.title }}</p>
    <a class="text-center"  v-for="(item, index) in book.volumeInfo.authors" :key="index"  > {{ item }} </a>
    </swiper-slide> 
    </swiper>
    <div v-if="!this.$store.state.sessionExists" class="helpline container text-center ">
      <div class="title text-center">
        <h2><a class="blue" >You don't</a> have an account <a class="green" >yet?!</a></h2>
      </div>
      <HelpLine :title="'Register, choose any book that interests you and create a great adventure of your imagination!'"  :button="'Sign up'"/>
    </div>
    <div v-if="!this.$store.state.sessionExists" class="helpline container text-center ">
      <div class="title text-center">
        <h2>Do you <a class="green" >already</a> <a class="blue" >have</a> an account?!  </h2>
      </div>
      <HelpLine :title="'If you already have account for this web site you can log in here!'"  :button="'Sign in '" />
    </div>
    <AboutUs/>
    <div class="choose container " >
      <h2 class="text-center" ><a class="green">How to</a> <a class="blue" >choose</a> favorite book?!</h2>
      <div class="boxes">
        <ChooseBook :title="'Books'" :icon="'bookmark'" :text="'Go to the books page and filter books by genre, year of release, and country'" />
        <h2>or</h2>
        <ChooseBook :title="'Offers'" :icon="'star'" :text="'Go to offers page and we will give you books by your profile'" />
      </div>
</div>
<div class="helpline container text-center mt-5">
      <div class="title text-center">
        <h2>What can you <a class="green" >see</a> on <a class="blue" >My Books</a> page?!</h2>
      </div>
      <HelpLine :title="'On the My Books page, you will find books you have read, are reading, and will read later!'"  :button="'My Books'" />
    </div>
    <MyGenres/>
    <MyFooter/>
</template>

<script>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import HelpLine from '../components/HelpLine.vue'
  import AboutUs from '../components/AboutUs.vue';
  import ChooseBook from '../components/ChooseBook.vue';
  import MyGenres from '../components/MyGenres.vue';
  import MyFooter from '../components/MyFooter.vue';
  import {cash} from '../index'

// Import Swiper styles
import 'swiper/css';

export default {
  components: {
    Swiper,
    SwiperSlide,
    HelpLine,
    AboutUs,
    ChooseBook,
    MyGenres,
    MyFooter
  },
  data() {
    return {
      scrwidth: screen.width,
      boxnumber: 6,
      apiKey: process.env.VUE_APP_API_KEY,
      books: [],
      errorMessage: '',
      sign: true,
    }
  },
  computed: {
    findnumber() {
      if (this.scrwidth > 890) {
        return 6
      } else if (this.scrwidth < 890 && this.scrwidth > 750) {
        return 4
      } else if (this.scrwidth < 750 && this.scrwidth > 480) {
        return 3
      } else if (this.scrwidth < 480 && this.scrwidth > 270) {
        return 2
      } else {
        return 1
      }
    }  
  },
  methods: {
    onScreenResize() {
      window.addEventListener("resize", () => {
        this.updateScreenWidth();
      });
    },
    updateScreenWidth() {
      this.scrwidth = window.innerWidth;
    },
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
    mounted() {
      if (localStorage.getItem('user-name') !== null) {
        this.sign = false;
      }
this.updateScreenWidth()
this.onScreenResize()
if (localStorage.getItem('small') !== null) {
        this.books = cash('small', this.books, 10, `https://www.googleapis.com/books/v1/volumes?q=?&printType=books&maxResults=39&orderBy=newest&key=${this.apiKey}`)
      }
      cash('small', this.books, 12,  `https://www.googleapis.com/books/v1/volumes?q=?&printType=books&maxResults=39&orderBy=newest&key=${this.apiKey}`)
    }
  };

</script>

<style>
  h2 {
  cursor: pointer;
  color: #000;
font-family: sans-serif !important;
font-size: 48px;
font-weight: 400;
}
.blue {
  text-decoration: none;
  color: #00068C;
text-align: center;
font-family: Microsoft Sans Serif;
font-size: 48px;
font-weight: 400;
}
.green {
  text-decoration: none;
  color: #00300D;
font-family: Microsoft Sans Serif;
font-size: 48px;
font-weight: 400;
}
@media screen and (max-width: 768px) and (min-width: 575px) {
.title {
  width: 450px;
}
h2 {
  font-size: 32px;
}
.blue {
  font-size: 32px;
}
.green {
  font-size: 32px;
}

}
@media screen and (max-width: 575px) {
  .title {
  max-width: 300px;
  min-width: 150px;
}
}
h2 {
  font-size: 32px;
}
.blue {
  font-size: 32px;
}
.green {
  font-size: 32px;
}

</style>

<style scoped>
.swiper {
  max-width: 1213px;
height: 281px;
padding: 34px 37px 31px 35px;
}
.swiper-wrapper {
  height: 100% !important ;
}
.swiper-slide {
  position: relative !important ;
border-radius: 20px;
background: #fff;
display: flex;
width: 163px;
padding-bottom: 0px;
flex-direction: column;
align-items: center;
gap: 4px;
justify-content: start;
}
.swiper-slide img {
object-fit: cover;
width: 100%;
height: 179px !important ;
border-radius: 20px 20px 0px 0px;
}
.swiper-slide p {
  color: #000;
font-family: sans-serif;
font-size: 14px;
font-weight: 400;
margin-bottom: 0px !important;
width: 90%;
white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;

}
.swiper-slide a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.67);
font-family: sans-serif;
font-size: 9px;
font-weight: 400;
margin-top: -5px !important;
width: 90%;
white-space: nowrap; 
  overflow: hidden;
  text-overflow: ellipsis;
}
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

/* help line  */
.helpline {
  display: flex;
  align-items: center;
flex-direction: column;
margin-bottom: 40px;
}
.title {
flex-shrink: 0;
}

@media screen and (min-width: 768px) {
  .title {
    width: 586px;
  }
  .helpline {
  width: 937px;
  }
}
/* choose */
.choose {
  display: flex;
width: 1265px;
padding: 0px 107px 0px 106px;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 21px;
}
.boxes {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.boxes h2 {
  margin-left: 30px;
  margin-right: 30px;
}
@media screen and (max-width: 1215px) and (min-width: 340px){
  .choose {
    margin-top: -60px;
  }
}
@media screen and (max-width: 923px) {
  .boxes {
    flex-direction: column;
  }
}
@media screen and (max-width: 587px) {
  .choose {
    width: 100%;
padding: 0px 20px 0px 20px ;
margin-top: -48px;

  }
}
@media screen and (max-width: 340px) {
  .choose {
    margin-top: 55px;

  }
}
</style>
