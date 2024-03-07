<template>
    <div class="offers" v-if="books.length !== 0 && this.$store.state.sessionExists">
        <div class="offbook" v-for="(book, index) in books" :key="index" @click="BookData = book"  >
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
</template>

<script>
// import { urlencoded } from 'express'
import MyFooter from '../components/MyFooter.vue'
// import {cash} from '../index'

export default {
    data() {
        return {
            apiKey: process.env.VUE_APP_API_KEY,
            books: [],
            errorMessage: '',
            Autors: [],
            BookData: {},
            favgenres: []
        }
    },
    components: {
        MyFooter,
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
        fetchfevbooks() {
            const array = [];
    const promises = [];

    for (let i = 0; i < this.Autors.length; i++) {
      const author = encodeURIComponent(this.Autors[i]);
      const url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&printType=books&maxResults=39&orderBy=newest&key=${this.apiKey}`;
      
      promises.push(
        fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
          })
          .then(data => {
            if (data.items && data.items.length > 0) {
              const only_thumb = data.items.filter(item => item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail);
              array.push(...only_thumb);
            }
          })
          .catch(error => {
            throw new Error (`Error fetching data: ${error.message}`);
          })
      );
    }

    Promise.all(promises)
      .then(() => {
        this.books = array;
      })
      .catch(error => {
        console.error('Error fetching books:', error);
      });
  },
        addauthor() {
        if (this.newlistname !== '') {
        fetch('http://localhost:3000/addauthor', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            author: '',
            user: localStorage.getItem('user-name')
          })
        })
        .then(response => response.json())
        .then(data => {
            this.Autors = JSON.parse(data.authors)
            this.fetchfevbooks()
        })
        .catch(err => {
          console.error('Your list could not created', err)
        })
      }
    }
    },
    mounted() {
      if (!this.$store.state.sessionExists) {
        window.location.assign('/SignIn')
      } else {
        this.addauthor();
      }
    //     if (localStorage.getItem('offers') !== null) {
    //     this.books = cash('offers', this.books, 10, `https://www.googleapis.com/books/v1/volumes?q=?&printType=books&maxResults=39&orderBy=newest&key=${this.apiKey}`)
    //   }
    //   cash('offers', this.books, 12,  `https://www.googleapis.com/books/v1/volumes?q=?&printType=books&maxResults=39&orderBy=newest&key=${this.apiKey}`)
    // },
    }
}
</script>

<style>
@media screen and (max-width: 1050px) {
    .oop, .titles {
    color: #00300D;
    white-space: nowrap;
    max-width: 200px;
    overflow-x: hidden;
    overflow-y: hidden;
    text-overflow: ellipsis;
 }
 .booktitle h2 {
    text-align: start !important;
    font-size: calc(1.275rem + 0.3vw);

 }
 .booktitle p {
    text-align: start !important;

    margin-bottom: 10px !important;

  }
 .offbook img {
    height: 350px !important ;
    border-radius: 20px 20px 0px 0px !important;
 }
 .booktitle {
    display: flex !important;
    position: relative !important;
    align-items: start !important;
    background-color: #fff !important;
    border: none !important;
    border-radius: 0px 0px 20px 20px !important;
    height: 70px !important;
    padding-left: 10px !important;
    max-width: none !important;
 }
 .offers .offbook {
    min-height: 350px;
        width: auto;
        align-items: end;
        padding: 0px 0px 0px 0px ;
        flex-direction: column;

    }
}

</style>
<style scoped>
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
    p, h2 {
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