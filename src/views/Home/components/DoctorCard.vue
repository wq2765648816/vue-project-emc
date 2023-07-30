<template>
  <div class="item">
    <van-image round :src="item.avatar" />
    <p class="nametext">{{ item.name }}</p>
    <p class="van-ellipsis">{{ item.hospitalName }}</p>
    <p>{{ item.positionalTitles }}</p>
    <van-button
      type="primary"
      size="small"
      :loading="loading"
      round
      @click="follow(item)"
    >
      {{ item.likeFlag === 1 ? '已关注' : '+ 关注' }}
    </van-button>
  </div>
</template>

<script setup lang="ts">
import * as TS from '../../../api/TS'
import { useFollow } from '@/composable'
defineProps<{
  item: TS.Row
}>()
const { loading, follow } = useFollow()
</script>

<style lang="scss" scoped>
.item {
  width: 135px;
  height: 195px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 11px 0px rgba(229, 229, 229, 0.2);
  text-align: center;
  padding: 15px;
  margin-left: 15px;
  box-sizing: border-box;
  > .van-image {
    width: 58px;
    height: 58px;
    vertical-align: middle;
    border-radius: 50%;
    margin: 0 auto 8px;
  }
  > p {
    margin-bottom: 0;
    font-size: 11px;
    color: var(--cp-tip);
  }
  .nametext {
    font-size: 13px;
    color: var(--cp-text1);
    margin-bottom: 5px;
  }
  > .van-button {
    padding: 0 12px;
    height: 28px;
    margin-top: 8px;
    width: 72px;
  }
}
</style>
