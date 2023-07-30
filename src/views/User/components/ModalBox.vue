<template>
  <van-popup
    v-model:show="showRight"
    position="right"
    :style="{ width: '100%', height: '100%', padding: '0px' }"
  >
    <CpNavBar
      :title="patient.id ? '编辑患者' : '添加患者'"
      right-text="保存"
      :on-back="() => (showRight = false)"
      @click="add"
    ></CpNavBar>
    <van-form
      autocomplete="off"
      ref="form"
      validate-trigger="onSubmit"
      :show-error="false"
      :show-error-message="false"
    >
      <van-cell-group inset>
        <van-field
          v-model="patient.name"
          label="真实姓名"
          placeholder="请输入真实姓名"
          :rules="nameRules"
        />
        <van-field
          v-model="patient.idCard"
          label="身份证号"
          placeholder="请输入身份证号"
          :rules="idCardRules"
        />
        <van-field label="性别">
          <!-- 单选按钮组件 -->
          <template #input>
            <CpRadioBtn :option="option" v-model="patient.gender"></CpRadioBtn>
          </template>
        </van-field>
        <van-field label="默认就诊人">
          <template #input>
            <van-checkbox
              v-model="defaultFlag"
              :icon-size="18"
              round
            ></van-checkbox>
          </template>
        </van-field>
      </van-cell-group>
    </van-form>
    <!-- 删除按钮 -->
    <van-action-bar v-if="patient.id">
      <van-action-bar-button text="删除" @click="ondelete" />
    </van-action-bar>
  </van-popup>
</template>

<script setup lang="ts">
import CpNavBar from '@/components/CpNavBar.vue'
import { ref, reactive, computed } from 'vue'
import CpRadioBtn from '@/components/CpRadioBtn.vue'
import {
  type FormInstance,
  showToast,
  showSuccessToast,
  showFailToast
} from 'vant'
import { addPatientAdd, updataPatientUpdate, delPatientDel } from '@/api/index'
import * as TS from '@/api/TS'
import * as TT from '@/utils/status'
const showRight = ref<boolean>(false)
interface Emits {
  (name: 'click'): void
}

// 校验name
const nameRules = [
  { required: true, message: '请输入真实姓名' },
  { pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/, message: '中文字符2-16个字符' }
]
// 校验身份证号码
const idCardRules = [
  { required: true, message: '请输入真实身份证号' },
  {
    pattern:
      /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
    message: '身份证号格式不正确'
  }
]

const option = [
  { label: '男', value: 1 },
  { label: '女', value: 0 }
]

let patient = reactive<TS.patientData>({
  name: '',
  idCard: '',
  gender: 1,
  defaultFlag: 0
})

// 支持复选框
const defaultFlag = computed({
  get: () => (patient.defaultFlag === 1 ? true : false),
  set: (value) => (patient.defaultFlag = value ? 1 : 0)
})

const emit = defineEmits<Emits>()
// 开启模态框
const open = (val: TS.patientData) => {
  showRight.value = true
  if (val) {
    patient = val
  }
}

// 关闭模态框
const onreturn = () => {
  showRight.value = false
  setTimeout(() => {
    emit('click')
  }, 500)
}

// 删除患者
const ondelete = async () => {
  let res = await delPatientDel({ id: patient.id })
  let { code, message } = res
  if (code === TT.STATUS.SUCCESS) {
    showSuccessToast('删除成功')
    onreturn()
  } else {
    showFailToast(message)
  }
}

// 进行提交
const form = ref<FormInstance>()
const add = async () => {
  await form.value
    ?.validate()
    .then(() => {
      // 取出身份证倒数第二位，%2之后 1 男  0 女
      let age = patient.idCard.charAt(patient.idCard.length - 2)
      // 判断身份证和性别是否相同
      if (
        (~~age % 2 === 0 && patient.gender === 0) ||
        (~~age % 2 !== 0 && patient.gender === 1)
      ) {
        if (patient.id) {
          // 编辑
          delete patient.age
          delete patient.genderValue
          updataPatientUpdate(patient).then((res) => {
            let { code, message } = res
            if (code === TT.STATUS.SUCCESS) {
              showSuccessToast('编辑成功')
              onreturn()
            } else {
              showFailToast(message)
            }
          })
        } else {
          // 添加
          addPatientAdd(patient).then((res) => {
            let { code, message } = res
            if (code === TT.STATUS.SUCCESS) {
              showSuccessToast(message)
              onreturn()
            } else {
              showFailToast(message)
            }
          })
        }
      } else {
        showToast('性别和身份证不符')
        return
      }
    })
    // 校验不通过
    .catch((err) => {
      showToast(err[0].message)
    })

  // await
}
// 暴露方法
defineExpose({
  open
})
</script>

<style lang="scss" scoped>
.van-cell-group {
  margin: 0;
}
.van-action-bar {
  margin: 0 10px 10px;
  .van-button {
    background-color: var(--cp-bg);
    color: var(--cp-price);
  }
}
</style>
