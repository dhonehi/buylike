<template>
  <div class="marketplace-popover default-popover">
    <div v-for="item in filters" :key="item.label" class="default-popover__select-item">
      <el-checkbox v-model="item.active" @change="handleChange">{{ item.label }}</el-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MarketplacePopover',
  data() {
    return {
      filters: [
        {
          label: 'Ozon',
          active: true
        },
        {
          label: 'Wildberries',
          active: true
        }
      ]
    }
  },
  methods: {
    handleChange() {
      this.$emit('save', this.filters.filter(item => item.active).map(item => item.label))
    }
  }
}
</script>

<style scoped>
.marketplace-popover{
  width: 240px!important;
}
</style>
