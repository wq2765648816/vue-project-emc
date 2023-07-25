import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/user'

export const userStore = defineStore(
  'Token',
  () => {
    // 用户信息
    const user = ref<User>()
    // 设置用户，登录后使用
    const setUser = (u: User) => {
      user.value = u
    }

    const delUser = () => {
      user.value = undefined
    }
    return { user, setUser, delUser }
  },
  {
    persist: true
  }
)
