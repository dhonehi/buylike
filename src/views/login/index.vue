<template>
    <div class="wrap">
          <div class="form">
            <header>
              <img src="./logo.svg" alt="">
              <a href="#" class="demo desk">Демо режим</a>
            </header>
            <small class="wide">С возвращением!</small>
            <h1>Вход в кабинет</h1>
            <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">
              <div class="input">
                <el-input
                  ref="username"
                  v-model="loginForm.username"
                  placeholder="Ваш Логин"
                  name="username"
                  type="text"
                  tabindex="1"
                  autocomplete="on"
                />
              </div>
              <div class="input password">
                <el-input
                  :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  placeholder="Введите пароль"
                  name="password"
                  tabindex="2"
                  autocomplete="on"
                  @keyup.native="checkCapslock"
                  @blur="capsTooltip = false"
                  @keyup.enter.native="handleLogin"
                />
                <span class="show-pwd" @click="showPwd">
                  <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                </span>

              </div>
              <a href="./restore-password.html" class="restore">Забыли пароль?</a>
              <el-button :loading="loading" type="primary" @click.native.prevent="handleLogin">Войти</el-button>
    </el-form>
            <span class="create">У вас еще нет аккаунта? <a class="blue" href="./registration.html">Зарегистрироваться</a></span>
            <span class="demo mob blue">Демо режим</span>
          </div>
          <div class="info">
            <small class="text wide">Не упустите выгоду!</small>
            <h2 class="text center">Специальное предложение для клиентов Buylike</h2>
            <div class="deal">
              <img src="./deal.svg" alt="">
              <div class="limited text">При оплате тарифа “Премиум” -  3 месяца бесплатно!</div>
            </div>
            <small class="text wide">Актуально для вас!</small>
            <h2 class="text center">Последние новости</h2>
            <div class="slider">
              <div class="swiper">
			  
			  
			  <Slider />
			  
			  
                
                
              </div>
            </div>
          </div>

    <el-dialog title="Or connect with" :visible.sync="showDialog">
      text
      <social-sign />
    </el-dialog>

    </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import SocialSign from './components/SocialSignin'
import Slider from '../../components/Slider/index.vue'

export default {
  name: 'Login',
  components: { SocialSign, Slider },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap');

.slick-dots {
    width: auto;
    bottom: -35px;
}
.slick-dots li.slick-active button:before {
    opacity: 0.75;
    color: white;
}
.slick-dots li button:before {
    font-size: 11px;
    line-height: 20px;
    width: 11px;
    height: 11px;
    color: rgba(255, 255, 255, 0.2);
    opacity:1;
}
.slick-dots li.slick-active button:before {
    color: white;
}
.slick-dots li {
    width: 10px;
    height: 16px;
}

* {
  box-sizing: border-box;
  font-family: "Inter";
  margin: 0;
}


header .demo.desk{
  display: none;
}
button {
  outline: none;
  border-style: none;
  box-shadow: none;
  background-color: transparent;
}
.demo.mob {
  margin: 80px 0 72px;
  text-align: center;
}

header {
  padding: 40px 0 48px;
}

h1 {
  margin: 0 0 32px;
  font-size: 24px;
  color: #5c5e6f;
}
h2 {
  margin: 0 auto;
  font-size: 18px;
  width: 272px;
}
.blue {
  color: #2F42EE;
  text-decoration: none;
}

input.el-input__inner {
  outline: none;
  box-shadow: none;
  border: none;
}

.demo{
  display: block;
  padding: 8px 17px;
  border: 2px solid #DEE0EA;
  border-radius: 8px;
  color: #2F42EE;
  text-decoration: none;
}

.info {
  padding: 0 0 80px;
  background: linear-gradient(147.33deg, #2FADE2 0%, #2F42EE 48.92%, #5508A3 100%);
  overflow: auto;
  max-height: 100vh;
}

@media(min-width: 768px) {
  header {
    padding: 40px 0 56px;
    display: flex;
    justify-content: space-between;
  }
  header .demo.desk{
    display: block;
  }
  .demo.mob {
    display: none;
  }
  h1 {
    font-size: 32px;
  }
  h2 {
    width: 370px;
    font-size: 24px;
  }
    
}

@media(min-width: 1024px) {
  h1 {
    font-size: 40px;
  }
  header {
    padding: 64px 0 80px;
  }
}

@media(min-width: 1240px) {
  h1 {
    font-size: 24px;
  }
  h2 {
    font-size: 24px;
    padding: 0 0 0 96px;
  }
  header {
    padding: 64px 0 251px;
  }
}

.create {
  display: block;
  margin: 0 -7px;
  font-size: 12px;
  text-align: center;
  font-weight: 600;
}
.text {
  color: #fff;
}
.alert {
  display: flex;
  padding: 8px 20px;
  margin: 0 0 24px;
  background: rgba(251, 82, 82, 0.1);
  border-radius: 8px;
  justify-content: space-between;
  font-size: 14px;
}

.alert.hidden {
  display: none;
}
.alert span {
  padding: 0 22px 0 17px;
}
.wide {
  display: block;
  margin: 0 0 8px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
  font-size: 10px;
  line-height: 16px;
  color: rgba(10, 12, 32, 0.6);
}
.text.wide {
  padding: 64px 0 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 10px;
}

.deal {
  position: relative;
  padding: 0 0 56px;
  margin: 32px 0 0;
  z-index: 1;
}

.deal:before {
  content: " ";
  position: absolute;
  top: 56px;
  left: 50%;
  transform: translateX(-50%);
  width: 240px;
  height: 260px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 32px;
  z-index: -1;
}

.slider {
  padding: 0 24px;
}

.slider {
  padding: 0 24px;
  margin: 24px 0 0;
  height: auto;
}

.limited {
  margin: 0 auto;
  width: 192px;
  font-weight: 700;
  font-size: 18px;
}

.deal img {
  display: block;
  margin: 0 auto 18px;
  z-index: 1;
}

.center {
  text-align: center;
}


.slider .swiper-pagination {
  display: inline-block;
  width: auto!important;
  position: static;
  text-align: left;
}

.slider .swiper-pagination-bullet {
  background: rgba(255, 255, 255, 0.2);
}

.slider .swiper-pagination-bullet-active {
  background: #FFFFFF;
}

.slider .swiper-button-next,
.slider .swiper-button-prev {
  position: static;
}

.nav-wrap {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-top: 10px;
  padding: 0 10px;
}

.swiper .next,
.swiper .prev {
  display: inline-block;
  padding: 11px 12px;
  font-size: 0;
  text-align: left;
  border: 1px solid #FFFFFF;
  border-radius: 8px;
  cursor: pointer;
}

.swiper .next {
  transform: rotate(180deg);
}
.swiper .prev {
  margin: 0 25px 0 0;
}

@media(min-width: 768px) {
  .create {
    margin: 0 0 104px;
  }
  .deal:before {
    width: 434px;
  }
  .deal img {
    transform: translateX(128px);
  }
  .limited {
    width: 300px;
    transform: translateX(-35px);
  }
}

@media(min-width: 1024px) {
  .info {
    min-height: 100vh;
  }
  .wrap {
    display: flex;
  }
  .center {
    text-align: left;
    padding: 0 0 0 40px;
    margin: 0;
    width: 500px;
    font-size: 32px;
  }
  .deal:before {
    width: 481px;
  }
  .limited {
    transform: translateX(-10px);
    width: 390px;
    font-size: 24px;
  }
  .text.wide {
    text-align: left;
    padding: 10px 0 0 40px;
  }
  .text.wide:first-of-type {
    padding: 64px 0 0 40px;
  }
}

@media(min-width: 1240px) {
  .wide {
    font-size: 12px;
    text-transform: initial;
  }
  .text.wide {
    padding: 50px 0 0 96px;
  }

  .text.wide:first-of-type {
    padding: 64px 0 0px 96px;
  }
  .text.center {
    padding: 0 0 0 96px;
    width: 570px;
  }
  .deal:before {
    transform: translate(0);
    top: 35px;
    left: 96px;
    width: 514px;
    height: 280px;
  }
  .deal .text.limited {
    transform: translate(0);
    margin: 0 0 0 128px;
  }
  .deal img {
    transform: translate(0);
    margin: 0 0 0 380px;
  }
}


.form {
  padding: 0 24px;
  overflow: auto;
  max-height: 100vh;
}

form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

input.el-input__inner[type="checkbox"] {
  display: none;
}

input.el-input__inner:focus:not([type="submit"]) {
  background-color: transparent;
  box-shadow: 0px 0px 0px 4px rgba(47, 66, 238, 0.1);
  border: 1px solid #2F42EE;
}

input.el-input__inner[type="checkbox"] + label {
  display: block;
  width: 240px;
  font-size: 14px;
  margin: 8px 0 24px;
  padding: 0 0 0 32px;
  position: relative;
}

input.el-input__inner[type="checkbox"] + label:before {
  content: "";
  position: absolute;
  left: 0;
  width: 14px;
  height: 14px;
  border: 2px solid #DEE0EA;
  border-radius: 4px;
}

input.el-input__inner[type="checkbox"]:checked + label:before {
  border-color: #2F42EE;
  background-image: url("check.svg");
  background-repeat: no-repeat;
  background-size: 10px;
  background-position: center;
  background-color: #2F42EE;
}

.restore {
  margin: 0 0 24px;
  color: #2F42EE;
  text-decoration: none;
  font-size: 12px;
  font-weight: 600;
}

.input {
  width: 100%;
}
.errorText {
  display: none;
  padding: 0 0 16px;
  font-size: 12px;
  line-height: 18px;
  color: #FB5252;

}

.input.error .errorText {
  display: block;
}

.input.error input.el-input__inner {
  margin: 0 0 8px;
  box-shadow: 0px 0px 0px 4px rgba(251, 82, 102, 0.1);
  border: 1px solid #FB5252;
}

input.el-input__inner {
  display: block;
  width: 100%;
  padding: 10px 16px;
  margin: 0 0 16px;
  font-size: 14px;
  line-height: 22px;
  background: #F2F4FE;
  border-radius: 8px;
  color: rgba(10, 12, 32, 0.6);
  border: 1px solid transparent;
  box-shadow: 0px 0px 0px 4px transparent;

}

.el-input--medium .el-input__inner {
  height: auto;
  line-height: 22px;
}

input.el-input__inner[type="password"],
input.el-input__inner[type="text"] {
  padding-right: 40px;
}

.password {
  width: 100%;
  position: relative;
}

.password .show-pwd {
  position: absolute;
  top: 14px;
  right: 17px;
  cursor: pointer;
}

.el-button--primary {
  display: block;
  width: 100%;
  padding: 9px 0;
  background-color: #2F42EE;
  color: #fff;
  cursor: pointer;
  border-color: #2F42EE;
  line-height: 22px;
  margin: 0 0 16px;
  font-size: 14px;
  border-radius: 8px;
}



@media(min-width: 768px) {
  input.el-input__inner[type="checkbox"] + label {
    width: auto;
  }
  .form {
    padding: 0 148px;
  }
 
}

@media(min-width: 1024px) {
  input.el-input__inner[type="checkbox"] + label {
    width: 313px;
  }
  .form {
    min-width: 435px;
    padding: 0 64px;
  }
  .info {
    width: 100%;
  }
}

@media(min-width: 1240px) {
  input.el-input__inner[type="checkbox"] + label {
    width: auto;
  }
  .form {
    padding: 0 24px 0 56px;
    min-width: 536px;
  }
}

@media(min-width: 1920px) {
  .form {
    padding: 0 24px 0 396px;
    min-width: 876px;
  }
}


.create {
  display: block;
  margin: 0 -7px;
  font-size: 12px;
  text-align: center;
  font-weight: 600;
}
.slide-info {
  margin: 24px auto;
  padding: 24px;
  width: 272px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  color: #fff;
  display: inline-block;
  max-width: 248px;
  margin: 12px;
  p {
    padding: 16px 0;
  }
  small {
    color: rgba(255, 255, 255, 0.6);
  }
}
@media only screen and (min-width: 768px) {
    .create {
      margin: 0 0 68px;
    }
  .slider {
    width: 600px;
    margin: 0 auto;
    width: 585px;
  }
}
@media only screen and (min-width: 1024px) {
  .slide-info {
    margin: 9px;
  }

  @media only screen and (min-width: 1240px) {
    .slider {
      margin: 42px 0 0 72px;
    }
  }

}

@media(max-width: 1240px) {
    body {
      overflow:hidden;
    }
}
@media(max-width: 1024px) {
    body {
      overflow:auto;
    }
    .info, .form {
    overflow: inherit;
    max-height: inherit;
    }
}
</style>
