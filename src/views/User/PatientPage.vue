<template>
  <CpNavBar title="家庭档案"></CpNavBar>
  <div class="patient">
    <div class="patient-list loop" v-for="item in list.list" :key="item.id">
      <div class="patient-list-left">
        <p>
          <span>{{ item.name }}</span>
          <span>{{
            item.idCard.slice(0, 7) + '******' + item.idCard.slice(-4)
          }}</span>
          <span v-if="item.defaultFlag" class="defaultSpan">默认</span>
        </p>
        <p>
          <span>{{ item.genderValue }}</span>
          <span>{{ item.age }}岁</span>
        </p>
      </div>
      <div class="patient-list-right" @click="updata(item)">
        <CpIcon name="user-edit"></CpIcon>
      </div>
    </div>
    <div
      class="patient-list defaultBox"
      v-if="list.list.length <= 6"
      @click="modalBox"
    >
      <van-icon name="plus" size="26" />
      <p>添加患者</p>
    </div>
    <p class="footerText">最多可添加6人</p>
  </div>
  <ModalBox ref="Modal" v-if="flag" @click="onreturn"></ModalBox>
</template>

<script setup lang="ts">
import { getPatientMylist } from '@/api'
import CpNavBar from '@/components/CpNavBar.vue'
import { reactive, onMounted } from 'vue'
import * as TS from '@/api/TS'
import * as TT from '@/utils/status'
import { showFailToast } from 'vant'
import CpIcon from '@/components/CpIcon.vue'
import ModalBox from './components/ModalBox.vue'
import { ref, nextTick } from 'vue'
const flag = ref<boolean>(false)
const Modal = ref()

const list = reactive<TS.getPatientMylistDataList>({
  list: []
})

// 请求数据列表
const getList = async () => {
  let res = await getPatientMylist()
  let { code, data, message } = res
  if (code === TT.STATUS.SUCCESS) {
    list.list = data
  } else {
    showFailToast(message)
  }
}

// 请求数据渲染页面
onMounted(() => {
  getList()
})

// 点击打开模态框
const modalBox = () => {
  flag.value = true
  nextTick(() => {
    Modal.value.open()
  })
}
// 编辑
const updata = (val: TS.patientData) => {
  flag.value = true
  nextTick(() => {
    Modal.value.open(val)
  })
}
//  关闭模态框
const onreturn = () => {
  flag.value = false
  getList()
}
</script>

<style lang="scss" scoped>
.patient {
  padding: 0 15px;
  &-list {
    height: 90px;
    border-radius: 6px;
    padding: 20px 15px;
    background-color: var(--cp-bg);
    margin-top: 15px;
    &-right {
      color: var(--cp-tag);
    }
    &-left {
      p {
        line-height: 30px;
        font-size: 14px;
        span {
          display: inline-block;
        }
        &:first-child {
          span:first-child {
            width: 80px;
            font-size: 16px;
          }
          span:nth-child(2) {
            width: 160px;
            color: var(--cp-text2);
          }
          .defaultSpan {
            color: #fff;
            display: inline;
            background-color: var(--cp-primary);
            padding: 1px 2px;
            border-radius: 3px;
          }
        }
        &:last-child {
          color: var(--cp-tip);
          span:first-child {
            width: 35px;
          }
        }
      }
    }
  }
  .defaultBox {
    text-align: center;
    color: var(--cp-primary);
  }
  .footerText {
    padding-top: 8px;
    color: var(--cp-tag);
  }
  .loop {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
