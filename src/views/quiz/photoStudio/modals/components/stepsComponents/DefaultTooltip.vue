<template>
  <el-tooltip class="default-input-goods__tooltip" popper-class="default-input-goods__tooltip-content" effect="dark" placement="top">
    <div slot="content" v-html="help"> {{ help }}</div>
    <i class="el-icon-question"></i>
  </el-tooltip>
</template>

<script>
export default {
  name: 'DefaultTooltip',
  props: {
    help: {
      type: String,
      default() {
        return ''
      }
    },
  }
}
</script>

<style lang="scss">
.default-input-goods {
  i {
    margin-left: 10px;
    font-size: 20px;
  }

  &__tooltip-content {
    max-width: 250px;
    word-break: break-word;
  }
}
</style>
