<template>
  <div class="table-wrapper" style="position:relative; min-height: 660px">
    <data-tables
      v-loading="loading"
      :data="filteredData || []"
      border
      fit
      highlight-current-row
      class="tab-pane-table"
      :total="listQuery.limit"
      :current-page.sync="listQuery.page"
      :page-size.sync="listQuery.limit"
      :pagination-props="{ pageSizes: [5, 10, 20], background: true, layout: 'total, sizes, prev, pager, next' }"
    >
      <el-table-column
        v-loading="loading"
        fixed
        align="center"
        width="45"
        type="selection"
      />

      <el-table-column v-if="isVisible('Фото')" width="60" align="center" label="Фото" prop="photo">
        <template slot-scope="scope">
          <el-image :src="scope.row.photo" :preview-src-list="[scope.row.photo]" alt="photo"/>
        </template>
      </el-table-column>

      <el-table-column v-if="isVisible('Маркетплейс')" width="130" align="center">
        <template slot="header">
          <el-popover
            placement="bottom-end"
            popper-class="table-filter-popover"
            style="cursor: pointer"
            :class="{'filter--active': filters.marketplace.active}"
            trigger="click"
          >
            <marketplace-popover @save="save('marketplace', $event)"/>
            <div slot="reference" style="display: flex; align-items: center">
              Маркетплейс <img class="img-to-svg" src="@/assets/goods/sort.svg" alt="sort">
            </div>
          </el-popover>
        </template>
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.marketplace.some(item=>item==='Wildberries')"
            content="Товар размещен на Wildberries"
            placement="bottom"
            popper-class="marketplace-tooltip"
            effect="light"
          >
            <img
              class="mp-img"
              src="@/assets/goods/wb.svg"
              alt="mp"
            >
          </el-tooltip>

          <el-tooltip
            v-if="scope.row.marketplace.some(item=>item==='Ozon')"
            content="Товар размещен на Ozon"
            popper-class="marketplace-tooltip"
            placement="bottom"
            effect="light"
          >
            <img
              class="mp-img"
              src="@/assets/goods/ozon.svg"
              alt="mp"
            >
          </el-tooltip>
        </template>
      </el-table-column>

      <el-table-column v-if="isVisible('Buylike ID')" width="90" align="center" label="Buylike ID" prop="buylikeId"/>

      <el-table-column v-if="isVisible('Наименование')" width="200" align="center" label="Наименование" prop="name"/>

      <el-table-column v-if="isVisible('Категория')" width="150" align="center" prop="cat">
        <template slot="header">
          <el-popover
            placement="bottom-end"
            popper-class="table-filter-popover"
            style="cursor: pointer"
            trigger="click"
          >
            <category-popover @save="save('category', $event)" @reset="reset('category')"/>
            <div
              slot="reference"
              ref="categoryPopover"
              :class="{'filter--active': filters.category.active}"
              style="display: flex; align-items: center; justify-content: center"
            >
              Категория <img class="img-to-svg" src="@/assets/goods/sort.svg" alt="sort">
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column v-if="isVisible('Бренд')" width="150" align="center" prop="brand">
        <template slot="header">
          <el-popover
            placement="bottom-end"
            popper-class="table-filter-popover"
            style="cursor: pointer"
            trigger="click"
          >
            <brand-popover @save="save('brand', $event)" @reset="reset('brand')"/>
            <div
              slot="reference"
              ref="brandPopover"
              :class="{'filter--active': filters.brand.active}"
              style="display: flex; align-items: center; justify-content: center"
            >
              Бренд <img class="img-to-svg" src="@/assets/goods/sort.svg" alt="sort">
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column v-if="isVisible('Цвет')" width="150" align="center" label="Цвет" prop="color"/>

      <el-table-column
        v-if="isVisible('Артикул Ozon')"
        width="150"
        align="center"
        label="Артикул Ozon"
        prop="articulOzon"
      />

      <el-table-column
        v-if="isVisible('Артикул Wildberries')"
        width="200"
        align="center"
        label="Артикул Wildberries"
        prop="articulWb"
      />

      <el-table-column
        v-if="isVisible('Штрихкод Ozon')"
        width="150"
        align="center"
        label="Штрихкод Ozon"
        prop="codeOzon"
      />

      <el-table-column
        v-if="isVisible('Штрихкод Wildberries')"
        width="200"
        align="center"
        label="Штрихкод Wildberries"
        prop="codeWb"
      />

      <el-table-column
        v-if="isVisible('Дата создания')"
        width="150"
        align="center"
        label="Дата создания"
        prop="createdAt"
      />

      <el-table-column
        v-if="isVisible('Себестоимость')"
        width="150"
        align="center"
        label="Себестоимость, ₽"
        prop="cost"
      />

      <el-table-column v-if="isVisible('Цена Ozon')" width="150" align="center" label="Цена Ozon, ₽" prop="costOzon"/>

      <el-table-column
        v-if="isVisible('Цена Wildberries')"
        width="175"
        align="center"
        label="Цена Wildberries, ₽"
        prop="costWb"
      />

      <el-table-column width="100" align="center" fixed="right">
        <template slot="header">
          <div id="thFilter" style="display: flex;align-items: center; justify-content: center;">
            <img id="th-filter" src="@/assets/goods/filter.svg" style="cursor: pointer" alt="filter" @click="filterClickHandler">
          </div>
        </template>

        <template slot-scope="scope">
          <div class="action-buttons">
            <div class="action-buttons__edit" @click="editClickHandler">
              <img src="@/assets/goods/edit.svg" alt="edit">
            </div>
            <el-popover
              placement="bottom-end"
              popper-class="table-settings-popover"
              :offset="1000"
              style="cursor: pointer"
              trigger="click"
            >
              <table-settings :selected-settings-item="selectedSettingsItem ? selectedSettingsItem.data : {}"/>
              <div slot="reference" class="action-buttons__settings" @click="settingsClickHandler(scope, $event)">
                <img src="@/assets/goods/settings.svg" alt="settings">
              </div>
            </el-popover>
          </div>
        </template>
      </el-table-column>
    </data-tables>
    <table-filter @handleChange="changeFilterHandler"/>
  </div>
</template>

<script>
import { fetchList } from '@/api/article'
import { DataTables } from 'vue-data-tables'
import TableFilter from '@/views/tab/components/TableFilter'
import TableSettings from '@/views/tab/components/TableSettings'
import MarketplacePopover from '@/views/goods/components/MarketplacePopover'
import CategoryPopover from '@/views/goods/components/CategoryPopover'
import BrandPopover from '@/views/goods/components/BrandPopover'
import imgToSvg from '@/views/goods/helpers/imgToSvg'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  components: {
    BrandPopover,
    CategoryPopover,
    MarketplacePopover,
    TableSettings,
    TableFilter,
    DataTables
  },
  props: {
    type: {
      type: String,
      default: 'all'
    }
  },
  data() {
    return {
      list: null,
      dataList: [
        {
          photo: require('@/assets/goods/photos/Background1.png'),
          marketplace: ['Wildberries', 'Ozon'],
          buylikeId: 23213,
          name: 'Samsung S51F34R',
          cat: 'Телевизоры',
          brand: 'Samsung',
          color: 'Черный',
          articulOzon: '123456789',
          articulWb: '123456789',
          codeOzon: '2000458847224',
          codeWb: '2000458847224',
          createdAt: '21.06.2021 20:37',
          cost: '8.600',
          costOzon: '12 900.00',
          costWb: '12 900.00'
        },
        {
          photo: require('@/assets/goods/photos/Background2.png'),
          marketplace: ['Wildberries'],
          buylikeId: 32131,
          name: 'Philips S51F34R',
          cat: 'Телевизоры',
          brand: 'Philips',
          color: 'Серый',
          articulOzon: '123456789',
          articulWb: '123456789',
          codeOzon: '2000458847224',
          codeWb: '2000458847224',
          createdAt: '21.06.2021 20:37',
          cost: '8.600',
          costOzon: '12 900.00',
          costWb: '12 900.00'
        },
        {
          photo: require('@/assets/goods/photos/Background3.png'),
          marketplace: ['Ozon'],
          buylikeId: 14124,
          name: 'LG S51F34R',
          cat: 'Телевизоры',
          brand: 'LG',
          color: 'Серый',
          articulOzon: '123456789',
          articulWb: '123456789',
          codeOzon: '2000458847224',
          codeWb: '2000458847224',
          createdAt: '21.06.2021 20:37',
          cost: '8.600',
          costOzon: '12 900.00',
          costWb: '12 900.00'
        },
        {
          photo: require('@/assets/goods/photos/Background4.png'),
          marketplace: ['Ozon'],
          buylikeId: 6323,
          name: 'Samsung S51F34R',
          cat: 'Монитор',
          brand: 'Samsung',
          color: 'Красный',
          articulOzon: '123456789',
          articulWb: '123456789',
          codeOzon: '2000458847224',
          codeWb: '2000458847224',
          createdAt: '21.06.2021 20:37',
          cost: null,
          costOzon: '12 900.00',
          costWb: '12 900.00'
        },
        {
          photo: require('@/assets/goods/photos/Background1.png'),
          marketplace: ['Wildberries', 'Ozon'],
          buylikeId: 5241,
          name: 'LG S51F34R',
          cat: 'Телевизоры',
          brand: 'LG',
          color: 'Серый',
          articulOzon: '123456789',
          articulWb: '123456789',
          codeOzon: '2000458847224',
          codeWb: '2000458847224',
          createdAt: '21.06.2021 20:37',
          cost: null,
          costOzon: '12 900.00',
          costWb: '12 900.00'
        },
        {
          photo: require('@/assets/goods/photos/Background2.png'),
          marketplace: ['Wildberries'],
          buylikeId: 3214,
          name: 'Samsung S51F34R',
          cat: 'Телевизоры',
          brand: 'Samsung',
          color: 'Черный',
          articulOzon: '123456789',
          articulWb: '123456789',
          codeOzon: '2000458847224',
          codeWb: '2000458847224',
          createdAt: '21.06.2021 20:37',
          cost: '8.600',
          costOzon: '12 900.00',
          costWb: '12 900.00'
        },
        {
          photo: require('@/assets/goods/photos/Background3.png'),
          marketplace: ['Ozon'],
          buylikeId: 42421,
          name: 'Samsung S51F34R',
          cat: 'Телевизоры',
          brand: 'Samsung',
          color: 'Черный',
          articulOzon: '123456789',
          articulWb: '123456789',
          codeOzon: '2000458847224',
          codeWb: '2000458847224',
          createdAt: '21.06.2021 20:37',
          cost: '8.600',
          costOzon: '12 900.00',
          costWb: '12 900.00'
        },
        {
          photo: require('@/assets/goods/photos/Background4.png'),
          marketplace: ['Wildberries'],
          buylikeId: 312312,
          name: 'Samsung Qd2121',
          cat: 'Телевизоры',
          brand: 'Samsung',
          color: 'Черный',
          articulOzon: '123456789',
          articulWb: '123456789',
          codeOzon: '2000458847224',
          codeWb: '2000458847224',
          createdAt: '21.06.2021 20:37',
          cost: '8.600',
          costOzon: '12 900.00',
          costWb: '12 900.00'
        },
        {
          photo: require('@/assets/goods/photos/Background1.png'),
          marketplace: ['Wildberries', 'Ozon'],
          buylikeId: 4112,
          name: 'Samsung S51F34R',
          cat: 'Телевизоры',
          brand: 'Samsung',
          color: 'Черный',
          articulOzon: '123456789',
          articulWb: '123456789',
          codeOzon: '2000458847224',
          codeWb: '2000458847224',
          createdAt: '21.06.2021 20:37',
          cost: '8.600',
          costOzon: '12 900.00',
          costWb: '12 900.00'
        },
        {
          photo: require('@/assets/goods/photos/Background2.png'),
          marketplace: ['Wildberries', 'Ozon'],
          buylikeId: 231,
          name: 'Samsung S51F34R',
          cat: 'Телевизоры',
          brand: 'Samsung',
          color: 'Черный',
          articulOzon: '123456789',
          articulWb: '123456789',
          codeOzon: '2000458847224',
          codeWb: '2000458847224',
          createdAt: '21.06.2021 20:37',
          cost: '8.600',
          costOzon: '12 900.00',
          costWb: '12 900.00'
        },
        {
          photo: require('@/assets/goods/photos/Background2.png'),
          marketplace: ['Wildberries'],
          buylikeId: 3214,
          name: 'Samsung S51F34R',
          cat: 'Телевизоры',
          brand: 'Samsung',
          color: 'Черный',
          articulOzon: '123456789',
          articulWb: '123456789',
          codeOzon: '2000458847224',
          codeWb: '2000458847224',
          createdAt: '21.06.2021 20:37',
          cost: '8.600',
          costOzon: '12 900.00',
          costWb: '12 900.00'
        },
        {
          photo: require('@/assets/goods/photos/Background3.png'),
          marketplace: ['Ozon'],
          buylikeId: 42421,
          name: 'Samsung S51F34R',
          cat: 'Телевизоры',
          brand: 'Samsung',
          color: 'Черный',
          articulOzon: '123456789',
          articulWb: '123456789',
          codeOzon: '2000458847224',
          codeWb: '2000458847224',
          createdAt: '21.06.2021 20:37',
          cost: '8.600',
          costOzon: '12 900.00',
          costWb: '12 900.00'
        },
        {
          photo: require('@/assets/goods/photos/Background4.png'),
          marketplace: ['Wildberries'],
          buylikeId: 312312,
          name: 'Samsung Qd2121',
          cat: 'Телевизоры',
          brand: 'Samsung',
          color: 'Черный',
          articulOzon: '123456789',
          articulWb: '123456789',
          codeOzon: '2000458847224',
          codeWb: '2000458847224',
          createdAt: '21.06.2021 20:37',
          cost: '8.600',
          costOzon: '12 900.00',
          costWb: '12 900.00'
        },
        {
          photo: require('@/assets/goods/photos/Background1.png'),
          marketplace: ['Wildberries', 'Ozon'],
          buylikeId: 4112,
          name: 'Samsung S51F34R',
          cat: 'Телевизоры',
          brand: 'Samsung',
          color: 'Черный',
          articulOzon: '123456789',
          articulWb: '123456789',
          codeOzon: '2000458847224',
          codeWb: '2000458847224',
          createdAt: '21.06.2021 20:37',
          cost: '8.600',
          costOzon: '12 900.00',
          costWb: '12 900.00'
        },
        {
          photo: require('@/assets/goods/photos/Background2.png'),
          marketplace: ['Wildberries', 'Ozon'],
          buylikeId: 231,
          name: 'Samsung S51F34R',
          cat: 'Телевизоры',
          brand: 'Samsung',
          color: 'Черный',
          articulOzon: '123456789',
          articulWb: '123456789',
          codeOzon: '2000458847224',
          codeWb: '2000458847224',
          createdAt: '21.06.2021 20:37',
          cost: '8.600',
          costOzon: '12 900.00',
          costWb: '12 900.00'
        }
      ],
      data: null,
      visibleColumn: {},
      listQuery: {
        page: 1,
        limit: 10,
        type: this.type,
        sort: '+id'
      },
      loading: false,
      activeColumn: null,
      selectedSettingsItem: null,
      filters: {
        marketplace: {
          data: ['Ozon', 'Wildberries'],
          active: false
        },
        category: {
          data: [],
          active: false
        },
        brand: {
          data: [],
          active: false
        }
      }
    }
  },
  computed: {
    filteredData() {
      if (!this.data) return null
      let data = this.data
      const filters = this.filters
      if (!filters.marketplace.active && !filters.category.active && !filters.brand.active) return data
      if (filters.marketplace.active) {
        data = data.filter(item => item.marketplace.some(marketplace => filters.marketplace.data.includes(marketplace)))
      }
      if (filters.category.active) {
        data = data.filter(item => filters.category.data.includes(item.cat))
      }
      if (filters.brand.active) {
        data = data.filter(item => filters.brand.data.includes(item.brand))
      }
      return data
    }
  },
  watch: {
    $route() {
      this.getDataList()
    },
    'listQuery.limit'() {
      this.changeLimitText()
    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.getDataList()
    this.changePaginationText()
    this.changeLimitText()

    this.$nextTick(() => {
      imgToSvg('.img-to-svg')
    })
    document.addEventListener('click', this.documentClickHandler)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.documentClickHandler)
  },
  methods: {
    documentClickHandler(e) {
      if (e.target.id !== 'th-filter' &&
        !e.path.some(item => item.id === 'filter') &&
        document.getElementById('filter').style.opacity === '1') {
        this.filterClickHandler()
      }
    },
    getDataList() {
      this.loading = true
      const tab = this.$route.query.tab
      if (tab === 'all' || !tab) {
        this.data = this.dataList
      } else if (tab === 'nocost') {
        this.data = this.dataList.filter(item => !item.cost)
      } else if (tab === 'combined') {
        this.data = this.dataList.filter(item => item.marketplace.length < 2)
      } else if (tab === 'nophoto') {
        this.data = this.dataList.slice(0, 3)
      } else if (tab === 'error') {
        this.data = this.dataList.slice(0, 5)
      } else if (tab === 'archive') {
        this.data = this.dataList.slice(0, 1)
      }
      this.loading = false
    },
    getList() {
      this.loading = true
      this.$emit('create') // for test
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.loading = false
      })
    },
    filterClickHandler() {
      if (document.getElementById('filter').style.opacity === '0' ||
        document.getElementById('filter').style.opacity === '') {
        document.getElementById('filter').style.zIndex = '3'
        document.getElementById('filter').style.opacity = '1'
      } else {
        document.getElementById('filter').style.opacity = '0'
        document.getElementById('filter').style.zIndex = '-1'
      }
    },
    editClickHandler() {
    },
    settingsClickHandler(data) {
      this.selectedSettingsItem = {
        id: data.$index,
        data: this.dataList[data.$index]
      }
    },
    changeFilterHandler(e) {
      this.activeColumn = e
    },
    isVisible(colName) {
      return this.activeColumn ? this.activeColumn.some(item => item.label === colName && item.active) : true
    },
    changePaginationText() {
      document.querySelectorAll('.el-pagination__total')[0].innerHTML = `Всего ${this.data.length}`
      document.querySelectorAll('.el-select-dropdown.el-popper .el-select-dropdown__item span')[0].innerHTML = '5'
      document.querySelectorAll('.el-select-dropdown.el-popper .el-select-dropdown__item span')[1].innerHTML = '10'
      document.querySelectorAll('.el-select-dropdown.el-popper .el-select-dropdown__item span')[2].innerHTML = '20'
    },
    changeLimitText() {
      this.$nextTick(() => {
        document.querySelectorAll('.el-pagination__sizes .el-input__inner')[0].value = `${this.listQuery.limit}`
      })
    },
    save(type, data) {
      this.filters[type].data = data
      this.filters[type].active = true
      if (type !== 'marketplace') {
        this.$refs[`${type}Popover`].click()
      } else {
        this.filters[type].active = data.length !== 2
      }
    },
    reset(type) {
      this.filters[type].data = []
      this.filters[type].active = false
      this.$refs[`${type}Popover`].click()
    }
  }
}
</script>

<style lang="scss" scoped>

.mp-img {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;

  &:last-child {
    left: 20px;
  }

  &:first-child {
    z-index: 1;
    left: 10px;
  }

  &:hover {
    z-index: 2;
  }
}

.action-buttons {
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    cursor: pointer;
  }

  &__edit {
    background: rgba(47, 66, 238, 0.1);
    border-radius: 8px;

    padding: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 28px;
    height: 28px;

    margin-right: 15px;
  }
}
</style>

<style lang="scss">
.img-to-svg {
  margin-left: 10px;

  path {
    stroke: #0A0C20;
    stroke-opacity: 0.4;
    transition: all .2s ease-in;
  }
}

.filter--active {
  .img-to-svg path {
    stroke: #2F42EE;
    stroke-opacity: 1;
  }
}

.table-settings-popover {
  padding: 0;
  right: 35px;
  height: 0 !important;
  width: 0 !important;
  border: none !important;
}

.default-popover {
  background: #FFFFFF;
  border: 1px solid #DEE0EA;
  width: 360px;
  box-sizing: border-box;
  box-shadow: 0px 8px 16px rgba(5, 7, 20, 0.06);
  border-radius: 8px;

  padding: 16px;

  .is-checked .el-checkbox__inner {
    background: #2F42EE !important;
    border-color: #2F42EE !important;
  }

  .is-focus .el-checkbox__inner, .el-checkbox__inner:hover {
    border-color: #DCDFE6 !important;
  }

  .el-checkbox__label {
    font-family: Inter, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;

    color: #0A0C20 !important;
  }

  .el-checkbox__inner {
    border-radius: 4px !important;

    &:after {
      border: 2px solid white !important;
      border-left: 0 !important;
      border-top: 0 !important;
      height: 5px;
      width: 2px;
      left: 4px;
      top: 2px;
    }
  }

  .default-popover {

    &__tools {
      margin: 16px 0 20px 0;

      & > span:first-child {
        margin-right: 15px;
      }

      span {
        font-family: Inter, sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 22px;
        color: #2F42EE;

        cursor: pointer;
      }
    }

    &__select-item {
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.table-filter-popover {
  padding: 0;
  height: 0 !important;
  border: none !important;
}

.tab-pane-table {
  .pagination-bar {
    margin-top: 30px;

    .el-pager {

      .active {
        background-color: #2F42EE !important;
      }
    }

    .btn-prev, .btn-next, .number {
      background: unset !important;
    }

    .el-pagination .el-select .el-input .el-input__inner {
      background: #F2F4FE;
      border-radius: 8px;
      border: none !important;
    }

    .el-pagination {
      display: flex;
      justify-content: end;
    }
  }

  thead tr th {
    width: 100%;
    background: #F2F4FE;

    font-family: Inter, sans-serif;
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 18px;
    color: rgba(10, 12, 32, 0.4);

    &:first-child {
      border-top-left-radius: 8px;
    }

    &:last-child {
      border-top-right-radius: 8px;
    }
  }

  tbody tr td {
    font-family: Inter, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    color: #0A0C20;
  }
}

.marketplace-tooltip {
  border: none !important;
  background: #FFFFFF;
  border-radius: 8px;
  width: 125px;
  word-break: break-word;

  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  font-feature-settings: 'tnum' on, 'lnum' on;
  color: #0A0C20;

  .popper__arrow {
    display: none !important;
  }
}
</style>
