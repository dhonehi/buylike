<template>
  <div class="modal-second-step modal-step">
    <div class="modal-step__back">
      <div class="modal-step__back-btn" @click="onBackHandler">
        <i class="el-icon-back"></i>Назад
      </div>
    </div>
    <div class="modal-step__header">
      Формат съёмки
    </div>
    <div class="modal-step__content">
      <div v-show="isActive" class="photo-type-wrapper">
        <div
          v-for="item in photoTypes"
          :key="item.value"
          class="photo-type-item"
        >
          <div class="photo-type-item__title">
            {{ item.title }}<span v-if="item.value===4">&deg;</span>
            <div v-if="item.subtitle" class="photo-type-item__subtitle">
              {{ item.subtitle }}
            </div>
          </div>
          <div class="photo-type-item__image" :class="{'photo-type-item-img--active': selected === item.value}" :style="item.isLoading ? 'min-height: 200px' : ''">
            <el-image v-loading="item.isLoading" :src="item.imgUrl" alt="img" @load="loadingHandler(item.value)" @click="onChoose(item)">
              <div slot="placeholder" v-loading="true" class="image-slot">
              </div>
            </el-image>
          </div>
          <div
            class="photo-type-item__button"
            :class="{'photo-type-item--active': selected === item.value}"
            @click="onChoose(item)"
          >
            {{ selected === item.value?'Выбрано':'Выбрать' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SecondStep',
  props: {
    isActive: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      photoTypes: [
        {
          title: 'Предметная съемка',
          imgUrl: require('@/views/quiz/photoStudio/assets/images/photoTypes/1.jpg'),
          value: 0,
          isLoading: true
        }, {
          title: 'Имиджевая съемка',
          imgUrl: require('@/views/quiz/photoStudio/assets/images/photoTypes/2.jpg'),
          value: 1,
          isLoading: true
        },
        {
          title: 'Съемка на модели',
          subtitle: 'Предметная',
          imgUrl: require('@/views/quiz/photoStudio/assets/images/photoTypes/3.jpg'),
          value: 2,
          isLoading: true
        }, {
          title: 'Съемка на модели',
          subtitle: 'Имидж',
          imgUrl: require('@/views/quiz/photoStudio/assets/images/photoTypes/4.jpg'),
          value: 3,
          isLoading: true
        }, {
          title: `Съемка 360`,
          imgUrl: require('@/views/quiz/photoStudio/assets/images/goods/24.gif'),
          value: 4,
          isLoading: true
        }
      ],
      selected: null
    }
  },
  methods: {
    onChoose(type) {
      this.selected = type.value
      this.$emit('fillStep', {
        step: 1,
        data: {
          value: type.value,
          title: type.title
        }
      })
    },
    loadingHandler(index) {
      this.photoTypes[index].isLoading = false
    },
    onBackHandler() {
      this.$emit('onBack')
    }
  }
}

</script>
<style lang="scss">
.photo-type-item__image{
  transition: transform .1s ease-in;
  .el-image{
    height: 100%;
    width: 100%;
    cursor: pointer;
  }
  border: 1px solid gray;
  &:hover{
    border: 2px solid #1890ff;
    @media screen and (min-width: 476px){
      transform: scale(1.02);
      box-shadow: 5px 5px 5px #d1d1d1;
    }
  }
}
</style>
<style lang="scss" scoped>
.photo-type-item-img--active{
  transition: transform .2s ease-in-out;
  border: 2px solid #1890ff!important;
  @media screen and (min-width: 476px){
    transform: scale(1.03);
    box-shadow: 5px 5px 5px #d1d1d1;
  }
}

.modal-second-step{
  .modal-step__content{
    padding-left: 20px;
  }
}
.photo-type-wrapper {
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 991px){
    justify-content: space-between;
  }

  @media screen and (max-width: 360px){
    .photo-type-item{
      width: 100%;
      margin-right: 0!important;
    }
  }
}

.photo-type-item {
  margin-bottom: 15px;
  margin-right: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 31%;

  &:nth-child(3n) {
    margin-right: 0;
  }

  &--active {
    color: black!important;
    background: white!important;
    border: 1px solid #1890ff;
  }

  &__title {
    text-align: center;
    margin-bottom: 10px;
    font-size: 16px;
    word-break: break-word;
    min-height: 45px;
  }

  &__subtitle{
    text-align: center;
    text-decoration: underline;
    margin-top: 10px;
  }

  &__image {
    img {
      width: 100%;
      height: 100%;
    }
  }

  &__button {
    //width: 300px;
    margin-top: 20px;
    height: 40px;
    background: #1890ff;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    cursor: pointer;
    transition: all .2s ease-in;

    &:hover {
      background: #2395ff;
    }
  }

  @media screen and (max-width: 991px) {
    width: 45%;
    &:nth-child(3n) {
      margin-right: 15px;
    }

    &:nth-child(2n) {
      margin-right: 0;
    }
  }
}
</style>
