<template>
  <el-steps
    :active="active"
    :space="windowWidth > 1200 ? '100px' : '25%'"
    :direction="windowWidth > 1200 ? 'vertical' : 'horizontal'"
    :class="windowWidth > 1200 ? 'vertical' : 'horizontal'"
    class=""
    align-center
    finish-status="success"
  >
    <el-step id="step-one" title="Шаг 1" description="Контактные данные" />
    <el-step id="step-two" title="Шаг 2" description="Формат съёмки" />
    <el-step id="step-three" title="Шаг 3" description="Вопросы о товаре" />
    <el-step id="step-four" title="Шаг 4" :description="windowWidth<450?'Сведения':'Дополнительные сведения'" />
  </el-steps>
</template>

<script>
export default {
  name: 'ModalSteps',
  props: {
    active: {
      type: Number,
      default() {
        return 0
      }
    },
    windowWidth: {
      type: Number,
      default() {
        return 0
      }
    },
  },
  mounted() {
    document.querySelectorAll('.el-step').forEach((item, index) => {
      item.addEventListener('click', () => {
        this.$emit('changeActive', index)
      })
    })
  }
}
</script>

<style lang="scss">
.el-step__description {
  word-break: break-word;
  max-width: 150px;
  padding: 0 !important;
}

.el-step.is-vertical {
  width: 150px;
}
</style>
