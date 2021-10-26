<template>
  <div class="default-input-goods" :class="{'default-input--error': error}">
    <label v-if="label" class="default-input-goods__label">{{ label }}</label>
    <div class="default-input-goods__item-flex">
      <el-input v-model="data" :placeholder="placeholder" class="example-input"/>
      <default-tooltip v-if="help" :help="help" />
    </div>
    <div class="file-loader-wrapper" :class="{'file-loader-wrapper--drop-active': $refs.upload && $refs.upload.dropActive}">
      <div v-if="totalFiles">
        {{ `${totalFiles>1 ? `Файлы загружены(${totalFiles})`:'Файл загружен'} ` }}
      </div>
      <file-upload
        ref="upload"
        v-model="files"
        class="file-loader"
        :multiple="true"
        :drop="true"
        :drop-directory="true"
        @input-filter="inputFile"
      >
        <img class="upload-file-image" src="../../../assets/images/img.png" alt="upload">
<!--        <span v-show="$refs.upload && $refs.upload.dropActive">Drag and drop here for upload</span>-->
        <span class="drop-zone-text">Для загрузки файлов, перенесите их сюда</span>
      </file-upload>
    </div>
  </div>
</template>

<script>
import FileUpload from 'vue-upload-component'
import DefaultTooltip from '@/views/quiz/photoStudio/modals/components/stepsComponents/DefaultTooltip'

export default {
  name: 'DefaultInputWithFileUpload',
  components: { DefaultTooltip, FileUpload },
  props: {
    label: {
      type: String,
      default() {
        return ''
      }
    },
    error: {
      type: Boolean,
      default() {
        return false
      }
    },
    help: {
      type: String,
      default() {
        return ''
      }
    },
    placeholder: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      data: '',
      files: []
    }
  },
  computed: {
    totalFiles() {
      return this.files.length
    }
  },
  watch: {
    data() {
      this.$emit('changeData', {
        input: this.data,
        files: this.files
      })
    },
    files() {
      if (this.files.length > 10) {
        this.$notify.error({
          title: 'Ошибка',
          message: 'Доступно для загрузки 10 файлов, остальные файлы не загружены'
        })
        this.files = this.files.slice(0, 10)
      }
      this.$emit('changeData', {
        input: this.data,
        files: this.files
      })
    }
  },
  methods: {
    inputFile(newFile, oldFile, prevent) {
      if (!/\.(jpeg|jpe|jpg|png|webp|doc|docx|rar|zip|tar)$/i.test(newFile.name)) {
        this.$notify.error({
          title: 'Ошибка',
          message: 'Недопустимый формат файла'
        })
        return prevent()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.default-input-goods{
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 10px;
  }
  &__item-flex{
    display: flex;
    align-items: center;
  }
}

.upload-file-image{
  width: 35px;
  height: 40px;
}

.file-loader-wrapper{
  margin-top: 10px;
  padding: 10px;
  border: 1px dashed black;
  position: relative;
  transition: all .2s ease-in-out;
  max-width: calc(100% - 40px);

  &:hover, &--drop-active{
    border: 1px dashed #1890ff;
  }

  @media screen and (max-width: 600px){
    max-width: 245px;
  }
}

.drop-zone-text{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  padding: 0 50px;
  word-break: break-word;
}
</style>

<style lang="scss">
.example-input{
    width: calc(100% - 40px);
}
.file-uploads {
  position: static!important;
  & label {
    cursor: pointer!important;
  }
}
.VueCarousel-navigation-button:focus{
  outline: none!important;
}
</style>
