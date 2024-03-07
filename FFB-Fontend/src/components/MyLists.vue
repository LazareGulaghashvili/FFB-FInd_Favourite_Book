<template>
    <div class="section"   >
        <div class="titl">
            <h2 class="text-start " >{{ title }}</h2>
            <fa :icon="icon" class="secticon" @click="removelist()" style="cursor: pointer;" />

        </div>
        <div class="Books">
            <swiper class="container" 
    :slides-per-view="findnumber"
    :space-between="50"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide class="bookbox" v-for="(book, index) in listarr" :key="index" @click="BookData = book" ><img :src="book.volumeInfo.imageLinks.thumbnail + '&fife=w800-h1000'" alt="">
        <div class="about">
            <h2 class="header text-center">{{ book.volumeInfo.title }}</h2>
            <p class="text-center" v-for="(item, index) in book.volumeInfo.authors" :key="index" >{{ item }}</p>
        </div>
    </swiper-slide>
    </swiper>
        </div>
    </div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import 'swiper/css';

export default {
    data() {
        return {
            listnames: [],
            apiKey: process.env.VUE_APP_API_KEY,
            errorMessage: '',
            scrwidth: screen.width,
            boxnumber: 6,
            BookData: {},
        }
    },
    mounted() { 
this.updateScreenWidth(),
this.onScreenResize()

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
  watch: {
    BookData: {
      handler: function() {
        const encodedId = encodeURIComponent(this.BookData.id);
        this.$router.push({name: 'Inner', query: {id: encodedId}})
      }
    }
  },
  methods: {
    removelist() {
      fetch('http://localhost:3000/removeList', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            listname: this.title,
            listIndex: this.index
          })
      })
      .then(response => response.json())
      .then(data => {
        this.$store.commit('SET_LIST_NAMES', JSON.parse(data.listNames));
        this.listnames = JSON.parse(data.listNames)
        this.$emit('listname', this.listnames)
      })
      .catch(error => {
        console.error('there is err', error)
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
  },
    components: {
        Swiper,
        SwiperSlide
    },
    props: {
        listarr: {
    type: Array,
    default: () => []
  },
        sort: {
          require: true
        },
        index: {
          require: true
        },
        title: {
            require: true
        },
        icon: {
            require: true
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
    
}
</script>

<style scoped>
      h2 {
  color: #00300D;
font-family: inherit;
font-size: 25px;
font-weight: 500;
margin-top: 5px;
    }
.swiper-slide {
display: flex;

}
.swiper-slide img {
object-fit: cover;
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

.section {
    display: flex;
    flex-direction: column;
}
.section .titl {
    display: flex;
    flex-direction: row;
    padding: 20px 20px 20px 38px ;
    justify-content: space-between;
}
.secticon {
    color: #00300D;
    font-size: 30px;
    margin-right: 20px;
    margin-top: 2px;
}

    /* swipper */
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
.bookbox:hover > img {
 opacity: 0.2;
}
.bookbox:hover > .about {
display: flex;
}
.about {
    position: absolute;
    display: none;
    flex-direction: column;
    width: 100%;
    margin-top: 50%;
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
</style>