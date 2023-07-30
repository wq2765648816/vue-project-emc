<template>
  <CpNavBar rightText="注册" @click="fn1" :onBack="fn2"></CpNavBar>
  <div class="login-head">
    <h3>{{ !checked ? '密码登录' : '短信验证码登录' }}</h3>
    <a href="javascript:;" @click="checked = !checked">
      <span>{{ checked ? '密码登录' : '短信验证码登录' }}</span>
      <van-icon name="arrow" />
    </a>
  </div>
  <van-form @submit="onSubmit">
    <van-field
      v-model="userFrom.mobile"
      name="手机号"
      placeholder="请输入手机号"
      :rules="modileRules"
    ></van-field>
    <van-field
      v-model="userFrom.password"
      v-if="!checked"
      name="密码"
      :type="flag ? 'text' : 'password'"
      placeholder="请输入密码"
      :rules="passwordRules"
    >
      <template #button>
        <CpIcon
          :name="`login-eye-${flag ? 'on' : 'off'}`"
          @click="flag = !flag"
        ></CpIcon>
      </template>
    </van-field>
    <van-field
      v-else
      v-model="verificationCode"
      name="验证码"
      type="text"
      placeholder="短信验证码"
    >
      <template #button>
        <a href="javascript:;" v-if="i < 1" @click="send"> 发送验证码 </a>
        <a href="" style="color: #7eddad" v-else>{{ `${i}s后重新获取` }}</a>
      </template>
    </van-field>
    <div style="margin: 16px" class="call">
      <van-checkbox icon-size="14px" v-model="status"></van-checkbox>
      <span>
        我已同意
        <a href="javascript:;">用户协议</a>
        及
        <a href="javascript:;">隐私条款</a>
      </span>
    </div>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
    <p class="tailtext" v-if="!checked">忘记密码?</p>
  </van-form>

  <div class="Icon-thirdParty">
    <van-divider>第三方登录</van-divider>
    <img src="@/assets/qq.svg" />
  </div>
</template>

<script setup lang="ts">
import * as TS from '@/api/TS'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import { modileRules, passwordRules } from '@/utils/rules'
import { getLogin } from '@/api/index'
import { showToast, showSuccessToast, showFailToast } from 'vant'
import * as TT from '@/utils/status'
import { useUserStore } from '@/stores'
const store = useUserStore()
const router = useRouter()
const userFrom = reactive<TS.UserFrom>({
  mobile: '13230000100',
  password: 'abc12345'
})
// 短信登录和密码登录
const checked = ref<boolean>(false)
// 小眼睛
const flag = ref<boolean>(false)
// 同意复选框
const status = ref<boolean>(false)
// 计时
const i = ref<number>(0)
// 验证码
const verificationCode = ref()
// 发送按钮
const send = () => {
  i.value = 60
  let time = setInterval(() => {
    i.value = i.value - 1
    if (i.value == 0) {
      clearInterval(time)
      i.value = 0
    }
  }, 1000)
}
// 提交按钮
const onSubmit = () => {
  if (!status.value) {
    showToast('请勾选我同意')
    return
  }
  getLogin(userFrom).then((res) => {
    let { data, code, message } = res
    if (code == TT.STATUS.SUCCESS) {
      store.setUser(data)
      showSuccessToast(message)

      router.push('/')
    } else {
      showFailToast(message)
    }
  })
}

const fn1 = () => {
  showToast('暂未开启注册功能')
}
const fn2 = () => {
  checked.value = !checked.value
}
</script>

<style lang="scss" scoped>
.login-head {
  display: flex;
  padding: 25px 25px 45px;
  align-items: end;
  justify-content: space-between;
  h3 {
    font-size: 24px;
  }
  a {
    color: var(--cp-text2);
  }
}
.call {
  display: flex;
  span {
    padding-left: 6px;
    font-size: 14px;
    a {
      padding: 0 3px;
    }
  }
}
::v-deep() {
  .van-field__button {
    margin-right: 6px;
  }
}
.tailtext {
  text-align: center;
  font-size: 14px;
  color: var(--cp-text3);
}
.Icon-thirdParty {
  position: fixed;
  left: 0;
  top: 70%;
  width: 100vw;
  text-align: center;
  padding: 0 30px;
  img {
    width: 30px;
    height: 30px;
    margin-top: 5px;
  }
}
</style>
