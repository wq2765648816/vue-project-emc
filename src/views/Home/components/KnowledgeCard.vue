<template>
  <div class="item">
    <div class="item-header">
      <van-image width="40px" height="40px" round :src="item.creatorAvatar" />
      <div>
        <p class="item-name">{{ item.creatorName }}</p>
        <p class="item-title">
          {{ item.creatorHospatalName }} {{ item.creatorDep }}
          {{ item.creatorTitles }}
        </p>
      </div>
      <van-button
        type="primary"
        size="mini"
        :loading="loading"
        plain
        round
        @click="follow(item)"
      >
        {{ item.likeFlag === 1 ? '已关注' : '+ 关注' }}
      </van-button>
    </div>
    <h3>{{ item.title }}</h3>
    <div class="content">{{ item.content.replace(/<[^>]+>/g, '') }}</div>
    <div class="item-img">
      <van-image
        v-for="(v, index) in item.coverUrl"
        :key="index"
        :src="v"
      ></van-image>
    </div>
    <footer>
      <span>{{ item.collectionNumber }} 收藏</span>
      <span>{{ item.commentNumber }} 评论</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { Knowledge } from '@/types/consult'
import { useFollow } from '@/composable'

defineProps<{
  item: Knowledge
}>()
const { loading, follow } = useFollow('Knowledge')
</script>

<style lang="scss" scoped>
.item {
  width: 100%;
  padding: 15px;
  .item-header {
    display: flex;
    align-items: center;
    .item-name {
      font-size: 13px;
    }
    .item-title {
      font-size: 11px;
      color: var(--cp-tip);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 200px;
    }
    .van-image {
      border-radius: 50%;
      margin-right: 10px;
    }
    .van-button {
      width: 80px;
      margin-left: 10px;
      height: 30px;
    }
  }
  h3 {
    padding: 8px 0 8px;
  }
  .content {
    ::v-deep() {
      box-sizing: border-box;
      width: 100%;
      //超出两行省略号
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      line-clamp: 2;
      -webkit-line-clamp: 2; //显示几行
      color: var(--cp-text3);
      line-height: 2;
      img {
        display: none;
      }
    }
  }
  .item-img {
    display: flex;
    margin-top: 7px;
    justify-content: space-between;
    ::v-deep() {
      .van-image {
        width: 108px;
        height: 108px;
        border-radius: 15px;
        overflow: hidden;
      }
    }
  }
  footer {
    font-size: 13px;
    color: var(--cp-tip);
    padding: 8px 0 13px;
    border-bottom: 1px solid var(--cp-line);
    span:nth-child(1) {
      padding-right: 15px;
    }
  }
}
</style>
