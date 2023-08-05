<template>
  <div class="consult-pay" v-if="pathient && LoadData">
    <cp-nav-bar title="支付" />
    <div class="pay-info">
      <p class="tit">图文问诊 {{ pathient.actualPayment }} 元</p>
      <img src="@/assets/avatar-doctor.svg" class="img" />
      <p class="desc">
        <span>极速问诊</span>
        <span>自动分配医生</span>
      </p>
    </div>
    <van-cell-group>
      <van-cell title="优惠卷" :value="`- ¥${pathient.couponDeduction}`" />
      <van-cell title="积分抵扣" :value="`- ¥${pathient.pointDeduction}`" />
      <van-cell
        title="实付款"
        :value="`¥${pathient?.actualPayment}`"
        class="pay-price"
      />
    </van-cell-group>
    <div class="pay-space"></div>
    <van-cell-group>
      <van-cell
        title="患者信息"
        :value="`${LoadData.name} | ${LoadData.genderValue} | ${LoadData.age}岁`"
      />
      <van-cell title="积分抵扣" :label="store.consult.illnessDesc" />
    </van-cell-group>
    <div class="TailTitle">
      <van-checkbox v-model="checked">
        我已同意
        <a href="javascript" class="text">支付协议</a>
      </van-checkbox>
    </div>
    <van-submit-bar
      :price="pathient.actualPayment * 100"
      button-text="立即支付"
      text-align="left"
      button-type="primary"
      :loading="loading"
      @submit="next"
    />
    <!-- 支付抽屉，控制面板  -->
    <cp-pay-sheet
      :show="show"
      :order-id="orderId"
      :on-close="onClose"
      :actual-payment="pathient.actualPayment"
      pay-callback="/room"
    ></cp-pay-sheet>
  </div>
  <div class="consult-pay-page" v-else>
    <cp-nav-bar title="支付" />
    <!-- 骨架组件 -->
    <van-skeleton title :row="10" style="margin-top: 18px" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getPatientPre, getPatientInfo, getPatientOrder } from '@/api'
import { ConsultStore } from '@/stores'
// import * as TS from '@/api/TS'
import { showFailToast, showDialog, showToast, showConfirmDialog } from 'vant'
import * as TT from '@/utils/status'
import type { Patient, getPatientPreData, ParialConsult } from '@/types/consult'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
const router = useRouter()
const store = ConsultStore()

const pathient = ref<getPatientPreData>()

// 获取就诊信息
const getList = async () => {
  let res = await getPatientPre({
    type: store.consult.type,
    illnessType: store.consult.illnessType
  })
  let { code, message, data } = res
  if (code !== TT.STATUS.SUCCESS) return showFailToast(message)
  pathient.value = data
  // 记录优惠卷ID
  store.setCoupon(data.couponId)
  // console.log(res)
}
const LoadData = ref<Patient>()
// 获取患者信息
const getLoadData = async () => {
  if (!store.consult.patientId) return
  let res = await getPatientInfo(store.consult.patientId)
  let { code, message, data } = res
  if (code !== TT.STATUS.SUCCESS) return showFailToast(message)
  LoadData.value = data
  // console.log(res)
}
type Key = keyof ParialConsult
onMounted(() => {
  // 生成订单需要的信息不完整的时候需要提示
  const validKeys: Key[] = [
    'type',
    'illnessDesc',
    'depId',
    'illnessTime',
    'illnessType',
    'consultFlag',
    'patientId'
  ]
  const vaild = validKeys.every((key) => store.consult[key] !== undefined)
  if (!vaild) {
    return showDialog({
      title: '温馨提示',
      message:
        '问诊信息不完整请重新填写，如有未支付的问诊订单可在问诊记录中继续支付！',
      closeOnPopstate: false
    }).then(() => {
      router.push('/')
    })
  }
  getLoadData()
  getList()
})

// 同意
const checked = ref<boolean>(false)

// 生成订单
const show = ref(false)
const loading = ref(false)
const orderId = ref<string | undefined>('')
// 下一步
const next = async () => {
  if (!checked.value) return showToast('请勾选我同意支付协议')
  loading.value = true
  // 发送生成订单的请求
  const res = await getPatientOrder(store.consult)
  let { code, data, message } = res
  if (code !== TT.STATUS.SUCCESS) return showToast(message)

  loading.value = false
  store.clear()
  orderId.value = data.id
  show.value = true
}

// 提示1: 取消支付将无法获取医生回复，医生接诊名额有限，是否确认关闭？
// 提示2: 问诊信息不完整请重新填写，如有未支付的问诊订单可在问诊记录中继续支付！

// 用户引导
onBeforeRouteLeave(() => {
  if (orderId.value) return false
})

const onClose = () => {
  return showConfirmDialog({
    title: '温馨提示',
    message: '取消支付将无法获取医生回复，医生接诊名额有限，是否确认关闭？',
    cancelButtonText: '狠心离开',
    confirmButtonText: '继续支付'
  })
    .then(() => {
      return false
    })
    .catch(() => {
      orderId.value = ''
      router.push('/user/consult')
      return true
    })
}
</script>

<style lang="scss" scoped>
.consult-pay-page {
  padding: 46px 0 50px 0;
}
.consult-pay {
  .pay-info {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 10px 15px;
    .tit {
      font-size: 16px;
      width: 100%;
      margin-bottom: 6px;
    }
    .img {
      margin-right: 10px;
      width: 38px;
      height: 38px;
      border-radius: 4px;
      overflow: hidden;
    }
    .desc {
      flex: 1;
      > span {
        display: block;
        color: var(--cp-tag);
        &:first-child {
          font-size: 16px;
          color: var(--cp-text2);
        }
      }
    }
  }
  .pay-space {
    height: 12px;
    background: var(--cp-bg);
  }
  ::v-deep(.pay-price) {
    .van-cell__value {
      span {
        font-size: 16px;
        color: var(--cp-price);
      }
    }
  }
  .TailTitle {
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .text {
      color: var(--cp-primary);
    }
  }
  ::v-deep() {
    .van-submit-bar__button {
      font-weight: normal;
      width: 160px;
    }
  }
}
</style>
