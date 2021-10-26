<template>
  <div class="modal-default-good">
    <div class="modal-default-good__header">
      <div class="modal-default-good__header-description">
        Имидж
      </div>
      <div class="modal-default-good__header-cost">
        Индивидуальный подход в расчете стоимости фотосъёмки
      </div>
<!--      <div class="modal-default-good__header-help">-->
<!--        1 карточка = 1 артикул-->
<!--      </div>-->
    </div>
    <div class="modal-default-good__carousel">
      <slot />
    </div>
    <div class="modal-default-good__form">
      <div class="modal-default-good__form-column">
        <div class="modal-default-good__form-group">
          <default-input-goods-autocomplete
            v-model="formData.selectedGood"
            :error="$v.formData.selectedGood.$error"
            placeholder="Выберите товар"
            label="Товар"
          />
          <default-input
            v-model="formData.articleCount"
            :error="$v.formData.articleCount.$error"
            placeholder="Введите количество артикулов"
            label="Количество артикулов"
            type="number"
          />
        </div>
        <div class="modal-default-good__form-group">
          <default-input
            v-model="formData.sizeGrid"
            :error="$v.formData.sizeGrid.$error"
            placeholder="Введите размерную сетку"
            label="Размерная сетка товара"
          />
          <default-input
            v-model="formData.model"
            :error="$v.formData.model.$error"
            placeholder="Введите модель"
            label="Какая нужна модель"
          />
        </div>
        <div class="modal-default-good__form-group">
          <div class="full-width">
            <default-input-with-file-upload
              help="Вы можете прикрепить примеры фотографий / своё тех. задание, при его наличии, а также прикрепить ссылку на фото, которые являются примером для Вас, либо оставить текстовый комментарий."
              placeholder="Поле для текста/url ссылки"
              label="Примеры / ТЗ"
              @changeData="changeExample"
            />
          </div>
        </div>
      </div>
      <div class="modal-default-good__form-column">
        <div class="modal-default-good__form-group">
          <default-radio-button
            v-model="formData.additionalPhoto"
            :error="$v.formData.additionalPhoto.$error"
            :options="options.additionalPhoto"
            class="full-width"
            label="Нужны ли дополнительные ракурсы (фото)"
          />
          <default-input
            v-if="formData.ifAdditionalPhotoCount!==null"
            v-model="formData.ifAdditionalPhotoCount"
            :error="$v.formData.ifAdditionalPhotoCount.$error"
            placeholder="Количество"
            type="number"
            class="full-width"
            label="Количество фото"
          >
            <default-tooltip help="Дополнительное фото = 250 р" />
          </default-input>
          <default-radio-button
            v-model="formData.needToBuild"
            :error="$v.formData.needToBuild.$error"
            :options="options.needToBuild"
            label="Реквизит, услуги третьих лиц, особая подготовка/сборка товара"
          />
          <default-text-area
            v-model="formData.comment"
            placeholder="Напишите комментарий"
            class="unset-flex-align full-width"
            label="Комментарий"
          >
            <default-tooltip
              :help="`- На что обратить внимание<br/>- Акценты<br/>- Включённый дисплей / кнопка<br/>- Открытый / закрытый вид<br/>- Подкладка / карманы<br/>- Комплект`"
            />
          </default-text-area>
        </div>
        <div class="modal-default-good__form-group">
          <div class="custom-checkbox">
            <label>Дополнительные расходы</label>
            <el-checkbox-group v-model="formData.additionalOptions">
              <el-checkbox v-for="item in options.additionalOptions" :disabled="true" :key="item" :label="item" class="custom-ordered-checkbox">
                {{ item }}
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <div></div>
        </div>
      </div>
    </div>
    <div class="modal-default-good__footer">
      <div class="modal-default-good__footer-button" @click="onNextStep">
        Далее
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, requiredIf } from 'vuelidate/lib/validators'
import DefaultInputGoodsAutocomplete from '@/views/quiz/photoStudio/modals/components/stepsComponents/DefaultInputGoodsAutocomplete'
import DefaultInput from '@/views/quiz/photoStudio/modals/components/stepsComponents/DefaultInput'
import DefaultRadioButton from '@/views/quiz/photoStudio/modals/components/stepsComponents/DefaultRadioButton'
import DefaultTextArea from '@/views/quiz/photoStudio/modals/components/stepsComponents/DefaultTextArea'
import DefaultInputWithFileUpload from '@/views/quiz/photoStudio/modals/components/stepsComponents/DefaultInputWithFileUpload'
import DefaultTooltip from '@/views/quiz/photoStudio/modals/components/stepsComponents/DefaultTooltip'

export default {
  name: 'FourStep',
  components: {
    DefaultTooltip,
    DefaultInputWithFileUpload,
    DefaultTextArea,
    DefaultRadioButton,
    DefaultInput,
    DefaultInputGoodsAutocomplete
  },
  mixins: [validationMixin],
  data() {
    return {
      formData: {
        selectedGood: '',
        articleCount: '',
        sizeGrid: '',
        model: '',
        examples: {},
        additionalPhoto: '',
        ifAdditionalPhotoCount: null,
        needToBuild: '',
        comment: '',
        additionalOptions: ['Выбор локации', 'Закупка реквизита', 'Услуги третьих лиц', 'Разработка образов']
      },
      options: {
        needToBuild: ['Да', 'Нет'],
        additionalPhoto: ['Да', 'Нет'],
        additionalOptions: ['Выбор локации', 'Закупка реквизита', 'Услуги третьих лиц', 'Разработка образов']
      }
    }
  },
  validations: {
    formData: {
      selectedGood: { required },
      articleCount: { required },
      sizeGrid: { required },
      model: { required },
      needToBuild: { required },
      additionalPhoto: { required },
      ifAdditionalPhotoCount: {
        required: requiredIf(function() {
          return this.formData.additionalPhoto === 'Да'
        })
      }
    }
  },
  watch: {
    'formData.additionalPhoto'() {
      if (this.formData.additionalPhoto === 'Да') {
        this.formData.ifAdditionalPhotoCount = ''
      } else {
        this.formData.ifAdditionalPhotoCount = null
      }
    }
  },
  methods: {
    changeExample(data) {
      this.formData.examples = data
    },
    onNextStep() {
      this.$v.$touch()
      if (this.$v.formData.$error) return
      this.$emit('onFilled', this.formData)
    }
  }
}
</script>
<style lang="scss">
.custom-checkbox{
  .el-checkbox-group{
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    .el-checkbox__input.is-checked + .el-checkbox__label{
      color: unset;
    }
    .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner{
      background-color: #1890ff;
      border-color: #1890ff;

      &:after{
        border-color: white;
      }
    }

    .custom-ordered-checkbox{
      margin-bottom: 10px;
      display: flex;
      align-items: center;

      & > span {
        order: 1;

        &:first-child {
          order: 2;
        }

        &:last-child {
          min-width: 175px;
        }
      }
    }
  }
}
</style>
