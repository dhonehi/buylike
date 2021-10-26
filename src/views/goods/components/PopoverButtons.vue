<template>
  <div class="default-popover__footer">
    <div class="default-popover__footer-button" @click="reset">Сбросить</div>
    <div
      class="default-popover__footer-button"
      :class="disabled?'default-popover__footer-button--disabled':'default-popover__footer-button--active'"
      @click="save"
    >Применить
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopoverButtons',
  props: {
    disabled: {
      type: Boolean,
      default: function() {
        return false
      }
    }
  },
  methods: {
    reset() {
      this.$emit('reset')
    },
    save() {
      if (!this.disabled) this.$emit('save')
    }
  }
}
</script>

<style scoped lang="scss">
.default-popover__footer {
  display: flex;
  align-items: center;
  justify-content: end;
  margin-top: 15px;

  &-button {
    width: 119px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: Inter, sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 24px;

    cursor: pointer;

    &--disabled {
      cursor: no-drop;
      background: #E9EBF1 !important;
      color: rgba(10, 12, 32, 0.2) !important;
    }

    &:first-child {
      color: #2F42EE;
      border: 2px solid #DEE0EA;
      margin-right: 15px;
    }

    &:last-child {
      color: white;
      background: #2F42EE;
    }
  }
}
</style>
