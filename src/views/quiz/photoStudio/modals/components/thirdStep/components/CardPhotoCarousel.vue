<template>
  <div class="card-photo-carousel" :class="{'card-photo-carousel--error': error}">
    <carousel
      :per-page-custom="[[0, 1], [475, 2],[690, 3]]"
      :navigation-enabled="true"
      :pagination-padding="5"
    >
      <slide v-for="(img, index) in images" :key="img" v-loading="loading[index]" :data-image="img" :class="{'card-photo-carousel--choose': buttonSelect}" @slideclick="onClick(index)">
        <div v-if="textOptions.length && textOptions[index]" class="card-photo">
          <div v-if="textOptions[index].description" class="card-photo__description">
            {{ textOptions[index].description }}
          </div>
          <div v-if="textOptions[index].cost" class="card-photo__cost">
            {{ textOptions[index].cost }}
          </div>
        </div>
        <el-image
          :src="img"
          alt="img"
          class="card-photo-carousel__img"
          :style="loading[index] ? 'min-height: 200px':''"
          :class="{'card-photo-carousel__img--active': index===active, 'card-photo-carousel__img-hover': buttonSelect, 'card-photo-carousel__img-selected': buttonActive===index}"
          @load="onLoad(index)"
          @click="onButtonClick(index)"
        >
          <div slot="placeholder" class="image-slot">
            Loading<span class="dot">...</span>
          </div>
        </el-image>
        <div v-if="buttonSelect" style="width: 100%;">
          <div
            class="slide-choose-button"
            :class="{'slide-choose-button--active':buttonActive===index, 'slide-choose-button--error': error}"
            @click="onButtonClick(index)"
          >
            {{ buttonActive===index ? 'Выбрано':'Выбрать' }}</div>
        </div>
      </slide>
    </carousel>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'

export default {
  name: 'CardPhotoCarousel',
  components: { Carousel, Slide },
  props: {
    images: {
      type: Array,
      default() {
        return []
      }
    },
    clickable: {
      type: Boolean,
      default() {
        return false
      }
    },
    buttonSelect: {
      type: Boolean,
      default() {
        return false
      }
    },
    textOptions: {
      type: Array,
      default() {
        return []
      }
    },
    error: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      loading: [true, true, true],
      active: null,
      buttonActive: null
    }
  },
  methods: {
    onClick(e) {
      if (this.clickable) {
        this.active = e
        this.$emit('onSelect', e)
      }
    },
    onLoad(index) {
      const loading = JSON.parse(JSON.stringify(this.loading))
      loading[index] = false
      this.loading = loading
    },
    onButtonClick(e) {
      if (!this.buttonSelect) return
      this.buttonActive = e
      this.$emit('onSelect', e)
    }
  }
}
</script>

<style scoped lang="scss">
.slide-choose-button {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  background: #1890ff;
  transition: all .2s ease-in;
  border-radius: 8px;
  height: 40px;
  width: 60%;
  margin: 10px auto 0 auto!important;
  word-break: break-word;
  text-align: center;

  &:first-child {
    margin-right: 10px;
  }

  &:hover {
    background: #2395ff;
  }

  &--active{
    background: white;
    border: 1px solid #1890ff;
    color: #434242;

    &:hover {
      background: white;
    }
  }
  &--error{
    border: 2px solid red;
  }
}

.card-photo-carousel {
  width: 100%;

  //@media screen and (max-width: 1399px){
  //  width: 200px;
  //}
}

.cart-photo-carousel__img {
  //width: 200px;
  //height: 200px;

  &--active {
    border: 2px solid #1890ff;
  }
}

.card-photo {
  text-align: center;
  word-break: break-word;
  //width: 250px;
  min-height: 80px;
  margin-bottom: 20px;

  &__cost {
    font-weight: bold;
    text-decoration: underline;
    font-size: 16px;
    margin: 10px 0;

  }

  &__description {
    min-height: 60px;
  }
}
</style>

<style lang="scss">
.card-photo-carousel__img-hover{
  transition: transform .2s ease-in-out;
  cursor: pointer;
  &:hover{
    border: 2px solid #1890ff;
    @media screen and (min-width: 476px){
      transform: scale(1.03);
      box-shadow: 5px 5px 5px #d1d1d1;
    }
  }
}
.card-photo-carousel__img-selected {
  border: 2px solid #1890ff!important;
  @media screen and (min-width: 476px){
    transform: scale(1.03);
    box-shadow: 5px 5px 5px #d1d1d1;
  }
}
.card-photo-carousel {
  .card-photo-carousel--choose{
    .el-image__inner{
      //width: 97%;
    }
  }

  &__img{
    border: 1px solid #ababab;
  }
  .VueCarousel-slide{
    padding-right: 10px;
  }

  @media screen and (max-width: 475px){
    .VueCarousel-slide{
      padding-right: 0!important;
    }
  }

  @media screen and (min-width: 1400px){
    .VueCarousel-slide {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      align-items: center;
    }
  }

  @media screen and (max-width: 1400px){
    .VueCarousel-inner{
      justify-content: flex-start;
    }
  }
  .VueCarousel-inner{
    @media screen and (min-width: 476px){
      padding: 4px;
    }
  }
}
</style>
