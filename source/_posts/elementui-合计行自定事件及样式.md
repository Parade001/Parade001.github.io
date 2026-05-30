---
layout: post
title: elementui-合计行自定事件及样式
abbrlink: 25729
date: 2025-09-11 22:38:46
tags:
---
最近接到了一个需求关于elementui的合计行的需求，
需求如下：合计行某些列需要动态判定是否可以点击且要有自定义高亮.

@cell-click 事件只能监控到单元格事件，因此想到方法如下，推荐采用方案2，原生即可，从dom上获取，注册对应方法，或者自定义类方法即可；
方案1：双table+插槽实现，具体就不展示代码了。
缺点：页面在小屏幕状态下会很丑，会出3个x-轴滚动条，但是我们可以通过css方案去掉多余滚动条，
```css
.el-table__body-wrapper::-webkit-scrollbar {
  display: none;
}

```
但是依旧还有一个缺点就是table滚动的时候合计行与表格数据不对齐的效果


因此方案2：通过获取合计行的dom事件，然后通过js实现，
优点：美观，
缺点：开发代码量大，维护性差。
实现过程如下
```vue
关键点1：

sum方法return前加上:
// 在下次DOM更新后应用样式
this.$nextTick(() => {
this.applySummaryRowStyles();
});

//data中定义

totalSummary：null

mounted(){
this.$nextTick(() => {
this.setupSummaryRowEvents();
});
},


//新增方法如下：
setupSummaryRowEvents() {
const tableEl = this.$refs.table.$refs.table.$el;
// 移除之前的事件监听器，避免重复绑定
if (this.summaryClickHandler) {
tableEl.removeEventListener('click', this.summaryClickHandler);
}
// 创建事件处理函数
this.summaryClickHandler = (event) => {
// 检查是否点击的是合计行
const summaryCell = event.target.closest('.el-table__footer-wrapper td');
if (summaryCell) {
// 将divElement定义移到这里，确保在整个if块中都可以访问
const divElement = summaryCell.querySelector('div');
let cellValue = '';
if (divElement) {
cellValue = divElement.textContent || divElement.innerText;
}

// 获取单元格索引
const cellIndex = Array.from(summaryCell.parentNode.children).indexOf(summaryCell);

// 获取对应的列配置
const flatColumns = this.getFlatColumns(this.filteredTableColumns);
const column = flatColumns[cellIndex];

if (column && column.prop) {
const KeyName =column.prop
this.jumpMarketReservation( {
[KeyName]:cellValue
},KeyName);
}
}
};
// 绑定事件监听器
tableEl.addEventListener('click', this.summaryClickHandler);

// 添加合计行样式处理
this.$nextTick(() => {
this.applySummaryRowStyles();
});
},


// 新增方法：应用合计行样式
applySummaryRowStyles() {
if (!this.totalSummary) return;

const tableEl = this.$refs.table.$refs.table.$el;
const summaryRow = tableEl.querySelector('.el-table__footer-wrapper tr');
if (!summaryRow) return;

// 定义需要检查的前9个key
const keysToCheck = [
'depCount',
'kna2Count',
'notKna2Count',
'depCountCooperated',
'depCountNotCooperated',
'kna2CountCooperated',
'kna2CountNotCooperated',
'notKna2CountCooperated',
'notKna2CountNotCooperated'
];

// 获取所有单元格
const cells = summaryRow.querySelectorAll('td');
const flatColumns = this.getFlatColumns(this.filteredTableColumns);

// 遍历单元格并应用样式
cells.forEach((cell, index) => {
if (index < flatColumns.length) {
const column = flatColumns[index];
if (column && column.prop && keysToCheck.includes(column.prop)) {
const value = this.totalSummary[column.prop];
if (value && Number(value) > 0) {
const divElement = cell.querySelector('div');
if (divElement) {
divElement.classList.add('summary-red');
}
}
}
}
});
},

// 新增方法：获取扁平化的列配置
getFlatColumns(columns) {
const flatColumns = [];

const flatten = (cols) => {
cols.forEach(col => {
if (col.children && col.children.length > 0) {
flatten(col.children);
} else {
flatColumns.push(col);
}
});
};

flatten(columns);
return flatColumns;
},

beforeDestroy() {
// 组件销毁前移除事件监听器
if (this.summaryClickHandler) {
const tableEl = this.$refs.table?.$refs?.table?.$el;
if (tableEl) {
tableEl.removeEventListener('click', this.summaryClickHandler);
}
}
},


//添加自定义css样式

.summary-red {
color: #5a9cf8 !important;
font-weight: bold;
font-size: 12px;
}
```

