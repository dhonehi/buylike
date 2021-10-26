<template>
  <el-input
    v-model="data"
    class="tab-tools__search default-search"
    prefix-icon="el-icon-search"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  name: 'SearchInput',
  model: { prop: 'value', event: 'input' },
  props: {
    value: {
      type: String,
      default: function() {
        return ''
      }
    },
    placeholder: {
      type: String,
      default: function() {
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
    data() {
      this.$emit('input', this.data)
    },
    value() {
      this.data = this.value
    }
  },
  mounted() {
    this.data = this.value
  }
}
</script>

<style lang="scss">
.default-search{
  .el-input__inner{
    width: 100% !important;
  }
}
</style>
