<template>
  <div class="home">
    <header>
      <h1>优医</h1>
      <div class="del-top">
        <cp-icon name="home-search" style="margin-right: 5px" />
        搜一搜：疾病/症状/医生/健康知识
      </div>
    </header>
    <nav>
      <van-row>
        <van-col span="8">
          <router-link to="/" class="nav">
            <cp-icon name="home-doctor" width="48px" height="48px"></cp-icon>
            <p class="title">问医生</p>
            <p class="desc">按科室查问医生</p>
          </router-link>
        </van-col>
        <van-col span="8">
          <router-link to="/" class="nav">
            <cp-icon name="home-graphic" width="48px" height="48px"></cp-icon>
            <p class="title">极速问诊</p>
            <p class="desc">20s医生极速回复</p>
          </router-link>
        </van-col>
        <van-col span="8">
          <router-link to="/" class="nav">
            <cp-icon name="home-prescribe" width="48px" height="48px"></cp-icon>
            <p class="title">开药门诊</p>
            <p class="desc">线上买药更方便</p>
          </router-link>
        </van-col>
      </van-row>
      <van-row>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <cp-icon name="home-order" width="31px" height="31px"></cp-icon>
            <p class="title">药品订单</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <cp-icon name="home-docs" width="31px" height="31px"></cp-icon>
            <p class="title">健康档案</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <cp-icon name="home-rp" width="31px" height="31px"></cp-icon>
            <p class="title">我的处方</p>
          </router-link>
        </van-col>
        <van-col span="6">
          <router-link to="/" class="nav min">
            <cp-icon name="home-find" width="31px" height="31px"></cp-icon>
            <p class="title">疾病查询</p>
          </router-link>
        </van-col>
      </van-row>
    </nav>
    <div class="home-banner">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img src="/src/assets/ad.png" alt="" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="/src/assets/ad.png" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="home-tabs">
      <van-tabs v-model:active="active" sticky>
        <van-tab title="关注">
          <follow-doctor></follow-doctor>
          <knowledge-list type="like"></knowledge-list>
        </van-tab>
        <van-tab title="推荐">
          <knowledge-list type="recommend"></knowledge-list>
        </van-tab>
        <van-tab title="减脂">
          <knowledge-list type="fatReduction"></knowledge-list>
        </van-tab>
        <van-tab title="饮食">
          <knowledge-list type="food"></knowledge-list>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FollowDoctor from './components/FollowDoctor.vue'
import KnowledgeList from './components/KnowledgeList.vue'
const active = ref<number>(1)
</script>

<style lang="scss" scoped>
.home {
  padding-bottom: 50px;
}
header {
  height: 100px;
  position: relative;
  background: linear-gradient(180deg, rgba(62, 206, 197, 0.85), #26bcc6);
  border-bottom-left-radius: 150px 20px;
  border-bottom-right-radius: 150px 20px;
  h1 {
    padding: 20px;
    font-weight: normal;
    font-size: 20px;
    line-height: 1;
    color: #fff;
  }
  .del-top {
    position: absolute;
    background-color: #fff;
    height: 40px;
    border-radius: 20px;
    left: 50%;
    transform: translatex(-50%);
    box-shadow: 0px 15px 22px -7px rgba(224, 236, 250, 0.8);
    width: 90%;
    padding: 0 20px;
    color: var(--cp-dark);
    font-size: 13px;
    display: flex;
    align-items: center;
  }
}
nav {
  padding: 10px 15px 0 15px;
  .nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    .title {
      font-weight: 500;
      margin-top: 5px;
      color: var(--cp-text1);
    }
    .desc {
      font-size: 11px;
      color: var(--cp-tag);
      margin-top: 2px;
    }
    &.min {
      .title {
        font-size: 13px;
        color: var(--cp-text2);
        font-weight: normal;
      }
    }
  }
}
.home-banner {
  padding: 10px 15px;
  height: 100px;
  img {
    width: 100%;
    height: 100%;
  }
}
.home-tabs {
  margin-top: 20px;
  ::v-deep() {
    .van-tabs__wrap {
      width: 100%;
      background-color: #fff;
      .van-tabs__nav {
        width: 70%;
      }
    }
  }
}
</style>
