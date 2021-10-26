<template>
  <div class="default-radio-goods" :class="{'default-input--error': error}">
    <label v-if="label" class="default-input-goods__label">{{ label }}</label>
    <div>
      <el-radio v-for="item in options" :key="item" v-model="data" :label="item">{{ item }}</el-radio>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultRadioButton',
  model: { prop: 'value', event: 'input' },
  props: {
    value: {
      type: String,
      default() {
        return ''
      }
    },
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
    placeholder: {
      type: String,
      default() {
        return ''
      }
    },
    options: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      data: ''
    }
  },
  watch: {
    value() {
      this.data = this.value
    },
    data() {
      this.$emit('input', this.data)
    }
  }
}
</script>

<style lang="scss">
.default-radio-goods{
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 10px;
  }
  > div {
    display: flex;
    flex-direction: column;
  }
}
</style>

