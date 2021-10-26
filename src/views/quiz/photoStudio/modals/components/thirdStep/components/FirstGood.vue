<template>
  <div class="modal-default-good">
    <div class="modal-default-good__header">
      <div class="modal-default-good__header-description">
        На белом фоне
      </div>
      <div class="modal-default-good__header-cost">
        Стоимость: 990 рублей (4 фото в карточке)
      </div>
      <div class="modal-default-good__header-help">
        1 карточка = 1 артикул
      </div>
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
            type="number"
            placeholder="Введите количество артикулов"
            label="Количество артикулов"
          />
        </div>
        <div class="modal-default-good__form-group">
          <default-input-with-select
            v-model="formData.goodWeight"
            :error="$v.formData.goodWeight.$error"
            :options="options.goodWeight"
            placeholder="Выберите вес товара"
            label="Вес товара"
          />
          <default-input-with-select
            v-model="formData.goodSize"
            :error="$v.formData.goodSize.$error"
            :options="options.goodSize"
            placeholder="Выберите габариты товара"
            label="Габариты"
          />
        </div>
        <div class="modal-default-good__form-group">
          <default-input-with-select
            v-model="formData.typeOfArea"
            :error="$v.formData.typeOfArea.$error"
            :options="options.typeOfArea"
            placeholder="Выберите тип поверхности"
            label="Тип поверхности"
          />
          <default-radio-button
            v-model="formData.needToBuild"
            :error="$v.formData.needToBuild.$error"
            :options="options.needToBuild"
            label="Требуется ли сборка/полировка"
          />
        </div>
      </div>
      <div class="modal-default-good__form-column">
        <div class="modal-default-good__form-group">
          <default-input-with-file-upload
            help="Вы можете прикрепить примеры фотографий / своё тех. задание, при его наличии, а также прикрепить ссылку на фото, которые являются примером для Вас, либо оставить текстовый комментарий."
            placeholder="Поле для текста/url ссылки"
            label="Примеры / ТЗ"
            class="full-width"
            @changeData="changeExample"
          />
          <default-input
            v-model="formData.goodsInPhoto"
            :error="$v.formData.goodsInPhoto.$error"
            placeholder="Введите количество"
            type="number"
            label="Сколько вещей должно быть в кадре"
          />
        </div>
        <div class="modal-default-good__form-group">
          <div>
            <default-radio-button
              v-model="formData.additionalPhoto"
              :error="$v.formData.additionalPhoto.$error"
              :options="options.additionalPhoto"
              label="Нужны ли дополнительные ракурсы (фото)"
            />
            <default-input
              v-if="formData.ifAdditionalPhotoCount!==null"
              v-model="formData.ifAdditionalPhotoCount"
              :error="$v.formData.ifAdditionalPhotoCount.$error"
              placeholder="Количество"
              type="number"
              label="Количество фото"
            >
              <default-tooltip help="Дополнительное фото = 250 р" />
            </default-input>
          </div>
          <div class="full-width">
            <default-text-area
              v-model="formData.comment"
              placeholder="Напишите комментарий"
              class="unset-flex-align"
              label="Комментарий"
            >
              <default-tooltip
                :help="`- На что обратить внимание<br/>- Акценты<br/>- Включённый дисплей / кнопка<br/>- Открытый / закрытый вид<br/>- Подкладка / карманы<br/>- Комплект`"
              />
            </default-text-area>
          </div>
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
import DefaultInputWithSelect from '@/views/quiz/photoStudio/modals/components/stepsComponents/DefaultInputWithSelect'
import DefaultInputGoodsAutocomplete from '@/views/quiz/photoStudio/modals/components/stepsComponents/DefaultInputGoodsAutocomplete'
import DefaultInput from '@/views/quiz/photoStudio/modals/components/stepsComponents/DefaultInput'
import DefaultRadioButton from '@/views/quiz/photoStudio/modals/components/stepsComponents/DefaultRadioButton'
import DefaultTextArea from '@/views/quiz/photoStudio/modals/components/stepsComponents/DefaultTextArea'
import DefaultInputWithFileUpload from '@/views/quiz/photoStudio/modals/components/stepsComponents/DefaultInputWithFileUpload'
import DefaultTooltip from '@/views/quiz/photoStudio/modals/components/stepsComponents/DefaultTooltip'

export default {
  name: 'FirstGood',
  components: {
    DefaultTooltip,
    DefaultInputWithFileUpload,
    DefaultTextArea,
    DefaultRadioButton,
    DefaultInput,
    DefaultInputGoodsAutocomplete,
    DefaultInputWithSelect
  },
  mixins: [validationMixin],
  data() {
    return {
      formData: {
        selectedGood: '',
        articleCount: '',
        goodWeight: '',
        goodSize: '',
        typeOfArea: '',
        needToBuild: '',
        goodsInPhoto: '',
        examples: {},
        additionalPhoto: '',
        ifAdditionalPhotoCount: null,
        comment: ''
      },
      options: {
        goodWeight: ['Меньше 1 кг', 'От 1 до 3 кг', 'Более 3 кг'],
        goodSize: ['Менее 50х50 см', 'Болеее 50х50 см'],
        typeOfArea: ['Матовая', 'Глянцевая ', 'Бликующая', 'Прозрачная'],
        needToBuild: ['Да', 'Нет'],
        additionalPhoto: ['Да', 'Нет']
      }
    }
  },
  validations: {
    formData: {
      selectedGood: { required },
      articleCount: { required },
      goodWeight: { required },
      goodSize: { required },
      typeOfArea: { required },
      needToBuild: { required },
      goodsInPhoto: { required },
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
