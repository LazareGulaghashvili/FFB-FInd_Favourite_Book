<template>
  <div id="books" v-if="roter === '/Filter'" >
    <div class="offers">
        <div class="offbook" v-for="(book, index) in filterbooks" :key="index" @click="BookData = book"  >
    <img
    :src="book.volumeInfo.imageLinks.thumbnail + '&fife=w800-h1000' "
    alt="Awesome!">
            <div class="booktitle" >
                <h2 class="text-center titles " >{{ book.volumeInfo.title  }}</h2>
                <p class="text-center oop"> /<a v-for="(item, index) in book.volumeInfo.authors" :key="index" >{{ item }}/</a></p>
            </div>
        </div>     
    </div>
    <MyFooter/>
  </div>
  <div id="books" v-if="roter === '/Books'" >
    <div id="carouselExampleCaptions" class="carousel slide">
      <div class="search" style="position: absolute; z-index: 20">
        <div class="input">
          <input type="text"  v-model="searchword" />
          <fa icon="search" class="searchicon"  @click="clickevent()" />
          <button type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" >
            <fa icon="filter" class="filtericon" />
            <!-- Filter -->
          </button>
        </div>
      </div>
      <div class="optionsbox" v-if="searchbooks.length !== 0">
        <div class="option" v-for="(book, index) in searchbooks" :key="index" >
          <img :src="book.volumeInfo.imageLinks.thumbnail + '&fife=w800-h1000'" alt="">
          <div class="book-title">
            <h2 class="text-center" >{{ book.volumeInfo.title  }}</h2>
            <p class="text-center" v-for="(item, index) in book.volumeInfo.authors" :key="index" >{{ item }}</p>
          </div>
        </div>
      </div>
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          class="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner" v-if="books.length !== 0" >
        <div class="carousel-item" v-for="(book, index) in books" :key="index">
          <img
            :src="book.volumeInfo.imageLinks.thumbnail + '&fife=w1200-h1400'"
            class="d-block w-100"
            alt="..."
          />
          <div class="carousel-caption d-none d-md-block">
            <h5>{{ book.volumeInfo.title }}</h5>
            <p v-for="(item, index) in book.volumeInfo.authors" :key="index" >{{ item }}</p>
          </div>
        </div>
        </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <SearchOptions v-if="click === true && searchword !== '' "  :searchop = 'searchword' />
    <MySection :title="'Top 10 high rate'" :icon="'star'" :sort="'relevance'" />
    <AutoCarousel />
    <MySection :title="'Newest'" :icon="'star'" :sort="'newest'" />
    <MyFooter class="books" />
    <!-- filter offcanvas -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-header">
    <h4 class="offcanvas-title" id="offcanvasRightLabel">Filter</h4>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div class="year" >
      <h5>Year</h5>
      <input type="number" min="1800" :max="getcurrentyear()" v-model="smallyear">
      <input type="number" min="1800" :max="getcurrentyear()" v-model="highyear" >
    </div>
    <div class="pages" >
      <h5>Pages</h5>
      <input type="range" style="width: 70%;" min="1"  max="1000" v-model="pages" >
      <button style="border: 1px solid #00300D; background-color: transparent; color:#00300D; margin-left: 20px; margin-bottom: 10px;"  > MAX: {{ pages }} </button>
    </div>
    <div class="Genres" style="margin-top: 10px" >
      <h5>Genres</h5>
      <div class="genresdiv" style="overflow-y: scroll; height: 300px; display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 20px;" >
        <button class="genrebut" v-for="(genre, index) in genres" :key="index" @click="addgenre(genre); togglestyles(genre)" :id="genre">{{ genre }}</button>
      </div>
    </div>
    <div style="width: 100%; display: flex; justify-content: center; " >
      <router-link to="/Filter"><button type="button" class="filterbut" @click="fetchbook()" data-bs-dismiss="offcanvas" aria-label="Close" >Filter</button></router-link>
    </div>
  </div>
</div>
  </div>
</template>

<script>
import MySection from "../components/MySection.vue";
import AutoCarousel from "../components/AutoCarousel.vue";
import MyFooter from "../components/MyFooter.vue";
import SearchOptions from "../components/SearchOptions.vue";
import {cash} from '../index'



export default {
  data() {
    return {
      toggle: false,
      apiKey: process.env.VUE_APP_API_KEY,
      books: [],
      errorMessage: '',
      searchword: '',
      searchbooks: [],
      click: false,
      time: null,
      pages: 300,
      smallyear: 1800,
      highyear: this.getcurrentyear(),
      choosegen: [],
      filterbooks: [],
      BookData: {},
      genres: [
      'Fiction',
'Mystery',
'Fantasy',
'Roman',
'Drama',
'Thriller',
'Education',
'Horror',
'Nonfiction',
'Biography',
'Memoir',
'Self-Help',
'Business',
'Science',
'History',
'Travel',
'Poetry',
'Philosophy',
'Psychology',
'Cooking'
      ]
    }
  },
  components: {
    AutoCarousel,
    MyFooter,
    MySection,
    SearchOptions
  },
  watch: {
    BookData: {
      handler: function() {
        const encodedId = encodeURIComponent(this.BookData.id);
        this.$router.push({name: 'Inner', query: {id: encodedId}})
      }
    },
    searchword: {
      immediate: false,
      handler: function() {
        this.click = false
      }
    },
    showData: {
      immediate: true,
      handler: function() {
        clearTimeout(this.time)
        this.time = setTimeout(() => {
          if (this.searchword !== '') {
            var ApiUrl = this.showData
            fetch(ApiUrl)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.json();
              })
              .then(data => {
                if (data.items && data.items.length > 0) {
                      const only_thumb = data.items.filter(item => item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail)
                      this.searchbooks = only_thumb.slice(0, 5)
                } else {
                  this.errorMessage = 'No books found.';
                }
              })
              .catch(error => {
                this.errorMessage = `Error fetching data: ${error.message}`;
              });
          } else if (this.searchword.trim() === '') {
            setTimeout(() => {
            this.searchbooks = [];      
            }, 1100);
          }
        }, 700);
      }
    }
  },
  computed: {
    roter() {
      return this.$route.path
    },
    showData() {
      if (this.searchword !== '') {
        return `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(this.searchword)}&printType=books&maxResults=5&key=${this.apiKey}`
      } else {
        return ''
      }
    }
  },
  methods: {
    fetchbook() { 
      localStorage.removeItem('filterchesh')
      this.filterbooks = []
      var array = Array.from(this.choosegen) 
      if (array.length !== 0) {
        for (var i = 0; i < array.length; i++) {
          const apiUrl =  'https://www.googleapis.com/books/v1/volumes?q=+subject:' + array[i] + '&maxResults=36&key=' + this.apiKey
          fetch(apiUrl)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
              }
              return response.json();
            })
            .then(data => {
              if (data.items && data.items.length > 0) {
                    const only_thumb = data.items.filter(item => item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail)
                    const filpage = only_thumb.filter((book) => book.volumeInfo.pageCount <= this.pages)
                    const FilYear = filpage.filter((books) => {
    const publishedDate = books.volumeInfo.publishedDate;
    if (publishedDate) {
        const publishedYear = parseInt(publishedDate.substring(0, 4), 10);
        return this.smallyear < publishedYear && publishedYear < this.highyear;
    }
    return false; // If publishedDate is undefined, consider it as not meeting the condition
});                   
                    this.filterbooks.push(...FilYear);
      localStorage.setItem('filterchesh', JSON.stringify(this.filterbooks))

                  } else {
                throw new Error ('No books found.');
              }
            })
            .catch(error => {
              throw new Error (`Error fetching data: ${error.message}`);
            });
        }
      } 
      this.choosegen = []
},
getfilterchesh() {
 this.filterbooks = JSON.parse(localStorage.getItem('filterchesh'))
},
togglestyles(genre) {
  document.getElementById(genre).classList.toggle('click')
},
    addgenre(genre) {
      var array = Array.from(this.choosegen)
      if (array.includes(genre)) {
        this.toggle = true
      } else {
        this.toggle = false 
      }
      if (this.toggle === false) {
        array.push(genre);
      } else {
        array = array.filter((book) => book !== genre)
      }
      this.choosegen = array
      console.log(this.choosegen)
    },
    getcurrentyear() {
      var date = new Date()
      return date.getFullYear()
    },
    clickevent() {
      if (this.click === false) {
        this.click = true
      } else {
        this.click = false
      }
    },
    addActive() {
      const item = document.querySelector('.carousel-inner .carousel-item')
      if (item) {
      item.classList.add("active");
      }
    },
  },
  mounted() {
    this.getfilterchesh();
    setTimeout(() => {
      this.addActive()
    }, 1000);
    if (localStorage.getItem('carousel') !== null) {
        this.books = cash('carousel', this.books, 3, `https:www.googleapis.com/books/v1/volumes?q=?&printType=books&maxResults=3&key=${this.apiKey}`)
      }
      cash('carousel', this.books, 3,  `https:www.googleapis.com/books/v1/volumes?q=?&printType=books&maxResults=3&key=${this.apiKey}`)
  },
};
</script>
<style scoped >
body {
  overflow-y: scroll !important;
}
.click {
  background-color: rgba(0, 123, 33, 0.179) !important;
}
/* filter */
.offers {
        display: grid;
        grid-template-columns: auto auto auto auto auto auto;
        row-gap: 27px;
        min-height: 10px;
        margin-left: 25px;
        margin-top: 10px;
        margin-bottom: 20px;
    }
    .offers .offbook {
        display: flex;
        align-items: center;
        width: 220px;
        min-height: 350px;
        border-radius: 10px;
        cursor: pointer;
        justify-content: center;
        z-index: 77;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
        transition: 0.5s;
        z-index: 7;
        image-rendering:optimizeQuality;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    }
    .offbook:hover > img {
        opacity: 0.2;
    }
    .booktitle {
    position: absolute;
    display: none;
    flex-direction: column;
    width: 100%;
    z-index: 9;
    max-width: 200px;
}
h2 {
  color: #00300D;
font-family: inherit;
font-size: 25px;
font-weight: 500;
margin-top: 5px;
    }
.offers .offbook:hover > .booktitle {
    display: flex;
}

@media screen and (max-width: 1400px) and (min-width: 1180px) {
    .offers {
        grid-template-columns: auto auto auto auto auto;
        justify-content: center;
        gap: 20px;

    }
}
@media screen and (max-width: 1180px) and (min-width: 1050px) {
    .offers {
        grid-template-columns: auto auto auto auto ;
        justify-content: center;

        gap: 20px;
    }
    .offers .offbook {
        width: auto;
    }
}
@media screen and (max-width: 1050px) and (min-width: 620px) {
    .offers {
        grid-template-columns: auto auto auto;
        justify-content: center;
        gap: 20px;
        margin-right: 20px;
    }
    .offers .offbook {
        width: auto;
        align-items: end;
        padding: 0px 0px 0px 0px ;
        flex-direction: column;

    }
}
@media screen and (max-width: 620px) and (min-width: 414px) {

    .offers {
        grid-template-columns: auto auto;
        justify-content: center;
        gap: 20px;
        margin-right: 20px;
    }
    /* .offers .offbook {
        width: auto;
    } */
}
@media screen and (max-width: 414px) {
    .offers {
        grid-template-columns: auto;
        justify-content: center;
        padding-left: 20px;
        padding-right: 20px;
    }
    .offers .offbook {
        width: auto;
    }
}

@media screen and (max-width: 1050px) {
    .booktitle p, h2 {
    color: #00300D;
    white-space: nowrap;
    max-width: 200px;
    overflow-x: hidden;
    overflow-y: hidden;
    text-overflow: ellipsis;
 }
 h2 {
    font-size: calc(1.275rem + 0.3vw);

 }
  p {
    margin-bottom: 10px !important;

  }
 img {
    height: 350px;
    border-radius: 20px 20px 0px 0px;
 }
 .booktitle {
    display: flex;
    position: relative;
    align-items: start;
    background-color: #fff;
    border: none;
    border-radius: 0px 0px 20px 20px;
    height: 70px;
    padding-left: 10px;
 }
 .offers .offbook {
        width: auto;
        align-items: end;
        padding: 0px 0px 0px 0px ;
        flex-direction: column;

    }
}
</style>

<style scoped >
#carouselExampleCaptions {
  height: 80vh;
  margin-top: -4px;
  display: flex;
  justify-content: center;
}
.carousel-item {
  height: 100%;
}
.carousel-item img {
  height: 100%;
  object-fit: cover;
  filter: brightness(50%);
}
.carousel-inner {
  height: 100%;
}
/* search */
.search {
  position: absolute;
  width: 100%;
  height: 40px;
  padding: 2px 10px 2px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}
.search .input {
  width: 50%;
  height: 100%;
  border: none;
  display: flex;
  justify-content: end;
}
.search .input input {
  height: 100%;
  width: 100%;
  border: 2px solid white;
  border-radius: 20px;
  background: transparent;
  backdrop-filter: blur(10px);
  outline: none;
  padding-left: 40px;
  padding-right: 40px;
}
.search .input .searchicon {
  display: flex;
  align-items: center;
  height: 60%;
  position: absolute;
  color: white;
  margin-top: 6px;
  margin-right: 10px;
  cursor: pointer;
}
.search .input button {
  position: absolute;
  background: transparent;
  color: white;
  font-size: 20px;
  margin-inline: 45.9%;
  align-items: center;
  margin-top: 2.3px;
  border: none;
}
.filtericon {
  margin-right: 10px;
}
input,
select,
textarea {
  color: #fff;
}
.optionsbox {
  justify-content: center;
  flex-direction: row;
  padding: 10px 10px 10px 10px;
  position: absolute;
  display: flex;
  width: 80%;
  z-index: 79;
  margin-top: 80px;
}
.option {
  display: flex;
  align-items: center;
  width: 220px;
  height: 350px;
  border-radius: 10px;
  cursor: pointer;
  justify-content: center;
  z-index: 99;
  margin-left: 20px;
}
.option img {
          width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
        transition: 0.5s;
        z-index: 7;
        image-rendering:optimizeQuality;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
h2 {
  color: #00300D;
font-family: inherit;
font-size: 25px;
font-weight: 500;
margin-top: 5px;
    }
.option:hover > img {
        opacity: 0.2;
    }
    .option:hover > .book-title {
    display: flex;
}
.book-title {
  position: absolute;
    display: none;
    flex-direction: column;
    width: 100%;
    z-index: 9;
    max-width: 200px;
}
/* offcanvas filter */
.genresdiv::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.genresdiv {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.genrebut {
  border-radius: 10px;
    border: 1px solid rgba(0, 48, 13, 0.84);
    background-color: transparent;
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
    line-height: 26px;
    transition: 0.5s;
}
.pages {
  margin-top: 10px;
}
.filterbut {
  margin-top: 30px;
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
.pages input {
      width: 70%;
      margin-bottom: 10px;
      -webkit-appearance: none;
      border: 1px solid #00300D;
      height: 1px;
      border-radius: 5px;
      outline: none;
    }

    .pages input::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 20px;
      height: 20px;
      background-color: #00300D;
      cursor: pointer;
      border-radius: 50%;
    }
.year input {
  z-index: 99;
  color: black;

  margin-right: 20px;
}
.offcanvas-title {
  color: #00300D;
  letter-spacing: 4px;
  font-weight: 600;
}
@media screen and (max-width: 1429px) and (min-width: 1030px) {
  .search .input button {
    margin-inline: 45%;
  }
  /* #carouselExampleCaptions {
    height: 47vh;
  } */
  .option:nth-child(4) {
    display: none;
  }
}
@media screen and (max-width: 1030px) and (min-width: 771px) {
  .search .input button {
    margin-inline: 43.49%;
  }
  #carouselExampleCaptions {
    height: 77vh;
  }
  .option:nth-child(4) {
    display: none;
  }
  .option:nth-child(3) {
    display: none;
  }
}
@media screen and (max-width: 771px) {
  .search .input input {
    padding-left: 50px;
  }
  .search {
    width: 100%;
  }
  .search .input {
    width: 100% !important;
  }
  #carouselExampleCaptions {
    height: 68vh;
  }
  .option:nth-child(4) {
    display: none;
  }
  .option:nth-child(3) {
    display: none;
  }
  .option:nth-child(2) {
    display: none;
  }
  .option {
    height: 310px;
  }
}
@media screen and (max-width: 600px)  {
  .option:nth-child(4) {
    display: none;
  }
  .option:nth-child(3) {
    display: none;
  }
  .option:nth-child(2) {
    display: none;
  }
  .option:nth-child(1) {
    display: none;
  }
  
}
@media screen and (max-width: 771px) and (min-width: 690px) {
  .search .input button {
    margin-inline: 90%;
  }
}
@media screen and (max-width: 690px) and (min-width: 550px) {
  .search .input button {
    margin-inline: 88%;
  }
}
@media screen and (max-width: 550px) and (min-width: 415px) {
  .search .input button {
    margin-inline: 85%;
  }
}
@media screen and (max-width: 415px) and (min-width: 300px) {
  .search .input button {
    margin-inline: 80%;
  }
}
@media screen and (max-width: 300px) and (min-width: 255px) {
  .search .input button {
    margin-inline: 76%;
  }
}
@media screen and (max-width: 255px) {
  .search .input button {
    margin-inline: 72%;
  }
}
</style>
