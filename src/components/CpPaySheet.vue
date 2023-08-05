<template>
  <van-action-sheet
    :show="show"
    title="选择支付方式"
    :close-on-popstate="false"
    @update:show="emit('update:show', $event)"
    :closeable="false"
    :before-close="onClose"
  >
    <div class="content">
      <p class="amount">￥ {{ actualPayment.toFixed(2) }}</p>
      <van-cell-group>
        <van-cell title="微信支付" @click="paymentMethod = 0">
          <template #icon>
            <CpIcon name="consult-wechat" class="cp-icon"></CpIcon>
          </template>
          <template #extra>
            <van-checkbox :checked="paymentMethod === 0"></van-checkbox>
          </template>
        </van-cell>
        <van-cell title="支付包支付" @click="paymentMethod = 1">
          <template #icon>
            <cp-icon name="consult-alipay" class="cp-icon"></cp-icon>
          </template>
          <template #extra>
            <van-checkbox :checked="paymentMethod === 1"></van-checkbox>
          </template>
        </van-cell>
      </van-cell-group>
      <div class="btn">
        <van-button @click="pay" type="primary" round block>
          立即支付
        </van-button>
      </div>
    </div>
  </van-action-sheet>
</template>

<script setup lang="ts">
import { showLoadingToast, showToast, closeToast } from 'vant'
import { ref } from 'vue'
// import { showLoadingToast, showToast } from 'vant'
import { getConsultOrderPayUrl } from '@/api'
import * as TT from '@/utils/status'

const props = defineProps<{
  show: boolean
  orderId: string | undefined
  actualPayment: number
  onClose?: () => void
  payCallback: string
}>()

const emit = defineEmits<{
  (e: 'update:show', val: boolean): void
}>()

const paymentMethod = ref<0 | 1>()

// 立即支付
const pay = async () => {
  if (paymentMethod.value === undefined) return showToast('请选择支付方式')
  showLoadingToast({ message: '跳转支付', duration: 0 })
  const res = await getConsultOrderPayUrl({
    paymentMethod: paymentMethod.value,
    orderId: props.orderId,
    payCallback: import.meta.env.VITE_APP_CALLBACK + props.payCallback
  })
  let { code, message, data } = res
  if (code === TT.STATUS.SUCCESS) {
    window.location.href = data.payUrl
  } else {
    closeToast()
    showToast(message)
  }
}
</script>

<style lang="scss" scoped>
.content {
  .amount {
    padding: 20px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .btn {
    padding: 15px;
  }
  .van-cell {
    align-items: center;
    .cp-icon {
      margin-right: 10px;
      font-size: 18px;
    }
    .van-checkbox :deep(.van-checkbox__icon) {
      font-size: 16px;
    }
  }
}
</style>
