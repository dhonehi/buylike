<template>
  <div class="brand-popover default-popover">
    <div class="default-popover__search">
      <search-input v-model="search" placeholder="Поиск бренда"/>
    </div>
    <div class="default-popover__tools">
      <span @click="selectAll">Выбрать все</span>
      <span @click="unselectAll">Снять все</span>
    </div>
    <div v-for="item in filteredData" :key="item.label" class="default-popover__select-item">
      <el-checkbox v-model="item.active">{{ item.label }}</el-checkbox>
    </div>
    <el-divider/>
    <popover-buttons @save="save" @reset="reset"/>
  </div>
</template>

<script>
import SearchInput from '@/views/goods/components/SearchInput'
import PopoverButtons from '@/views/goods/components/PopoverButtons'

export default {
  name: 'BrandPopover',
  components: { PopoverButtons, SearchInput },
  data() {
    return {
      filters: [
        {
          label: 'Samsung',
          active: true
        },
        {
          label: 'Philips',
          active: true
        },
        {
          label: 'LG',
          active: true
        }
      ],
      search: ''
    }
  },
  computed: {
    filteredData() {
      if (!this.search?.length) {
        return this.filters
      } else {
        return this.filters.filter(item => item.label.toLowerCase().match(this.search.toLowerCase()))
      }
    },
    selectedFilters() {
      return this.filters.filter(item => item.active).map(item => item.label)
    }
  },
  methods: {
    selectAll() {
      // eslint-disable-next-line no-return-assign
      this.filters.forEach(item => item.active = true)
    },
    unselectAll() {
      // eslint-disable-next-line no-return-assign
      this.filters.forEach(item => item.active = false)
    },
    save() {
      this.search = ''
      this.$emit('save', this.selectedFilters)
    },
    reset() {
      this.selectAll()
      this.search = ''
      this.$emit('reset')
    }
  }
}
</script>

<style lang="scss">
.brand-popover {
  .el-divider {
    margin: 0;
  }
}
</style>
