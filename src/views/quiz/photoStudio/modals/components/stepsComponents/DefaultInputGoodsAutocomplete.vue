<template>
  <div class="default-input-goods-autocomplete" :class="{'default-input--error': error}">
    <label v-if="label" class="default-input-goods__label">{{ label }}</label>
    <el-autocomplete
      v-model="data"
      class="inline-input"
      :fetch-suggestions="querySearch"
      :placeholder="placeholder"
      :trigger-on-focus="false"
      @select="handleSelect"
    >
      <template slot-scope="{ item }">
        <div>{{ item }}</div>
      </template>
    </el-autocomplete>
  </div>
</template>

<script>
import goods from '../../../assets/json/goods.json'

export default {
  name: 'DefaultInputGoodsAutocomplete',
  model: { prop: 'value', event: 'input' },
  props: {
    value: {
      type: String,
      default() {
        return ''
      }
    },
    options: {
      type: Array,
      default() {
        return goods
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
    error: {
      type: Boolean,
      default() {
        return false
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
  methods: {
    querySearch(queryString, cb) {
      const goods = this.options
      const results = queryString ? goods.filter(this.createFilter(queryString)) : goods
      cb(results)
    },
    createFilter(queryString) {
      return (link) => {
        return (link.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      this.$emit('input', item)
    }
  }
}
</script>

<style scoped lang="scss">
.default-input-goods-autocomplete{
  display: flex;
  flex-direction: column;
  label {
    margin-bottom: 10px;
  }
}
</style>
