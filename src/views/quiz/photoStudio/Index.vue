<template>
  <div class="photo-studio-wrapper">
    <div class="photo-studio">
      <div class="photo-studio__button" @click="dialogVisible = true">
        Открыть опрос
      </div>
    </div>
    <photo-studio-modal :dialog-visible="dialogVisible" @onManagerFilled="onManagerFilled" @onClose="onClose" />
  </div>
</template>

<script>
import PhotoStudioModal from '@/views/quiz/photoStudio/modals/PhotoStudioModal'

export default {
  name: 'Index',
  components: { PhotoStudioModal },
  data() {
    return {
      dialogVisible: true
    }
  },
  methods: {
    onManagerFilled(data) {
      console.log(data)
      this.dialogVisible = false
      this.$notify.success({
        title: 'Успешно заполнено',
        message: 'Наши менеджеры с вами свяжутся'
      })
    },
    onClose(data) {
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped lang="scss">
.photo-studio-wrapper {
  height: calc(100vh - 84px);
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  .photo-studio {

    &__button {
      width: 300px;
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
  }
}
</style>
