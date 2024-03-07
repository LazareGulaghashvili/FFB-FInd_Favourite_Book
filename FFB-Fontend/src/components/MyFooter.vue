<template>
    <div class="container footer">
        <div class="row" >
            <div class="navigation col-lg-3 ">
                <h2>Navigation</h2>
                <router-link to="/" class="link" > 
                <a class="desc">Home</a>
                </router-link>
                <router-link to="/Books" class="link" ><a class="desc">Books</a></router-link>
                <router-link to="/MyBooks" class="link" > <a class="desc">My Books</a> </router-link>
                <router-link to="/Account" class="link" > <a class="desc">Account</a> </router-link>
                <router-link to="/Offers" class="link" > <a class="desc">Offers</a> </router-link>
            </div>
            <div class="genresnav col-lg-3 ">
                <h2>Genres</h2>
                <a class="desc">Adventure</a>
                <a class="desc">Horror</a>
                <a class="desc">Romance</a>
                <a class="desc">Thriller</a>
                <a class="desc">Historical</a>
                <a class="desc">Science</a>
            </div>
            <img class="col-lg-6" src="../../public/images/logo.webp" alt="LOGO">
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.link {
    text-decoration: none;
}
.desc {
    text-decoration: none;
    cursor: pointer;
}
.footer {
    position: relative;
min-height: 100px;
background-color: #fff;
border-radius: 20px 20px 0px 0px;
padding: 20px 0px 0px 0px ;
}
.footer .row {
    display: flex;
    justify-content: center;
}
   .navigation, .genresnav {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
   } 
   img {
    width: auto;
    max-height: 200px;
    justify-self: center;
   }
   @media screen and (max-width: 980px) {
    img{
        margin-top: -50px;
    }
    .footer {
        width: 100%;
    }
   }
</style>