<template>
  <div class="components-container">
    <el-drag-select v-model="value" style="width:500px;" multiple placeholder="Выберите...">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-drag-select>

    <div style="margin-top:30px;">
      <el-tag v-for="item of value" :key="item" style="margin-right:15px;">
        {{ item }}
      </el-tag>
    </div>
  </div>
</template>

<script>
import ElDragSelect from '@/components/DragSelect' // base on element-ui

export default {
  name: 'DragSelectDemo',
  components: { ElDragSelect },
  data() {
    return {
      value: ['Яблоко', 'Банан', 'Апельсин'],
      options: [{
        value: 'Яблоко',
        label: 'Яблоко'
      }, {
        value: 'Банан',
        label: 'Банан'
      }, {
        value: 'Апельсин',
        label: 'Апельсин'
      }, {
        value: 'Груша',
        label: 'Груша'
      }, {
        value: 'Клубника',
        label: 'Клубника'
      }]
    }
  }
}
</script>
