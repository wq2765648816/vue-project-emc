<template>
  <div class="follow-doctor">
    <div class="follow-title">
      <span>推荐关注</span>
      <span>查看更多<van-icon name="arrow" /></span>
    </div>
    <div class="follow-list">
      <div v-for="item in list.list" :key="item.id">
        <DoctorCard :item="item"></DoctorCard>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import DoctorCard from './DoctorCard.vue'
import { getHomePageDoc } from '@/api/index'
import * as TS from '@/api/TS'

const list = reactive<TS.HomePageDocList>({
  list: []
})

const loadData = async () => {
  const res = await getHomePageDoc({ current: 1, pageSize: 5 })
  list.list = res.data.rows
  console.log(res)
  console.log(list.list)
}
onMounted(() => loadData())
</script>

<style lang="scss" scoped>
.follow-doctor {
  background-color: #f6f7f9;
  width: 100vw;
  .follow-title {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    font-size: 14px;
    span:nth-child(2) {
      color: var(--cp-dark);
    }
  }
  .follow-list {
    display: flex;
    width: 100%;
    overflow-x: scroll;
    padding-bottom: 15px;
  }
  // CSS隐藏滚动条
  .follow-list::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
</style>
