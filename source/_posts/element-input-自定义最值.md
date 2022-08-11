---
layout: post
title: element-input 自定义最值
abbrlink: 35681
date: 2022-04-15 19:51:44
tags: $nextTick
categories: Vue
summary: input 框是需要进行自定义限制数字大小，记录下在使用element ui 的问题，输入超过边界值的数会显示在DOM，打印却是正确的，这个时候配合，$nextTick 使用即可。
---



table表单内某一行的input

```html
     <template slot-scope="scope">
              <p v-if="scope.row.switch">
                <template v-solt="scope">
                  <div>
                    <!-- active-text="&ensp" -->
                    <el-switch v-model="scope.row.verificationFlag" active-color="#13ce66" inactive-color="#ff4949"
                      :active-value="true" :inactive-value="false" inactive-text="启用登录图形码："></el-switch>
                    <p style="display:inline-block ;margin-left: 20px;" v-if="scope.row.verificationFlag">
                      当密码错误
                      <el-input @input="numberChange(arguments[0], 3)" @change="numberChange(arguments[0], 3)"
                        v-model.number="scope.row.verificationNum" maxlength="1" :max="3" :min="0" style="width: 50px"
                        size="small">
                      </el-input>
                      <!-- <el-input @input="changePaidAmount($event)" v-model.number="scope.row.verificationNum"
                        maxlength="1" :max="3" :min="0" style="width: 50px" size="small">
                      </el-input> -->
                      次强制图形码验证
                    </p>
                  </div>
                </template>
              </p>
              <p v-else-if="scope.$index % 2 === 0">
                <el-input v-model="scope.row.content" placeholder="多IP请用英文半角逗号分隔"></el-input>
              </p>
              <p v-else>
                <el-time-select placeholder="起始时间" v-model="scope.row.startTime" @change="scope.row.endTime = ''"
                  :picker-options="{
                    start: '00:00',
                    step: '01:00',
                    end: '24:00',
                  }">
                </el-time-select>
                <el-time-select placeholder="结束时间" v-model="scope.row.endTime" :picker-options="{
                  start: '00:00',
                  step: '01:00',
                  end: '24:00',
                  minTime: scope.row.startTime,
                }">
                </el-time-select>
              </p>
            </template>
```





方法: 记得去data定义你的verificationNum，配合$nextTick ，就能解决DOM更新的问题

```vue
  // 限制input 最大最小值
    numberChange (val, maxNum) {
      //转换数字类型
      this.data[6].verificationNum = Number(val)
      //重新渲染
      this.$nextTick(() => {
        //比较输入的值和最大值，返回小的
        let num = Math.min(Number(val), maxNum)
        //输入负值的情况下， = 0（可根据实际需求更该）
        if (num < 0) {
          this.data[6].verificationNum = 0
        } else {
          //反之
          this.data[6].verificationNum = num
        }
      })
    },
```

