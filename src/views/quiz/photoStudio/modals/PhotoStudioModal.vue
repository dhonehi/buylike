<template>
  <div class="photo-studio-modal">
    <el-dialog
      :visible="dialogVisible"
      custom-class="brief-modal"
      :width="modalWidth"
      :before-close="handleClose"
      :fullscreen="windowWidth<=991"
      :close-on-click-modal="false"
    >
      <template v-slot:title>
        <div class="modal-default-title">
          Бриф фотостудия
        </div>
        <el-divider v-if="windowWidth > 1200" class="mb-0" />
      </template>
      <modal-steps :active="active" :window-width="windowWidth" @changeActive="changeActive" />
      <el-divider v-if="windowWidth <= 1200" />
      <div v-if="dialogVisible" class="brief-modal__content">
        <transition name="custom-fade" mode="out-in">
          <first-step v-show="active===0" @fillStep="fillStep" />
        </transition>
        <transition name="custom-fade" mode="out-in">
          <second-step v-show="active===1" :is-active="active===1" @fillStep="fillStep" @onBack="onBack" />
        </transition>
        <transition name="custom-fade" mode="out-in">
          <third-step v-show="active===2" :is-active="active===2" :type="stepsData.length > 1 && stepsData[1] ? stepsData[1].data : test" @fillStep="fillStep" @onBack="onBack" />
        </transition>
        <transition name="custom-fade" mode="out-in">
          <four-step v-show="active===3" @fillStep="fillStep" @onBack="onBack" />
        </transition>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ModalSteps from '@/views/quiz/photoStudio/modals/components/ModalSteps'
import FirstStep from '@/views/quiz/photoStudio/modals/components/FirstStep'
import SecondStep from '@/views/quiz/photoStudio/modals/components/SecondStep'
import ThirdStep from '@/views/quiz/photoStudio/modals/components/thirdStep/ThirdStep'
import FourStep from '@/views/quiz/photoStudio/modals/components/FourStep'

export default {
  name: 'PhotoStudioModal',
  components: { FourStep, ThirdStep, SecondStep, FirstStep, ModalSteps },
  props: {
    dialogVisible: Boolean
  },
  data() {
    return {
      active: 0,
      windowWidth: null,
      stepsData: [],
      test: {
        value: 1,
        title: 'Имиджевая съёмка'
      }
    }
  },
  computed: {
    modalWidth() {
      if (this.windowWidth <= 991) return '100%'
      if (this.active === 1 || this.active === 2) return '75%'
      if (this.windowWidth > 1200) return '700px'
      return '40%'
    }
  },
  watch: {
    dialogVisible() {
      this.stepsData = []
      this.active = 0
    },
    active() {
      if (this.windowWidth < 1200) document.querySelector('.el-dialog__header').scrollIntoView({ behavior: 'smooth' })
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResizeWindow)
  },
  mounted() {
    this.onResizeWindow()
    window.addEventListener('resize', this.onResizeWindow)
    window.location.replace(window.location.origin + `#/quiz/photo-studio?nocache=${new Date().valueOf()}`)
  },
  methods: {
    onResizeWindow() {
      this.windowWidth = document.documentElement.clientWidth
    },
    handleClose() {
      this.active = 0
      this.$emit('onClose')
    },
    fillStep(e) {
      e.complete = true
      if (e.step === 1 && this.stepsData.length > 2 && this.stepsData[1].data.value !== e.data.value) {
        this.stepsData[2].complete = false
      }
      this.stepsData[e.step] = e
      if (e.type === 'managerFilled') {
        this.$emit('onManagerFilled', e.data)
        return
      }
      if (e.step === 3) {
        this.onCompleteQuiz()
      }
      this.active += 1
    },
    onCompleteQuiz() {
      this.$notify.success({
        title: 'Команда Buylike благодарит Вас!'
      })
      this.$emit('onClose', this.stepsData)
    },
    onBack() {
      this.active -= 1
    },
    changeActive(index) {
      if (this.stepsData.length >= index) {
        if ((index > 0 && this.stepsData[index - 1].complete) || index === 0) {
          this.active = index
        }
      }
    }
  }
}
</script>

<style lang="scss">
.custom-fade-enter-active, .custom-fade-leave-active {
  transition: opacity .1s ease;
}
.custom-fade-enter, .custom-fade-leave-to{
  opacity: 0;
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

.mb-0 {
  margin-bottom: 0 !important;
}

.modal-step__back{
  display: flex;
  justify-content: start;
  width: 100%;
  margin-bottom: 30px;
  padding-left: 20px;
  &-btn{
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: white;
      background: #1890ff;
      transition: all .2s ease-in;
      border-radius: 8px;
      height: 40px;
      width: 175px;
      word-break: break-word;
      text-align: center;
      i{
        font-size: 16px;
        margin-right: 5px;
      }
      &:first-child {
        margin-right: 10px;
      }

      &:hover {
        background: #2395ff;
      }
    }
}

.brief-modal {
  max-width: 1100px;

  &__content {
    flex: 1;
    width: calc(100% - 130px);

    @media screen and (max-width: 1200px){
      width: 100%;
    }
  }
  .el-dialog__header {
    text-align: center;

    .modal-default-title {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .el-dialog__body {
    display: flex;
    background: white;

    @media screen and (max-width: 1200px) {
      flex-direction: column;
    }
  }

  .modal-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .el-input__inner,  .el-textarea__inner {
      width: 240px;
      height: 40px;
      background: #F2F4FE;
      border-radius: 8px;
      border: unset;
    }

    .el-textarea__inner{
      width: 100%;
      min-height: 40px!important;
    }

    &__group {
      margin-bottom: 25px;

      &--error {
        &-required {
          label {
            color: red;
            padding-left: 10px;
            position: relative;
            &:before {
              content: '*';
              font-size: 19px;
              position: absolute;
              left: 0;
              top: 2px;
            }
          }
        }

        .el-input__inner, .modal-input, .el-textarea__inner {
          border: 1px solid red;
        }
      }

      label {
        margin-bottom: 5px;
        display: block;
        transition: all .2s ease-in;
      }
    }

    &__header {
      font-size: 18px;
      margin-bottom: 30px;
      text-align: center;
    }

    &__footer {
      display: flex;
      align-items: center;
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
        width: 60%;
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

  @media screen and (max-width: 991px){
    margin-top: 0!important;
    height: 100%;
  }
}
</style>
