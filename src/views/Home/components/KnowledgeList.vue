<template>
  <div class="">
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <KnowledgeCard
        v-for="item in list"
        :key="item.id"
        :item="item"
      ></KnowledgeCard>
    </van-list>
  </div>
</template>

<script setup lang="ts">
import type { KnowledgeType } from '@/types/consult'
import KnowledgeCard from './KnowledgeCard.vue'
import { patientKnowledge } from '@/api'
import { ref, reactive } from 'vue'
import * as TS from '@/api/TS'
import * as TT from '@/utils/status'
const list = ref<TS.pageDataListRowList>([])
const loading = ref<boolean>(false)
const finished = ref<boolean>(false)
const total = ref<number>()
const props = defineProps<{
  type: KnowledgeType
}>()

const pageData = reactive<TS.pageDataList>({
  type: props.type,
  current: 1,
  pageSize: 10
})

const onLoad = async () => {
  // 异步更新数据
  // setTimeout 仅做示例，真实场景中一般为 ajax 请求
  let res = await patientKnowledge(pageData)
  let { code, data } = res
  if (code === TT.STATUS.SUCCESS) {
    total.value = data.total
    data.rows
    list.value.push(...data.rows)
    // 加载状态结束
    loading.value = false
    pageData.current++
  }
  // 数据全部加载完成
  if (list.value.length >= 40) {
    finished.value = true
  }
}
</script>

<style lang="scss" scoped></style>
