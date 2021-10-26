<template>
  <div class="modal-default-good five-good">
    <div class="modal-default-good__header">
<!--      <div class="modal-default-good__header-description">-->
<!--        На белом фоне-->
<!--      </div>-->
      <div class="modal-default-good__header-cost">
        Минимальная стоимость
      </div>
      <div class="modal-default-good__header-help">
        от 500 р за 1 артикул (12 кадров)
      </div>
    </div>
    <div class="modal-default-good__carousel">
      <slot />
    </div>
    <div class="modal-default-good__form">
      <div class="modal-default-good__form-column">
        <div class="modal-default-good__form-group">
          <default-input-with-select
            v-model="formData.photoCount"
            :error="$v.formData.photoCount.$error"
            :options="options.photoCount"
            placeholder="Выберите количество кадров"
            label="Какое количество кадров"
          />
          <default-input-goods-autocomplete
            v-model="formData.selectedGood"
            :error="$v.formData.selectedGood.$error"
            placeholder="Выберите товар"
            label="Товар"
          />
        </div>
        <div class="modal-default-good__form-group">
          <default-input
            v-model="formData.articleCount"
            :error="$v.formData.articleCount.$error"
            placeholder="Введите количество артикулов"
            type="number"
            label="Количество артикулов"
          />
          <default-input-with-select
            v-model="formData.goodWeight"
            :error="$v.formData.goodWeight.$error"
            :options="options.goodWeight"
            placeholder="Выберите вес товара"
            label="Вес товара"
          />
        </div>
        <div class="modal-default-good__form-group">
          <default-input-with-select
            v-model="formData.goodSize"
            :error="$v.formData.goodSize.$error"
            :options="options.goodSize"
            placeholder="Выберите габариты товара"
            label="Габариты"
          />
          <default-input-with-select
            v-model="formData.typeOfArea"
            :error="$v.formData.typeOfArea.$error"
            :options="options.typeOfArea"
            placeholder="Выберите тип поверхности"
            label="Тип поверхности"
          />
        </div>
      </div>
      <div class="modal-default-good__form-column">
        <div class="modal-default-good__form-group">
          <default-radio-button
            v-model="formData.needToBuild"
            :error="$v.formData.needToBuild.$error"
            :options="options.needToBuild"
            label="Требуется ли сборка/полировка"
          />
          <default-input-with-file-upload
            help="Вы можете прикрепить примеры фотографий / своё тех. задание, при его наличии, а также прикрепить ссылку на фото, которые являются примером для Вас, либо оставить текстовый комментарий."
            placeholder="Поле для текста/url ссылки"
            label="Примеры / ТЗ"
            class="full-width"
            @changeData="changeExample"
          />
        </div>
        <div class="modal-default-good__form-group">
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
import { required } from 'vuelidate/lib/validators'
import DefaultInputWithSelect from '@/views/quiz/photoStudio/modals/components/stepsComponents/DefaultInputWithSelect'
import DefaultInputGoodsAutocomplete from '@/views/quiz/photoStudio/modals/components/stepsComponents/DefaultInputGoodsAutocomplete'
import DefaultInput from '@/views/quiz/photoStudio/modals/components/stepsComponents/DefaultInput'
import DefaultRadioButton from '@/views/quiz/photoStudio/modals/components/stepsComponents/DefaultRadioButton'
import DefaultTextArea from '@/views/quiz/photoStudio/modals/components/stepsComponents/DefaultTextArea'
import DefaultInputWithFileUpload from '@/views/quiz/photoStudio/modals/components/stepsComponents/DefaultInputWithFileUpload'
import DefaultTooltip from '@/views/quiz/photoStudio/modals/components/stepsComponents/DefaultTooltip'

export default {
  name: 'FiveGood',
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
        photoCount: '',
        selectedGood: '',
        articleCount: '',
        goodWeight: '',
        goodSize: '',
        typeOfArea: '',
        needToBuild: '',
        examples: {},
        comment: ''
      },
      options: {
        photoCount: ['12 кадров (Wildberries)', '24 кадра (Ozon)', '36 кадров (Ozon)', '48 кадра (Ozon)', '72 кадра', '144 кадра'],
        goodWeight: ['Меньше 1 кг', 'От 1 до 3 кг', 'Более 3 кг'],
        goodSize: ['Менее 50х50 см', 'Болеее 50х50 см'],
        typeOfArea: ['Матовая', 'Глянцевая ', 'Бликующая', 'Прозрачная'],
        needToBuild: ['Да', 'Нет']
      }
    }
  },
  validations: {
    formData: {
      photoCount: { required },
      selectedGood: { required },
      articleCount: { required },
      goodWeight: { required },
      goodSize: { required },
      typeOfArea: { required },
      needToBuild: { required },
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
.five-good{
  .VueCarousel-inner{
    justify-content: center;
  }
}
</style>
