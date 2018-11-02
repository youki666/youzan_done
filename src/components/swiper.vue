<template>
      <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swp-page swiper-slide" v-for="list in lists">
              <a class="js-no-follow" :href="list.clickUrl">
                <img class="goods-main-photo fadeIn" :src="list.img">
              </a>
            </div>
          </div>
            <div class="swiper-pagination"></div>
            <!-- 如果需要导航按钮 
             <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
            -->
        </div>
</template>

<script>
import swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
   export default {
    name: 'swipe',
    props:{
      lists:{
      //  type:Array,
        requried:true
      }
    },
    mounted(){
      //console.log(this.lists);
     new swiper('.swiper-container',{
      autoplay: {
        stopOnLastSlide:false
      },
      loop: true,
    // 如果需要分页器
      pagination: {
      el: '.swiper-pagination',
      clickable:true
    },
     // 如果需要前进后退按钮
/*    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }*/
     })
    }
   }
</script>

<style>
  .swiper-slide img {
    height: 100%;
    width: 100%;
  }
</style>