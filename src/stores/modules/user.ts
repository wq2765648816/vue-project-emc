import { defineStore } from 'pinia'
import { ref } from 'vue'

export const numStore = defineStore(
  'cp-user',
  () => {
    // 用户信息
    const num = ref<number>(0)
    // 设置用户，登录后使用
    const setUser = () => {
      num.value++
    }
    // 清空用户，退出后使用
    return { num, setUser }
  },
  {
    persist: true
  }
)
