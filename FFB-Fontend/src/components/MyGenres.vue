<template>
    <div class="genres container " >
        <h2 class="text-center" >Here is <a class="green" >some</a> <a class="blue">genres!</a></h2>
        <div class="boxes">
            <ChooseBook v-for="(item, index) in box" :key="index" class="mb-4" :title="item.title" :text="item.text" :icon="item.icon"  />
        </div>
    </div>
</template>

<script>
import { faCompass, faHeart, faHistory, faMoon, faSkull, faSpaceShuttle } from '@fortawesome/free-solid-svg-icons';
import ChooseBook from './ChooseBook.vue';

export default {

    components: { ChooseBook },
    data() {
      return {
        box: [
          {
            title: 'Adventure',
            text: 'Books of this genre tell about the adventures of the main characters',
            icon: faCompass
          },
          {
            title: 'Horror',
            text: 'Horror novels are meant to scare, startle, shock, and even repulse readers',
            icon: faSkull
          },
            {
            title: 'Romance',
            text: 'Romantic fiction centers around love stories between two people',
            icon: faHeart
          },
          {
            title: 'Thriller',
            text: 'Thriller novels are dark, mysterious, and suspenseful plot-driven stories',
            icon: faMoon
          },          
          {
            title: 'Historical',
            text: 'The story written in this genre of books is based on historical events',
            icon: faHistory
          },          
          {
            title: 'Science',
            text: 'Sci-fi novels are  stories with imagined elements that don’t exist in the world',
            icon: faSpaceShuttle
          }
        ]
      }
    },
}
</script>

<style scoped>
.genres {
    display: flex;
width: 1035px;
padding: 13px 85px 24px 85px;
flex-direction: column;
align-items: center;
gap: 11px;
}
  .boxes {
    width: 865px;
    min-height: 493px;
    display: grid;
    grid-template-columns: auto auto;
  }  
  @media screen and (max-width: 950px) {
    .genres {
        width: 100%;
    }
    .boxes {
        width: 100%;
        grid-template-columns: auto;
        justify-content: center;
    }
  }
  @media screen and (max-width: 390px) {
    .genres {
        padding: 8px 23px 24px 23px;
    }
  }
</style>