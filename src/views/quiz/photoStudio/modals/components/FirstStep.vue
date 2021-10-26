<template>
  <div class="modal-first-step modal-step">
    <div class="modal-step__header">
      Контактные данные
    </div>
    <div class="modal-step__content">
      <div class="modal-step__group" :class="{'modal-step__group--error modal-step__group--error-required': isValidName}">
        <label>Имя</label>
        <el-input placeholder="Имя / Заказчик" v-model="name" />
      </div>
      <div class="modal-step__group" :class="{'modal-step__group--error': emailError && touched}">
        <label>Email</label>
        <el-input placeholder="Ваш Email" v-model="email" />
      </div>
      <div class="modal-step__group" :class="{'modal-step__group--error': phoneError && touched}">
        <label>Телефон</label>
        <phone-mask-input
          v-model="phone"
          placeholder="Телефон для связи"
          defaultCountry="ru"
          wrapperClass="modal-phone-wrapper"
          inputClass="modal-input"
          flagClass="modal-flag"
          @onValidate="onValidate"
        />
      </div>
    </div>
    <div class="modal-step__footer">
      <div class="modal-step__footer-button" @click="onFilled('selfFilled')">
        Далее
      </div>
      <div class="modal-step__footer-button" @click="onFilled('managerFilled')">
        Заполнить с менеджером
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'
import PhoneMaskInput from 'vue-phone-mask-input'

export default {
  name: 'FirstStep',
  components: { PhoneMaskInput },
  mixins: [validationMixin],
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      phoneError: false,
      emailError: false,
      touched: false
    }
  },
  validations: {
    email: { email },
    name: { required }
  },
  computed: {
    isValidName() {
      return this.$v.name.$error
    }
  },
  watch: {
    email() {
      this.validate({ type: 'email', value: this.email })
    }
  },
  methods: {
    onFilled(type) {
      this.$v.$touch()
      this.touched = true
      if (this.phone.length < 3 && !this.email.length) {
        this.phoneError = true
        this.emailError = true
      }
      if (this.$v.$error || this.phoneError || this.emailError) return
      this.$emit('fillStep', {
        type,
        step: 0,
        data: {
          name: this.name,
          email: this.email,
          phone: this.phone
        }
      })
    },
    onValidate(e) {
      this.validate({ type: 'phone', value: !e.isValidByLibPhoneNumberJs })
    },
    validate(data) {
      if (data.type === 'phone') {
        if (data.value) {
          if (!this.$v.email.$error && this.email.length > 0 && this.phone.length < 3) {
            this.phoneError = false
            return
          }
          this.phoneError = true
          if (!this.email.length) this.emailError = true
        } else {
          this.phoneError = false
          if (!this.$v.email.$error) this.emailError = false
        }
      } else {
        this.$v.email.$touch()
        if (data.value.length) {
          this.emailError = this.$v.email.$error
          if (!this.email.length) this.emailError = true
          if (this.$v.email.$error && this.phone.length < 3) {
            this.phoneError = true
          } else {
            if (this.phone.length < 3) {
              this.phoneError = false
            }
          }
        } else {
          if (!this.phoneError) this.emailError = false
          if (this.phone.length < 3 || this.phoneError) {
            this.phoneError = true
            this.emailError = true
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
.modal-phone-wrapper {
  position: relative;

  .flag {
    position: absolute;
    right: 10px;
    top: 3px;
  }
}

.modal-input {
  width: 240px;
  height: 40px;
  background: #F2F4FE;
  border-radius: 8px;
  border: unset;
  padding: 0 15px;
  color:  #606266;

  &::placeholder{
    color: #C3C4D6;
  }

  &:focus-visible {
    outline: unset !important;
  }
}
</style>
<style scoped lang="scss">
.modal-step__footer{
  &-button{
    min-width: 120px;
    padding: 0 20px;
  }
}
</style>
