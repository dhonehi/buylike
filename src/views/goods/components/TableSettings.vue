<template>
  <div id="settingsCustom" class="table-settings">
    <div class="table-settings__item">Редактировать</div>
    <div class="table-settings__item">{{ ozon ? 'Станица на Ozon' : 'Объединить с другим товаром' }}</div>
    <div class="table-settings__item">{{ wb ? 'Станица на Wildberries': 'Объединить с другим товаром' }}</div>
    <div class="table-settings__item">Перенести в архив</div>
  </div>
</template>

<script>
export default {
  name: 'TableSettings',
  props: {
    selectedSettingsItem: Object
  },
  computed: {
    ozon() {
      return this.selectedSettingsItem?.marketplace?.some(item => item === 'ozon')
    },
    wb() {
      return this.selectedSettingsItem?.marketplace?.some(item => item === 'wb')
    }
  }
}
</script>

<style scoped lang="scss">
.table-settings {
  width: 260px;
  padding: 12px 15px;
  background: #FFFFFF;
  border: 1px solid #DEE0EA;
  box-sizing: border-box;
  box-shadow: 0 8px 16px rgba(5, 7, 20, 0.06);
  border-radius: 8px;

  &__item {
    height: 50px;
    display: flex;
    align-items: center;
    cursor: pointer;

    font-family: Inter, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #0A0C20;
    transition: color .2s ease-in;

    &:hover {
      color: #2F42EE;
    }
  }
}
</style>
