<template>
  <div class="consult-list">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <Consult-item
        v-for="item in lists.list"
        :key="item.id"
        :item="item"
      ></Consult-item>
    </van-list>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { getConsultList } from '@/api'
import * as TS from '@/api/TS'
import * as TT from '@/utils/status'
import { showFailToast } from 'vant'
import ConsultItem from './ConsultItem.vue'
// 接受父组件传来的参数
const props = defineProps<{
  type: string
}>()
// 定义总条数
const total = ref<number>(0)
// 定义数据列表
const lists = reactive<TS.getConsultListlist>({
  list: []
})
// 请求数据
const pageData = reactive<TS.HomePageDocParams>({
  type: props.type,
  current: 1,
  pageSize: 5
})
// 下拉刷新属性
const loading = ref(false)
const finished = ref(false)
// 下拉刷新
const onLoad = async () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  let res = await getConsultList(pageData)
  let { code, data, message } = res
  if (code === TT.STATUS.SUCCESS) {
    total.value = data.total
    lists.list.push(...data.rows)
    // 页数加一
    pageData.current++
    // 加载状态结束
    loading.value = false
    console.log(data)
  } else {
    showFailToast(message)
    finished.value = true
  }
  // 数据全部加载完成
  if (lists.list.length >= total.value) {
    finished.value = true
  }
}
</script>

<style lang="scss" scoped>
.consult-list {
  padding: 10px;
}
</style>
