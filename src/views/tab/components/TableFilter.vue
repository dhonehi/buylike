<template>
  <div id="filter" class="table-filter">
    <div class="table-filter__header">
      Настройка таблицы
    </div>
    <el-divider class="table-filter__divider" />
    <div class="table-filter__body">
      <div v-for="item in filterItems" :key="item.label" class="table-filter__item">
        <span>{{ item.label }}</span>

        <el-switch v-model="item.active" active-color="#2F42EE" inactive-color="#E9EBF1" :disabled="item.required" />
      </div>
    </div>
    <el-divider class="table-filter__divider" />
    <div class="table-filter__footer">
      <div class="table-filter__footer-button" @click="clickButtonHandler">
        {{ activeNotDisabledFilters.length === 7 ? 'Выключить' : 'Включить' }} все необязательные
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableFilter',
  data() {
    return {
      filterItems: [
        {
          label: 'Фото',
          required: false,
          active: true
        },
        {
          label: 'Маркетплейс',
          required: true,
          active: true
        },
        {
          label: 'Buylike ID',
          required: true,
          active: true
        },
        {
          label: 'Наименование',
          required: true,
          active: true
        },
        {
          label: 'Категория',
          required: true,
          active: true
        },
        {
          label: 'Бренд',
          required: false,
          active: true
        },
        {
          label: 'Цвет',
          required: false,
          active: true
        },
        {
          label: 'Артикул Ozon',
          required: false,
          active: true
        },
        {
          label: 'Артикул Wildberries',
          required: false,
          active: true
        },
        {
          label: 'Штрихкод Ozon',
          required: false,
          active: true
        },
        {
          label: 'Штрихкод Wildberries',
          required: false,
          active: true
        },
        {
          label: 'Дата создания',
          required: true,
          active: true
        },
        {
          label: 'Себестоимость',
          required: true,
          active: true
        },
        {
          label: 'Цена Ozon',
          required: true,
          active: true
        },
        {
          label: 'Цена Wildberries',
          required: true,
          active: true
        }
      ]
    }
  },
  computed: {
    activeFilters() {
      return this.filterItems.filter(item => item.active)
    },
    activeNotDisabledFilters() {
      return this.filterItems.filter(item => item.active && !item.required)
    }
  },
  watch: {
    activeFilters() {
      this.$emit('handleChange', this.filterItems)
    }
  },
  mounted() {
    this.$emit('handleChange', this.filterItems)
  },
  methods: {
    clickButtonHandler() {
      if (this.activeNotDisabledFilters.length === 7) {
        this.filterItems.forEach(item => {
          if (!item.required) item.active = false
        })
      } else {
        this.filterItems.forEach(item => {
          if (!item.required) item.active = true
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.table-filter {
  width: 375px;
  position: absolute;
  opacity: 0;
  padding: 15px;
  top: 45px;
  right: 0;
  z-index: -1;
  background: #FFFFFF;
  border: 1px solid #DEE0EA;
  box-sizing: border-box;
  box-shadow: 0 16px 24px rgba(5, 7, 20, 0.06);
  border-radius: 16px;

  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #0A0C20;

  transition: opacity .2s ease-in;

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    span {
      font-size: 14px;
      line-height: 22px;
    }
  }

  &__footer {
    display: flex;
    justify-content: right;

    &-button {
      border: 2px solid #DEE0EA;
      border-radius: 8px;
      padding: 5px 10px;

      display: flex;
      align-items: center;
      justify-content: center;
      width: 260px;
      height: 40px;

      font-family: Inter, sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 24px;

      color: #2F42EE;

      cursor: pointer;
    }
  }
}
</style>

<style lang="scss">
.table-filter__divider {
  margin: 16px 0 10px 0;
}

.table-filter {
  .el-switch.is-disabled .el-switch__core {
    background: #E9EBF1 !important;
    border-color: #E9EBF1 !important;
  }
}
</style>
