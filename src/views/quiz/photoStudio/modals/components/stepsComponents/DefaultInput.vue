<template>
  <div class="default-input-goods" :class="{'default-input--error': error}">
    <label v-if="label" class="default-input-goods__label">{{ label }}</label>
    <div class="default-input-goods__item-flex">
      <el-input v-model="data" :type="type" :pattern="type==='number' ? '\\d*':'' " :placeholder="placeholder" />
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultInput',
  model: { prop: 'value', event: 'input' },
  props: {
    value: {
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
    label: {
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
    },
    type: {
      type: String,
      default() {
        return 'text'
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

<style scoped lang="scss">
.default-input-goods{
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 10px;
  }
}
</style>
