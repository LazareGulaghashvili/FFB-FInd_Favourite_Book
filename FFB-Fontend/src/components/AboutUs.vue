<template>
  <div class="about container">
    <img src="../../public/images/read.png" alt="illustration" />
    <div class="text col-4">
        <h2>About <a class="blue">us</a></h2>
        <div class="slim">
          <p class="desc text-start">
            FFB is a website for all people who want to read books but don't
            know which one to choose. Here, the user has the opportunity to
            choose a book according to his taste, favorite genre, author,
            country or even the year of publication. Newly published books are
            always added to this website, so you will have easy access to these
            books as well. This site serves to promote the reading of books and
            the study of different countries among the people of the world.
          </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.about {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 23px 92px 61px 92px;
  height: 599px;
  margin-top: -30px;
}
.about img {
  width: 808px;
height: 515px;
flex-shrink: 0;
object-fit: cover;
}
.about .text .desc {
    width: 100%;
  } 
  @media screen and (max-width: 1215px) {
    .about {
    width: 834px;
height: 441px;
flex-shrink: 0;
  }
  }
@media screen and (max-width: 1215px) and (min-width: 800px ) {
  .about img {
    width: 394px;
height: 286px;
flex-shrink: 0;
  }
  .about .text {
    width: 465px;
height: 298px;
flex-shrink: 0;
  }
}
@media screen and (max-width: 800px) and (min-width: 340px) {
  .about img {
    opacity: 0.3;
    width: 400px;
height: 296px;
flex-shrink: 0;
  }
  .about .text {
    position: absolute;
    width: 365px;
height: 298px;
flex-shrink: 0;
text-align: center;
  }
}
@media screen and (max-width: 871px) and (min-width: 393px)  { 

  .about .text {
    width: 70%;
flex-shrink: 0;
text-align: center;
  }
}
@media screen and (max-width: 580px) and (min-width: 400px) {
  .about {
    width: 365px;
height: 390px;
flex-shrink: 0;
  }
}
@media screen and (max-width: 400px) {
  .about {
    width: 100%;
height: 390px;
flex-shrink: 0;
  }
  .about .text {
    max-width: 300px;
    min-width: 200px;
    position: absolute;
  }
  .about img {
    position: absolute;
    opacity: 0.3;
    width: 100%;
height: 296px;
flex-shrink: 0;
  }
}
@media screen and (max-width: 350px) {
  .about {
    margin-top: 50px;
  }
}
</style>
