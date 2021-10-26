<template>
  <div class="second-good modal-default-good">
    <div class="modal-default-good__header">
<!--      <div class="modal-default-good__header-description">-->
<!--        На белом фоне-->
<!--      </div>-->
      <div class="modal-default-good__header-cost">
        Стоимость: от 1500 рублей (3 фото в карточке)
      </div>
      <div class="modal-default-good__header-help">
        1 карточка = 1 артикул
      </div>
    </div>
    <div class="modal-default-good__carousel" style="margin-bottom: 0;">
      <div class="first-carousel">
        <slot />
      </div>
      <div v-if="!showContent" class="show-all" @click="showAllHandler">
        <div class="show-all-button">
          Выбрать тип реквизита
        </div>
      </div>
      <el-divider v-if="showContent" id="second-carousel"/>
      <div v-if="showContent" class="second-carousel">
        <card-photo-carousel
          v-if="isActive"
          :key="isActive"
          :images="images[1]"
          :button-select="true"
          :error="$v.formData.imagePicked.$error"
          style="margin-top: 50px;"
          :text-options="options.imagesOptions"
          @onSelect="onSelectVariant"
        />
      </div>
    </div>
    <div id="scroll-to-form" style="margin: 25px 0; height: 1px;"></div>
    <div v-if="showContent" id="modal-default-good-form" class="modal-default-good__form">
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
        <div class="modal-default-good__form-group">
          <default-radio-button
            v-model="formData.needToModel"
            :error="$v.formData.needToModel.$error"
            :options="options.needToBuild"
            label="Нужна ли модель/манекен (рука, голова, нога)"
          />
        </div>
      </div>
      <div class="modal-default-good__form-column">
        <div class="modal-default-good__form-group">
          <default-input
            v-model="formData.itemInPhoto"
            :error="$v.formData.itemInPhoto.$error"
            placeholder="Введите количество вещей"
            type="number"
            label="Сколько вещей должно быть в кадре (комплектность товара)"
          />
        </div>
        <div class="modal-default-good__form-group">
          <default-radio-button
            v-model="formData.needToThirdParty"
            :error="$v.formData.needToThirdParty.$error"
            :options="options.needToBuild"
            label="Требуются ли услуги третьих лиц, особая подготовка товара"
          />
          <default-input-with-file-upload
            help="Вы можете прикрепить примеры фотографий / своё тех. задание, при его наличии, а также прикрепить ссылку на фото, которые являются примером для Вас, либо оставить текстовый комментарий."
            placeholder="Поле для текста/url ссылки"
            label="Примеры / ТЗ"
            @changeData="changeExample"
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
          <div>
            <default-text-area
              v-model="formData.comment"
              placeholder="Напишите комментарий"
              class="unset-flex-align"
              label="Комментарий"
            >
              <default-tooltip
                :help="`- На что обратить внимание<br/>- Акценты<br/>- Включённый дисплей / кнопка<br/>- Открытый / закрытый вид<br/>- Подкладка / карманы<br/>- Комплект`"
                :top-icon="true"
              />
            </default-text-area>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showContent" class="modal-default-good__footer">
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
import CardPhotoCarousel from '@/views/quiz/photoStudio/modals/components/thirdStep/components/CardPhotoCarousel'

export default {
  name: 'SecondGood',
  components: {
    CardPhotoCarousel,
    DefaultTooltip,
    DefaultInputWithFileUpload,
    DefaultTextArea,
    DefaultRadioButton,
    DefaultInput,
    DefaultInputGoodsAutocomplete,
    DefaultInputWithSelect
  },
  mixins: [validationMixin],
  props: {
    isActive: {
      type: Boolean,
      default() {
        return false
      }
    },
    images: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      showContent: false,
      formData: {
        imagePicked: '',
        selectedGood: '',
        articleCount: '',
        goodWeight: '',
        goodSize: '',
        typeOfArea: '',
        needToBuild: '',
        needToModel: '',
        itemInPhoto: '',
        needToThirdParty: '',
        examples: {},
        additionalPhoto: '',
        ifAdditionalPhotoCount: null,
        comment: ''
      },
      options: {
        imagesOptions: [
          {
            cost: '1500 р.',
            description: 'Реквизит предоставляет Заказчик. Или реквизит имеющийся в студии'
          },
          {
            cost: '2000 р.',
            description: 'Закупка дополняющего реквизита (специфика заявки)'
          },
          {
            cost: '3000 р',
            description: 'Реквизит обсуждается и закупается фотостудией для создания полноценной истории'
          }
        ],
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
      imagePicked: { required },
      selectedGood: { required },
      articleCount: { required },
      goodWeight: { required },
      goodSize: { required },
      typeOfArea: { required },
      needToBuild: { required },
      needToModel: { required },
      itemInPhoto: { required },
      needToThirdParty: { required },
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
      if (this.$v.formData.imagePicked.$error) this.onSelectImage()
      if (this.$v.formData.$error) return
      this.$emit('onFilled', this.formData)
    },
    onSelectImage() {
      document.getElementById('second-carousel').scrollIntoView({ behavior: 'smooth' })
    },
    onSelectVariant(data) {
      this.formData.imagePicked = data
      document.getElementById('scroll-to-form').scrollIntoView({ behavior: 'smooth' })
    },
    showAllHandler() {
      this.showContent = true
      this.$nextTick(() => {
        this.onSelectImage()
      })
    }
  }
}
</script>

<style scoped lang="scss">
.show-all{
  margin-top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  .show-all-button{
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
  @media screen and (max-width: 400px){
    margin-top: 50px;
    .show-all-button{
      width: 100%;
    }
  }
}
</style>

<style lang="scss">
.second-good {
  .el-divider {
    margin: 50px 0 20px 0;
  }
}
</style>
