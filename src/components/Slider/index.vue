<template>
  <div>
    <VueSlickCarousel :arrows="false" :dots="true" ref="carousel">
                <div class="swiper-slide">
                   <div class="slide-info">
                      <h3 class="text">Выпускной 2021</h3>
                      <p>Мы запускаем марафон тематических подборок, посвященных Выпускному 2021. Подборки увидят все пользователи BuyLike, так как мы будем...</p>
                      <small>10.08.2021</small>
                   </div>
                    <div class="slide-info">
                      <h3 class="text">Выпускной 2021</h3>
                      <p>Мы запускаем марафон тематических подборок, посвященных Выпускному 2021. Подборки увидят все пользователи BuyLike, так как мы будем...</p>
                     <small>10.08.2021</small>
                    </div>
                 </div>
                  <div class="swiper-slide">
                    <div class="slide-info">
                     <h3 class="text">Выпускной 2021</h3>
                      <p>Мы запускаем марафон тематических подборок, посвященных Выпускному 2021. Подборки увидят все пользователи BuyLike, так как мы будем...</p>
                      <small>10.08.2021</small>
                    </div>
                    <div class="slide-info">
                      <h3 class="text">Выпускной 2021</h3>
                      <p>Мы запускаем марафон тематических подборок, посвященных Выпускному 2021. Подборки увидят все пользователи BuyLike, так как мы будем...</p>
                      <small>10.08.2021</small>
                    </div>
                    </div>
                  <div class="swiper-slide">
                    <div class="slide-info">
                      <h3 class="text">Выпускной 2021</h3>
                      <p>Мы запускаем марафон тематических подборок, посвященных Выпускному 2021. Подборки увидят все пользователи BuyLike, так как мы будем...</p>
                      <small>10.08.2021</small>
                    </div>
                    <div class="slide-info">
                      <h3 class="text">Выпускной 2021</h3>
                      <p>Мы запускаем марафон тематических подборок, посвященных Выпускному 2021. Подборки увидят все пользователи BuyLike, так как мы будем...</p>
                      <small>10.08.2021</small>
                    </div>
                  </div>
                  <div class="swiper-slide">
                    <div class="slide-info">
                      <h3 class="text">Выпускной 2021</h3>
                      <p>Мы запускаем марафон тематических подборок, посвященных Выпускному 2021. Подборки увидят все пользователи BuyLike, так как мы будем...</p>
                      <small>10.08.2021</small>
                    </div>
                    <div class="slide-info">
                      <h3 class="text">Выпускной 2021</h3>
                      <p>Мы запускаем марафон тематических подборок, посвященных Выпускному 2021. Подборки увидят все пользователи BuyLike, так как мы будем...</p>
                      <small>10.08.2021</small>
                    </div>
                  </div>
    </VueSlickCarousel>
    
                <div class="nav-wrap">
                    <div class="swiper-pagination swiper-pagination-bullets swiper-pagination-horizontal"></div>
                  <div>
                    <div class="prev" @click="showPrev"><svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 7L1.5 4L4.5 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
                    <div class="next" @click="showNext"><svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 7L1.5 4L4.5 1" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
                  </div>
                </div>
  </div>
  
                
  
</template>
 
<script>
  import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  // optional style for arrows & dots
  import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
 
  export default {
    name: 'MyComponent',
    components: { VueSlickCarousel },
    methods: {
      showNext() {
        this.$refs.carousel.next()
      },
      showPrev() {
        this.$refs.carousel.prev()
      },
    },
  }

</script> 