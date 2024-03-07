<template>
  <swiper :navigation="true" :modules="modules" class="mySwiper">
    <swiper-slide>
      <img
        src="https://indyguide-web-development.s3.us-east-2.amazonaws.com/listings/images/11-Days-Advanture-Tour-Around-South-west-Of-Kyrgyzstan-1609848823636.jpg"
        alt=""
      />
      <div class="genre col-5">
        <h2>Advanture</h2>
        <p>
          Action and adventure books constantly have you on the edge of your
          seat with excitement, as your fave main character repeatedly finds
          themselves in high stakes situations. The protagonist has an ultimate
          goal to achieve and is always put in risky, often dangerous
          situations. This genre typically crosses over with others like
          mystery, crime, sci-fi, and fantasy.
        </p>
      </div>
      <div class="acordbooks col-7" v-if="scrwidth > 907">
        <div class="inner" v-for="(book, index) in books" :key="index">
          <img
            :src="book.volumeInfo.imageLinks.thumbnail + '&fife=w800-h1000'"
            alt=""
          />
          <div class="about">
            <h2>{{ book.volumeInfo.title }}</h2>
            <!-- <p v-for="(item, index) in book.volumeInfo.authors" :key="index"  >{{ item }}</p> -->
          </div>
        </div>
      </div>
      <swiper
        v-if="scrwidth < 907 && scrwidth > 643"
        :effect="'cards'"
        :grabCursor="true"
        :modules="modules"
        class="mySwiper acordbooks innerswipper"
      >
        <swiper-slide class="innernpm">
          <img src="../../public/images/tomsowyer.jpg" alt=""
        /></swiper-slide>
        <swiper-slide class="innernpm">Slide 2</swiper-slide>
        <swiper-slide class="innernpm">Slide 3</swiper-slide>
      </swiper>
    </swiper-slide>
    <swiper-slide>
      <img
        src="https://s01.sgp1.digitaloceanspaces.com/large/767824-article-fxzdoikhcz-1446924943.jpeg"
        alt=""
      />
      <div class="genre col-5">
        <h2>Science Fiction</h2>
        <p>
          Science fiction (abbreviated SF or sci-fi with varying punctuation and
          capitalization) is a broad genre of fiction that often involves
          speculations based on current or future science or technology. Science
          fiction is found in books, art, television, films, games, theatre, and
          other media. In organizational or marketing contexts, science fiction
          can be synonymous with the broader definition of speculative fiction,
          encompassing creative works incorporating imaginative elements not
          found in contemporary reality; this includes fantasy, horror and
          related genres.
        </p>
      </div>
      <div class="acordbooks col-7" v-if="scrwidth > 907">
        <div class="inner" v-for="(book, index) in sci_fi" :key="index">
          <img
            :src="book.volumeInfo.imageLinks.thumbnail + '&fife=w800-h1000'"
            alt=""
          />
          <div class="about">
            <h2>{{ book.volumeInfo.title }}</h2>
            <p v-for="(item, index) in book.volumeInfo.authors" :key="index"  >{{ item }}</p>
          </div>
        </div>
      </div>
      <swiper
        v-if="scrwidth < 907 && scrwidth > 643"
        :effect="'cards'"
        :grabCursor="true"
        :modules="modules"
        class="mySwiper acordbooks innerswipper"
      >
        <swiper-slide class="innernpm">
          <img src="../../public/images/tomsowyer.jpg" alt=""
        /></swiper-slide>
        <swiper-slide class="innernpm">Slide 2</swiper-slide>
        <swiper-slide class="innernpm">Slide 3</swiper-slide>
      </swiper>
    </swiper-slide>
    <swiper-slide>
      <h2>holaa</h2>
    </swiper-slide>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";

import "swiper/css/effect-cards";

// import required modules
import { Navigation } from "swiper/modules";

import { EffectCards } from "swiper/modules";
// index
import {cash} from '../index'

export default {
  data() {
    return {
      scrwidth: screen.width,
      apiKey: process.env.VUE_APP_API_KEY,
      books: [],
      sci_fi: [], 
      errorMessage: "",
    };
  },
  components: {
    Swiper,
    SwiperSlide,
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
    return {
      modules: [Navigation, EffectCards],
    };
  },
  mounted() {
    if (localStorage.getItem('Adventure') !== null) {
        this.books = cash('Adventure', this.books, 3, `https://www.googleapis.com/books/v1/volumes?q=subject:*{Adventure}&printType=books&maxResults=3&key=${this.apiKey}`)
      }
      cash('Adventure', this.books, 3,  `https://www.googleapis.com/books/v1/volumes?q=subject:*{Adventure}&printType=books&maxResults=3&key=${this.apiKey}`)
      
      if (localStorage.getItem('Science') !== null) {
        this.sci_fi = cash('Science', this.sci_fi, 3, `https://www.googleapis.com/books/v1/volumes?q=subject:*{Science Fiction}&printType=books&maxResults=3&key=${this.apiKey}`)
      }
      cash('Science', this.sci_fi, 3,  `https://www.googleapis.com/books/v1/volumes?q=subject:*{Science Fiction}&printType=books&maxResults=3&key=${this.apiKey}`)
    this.updateScreenWidth();
    this.onScreenResize();
  },
};
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 400px;
  /* margin-bottom: 50px; */
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
  z-index: 1;
}
.genre {
  z-index: 12;
  padding: 20px 40px 20px 60px;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 20px 0px 20px;
}
.acordbooks {
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.acordbooks .inner {
  position: relative;
  width: 200px;
  height: 300px;
  /* margin-right: 20px; */
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
}
.about {
  position: absolute;
  margin-top: 50%;
  z-index: 12;
  display: none;
}
.about h2 {
  color: #00300d;
  font-family: inherit;
  font-size: 25px;
  font-weight: 500;
  margin-top: 5px;
}
.acordbooks div img {
  position: relative !important;
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: 1;
  border-radius: 10px;
  transition: 0.5s;
}
.swiper-slide img {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  padding: 0px 0px 0px 0px !important;
}
.inner:hover > img {
  opacity: 0.7;
}
.inner:hover > .about {
  display: block;
}
.innerswipper {
  padding: 45px 50px 45px 0px;
}
.swiper-slide {
  padding: 0px 0px 0px 0px !important;
}
.innernpm {
  border-radius: 10px;
}
@media screen and (max-width: 1205px) and (min-width: 1021px) {
  .acordbooks .inner {
    width: 170px;
    height: 270px;
  }
}
@media screen and (max-width: 1020px) and (min-width: 907px) {
  .acordbooks {
    justify-content: space-evenly;
  }
  .acordbooks .inner:nth-child(3) {
    display: none;
  }
}
@media screen and (max-width: 907px) and (min-width: 793px) {
  .genre {
    width: 70%;
  }
  .acordbooks {
    width: 30%;
  }
}
@media screen and (max-width: 792px) and (min-width: 643px) {
  .innerswipper {
    padding: 45px 100px 45px 0px;
  }

  .genre {
    width: 60%;
  }
  .acordbooks {
    width: 40%;
  }
}
@media screen and (max-width: 643px) {
  .genre {
    width: 100%;
  }
}
@media screen and (max-width: 401px) {
  .genre p {
    font-size: clamp(12px, 14px, 16px);
    font-weight: 600;
  }
}
</style>
