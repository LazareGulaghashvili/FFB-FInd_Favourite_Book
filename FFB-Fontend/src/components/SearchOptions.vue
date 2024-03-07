<template>
<div class="offers">
        <div class="offbook" v-for="(book, index) in books" :key="index"  @click="BookData = book" >
    <img
    :src="book.volumeInfo.imageLinks.thumbnail + '&fife=w800-h1000' "
    alt="Awesome!">
            <div class="booktitle" >
                <h2 class="text-center titles " >{{ book.volumeInfo.title  }}</h2>
                <p class="text-center oop"  > /<a v-for="(item, index) in book.volumeInfo.authors" :key="index">{{ item }}/</a></p>
            </div>
        </div>     
    </div>
</template>

<script>
import {fetchBook} from '../index'
export default {
    props: {
        searchop: {
            required:true
        }
    },
    data() {
        return {
            // query: 'Harry Potter',
            apiKey: process.env.VUE_APP_API_KEY,
            // bookDescription: '',
            books: [],
            errorMessage: '',
            BookData: {}
        }
    },
    watch: {
    BookData: {
      handler: function() {
        this.$router.push({name: 'Inner', query: {id: this.BookData.id}})
      }
    }
  },
    mounted() {
        fetchBook(12, `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(this.searchop)}&printType=books&maxResults=12&key=${this.apiKey}`, this.books);
    },
}
</script>

<style scoped>
    .offers {
        display: grid;
        grid-template-columns: auto auto auto auto auto auto;
        row-gap: 27px;
        min-height: 10px;
        margin-left: 25px;
        margin-top: 10px;
        margin-bottom: 20px;
        margin-right: 20px;
        gap: 20px;
    }
    .offers .offbook {
        display: flex;
        align-items: end;
        width: 220px;
        height: 350px;
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

    }
}
@media screen and (max-width: 1180px) and (min-width: 870px) {
    .offers {
        grid-template-columns: auto auto auto auto ;
        justify-content: center;

        gap: 20px;
    }
    .offers .offbook {
        width: auto;
    }
}
@media screen and (max-width: 870px) and (min-width: 620px) {
    .offers {
        grid-template-columns: auto auto auto;
        justify-content: center;
    }
    .offers .offbook {
        width: auto;
    }
}
@media screen and (max-width: 620px) and (min-width: 414px) {
    .offers {
        grid-template-columns: auto auto;
        justify-content: center;
    }
    .offers .offbook {
        width: auto;
    }
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
</style>