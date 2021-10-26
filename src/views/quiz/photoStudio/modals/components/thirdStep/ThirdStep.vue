<template>
  <div class="modal-third-step modal-step">
    <div class="modal-step__back">
      <div class="modal-step__back-btn" @click="onBackHandler">
        <i class="el-icon-back"></i>Назад
      </div>
    </div>
    <div class="modal-step__header">
      {{ type.title }}
    </div>
    <div class="modal-step__content">
      <first-good v-if="type.value === 0" @onFilled="onFilled">
        <card-photo-carousel v-if="isActive" :key="key" :images="images[type.value]" />
      </first-good>

      <second-good v-if="type.value === 1" :is-active="type.value === 1" :images="images[type.value]" @onFilled="onFilled">
<!--        <card-photo-carousel v-if="isActive" :key="key" :images="images[type.value]" />-->
        <card-photo-carousel v-if="isActive" :key="key" :images="images[type.value][0]" />
      </second-good>

      <third-good v-if="type.value === 2" :images="images[type.value]" @onFilled="onFilled">
        <card-photo-carousel v-if="isActive" :key="key" :images="images[type.value]" />
      </third-good>

      <four-step v-if="type.value === 3" :images="images[type.value]" @onFilled="onFilled">
        <card-photo-carousel v-if="isActive" :key="key" :images="images[type.value]" />
      </four-step>

      <five-good v-if="type.value === 4" :images="images[type.value]" @onFilled="onFilled">
        <card-photo-carousel v-if="isActive" :key="key" :images="images[type.value]" />
      </five-good>
    </div>
  </div>
</template>

<script>
import FirstGood from '@/views/quiz/photoStudio/modals/components/thirdStep/components/FirstGood'
import CardPhotoCarousel from '@/views/quiz/photoStudio/modals/components/thirdStep/components/CardPhotoCarousel'
import SecondGood from '@/views/quiz/photoStudio/modals/components/thirdStep/components/SecondGood'
import ThirdGood from '@/views/quiz/photoStudio/modals/components/thirdStep/components/ThirdGood'
import FourStep from '@/views/quiz/photoStudio/modals/components/thirdStep/components/FourGood'
import FiveGood from '@/views/quiz/photoStudio/modals/components/thirdStep/components/FiveGood'

export default {
  name: 'ThirdStep',
  components: { FiveGood, FourStep, ThirdGood, SecondGood, FirstGood, CardPhotoCarousel },
  props: {
    type: {
      type: Object,
      default() {
        return {}
      }
    },
    isActive: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      stepData: {},
      key: 0,
      images: [
        [
          require('@/views/quiz/photoStudio/assets/images/goods/1.1.jpg'),
          require('@/views/quiz/photoStudio/assets/images/goods/1.2.jpg'),
          require('@/views/quiz/photoStudio/assets/images/goods/1.3.jpg')
        ], [
          [
            require('@/views/quiz/photoStudio/assets/images/goods/2.1.jpg'),
            require('@/views/quiz/photoStudio/assets/images/goods/2.2.jpg'),
            require('@/views/quiz/photoStudio/assets/images/goods/2.3.jpg')
          ],
          [
            require('@/views/quiz/photoStudio/assets/images/goods/2.4.jpg'),
            require('@/views/quiz/photoStudio/assets/images/goods/2.5.jpg'),
            require('@/views/quiz/photoStudio/assets/images/goods/2.6.jpg')
          ]
        ], [
          require('@/views/quiz/photoStudio/assets/images/goods/3.1.jpg'),
          require('@/views/quiz/photoStudio/assets/images/goods/3.2.jpg'),
          require('@/views/quiz/photoStudio/assets/images/goods/3.3.jpg')
        ], [
          require('@/views/quiz/photoStudio/assets/images/goods/4.1.jpg'),
          require('@/views/quiz/photoStudio/assets/images/goods/4.2.jpg'),
          require('@/views/quiz/photoStudio/assets/images/goods/4.3.jpg')
        ], [
          // require('@/views/quiz/photoStudio/assets/images/goods/5.jpg')
          require('@/views/quiz/photoStudio/assets/images/goods/24.gif')
        ]
      ]
    }
  },
  watch: {
    type() {
      this.key += 1
    }
  },
  methods: {
    onFilled(data) {
      this.$emit('fillStep', {
        step: 2,
        data
      })
    },
    onBackHandler() {
      this.$emit('onBack')
    }
  }
}
</script>

<style scoped lang="scss">
.modal-step {
  padding-left: 50px;
  @media screen and (max-width: 1200px) {
    padding-left: 0;
  }

  &__header{
    font-weight: bold;
  }
}

.modal-step__content {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}
</style>

<style lang="scss">
.full-width{
  .el-input {
    width: calc(100% - 40px) !important;
  }
}
.unset-flex-align{
  .default-input-goods__item-flex{
    align-items: start;
  }
}
.default-input-goods__item-flex {
  display: flex;
  align-items: start;
}

.modal-default-good {
  .el-input{
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type=number] {
      -moz-appearance: textfield;
    }
  }
  .default-input--error{
    label.default-input-goods__label{
      padding-left: 10px;
      color: red;
      position: relative;
      &:before{
        content: '*';
        position: absolute;
        color: red;
        font-size: 18px;
        top: 2px;
        left: 0;
      }
    }

    .el-input__inner, .el-textarea__inner {
      border: 1px solid red!important;
    }
  }

  &__header {
    text-align: center;
    font-size: 14px;

    > div {
      margin-bottom: 10px;
      word-break: break-word;
    }

    &-description {
      text-decoration: underline;
      font-size: 15px;
    }
  }

  &__carousel {
    margin: 20px 0 50px 0;
    padding-right: 10px;
    padding-left: 10px;
  }

  &__form {
    display: flex;

    @media screen and (max-width: 600px) {
      flex-direction: column;
    }

    &-column {
      display: flex;
      flex-direction: column;
      flex:1;
    }

    &-group {
      //margin-bottom: 10px;
      display: flex;
      justify-content: center;
      flex-direction: column;

      > div {

        &:not(.full-width){
          padding-right: 40px;
        }

        flex: 1;

        margin-bottom: 10px;

        .el-input__inner {
          width: 100% !important;
        }

        .el-radio__inner{
          border: 1px solid #4a505c;
        }

        label {
          word-break: break-word;
          max-width: calc(100% - 40px);
        }
      }

      @media screen and (max-width: 600px) {
        flex-direction: column;
        width: 275px;
        margin: 0 auto;
        > div {
          padding-right: 0!important;
          margin-bottom: 20px;

          .el-input__inner, .el-textarea__inner, .el-textarea, .el-input{
            width: 245px !important;
          }
        }
      }
    }
  }

  &__footer {
    margin-top: 20px;
    display: flex;
    justify-content: center;

    &-button {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: white;
      background: #1890ff;
      transition: all .2s ease-in;
      border-radius: 8px;
      height: 40px;
      width: 100%;
      max-width: 150px;
      word-break: break-word;
      text-align: center;

      &:first-child {
        margin-right: 10px;
      }

      &:hover {
        background: #2395ff;
      }
    }
  }
}
</style>
