<template>
    <router-link to="/Books" class="link" >
        <div class="choosebox" >
            <div class="header w-100">
                <h3>{{title}}</h3>
                <fa :icon="icon" class="icon" />
            </div>
            <div class="helptext">
                <p class="desc">
                    {{ text }}
                </p>
            </div>
        </div>
    </router-link>
</template>

<script>
export default {
    props: {
        title: {
            require:true
        },
        icon: {
            require: true
        },
        text: {
            require: true
        }
    }
}
</script>
<style>
.icon {
    color: #00068c;
    font-size: 30px; 
}
.link {
    text-decoration: none;
}
.choosebox {
    width: 400px;
height: 133px;
border-radius: 20px;
background: #FFF;
display: flex;
flex-direction: column;
padding: 16px 26px 19px 26px;
   } 
</style>

<style scoped>

h3 {
    color: #000;
font-family: sans-serif;
font-size: 30px;
font-weight: 500;
}

   .header {
    display: inline-flex;
    justify-content: space-between;
   }
   @media screen and (max-width: 554px) and (min-width: 337px) {
    .choosebox {
        max-width: 309px;
height: 112px;
    }
   }
   @media screen and (max-width: 337px) {
    .choosebox {
        max-width: 270px;
height: 130px;
    }
   }
</style>