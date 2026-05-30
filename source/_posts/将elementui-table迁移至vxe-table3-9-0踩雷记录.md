---
layout: post
title: 将elementui table迁移至vxe-table3.9.0踩雷记录
abbrlink: 35719
date: 2025-09-11 23:02:32
tags: vxe-table 踩雷记录
---

业务背景：项目中的table报表面向的人群类型较多，如财务，后勤，运营，业务，业务总，boss等，table 列过多怎么办？
期望实现根据账户角色，去记录下改用户对该表单自定义报表table的设置，
因此这种业务场景下，将现有项目的报表从elementui table 迁移到vxe-table3.9.0，实现服务端自定义列的功能就很好。
记一下踩坑记录
1、vxe-table 尽可能用最新的版本我最后用的是3.9.0 因为项目采用vue2.7版本。
结合你的项目vue版本，因为低版本的api ，在高版本api大概率被遗弃了，甚至功能不全，重新阅读文档也很费事件，因此建议采用高版本，功能全，文档全
2、i18n配置，这一块很坑，在elementui table中，i18n配置，是table组件内部处理，table组件内部会调用i8n，因此i8n配置，必须放在table组件内部，不能放在table组件外部，
因为项目需求覆盖部分的vxe-table ui 中重写部分的i18内容，这块也很坑因此直接放我就直接下面贴上我的i18n配置代码


```javascript
// main.js文件
// Vue
import Vue from "vue";
import App from "./App";
// 多国语
import i18n from "./i18n";
// 菜单和路由设置
import router from "./router";
import menuHeader from "@/menu/header";
import menuAside from "@/menu/aside";
import { frameInRoutes } from "@/router/routes";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// store
import store from "@/store/index";
// 核心插件
import d2Admin from "@/plugin/d2admin";
import VxeUITable, {VxeUI} from 'vxe-table';
import VxeUIAll from 'vxe-pc-ui'
import 'vxe-table/lib/style.css'
import { formatDate, numFormat, copyUrl, numFormat2,numberFormat } from "@/assets/js/mUtils";
import excel from "@d2-projects/vue-table-export";

import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";
import moment from "moment";
import horizontalScroll from 'el-table-horizontal-scroll'
import 'vxe-table/lib/index.css'
import 'vxe-pc-ui/lib/style.css'
import { createPinia, PiniaVuePlugin } from 'pinia'

// 设置语言
locale.use(lang);
let echarts = require("echarts");
Vue.prototype.img_host = "https://mwphoto.oss-cn-shenzhen.aliyuncs.com/";
Vue.prototype.formatDate = formatDate;
Vue.prototype.numFormat = numFormat;
Vue.prototype.numFormat2 = numFormat2;
Vue.prototype.copyUrl = copyUrl;
Vue.prototype.echarts = echarts;
Vue.prototype.$moment = moment;
Vue.prototype.numberFormat = numberFormat;
Vue.filter('numberFormat', (v)=>numberFormat(v));
// 核心插件

Vue.use(VxeUIAll)
Vue.use(VxeUITable)
Vue.use(d2Admin);
Vue.use(excel);
Vue.use(PiniaVuePlugin)
// 扩展插件
Vue.use(horizontalScroll)

// 路由就绪后初始化
router.onReady(() => {

    // 初始化固定标签
    store.dispatch("d2admin/tagsView/initAffixTags")

    // 添加当前路由
    const { name, meta } = router.currentRoute
    if (name && !meta?.hidden) {
        store.dispatch("d2admin/tagsView/addView", router.currentRoute)
    }
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
new Vue({
    router,
    store,
    pinia,
    i18n,
    render: (h) => h(App),
    created() {
        // 处理路由 得到每一级的路由设置
        this.$store.commit("d2admin/page/init", frameInRoutes);
        // 设置顶栏菜单
        this.$store.commit("d2admin/menu/headerSet", menuHeader);
        // 设置侧边栏菜单
        this.$store.commit("d2admin/menu/asideSet", menuAside);
        // 初始化菜单搜索功能
        this.$store.commit("d2admin/search/init", menuHeader);
    },
    mounted() {
        // 展示系统信息
        this.$store.commit("d2admin/releases/versionShow");
        // 用户登录后从数据库加载一系列的设置
        this.$store.dispatch("d2admin/account/load");
        // 获取并记录用户 UA
        this.$store.commit("d2admin/ua/get");
        // 初始化全屏监听
        this.$store.dispatch("d2admin/fullscreen/listen");

        // 双重保障：确保当前路由被添加
        const { name, meta } = this.$route
        if (name && !meta?.hidden) {
            this.$store.dispatch("d2admin/tagsView/addView", this.$route)
        }
    },
}).$mount("#app");


```


i18 部分重写vxe-table 内容

```javascript
import Vue from "vue";
import VueI18n from "vue-i18n";
import zhCN from 'vxe-table/lib/locale/lang/zh-CN'
import enUS from 'vxe-table/lib/locale/lang/en-US'
import { VxeUI } from 'vxe-table'
import cn from "./lang/cn";
import ja from "./lang/ja";
import en from "./lang/en";

Vue.use(VueI18n);

// 整合 VxeTable 的语言包
const messages = {
  cn: {
    ...cn,
    ...zhCN // 将 VxeTable 中文包合并到 cn 语言
  },
  en: {
    ...en,
    ...enUS // 将 VxeTable 英文包合并到 en 语言
  },
  ja: {
    ...ja
  }
};

const i18n = new VueI18n({
  locale: localStorage.getItem("lang") ? localStorage.getItem("lang") : "en",
  messages
});

// 配置vxe-table的i18n
VxeUI.setI18n('en', enUS)
VxeUI.setI18n('zh', zhCN)

// 配置 VxeUI 的自定义 i18n 函数
VxeUI.setConfig({
  i18n: (key) => {
    const lang = localStorage.getItem('lang') === 'en' ? 'en' : 'zh'
    
    // 辅助函数：根据点分隔的key路径获取嵌套对象的值
    const getNestedValue = (obj, path) => {
      return path.split('.').reduce((current, prop) => {
        return current && current[prop] !== undefined ? current[prop] : undefined
      }, obj)
    }
    
    const customZhCN = {
      'vxe.custom.setting.colVisible':'是否显示',
      'vxe.custom.setting.sortHelpTip':'点击并拖动调整顺序',
      'vxe.toolbar.custom':'列设置',
      'vxe.toolbar.fixedRight': '固定右侧',
      'vxe.toolbar.cancelFixed':'取消固定',
      'vxe.toolbar.fixedLeft': '固定左侧',
    }
    const customEnUS = {
      'vxe.custom.setting.colVisible':'Whether to display',
      'vxe.custom.setting.sortHelpTip':'Click and drag the icons to adjust the order.',
      'vxe.toolbar.custom':'Column settings',
      'vxe.toolbar.fixedRight': 'Fixed Right',
      'vxe.toolbar.cancelFixed':'Unfixed',
      'vxe.toolbar.fixedLeft': 'Fixed Left',
    }
    
    if (lang === 'en') {
      return customEnUS[key] || getNestedValue(enUS, key) || key
    } else {
      return customZhCN[key] || getNestedValue(zhCN, key) || key
    }
  }
})

// 监听语言变化，同步更新vxe-table的语言
i18n._vm.$watch('locale', (val) => {
  // 确保语言标识符正确映射
  const vxeLang = val === 'en' ? 'en' : 'zh'
  console.log('Setting VxeUI language to:', vxeLang)
  VxeUI.setLanguage(vxeLang)
})

// 初始化时也设置一次
const currentLang = localStorage.getItem("lang") || "en"
const vxeLang = currentLang === 'en' ? 'en' : 'zh'
VxeUI.setLanguage(vxeLang)

export default i18n;

```


基于vxe-table封装的table,

1、封装了配合服务端设置列的功能见init方法中的update与restoreStore方法
2、handleScroll 也就是滚动加载，文档有写的，很简单的，根本不要自己手写了，官方文档就叫滚动事件吧？(不要问我为什么，写了半天自己触底加载，因为在文档搜触底加载没找到，当时没转过来，就自己手写，结果....)
3、列宽记得给最小值minWidth,因为不设置列宽话默认百分比渲染，不会自适应容器的宽度

```vue
<template>
  <div>
    <vxe-toolbar ref="toolbarRef" custom>
      <template #buttons>
        <div>
          <vxe-button
              v-for="item in buttons"
              v-show="buttonAuth.includes(item.name)"
              :key="item.code"
              class="vxeBtn"
              :class="{ queryBut: item.primary }"
              size="mini"
              @click="clickHeaderTool(item)"
          >{{ item.name }}
          </vxe-button>
        </div>
      </template>
    </vxe-toolbar>

    <vxe-table
        :id="tableId"
        :custom-config="customConfig"
        @custom="customEvent"
        @scroll="handleScroll"
        ref="baseDataTable"
        :cell-class-name="cellClassName"
        :data="data"
        :scroll-y="{enabled: true, gt: 20}"
        :edit-config="editConfig"
        :height="dynamicTableHeight"
        :keep-source="keepSource"
        :loading="loading"
        :radio-config="{ strict: false }"
        :seq-config="{ startIndex: (page.current - 1) * page.size }"
        :tree-config="treeConfig"
        align="center"
        border
        header-align="center"
        :row-config="{ isHover: true }"
        :column-config="{ resizable: true }"
        show-overflow
        size="mini"
        @edit-closed="editClosedEvent"
        @cell-click="cellClick"
        :cell-config="{ height: rowHeight }"
    >
      <vxe-table-column
          v-if="isCheckBox && show"
          align="center"
          fixed="left"
          type="checkbox"
          width="60"
      />
      <vxe-table-column
          v-if="!isCheckBox && show"
          align="center"
          fixed="left"
          type="radio"
          width="60"
      />
      <vxe-table-column
          v-if="showSeq"
          :title="this.$t('OrderAverageDeliveryTime.no') || '序号'"
          fixed="left"
          type="seq"
          width="60"
          :tree-node="treeNode"
          align="center"
      />
      <template v-for="item in filteredColumns">
        <!-- 列组（有子列的情况） -->
        <vxe-table-colgroup
            v-if="item.children && item.children.length > 0"
            :key="item.id"
            :align="item.align"
            :edit-render="item.editRender ? item.editRender : enabledOff"
            :field="item.field"
            :formatter="item.formatter ? cellFormatter : item.formatter"
            :title="item.title"
            :tree-node="!!item.treeNode"
            :width="item.width"
            :min-width="item.minWidth"
            :fixed="item.fixed"
        >
          <vxe-column
              v-for="(value, index) in item.children"
              :key="index"
              :field="value.field"
              :title="value.title"
              :formatter="value.formatter ? cellFormatter : value.formatter"
              :width="item.width ? item.width : 120"
              :visible="value.visible !== false"
          >
            <template #default="scope">
              <slot v-if="$scopedSlots[`cell-${value.field}`]"
                    :name="`cell-${value.field}`"
                    v-bind="scope"></slot>
              <template v-else>{{ scope.row[value.field] }}</template>
            </template>
          </vxe-column>
        </vxe-table-colgroup>

        <!-- 顶级列（无子列的情况） -->
        <vxe-column
            v-else
            :key="item.id"
            :align="item.align"
            :edit-render="item.editRender ? item.editRender : enabledOff"
            :field="item.field"
            :formatter="item.formatter ? cellFormatter : item.formatter"
            :title="item.title"
            :tree-node="!!item.treeNode"
            :width="item.width"
            :min-width="item.minWidth"
            :fixed="item.fixed"
            :visible="item.visible !== false"
        >
          <!-- 添加顶级列插槽支持 -->
          <template #default="scope">
            <slot v-if="$scopedSlots[`cell-${item.field}`]"
                  :name="`cell-${item.field}`"
                  v-bind="scope"></slot>
            <template v-else>{{ scope.row[item.field] }}</template>
          </template>
        </vxe-column>
      </template>
      <vxe-table-column
          v-if="tools && tools.length > 0 && !hasOperationColumn"
          :width="toolWidth"
          field="operation"
          fixed="right"
          :title="operationTitle || '操作'"
      >
        <template #default="{ row }">
          <vxe-button
              v-for="item in tools"
              v-show="isShow(item, row)"
              :key="item.code"
              :status="item.status ? item.status : 'primary'"
              style="color: #f68d15"
              type="text"
              @click="clickRowTool(item.code, row)"
          >
            {{ item.text }}
          </vxe-button>
        </template>
      </vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
import {getSetting, saveSetting} from "@/api/columnSetting";

export default {
  name: 'DataTable',
  props: {
    initialConfig: {
      type: Object,
      default: () => ({})
    },

    //tableId
    tableId:{
      type:String,
      default: ''
    },
    // 表格展示的列
    columns: {
      type: Array,
      default: () => [],
      require: true
    },
    // 行高配置（新增）
    rowHeight: {
      type: Number,
      default: 48
    },
    // 是否为开启数据变化行监听
    keepSource: {
      type: Boolean,
      default: false
    },
    // 是否为多选框，如果为false则设置成单选框
    isCheckBox: {
      type: Boolean,
      default: true
    },
    // 是否展示选择框（多选框、单选框）
    show: {
      type: Boolean,
      default: false
    },
    // 是否展示分页
    showPage: {
      type: Boolean,
      default: true
    },
    // 只对 tree-config 配置时有效，指定为树节点
    treeNode: {
      type: Boolean,
      default: false
    },
    // 表格数据
    data: {
      type: Array,
      default: () => [],
      require: true
    },
    // 菜单布局
    layouts: {
      type: Array,
      default: () => [
        'Sizes',
        'PrevJump',
        'PrevPage',
        'Number',
        'NextPage',
        'NextJump',
        'FullJump',
        'Total'
      ]
    },
    // 是否加载中
    loading: {
      type: Boolean,
      default: false
    },
    // 表格行尾的操作按钮
    tools: {
      type: Array,
      default: () => []
    },
    // 表格树配置
    treeConfig: {
      type: Object,
      default: () => null
    },
    // 表格行尾的操作列宽度
    toolWidth: {
      type: Number,
      default: 120
    },
    // 表格头的操作按钮
    buttons: {
      type: Array,
      default: () => []
    },
    // 权限按钮
    buttonAuth: {
      type: Array,
      default: () => []
    },
    // 单元格数据的格式方法
    formatter: {
      type: Function,
      default: null
    },
    // 分页查询方法名
    pageFunctionName: {
      type: String,
      default: 'page'
    },
    // 分页条件
    page: {
      type: Object,
      default: () => ({
        current: 1,
        size: 20,
        total: 0
      })
    },
    // 表格修改条件
    editConfig: {
      type: Object,
      default: () => {
      }
    },
    // 操作列标题
    operationTitle: {
      type: String,
      default: ''
    },
    // 是否显示序号列（新增）
    showSeq: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      customConfig: null,
      internalColumns: [], // 内部管理的列配置
      isCustomConfigApplied: false, // 标记是否已应用自定义配置
      lastScrollPosition:null,
      pageSizes: [20, 50, 100, 300, 500],
      enabledOff: {
        enabled: false
      },
      tableHeight: 550
    }
  },
  computed: {
    // 修改过滤后的列，正确处理父子列的visible属性
    filteredColumns() {
      // 如果已应用自定义配置，使用内部列配置；否则使用props传入的columns
      return this.isCustomConfigApplied ? this.internalColumns : this.columns;
    },
    // 动态计算表格高度
    dynamicTableHeight() {
      const height = window.innerHeight - 320;
      return height > 550 ? 550 : Math.max(height, 300);
    }
  },
  watch: {
    // 监听columns变化，同步到内部配置
    columns: {
      handler(newColumns) {
        if (!this.isCustomConfigApplied) {
          this.internalColumns = [...newColumns];
        } else {
          // 当已应用自定义配置时，需要重新应用配置到新的columns
          this.reapplyCustomConfig(newColumns);
        }
      },
      immediate: true,
      deep: true
    }
  },

  mounted() {
    // 组件挂载后，确保高度计算正确
  this.$nextTick(() => {
    this.updateTableHeight();
    // 延迟connect操作，避免重复触发restoreStore
    setTimeout(() => {
      const $table = this.$refs.baseDataTable;
      const $toolbar = this.$refs.toolbarRef;
      if ($table && $toolbar) {
        $table.connect($toolbar);
      }
    }, 100);
  });

  // 监听窗口大小变化
  window.addEventListener('resize', this.handleResize);
  },
  async created(){
        await this.init();
  },
  beforeDestroy() {
    // 组件销毁前移除事件监听
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    async init(){
      const self = this;
      this.customConfig = {
        storage: true,
        restore: true,
        async restoreStore({ id }) {
          try {
                if (self.cachedCustomConfig) {
                    return Promise.resolve(self.cachedCustomConfig);
                }
            const result = await self.searchColumn();
            if (result && result.code === 10000 && result.resp) {
              self.applyCustomConfig(result.resp);
              self.isCustomConfigApplied = true;

              const customData = self.convertToVxeFormat(result.resp);
              return Promise.resolve(customData);
            }
            return Promise.resolve({});
          } catch (e) {
            console.error('还原自定义配置失败', e);
            return Promise.resolve({});
          }
        },
        updateStore({ id, storeData }) {
          // 直接调用你的 saveColumn 方法
          return Promise.resolve(self.saveColumn());
        }
      };
    },
    applyCustomConfig(backendData) {
      if (!backendData || !Array.isArray(backendData)) return;
      const visibilityMap = {};
      backendData.forEach(item => {
        visibilityMap[item.fieldKey] = item.isDisplay === 1;
      });

      this.internalColumns = this.columns.map(column => {
        if (column.children && column.children.length > 0) {
          const children = column.children.map(child => ({
            ...child,
            visible: visibilityMap.hasOwnProperty(child.field) ? visibilityMap[child.field] : child.visible
          }));
          return { ...column, children };
        }
        return {
          ...column,
          visible: visibilityMap.hasOwnProperty(column.field) ? visibilityMap[column.field] : column.visible
        };
      });
    },
    // 新增：重新应用自定义配置到新的columns
    reapplyCustomConfig(newColumns) {
      // 保存当前的可见性状态
      const currentVisibilityMap = {};
      this.internalColumns.forEach(column => {
        if (column.children && column.children.length > 0) {
          column.children.forEach(child => {
            currentVisibilityMap[child.field] = child.visible;
          });
        } else {
          currentVisibilityMap[column.field] = column.visible;
        }
      });

      // 将可见性状态应用到新的columns
      this.internalColumns = newColumns.map(column => {
        if (column.children && column.children.length > 0) {
          const children = column.children.map(child => ({
            ...child,
            visible: currentVisibilityMap.hasOwnProperty(child.field)
              ? currentVisibilityMap[child.field]
              : (child.visible !== false)
          }));
          return { ...column, children };
        }
        return {
          ...column,
          visible: currentVisibilityMap.hasOwnProperty(column.field)
            ? currentVisibilityMap[column.field]
            : (column.visible !== false)
        };
      });
      },
      // 保存用户自定义菜单列表属性字段
    saveColumn(){
        let newArray=[];
        const columns=this.$refs.baseDataTable.getTableColumn()
        if(columns){
          // 使用 fullColumn 而不是 visibleColumn，包含所有列
          columns.fullColumn.map((item)=>{
            // 跳过序号列、选择框列等系统列
            if(item.type === 'seq' || item.type === 'checkbox' || item.type === 'radio' || item.field === 'operation'){
              return;
            }
            const fieldName = this.$i18n.locale === 'cn' ? 'fieldNameCn' : 'fieldNameEn';
            const obj = {
              fieldKey: item.field,
              isDisplay: item.visible === true ? 1 : 0
            };
            obj[fieldName] = item.title;
            newArray.push(obj);
          })
          const saveObj={
            webPageKey:this.tableId,
            mwhReportUserConfigList:newArray||[]
          }
          saveSetting(saveObj).then((res)=>{
            if(res.code ===10000){
              this.$message.success(res.msg);
            }
          })
        }
      },
    // 需要添加一个方法来转换后端数据格式
    convertToVxeFormat(backendData) {
    // 根据你的后端数据结构，转换为 vxe-table 需要的格式
      const customData = {
        columns: []
      };
    if (backendData) {

      backendData.forEach(item => {
        customData.columns.push({
          field: item.fieldKey,
          visible: item.isDisplay === 0 ? false : true,
        });
      });
    }
    return customData;
    },
    // 修改 searchColumn 方法，使其返回 Promise
    searchColumn(){
      return getSetting({webPageKey: this.tableId}).then((res) => {
        return res; // 直接返回结果
      }).catch(error => {
        console.error('查询列设置失败', error);
        return { code: -1 };
      });
    },
    customEvent({ type }) {
      console.log(`点击 ${type}`);
    },
    // 处理窗口大小变化
    handleResize() {
      this.$nextTick(() => {
        this.updateTableHeight();
      });
    },
    // 更新表格高度
    updateTableHeight() {
      // 强制重新计算高度
      this.$forceUpdate();
    },
    handleScroll({isBottom}){
      if(isBottom){
        console.log('触碰到底部了');
        this.$emit('scroll', {isBottom});
      }
    },
    isShow(item, row) {
      const hasAuth = this.buttonAuth.includes(item.text);
      if (hasAuth && item.show) {
        if (typeof item.show === 'function') {
          return item.show(row);
        } else {
          return row[item.show];
        }
      }
      return hasAuth;
    },
    // 监听点击行工具按钮
    clickRowTool(code, row) {
      this.$emit('clickRowTool', {
        code,
        row
      })
    },
    // 监听表格头工具栏点击事件
    clickHeaderTool(item) {
      this.$emit(
          item.code,
          this.isCheckBox ? this.getCheckboxRecords() : this.getRadioRecord()
      )
    },
    // 获取当前表格勾选中的数据
    getCheckboxRecords() {
      return this.$refs.baseDataTable.getCheckboxRecords()
    },
    // 获取单选按钮选中的行
    getRadioRecord() {
      return this.$refs.baseDataTable.getRadioRecord()
    },
    cellFormatter({cellValue, row, column}) {
      if (this.formatter) {
        return this.formatter(cellValue, row, column)
      }
    },
    editClosedEvent({row, column}) {
      const $table = this.$refs.baseDataTable
      const field = column.property
      // 判断单元格值是否被修改
      if ($table.isUpdateByRow(row, field)) {
        this.$emit('editClosedEvent', {
          row,
          column
        })
      }
    },
    cellClick({row, column}) {
      this.$emit('cellClick', {
        row,
        column
      })
    },
    cellClassName({row, rowIndex, column, columnIndex}) {
      let className = ''
      this.$emit(
          'cellClassName',
          {
            row,
            rowIndex,
            column,
            columnIndex
          },
          (v) => {
            className = v
          }
      )
      return className
    }
  }
}
</script>

<style lang="scss" scoped>
//下面两个样式是解决表格自定义列功能，自定义列功能会多出一行表头全部、序号行，这里隐藏掉，请别问我为什么这么写，问产品！！！
:deep(.vxe-table-custom--header){
  display: none;
}
:deep(.vxe-table-custom--body .vxe-table-custom--panel-list> li:first-child){
  display:none;
}
.el-form-item {
  margin-bottom: 0 !important;
}

.vxe-table--render-default .vxe-cell {
  padding-left: 0px;
}


.vxe-button + .vxe-button {
  margin-left: 12px;
}

.vxeBtn.queryBut:hover {
  color: #fff !important;
  opacity: 0.8;
}
</style>


```
下面是实际需要调用的父组件

```vue
<template>
  <div class="container">
    <div class="chart_box">
      <div class="chart_row">
        <div class="chart_conten" style="margin-right: 0">
          <div class="chart_cart">
            <div class="title">
              <span>{{ $t('reportItem.ItemTitle10') }}</span>
            </div>
            <div class="seach-main container-cart">
              <el-form :inline="true" :model="form" class="demo-form-inline" label-suffix="：">
                <el-form-item :label="$t('reportpage10.search.title1')">
                  <filter-select size="mini" v-model="form.vkbur" clearable
                    :placeholder="$t('reportpage10.search.title1')">
                    <el-option v-for="item in OrderDepList" :key="item" :label="item" :value="item"></el-option>
                  </filter-select>
                </el-form-item>
                <el-form-item :label="$t('reportpage10.search.title2')">
                  <filter-select size="mini" v-model="form.kunnr" clearable
                    :placeholder="$t('order.PleaseEnterTheSearchKeyword')">
                    <el-option v-for="item in ChildUserList" :key="item.uid" :clearable="true" :label="item.uname"
                      :value="item.uid">
                    </el-option>
                  </filter-select>
                </el-form-item>
                <el-form-item :label="$t('reportpage10.search.title3')">
                  <el-autocomplete size="mini" v-model="form.customerName" :clearable="true" @clear="clearInput"
                    :fetch-suggestions="querySearchAsync" :placeholder="$t('order.PleaseEnterTheSearchKeyword')"
                    @select="handleSelect"></el-autocomplete>
                </el-form-item>
                <el-form-item :label="$t('reportpage10.search.title4')">
                  <el-date-picker v-model="form.yearMonth" :clearable="false" placeholder="选择月份" size="mini"
                    type="month" value-format="yyyy-MM">
                  </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button size="mini" type="primary" style="background:#67BFF2"
                    @click="search">{{ $t('formlabel.SearchBtn') }}</el-button>
                  <el-button size="mini" type="primary" style="background:#233862" icon="el-icon-download"
                    @click="exportExcel">{{ $t('formlabel.exportData') }}</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="tablestyle">
              <data-table
                  :table-id="tableId"
                  :initial-config="initialTableConfig"
                  :showSeq="true"
                  :scroll-y="{ enabled: true }"
                  ref="vxeTable" :data="tableData" :columns="vxeColumns" :showPage="false" :height="tableHeight"
                :loading="loading" @scroll="handleScroll" :tree-config="null">
                <template #seq="{ rowIndex }">
                  {{ rowIndex + 1 }}

                </template>
              </data-table>
              <footer-info :is-end="infiniteScrollDisabled" :total="pages.total" :is-loading="loading"
                :pageSize="pages.pageSize" :end-text="$t('Commitments.footerTips')"
                paging-class="paging-page"></footer-info>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import comDate from '@/components/Date';
import { selectAllOrderDep } from "@/api/ConfirmOrderDetails";
import { getChildUser, getCustomer } from "@/api/api";
import { getList, getExcel } from '@/api/Report/ReportTen';
import { saveAs } from "@/libs/util.download";
import FooterInfo from "@/views/Admin/components/footerInfo.vue";
import DataTable from '@/components/DataTable'
export default {
  name: 'ReportTen',
  components: {
    FooterInfo,
    comDate,
    DataTable
  },

  data() {
    return {
      initialTableConfig:{},
      tableId:this.$options.name,
      lastScrollTop: 0,
      vxeColumns: [],
      loading: false,
      tableData: [],
      form: {
        yearMonth: '',
        vkbur: '',
        kunnr: '',
        customerName: ''
      },
      monthTime: null,
      pages: {
        currentPage: 1,
        pageSize: 15,
        total: 0,
      },
      OrderDepList: [],
      ChildUserList: [{
        uid: "0",
        uname: "VP/Sales"
      }],
      ChildUserValue: '',
      customerId: '',
      exportLoading: false,
      infiniteScrollDisabled: false,
      tableKey: 0,
    }
  },
  mounted() {
    this._getOrderDep();
    this._getChildUser();
    this.updateColumns(); // 初始化列配置
    this.getData();
  },
  created() {
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1
    month = month <= 9 ? "0" + month : month
    this.$set(this.form, 'yearMonth', `${year}-${month}`)
  },
  computed: {
    tableHeight() {
      // 动态计算高度，确保滚动条出现
      return window.innerHeight * 0.6;
    }
  },
  watch: {
    ChildUserValue() {
      this.pages.currentPage = 1;
      this._getPerformanceList()
    },
    customerName(newval, oldval) {
      if (newval.length < oldval.length) {
        this.customerId = ""
      }
      if (!newval) {
        this.customerId = ""
      }
    },
    '$i18n.locale': {
      handler() {
        this.updateColumns(); // 语言切换时更新列配置
      },
      immediate: false
    }
  },
  methods: {
 
    handleScroll({isBottom}){
      if (isBottom) {
        this.getData();
      }
    },
    search() {
      this.pages.currentPage = 1;
      this.tableData = [];  // 清空已有数据
      this.infiniteScrollDisabled = false;  // 重置禁用状态
      this.getData();
    },
    clearInput() {
      this.pages.currentPage = 1;
      this.customerId = ''
    },
    // 获取部门下拉
    _getOrderDep() {
      selectAllOrderDep().then((res) => {
        if (res.code === 10000) {
          this.OrderDepList = res.resp || [];
        }
      });
    },
    // 获取业务下拉
    _getChildUser() {
      getChildUser().then(res => {
        this.ChildUserList.push(...res.resp)
      })
    },
    // 客户名称下拉搜索框回调
    querySearchAsync(queryString, cb) {
      let data = {
        searchContent: queryString,
        uId: this.ChildUserValue,
        size: 100,
        current: 1
      }
      getCustomer(data).then(res => {
        console.log(res)
        let resp = res.resp
        resp.forEach(item => {
          item.value = item.name1
        })
        cb(resp);
      })
    },
    handleSelect(item) {
      this.current = 1;
      this.customerId = item.kunnr
    },
    //获取列表数据
    getData() {
      if (this.loading || this.infiniteScrollDisabled) return;
      const requestPage = this.pages.currentPage;
      let form = {
        yearMonth: this.form.yearMonth.replace(/-/g, ""),
        sysDepartment: this.form.vkbur,
        custName: this.form.customerName,
        busId: this.form.kunnr,
        current: this.pages.currentPage,
        size: this.pages.pageSize
      }
      this.loading = true;
      getList(Object.assign(form)).then(res => {
        let records = res.resp.records;
        records.forEach((item, index) => {
          item.preYearPreMonthRate = (item.preYearPreMonthRate * 100).toFixed(2) + '%'
          item.preYearThisMonthRate = (item.preYearThisMonthRate * 100).toFixed(2) + '%'
          item.sumPreYearRate = (item.sumPreYearRate * 100).toFixed(2) + '%'
          item.preMonthMoney = String(item.preMonthMoney).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) { return s + ',' })
          item.preYearMonthMoney = String(item.preYearMonthMoney).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) { return s + ',' })
          item.thisMonthMoney = String(item.thisMonthMoney).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) { return s + ',' })
          item.preYearThisMonthMoney = String(item.preYearThisMonthMoney).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) { return s + ',' })
          item.sumThisMonthMoney = String(item.sumThisMonthMoney).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) { return s + ',' })
          item.sumPreYearThisMonthMoney = String(item.sumPreYearThisMonthMoney).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) { return s + ',' })
        })
        this.tableData = [...this.tableData, ...records];
        this.pages.total = res.resp.total;

        const totalPages = Math.ceil(this.pages.total / this.pages.pageSize);
        // 关键修改：基于请求的页码计算，而不是递增后的页码
        this.infiniteScrollDisabled = requestPage >= totalPages;

        // 只有当还有更多数据时才递增页码
        if (!this.infiniteScrollDisabled) {
          this.pages.currentPage++;
        }
      }).finally(() => {
        this.loading = false;
      })
    },
    async exportExcel() {
      this.exportLoading = true;
      let data = {
        yearMonth: this.form.yearMonth.replace(/-/g, ""),
        sysDepartment: this.form.vkbur,
        custName: this.form.customerName,
        busId: this.form.kunnr
      }
      let res = await getExcel(data).catch(function (error) {
        console.log(error);
      });
      this.exportLoading = false;
      if (res && res.code === undefined) {
        saveAs(res, `${this.$t("menus.InventoryReport")}.xlsx`);
      }
    },
    handleCurrentChange(val) {
      this.pages.currentPage = val
      this.getData()
    },
    // 添加更新列配置的方法
    updateColumns() {
      this.vxeColumns = [
        {
          field: 'sysDepartment',
          title: this.$t('reportpage10.thTitle.title2'),
          minWidth: 200,
          align: 'center'
        },
        {
          field: 'busName',
          title: this.$t('reportpage10.thTitle.title3'),
          minWidth: 200,
          align: 'center'
        },
        {
          field: 'custName',
          title: this.$t('reportpage10.thTitle.title4'),
          minWidth: 200,
          align: 'center'
        },
        // 其他列配置...
        {
          field: 'travelTime',
          title: this.$t('reportpage10.thTitle.title5'),
          minWidth: 100,
          align: 'center'
        },
        {
          field: 'exhibition',
          title: this.$t('reportpage10.thTitle.title6'),
          minWidth: 200,
          align: 'center'
        },
        {
          field: 'marketIntentionCabinet',
          title: this.$t('reportpage10.thTitle.title7'),
          minWidth: 150,
          align: 'center'
        },
        {
          field: 'marketCabinet',
          title: this.$t('reportpage10.thTitle.title8'),
          minWidth: 130,

          align: 'center'
        },
        {
          field: 'preMonthCabinet',
          title: this.$t('reportpage10.thTitle.title9'),
          minWidth: 150,

          align: 'center'
        },
        {
          field: 'preMonthMoney',
          title: this.$t('reportpage10.thTitle.title10'),
          minWidth: 200,

          align: 'center'
        },
        {
          field: 'preYearMonthCabinet',
          title: this.$t('reportpage10.thTitle.title11'),
          minWidth: 220,

          align: 'center'
        },
        {
          field: 'preYearMonthMoney',
          title: this.$t('reportpage10.thTitle.title12'),
          minWidth: 260,

          align: 'center'
        },
        {
          field: 'preYearPreMonthRate',
          title: this.$t('reportpage10.thTitle.title13'),
          minWidth: 240,

          align: 'center'
        },
        {
          field: 'thisMonthCabinet',
          title: this.$t('reportpage10.thTitle.title14'),
          minWidth: 160,

          align: 'center'
        },
        {
          field: 'thisMonthMoney',
          title: this.$t('reportpage10.thTitle.title15'),
          minWidth: 200,

          align: 'center'
        },
        {
          field: 'preYearThisMonthCabinet',
          title: this.$t('reportpage10.thTitle.title16'),
          minWidth: 200,

          align: 'center'
        },
        {
          field: 'preYearThisMonthMoney',
          title: this.$t('reportpage10.thTitle.title17'),
          minWidth: 200,

          align: 'center'
        },
        {
          field: 'preYearThisMonthRate',
          title: this.$t('reportpage10.thTitle.title18'),
          minWidth: 240,

          align: 'center'
        },
        {
          field: 'sumThisMonthCabinet',
          title: this.$t('reportpage10.thTitle.title19'),
          minWidth: 200,

          align: 'center'
        },
        {
          field: 'sumThisMonthMoney',
          title: this.$t('reportpage10.thTitle.title20'),
          minWidth: 220,

          align: 'center'
        },
        {
          field: 'sumPreYearThisMonthCabinet',
          title: this.$t('reportpage10.thTitle.title21'),
          minWidth: 220,

          align: 'center'
        },
        {
          field: 'sumPreYearThisMonthMoney',
          title: this.$t('reportpage10.thTitle.title22'),
          minWidth: 220,

          align: 'center'
        },
        {
          field: 'sumPreYearRate',
          title: this.$t('reportpage10.thTitle.title23'),
          minWidth: 240,

          align: 'center'
        }
      ];
    },
  }
}
</script>
<style lang="stylus" scoped>
    .tablestyle>>>.el-table th{
        background #e8e8e8
        color #333
    }
    .table-pagination{
        margin-top: 20px;
    }
</style>
<style lang="scss" scoped>
::v-deep {
  .el-table--scrollable-x .el-table__body-wrapper {
    overflow: auto !important;
  }
}

.container {
  margin: 20px;
  padding: 20px;
  background: #fff;

  .seach-main {
    .seach-row {
      display: flex;
      justify-content: space-between;
      align-items: center;

      p,
      div {
        align-items: center;
        display: flex;
        align-items: center;

        // padding-left: 20px;
        label {
          font-size: 0.8rem;
          width: 100px;
          text-align: right;
        }
      }
    }
  }

  .chart_box {
    .chart_cart {
      padding: 20px;
      background: #fff;

      .title {
        padding: 0;
        margin: 0;
        border-left: 5px solid #3f59d9;
        padding-left: 15px;
        font-weight: bold;
        font-size: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }
    }
  }
}
</style>


```
