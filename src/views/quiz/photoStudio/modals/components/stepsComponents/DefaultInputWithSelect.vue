<template>
  <div class="default-input-with-select" :class="{'default-input--error': error}">
    <label v-if="label" class="default-input-goods__label">{{ label }}</label>
    <el-select
      ref="select"
      v-model="data"
      filterable
      :placeholder="placeholder"
    >
      <el-option
        v-for="item in options"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>
  </div>
</template>

<script>
// import goods from '../../assets/json/goods.json'

export default {
  name: 'DefaultInputWithSelect',
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
    options: {
      type: Array,
      default() {
        return []
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
  },
}
</script>

<style scoped lang="scss">
.default-input-with-select {
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 10px;
  }
}
</style>

<style lang="scss">
.el-scrollbar {
  > .el-scrollbar__bar {
    opacity: 1!important;
  }
}
</style>
