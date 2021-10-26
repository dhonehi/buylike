<template>
  <div class="tab-header">
    <div class="tab-name">{{ label.label }}</div>
    <div class="tab-tools">
      <el-input v-model="search" class="tab-tools__search" prefix-icon="el-icon-search" placeholder="Поиск" />
      <div class="tab-tools__button">
        <img src="@/assets/goods/download.svg" alt="download">
      </div>
      <div class="tab-tools__button">
        <img src="@/assets/goods/upload.svg" alt="upload">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabHeader',
  props: {
    label: Object
  },
  data() {
    return {
      search: ''
    }
  }
}
</script>

<style scoped lang="scss">

.tab-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.tab-name {
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 28px;
  color: #0A0C20;
}
</style>

<style lang="scss">
.tab-tools {

  display: flex;
  align-items: center;

  &__search{
    .el-input__inner{
      width: 240px;
      height: 40px;
      background: #F2F4FE;
      border-radius: 8px;
      border: unset;
    }

    margin-right: 10px;
  }

  &__button{
    background: #F2F4FE;
    border-radius: 12px;
    min-width: 40px;
    width: 40px;
    height: 40px;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    &:last-child{
      margin-left: 10px;
    }
  }
}
</style>
