<template>
  <div class="category-popover default-popover">
    <div class="default-popover__search">
      <search-input v-model="search" placeholder="Поиск категории" />
    </div>
    <div class="default-popover__tree">
      <el-tree
        ref="tree"
        :data="data"
        :props="defaultProps"
        node-key="id"
        :filter-node-method="filterNode"
        show-checkbox
        @check-change="handleCheckChange"
      />
    </div>
    <el-divider />
    <popover-buttons :disabled="selected.length===0" @reset="resetChecked" @save="save"/>
  </div>
</template>

<script>
import SearchInput from '@/views/goods/components/SearchInput'
import PopoverButtons from '@/views/goods/components/PopoverButtons'

export default {
  name: 'CategoryPopover',
  components: { PopoverButtons, SearchInput },
  data() {
    return {
      search: '',
      data: [
        {
          id: 1,
          label: 'Электроника',
          children: [{
            id: 11,
            label: 'Телевизоры и видеотехника',
            children: [{
              id: 111,
              label: 'Телевизоры'
            }, {
              id: 112,
              label: 'Видео-магнитофон'
            }, {
              id: 113,
              label: 'Монитор'
            }]
          }, {
            id: 12,
            label: 'Телефоны и смарт часы',
            children: [{
              id: 121,
              label: 'Телефоны'
            }, {
              id: 122,
              label: 'Часы'
            }]
          }]
        },
        {
          id: 2,
          label: 'Бытовая техника'
        },
        {
          id: 3,
          label: 'Красота и здоровье',
          children: [{
            id: 31,
            label: 'Косметика',
            children: [{
              id: 311,
              label: 'Помада'
            }, {
              id: 312,
              label: 'Тональный крем'
            }]
          }]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
        disabled: 'disabled'
      },
      selected: []
    }
  },
  watch: {
    search(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    handleCheckChange() {
      this.selected = this.$refs.tree.getCheckedNodes()
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
      this.search = ''
      this.$emit('reset')
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.toLowerCase().indexOf(value.toLowerCase()) !== -1
    },
    save() {
      this.search = ''
      this.$emit('save', this.selected.map(item => item.label))
    }
  }
}
</script>

<style scoped lang="scss">
.category-popover {
  width: 500px;

  .el-divider {
    margin: 0;
  }
}
</style>

<style lang="scss">
.default-popover__tree {
  margin-top: 25px;
  .el-tree-node__label {
    font-family: Inter, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #0A0C20;
  }

  .is-checked .el-checkbox__inner{
    background: #2F42EE!important;
    border-color: #2F42EE!important;
  }

  .is-indeterminate .el-checkbox__inner{
    background: #2F42EE!important;
    border-color: #2F42EE!important;
  }

  .is-focus .el-checkbox__inner, .el-checkbox__inner:hover{
    border-color: #DCDFE6!important;
  }

  .el-tree-node {
    margin-bottom: 10px;
  }
}
</style>
