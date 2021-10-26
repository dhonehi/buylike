<template>
  <div class="modal-four-step modal-step">
    <div class="modal-step__back">
      <div class="modal-step__back-btn" @click="onBackHandler">
        <i class="el-icon-back"></i>Назад
      </div>
    </div>
    <div class="modal-step__header">
      Дополнительные сведения
    </div>
    <div class="modal-step__content">
      <div class="modal-step__group">
        <default-input-with-select v-model="data.marketplace" :error="$v.data.marketplace.$error" label="Для каких маркетплейсов" placeholder="Выберите маркетплейс" :options="marketplaceOptions" />
        <el-input v-if="data.marketplace==='Другое'" v-model="data.otherMarketplace" :class="{'four-step-input--error': $v.data.otherMarketplace.$error}" placeholder="Укажите ваш вариант" style="margin-top: 30px;" />
      </div>
      <div class="modal-step__group">
        <div class="custom-checkbox four-step-checkbox">
          <label>В работу включена базовая обработка:</label>
          <el-checkbox-group v-model="data.additionalOptions">
            <el-checkbox v-for="item in options.additionalOptions" :disabled="true" :key="item" :label="item" class="custom-ordered-checkbox">
              {{ item }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="modal-step__group">
        <default-radio-button
          v-model="data.additionalProcessing"
          :error="$v.data.additionalProcessing.$error"
          label="Требуется ли дополнительная обработка"
          :options="['Да','Нет']"
        />
      </div>
      <div v-if="data.additionalProcessing === 'Да'" class="modal-step__group" style="position:relative;">
        <default-input
          v-model="data.additionalProcessingText"
          :error="$v.data.additionalProcessingText.$error"
          label="Индивидуальные размеры фото / сложная обработка"
          placeholder="Дополнительные характеристики"
        />
        <default-tooltip help="Укажите, имеются ли какие - то дополнительные характеристики обработки фото, которые нам нужно сделать" class="four-step-tooltip" />
      </div>
      <div class="modal-step__group">
        <default-input-with-select v-model="data.returnGoods" :error="$v.data.returnGoods.$error" label="Требуется ли возврат товара после съемки" placeholder="Выберите вариант" :options="returnGoodsOptions" />
      </div>
      <div class=" modal-step__group modal-step__footer-button" @click="onFilled">
        Получить предложение
      </div>
    </div>
  </div>
</template>

<script>
import DefaultInputWithSelect from '@/views/quiz/photoStudio/modals/components/stepsComponents/DefaultInputWithSelect'
import DefaultTooltip from '@/views/quiz/photoStudio/modals/components/stepsComponents/DefaultTooltip'
import { required, requiredIf } from 'vuelidate/lib/validators'
import { validationMixin } from 'vuelidate'
import DefaultRadioButton from '@/views/quiz/photoStudio/modals/components/stepsComponents/DefaultRadioButton'
import DefaultInput from '@/views/quiz/photoStudio/modals/components/stepsComponents/DefaultInput'

export default {
  name: 'FourStep',
  components: { DefaultInput, DefaultRadioButton, DefaultTooltip, DefaultInputWithSelect },
  mixins: [validationMixin],
  data() {
    return {
      data: {
        marketplace: '',
        otherMarketplace: '',
        additionalProcessing: '',
        additionalProcessingText: '',
        returnGoods: '',
        additionalOptions: ['Кадрирование (выравнивание изображения)', 'Добавление насыщенности, яркости и контрастности', 'Цвето-тонокоррекция', 'Общая резкость']
      },
      options: {
        additionalOptions: ['Кадрирование (выравнивание изображения)', 'Добавление насыщенности, яркости и контрастности', 'Цвето-тонокоррекция', 'Общая резкость']
      },
      marketplaceOptions: ['Wildberries', 'Ozon', 'Другое'],
      returnGoodsOptions: ['Требуется возврат', 'Утилизация']
    }
  },
  validations: {
    data: {
      marketplace: { required },
      otherMarketplace: { required: requiredIf(function() {
        return this.data.marketplace === 'Другое'
      })
      },
      returnGoods: { required },
      additionalProcessing: { required },
      additionalProcessingText: {
        required: requiredIf(function() {
          return this.data.additionalProcessing === 'Да'
        })
      }
    }
  },
  watch: {
    'data.marketplace'(value) {
      if (value !== 'Другое') this.data.otherMarketplace = ''
    }
  },
  methods: {
    onFilled() {
      this.$v.$touch()
      if (this.$v.$error) return
      this.$emit('fillStep', {
        step: 3,
        data: {
          marketplace: this.data.otherMarketplace ? this.data.otherMarketplace : this.data.marketplace,
          additionalProcessing: this.data.additionalProcessing,
          additionalProcessingText: this.data.additionalProcessingText,
          returnGoods: this.data.returnGoods
        }
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
    &__content {
      width: 100%;
      display: flex;
      flex-direction: column;

      .modal-step__group{
        label{
          word-break: break-word;
        }
      }
    }
      &-button{
        width: 50%;
    }
  }
</style>

<style lang="scss">
.four-step-checkbox{
  .el-checkbox{
    width: 100%;
    justify-content: space-between;
    align-items: flex-start!important;
  }
  .el-checkbox__label{
    max-width: 90%;
    word-break: break-word;
    white-space: break-spaces;
  }
}
.four-step-input--error{
  .el-input__inner{
    border: 1px solid red !important;
  }
}
.default-input-goods__label{
  word-break: break-word;
}
.four-step-tooltip{
  position: absolute;
  right: -20px;
  //top: 45px;
  bottom: 10px;
  font-size: 20px;
  margin: auto 0;

  @media screen and (max-width: 1200px){
    right: -30px;
  }

  @media screen and (max-width: 550px){
    right: -25px;
  }
}
.modal-four-step {
  .el-radio__inner{
    border: 1px solid #4a505c;
  }
  .modal-step__content{
    //width: 50%;
    align-items: center;
      .el-input, .el-input__inner{
        max-width: 300px;
        width: 300px!important;
      }
    .modal-step__group{
      width: 60%;
    }
  }

  .modal-step__footer{
    &-button{
      margin-right: 0!important;
      //max-width: 300px;
      max-width: 100%;
      width: 60% !important;
    }
  }
  @media screen and (max-width: 1200px){
    .modal-step__content{
      align-items: center;
      .el-input, .el-input__inner{
        max-width: 100%;
        width: 100%!important;
      }
      .modal-step__group{
        width: 75%!important;
      }
    }
    .modal-step__footer{
      width: 75%;
    }
  }
  @media screen and (max-width: 991px){
    .modal-step__content{
      //width: 50%;
      align-items: center;
      width: 35%;
      .el-input, .el-input__inner{
        max-width: unset;
      }
      .modal-step__group, .el-input__inner{
        width: 100% !important;
      }
      .modal-step__footer{
        width: 100%;
      }
    }
  }

  @media screen and (max-width: 850px){
    .modal-step__content{
      width: 50%;
    }
  }

  @media screen and (max-width: 768px){
    .modal-step__content{
      width: 60%;
      align-items: center;
      .modal-step__group{
        width: 100% !important;
      }
    }
  }

  @media screen and (max-width: 550px){
    .modal-step__content{
      width: 95%;
      align-items: center;
      .modal-step__group{
        width: 100% !important;
      }
    }
    .modal-step__footer-button{
      max-width: 300px;
    }
  }
}
</style>
