<template>
  <div class="user">
    <header>
      <div class="user-image">
        <van-image width="70" height="70" :src="userData?.avatar" />
        <div>
          <h3>{{ userData?.account }}</h3>
          <van-icon name="edit" color="#16C2A3" size="20" />
        </div>
      </div>
      <van-row>
        <van-col span="6">
          <p>{{ userData?.collectionNumber }}</p>
          <p>收藏</p>
        </van-col>
        <van-col span="6"
          ><p>{{ userData?.likeNumber }}</p>
          <p>关注</p></van-col
        >
        <van-col span="6"
          ><p>{{ userData?.score }}</p>
          <p>积分</p></van-col
        >
        <van-col span="6"
          ><p>{{ userData?.couponNumber }}</p>
          <p>优惠卷</p></van-col
        >
      </van-row>
    </header>
    <div class="user-order">
      <div class="head">
        <h3>药品订单</h3>
        <router-link to="/user">
          全部订单 <van-icon name="arrow" />
        </router-link>
      </div>
      <van-row>
        <van-col span="6">
          <van-badge :content="userData?.orderInfo.paidNumber || ''">
            <cp-icon name="user-paid" width="28px" height="28px"></cp-icon>
          </van-badge>
          <p>待付款</p>
        </van-col>
        <van-col span="6">
          <van-badge :content="userData?.orderInfo.receivedNumber || ''">
            <cp-icon name="user-shipped" width="28px" height="28px"></cp-icon>
          </van-badge>
          <p>待发货</p>
        </van-col>
        <van-col span="6">
          <van-badge :content="userData?.orderInfo.shippedNumber || ''">
            <cp-icon name="user-received" width="28px" height="28px"></cp-icon>
          </van-badge>
          <p>待收货</p>
        </van-col>
        <van-col span="6">
          <van-badge :content="userData?.orderInfo.finishedNumber || ''">
            <cp-icon name="user-finished" width="28px" height="28px"></cp-icon>
          </van-badge>
          <p>已完成</p>
        </van-col>
      </van-row>
    </div>
    <div class="user-group">
      <h3>快捷工具</h3>
      <van-cell
        v-for="(item, index) in tools"
        :title="item.label"
        is-link
        :border="false"
        :key="index"
        :to="item.path"
      >
        <template #icon>
          <cp-icon
            :name="`user-tool-0${index + 1}`"
            width="18"
            height="18"
          ></cp-icon>
        </template>
      </van-cell>
    </div>
    <a href="javascript:;" class="logout" @click="onLogout">退出登录</a>
  </div>
</template>

<script setup lang="ts">
import { getPatientmyUser } from '@/api'
import { ref, onMounted } from 'vue'
import * as TS from '@/api/TS'
import * as TT from '@/utils/status'
import { showFailToast, showConfirmDialog } from 'vant'
import CpIcon from '@/components/CpIcon.vue'
import { useUserStore } from '@/stores'
import router from '@/router'
const userData = ref<TS.getPatientmyUserData>()
onMounted(async () => {
  const res = await getPatientmyUser()
  let { code, data, message } = res
  if (code == TT.STATUS.SUCCESS) {
    userData.value = data
  } else {
    showFailToast(message)
  }
})

const tools = [
  { label: '我的问诊', path: '/user/consult' },
  { label: '我的处方', path: '' },
  { label: '家庭档案', path: '/user/patient' },
  { label: '地址管理', path: '' },
  { label: '我的评价', path: '' },
  { label: '官方客服', path: '' },
  { label: '设置', path: '' }
]

const store = useUserStore()
// 退出登录
const onLogout = async () => {
  await showConfirmDialog({
    title: '温馨提示',
    message: '你确认要退出优医问诊吗?',
    confirmButtonColor: '#e53e31'
  })
  store.delUser()
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.user {
  padding: 0 15px 65px;
  background-color: var(--cp-bg);
  min-height: calc(100vh - 50px);
  header {
    margin: 0 -15px;
    background: linear-gradient(
      180deg,
      rgba(44, 181, 165, 0.46),
      rgba(44, 181, 165, 0)
    );
    height: 200px;
    padding: 0 15px;
    .user-image {
      padding-top: 40px;
      display: flex;
      align-items: center;
      div {
        margin-left: 10px;
        h3 {
          font-size: 20px;
          font-weight: 400;
          padding-bottom: 6px;
        }
      }
    }
    .van-row {
      padding-top: 15px;
      margin: 0 -15px;
      p {
        text-align: center;
        &:first-child {
          font-weight: 500;
          font-size: 18px;
        }
        &:last-child {
          font-size: 12px;
          color: var(--cp-dark);
        }
      }
    }
  }
  &-order {
    background-color: #fff;
    border-radius: 8px;
    padding-bottom: 15px;
    margin-bottom: 15px;
    .head {
      display: flex;
      justify-content: space-between;
      line-height: 50px;
      padding: 0 15px;
      h3 {
        font-weight: bolder;
      }
      a {
        color: var(--cp-tip);
      }
    }
    .van-row {
      .van-col {
        text-align: center;
        p {
          font-size: 12px;
        }
      }
    }
  }
  &-group {
    background-color: #fff;
    overflow: hidden;
    border-radius: 10px;
    h3 {
      font-weight: bolder;
      padding: 10px 0px 6px 14px;
    }
    .van-cell {
      align-items: center;
      ::v-deep() {
        .van-cell__title {
          padding-left: 8px;
        }
      }
    }
  }
  .logout {
    display: block;
    margin: 20px auto;
    width: 100px;
    text-align: center;
    color: var(--cp-price);
  }
}
</style>
