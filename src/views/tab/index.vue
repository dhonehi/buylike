<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card" class="goods-tabs">
      <el-tab-pane v-for="(item, index) in tabMapOptions" :key="item.key" :name="item.key">
        <span slot="label">
          <img
            v-if="item.key === 'nocost'"
            style="margin-right: 10px;vertical-align: text-top;"
            src="@/assets/goods/warning.svg"
            alt="warning">
          {{ `${item.label} ${labelCounters[index]}` }}
        </span>
        <tab-header :label="tabMapOptions.find(tab=>tab.key===activeName)"/>

        <keep-alive>
          <tab-pane v-if="activeName===item.key" :type="item.key" @create="showCreatedTimes"/>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TabPane from './components/TabPane'
import TabHeader from '@/views/tab/components/TabHeader'

export default {
  name: 'Tab',
  components: { TabHeader, TabPane },
  data() {
    return {
      tabMapOptions: [
        { label: 'Все товары', key: 'all' },
        { label: 'Без себестоимости', key: 'nocost' },
        { label: 'Можно объединить', key: 'combined' },
        { label: 'Без фото', key: 'nophoto' },
        { label: 'С ошибками', key: 'error' },
        { label: 'В архиве', key: 'archive' }
      ],
      labelCounters: [15, 2, 8, 3, 5, 1],
      activeName: 'all',
      createdTimes: 0
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    // init the default selected tab
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
    document.getElementById('app').classList.add('tabs')
  },
  beforeDestroy() {
    document.getElementById('app').classList.remove('tabs')
  },
  methods: {
    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1
    }
  }
}
</script>

<style scoped>
.tab-container {
  margin: 30px;
}
</style>

<style lang="scss">
.goods-tabs {
  border: none!important;
  box-shadow: none!important;

  .el-tabs__header {
    background: #F2F4FE;
  }

  .el-tabs__header .el-tabs__item.is-active, .el-tabs__header .el-tabs__item:not(.is-disabled):hover{
    color: #0A0C20!important;
  }

  .el-tabs__header .el-tabs__item.is-active{
    background: #FFFFFF;
    border-radius: 8px 8px 0px 0px;
  }
}
.tabs .app-main{
  background: #F2F4FE;
}
</style>
