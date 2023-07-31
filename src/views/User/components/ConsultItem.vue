<template>
  <div class="consult-item">
    <div class="head van-hairline--bottom">
      <img src="@/assets/avatar-doctor.svg" />
      <p>
        {{ item.docInfo.name }}
      </p>
      <span
        :class="{
          orange: item.status === OrderType.ConsultPay,
          green: item.status === OrderType.ConsultChat
        }"
        >{{ item.statusValue }}</span
      >
    </div>
    <div class="body">
      <div class="body-row">
        <div class="body-label">病情描述</div>
        <div class="body-value">{{ item.illnessDesc }}</div>
      </div>
      <div class="body-row">
        <div class="body-label">价格</div>
        <div class="body-value">￥{{ item.payment.toFixed(2) }}</div>
      </div>
      <div class="body-row">
        <div class="body-label">创建时间</div>
        <div class="body-value">{{ item.createTime }}</div>
      </div>
    </div>
    <div class="footed" v-if="item.status === OrderType.ConsultPay">
      <van-button plain round size="small" class="btn" type="default"
        >取消问诊</van-button
      >
      <van-button plain round size="small" type="primary">去支付</van-button>
    </div>
    <div class="footed" v-if="item.status === OrderType.ConsultWait">
      <van-button plain round size="small" class="btn" type="default"
        >删除订单</van-button
      >
      <van-button plain round size="small" type="primary">继续沟通</van-button>
    </div>
    <div class="footed" v-if="item.status === OrderType.ConsultChat">
      <van-button plain round size="small" type="primary">继续沟通</van-button>
    </div>
    <div class="footed" v-if="item.status === OrderType.ConsultComplete">
      <div class="popover">
        <!-- 更多组件 -->
        <ConsultMore
          :disabled="!item.prescriptionId"
          @on-preview="onPreview"
          @on-delete="onDelete"
        ></ConsultMore>
      </div>

      <van-button plain round size="small" class="btn" type="default"
        >问诊记录</van-button
      >
      <van-button plain round size="small" type="primary">继续沟通</van-button>
    </div>
    <div class="footed" v-if="item.status === OrderType.ConsultCancel">
      <van-button plain round size="small" class="btn" type="default"
        >删除订单</van-button
      >
      <van-button plain round size="small" type="primary"
        >咨询其他医生</van-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import * as TS from '@/api/TS'
import { OrderType } from '@/enums'
import ConsultMore from './ConsultMore.vue'
defineProps<{
  item: TS.getConsultListRow
}>()
// 查看处方
const onPreview = () => {}
// 删除订单
const onDelete = () => {}
</script>

<style lang="scss" scoped>
.consult-item {
  height: 200px;
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 6px;
  .head {
    display: flex;
    height: 50px;
    align-items: center;
    padding: 0 15px;
    img {
      width: 25px;
      height: 25px;
      margin-right: 8px;
    }
    p {
      font-size: 15px;
      flex: 1;
    }
    span {
      color: var(--cp-tag);
    }
    & .orange {
      color: orange;
    }
    & .green {
      color: var(--cp-primary);
    }
  }
  .body {
    padding: 15px 15px 10px;
    &-row {
      display: flex;
      padding-bottom: 3px;
    }
    &-label {
      color: var(--cp-tip);
      width: 70px;
    }
    &-row:last-child {
      .body-value {
        color: var(--cp-tip);
      }
    }
  }
  .footed {
    display: flex;
    padding: 0 15px;
    align-items: center;
    justify-content: flex-end;
    .btn {
      background-color: var(--cp-bg);
      margin-right: 10px;
      color: var(--cp-text3);
    }
    .van-button {
      padding: 0 15px;
    }
    .popover {
      flex: 1;
    }
    ::v-deep(.van-popover__wrapper) {
      color: var(--cp-tag);
      font-size: 13px;
    }
  }
}
</style>
