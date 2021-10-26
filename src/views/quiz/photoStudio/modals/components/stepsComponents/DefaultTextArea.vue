<template>
  <div class="default-input-goods" :class="{'default-input--error': error}">
    <label v-if="label" class="default-input-goods__label">{{ label }}</label>
    <div class="default-input-goods__item-flex">
      <el-input
        v-model="data"
        type="textarea"
        class="comment-area"
        :autosize="{ minRows: 5}"
        :placeholder="placeholder"
      />
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DefaultTextArea',
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
<style lang="scss">
.comment-area{
  max-width: calc(100% - 40px);
}
</style>
