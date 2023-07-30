import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/types/user'

export const useUserStore = defineStore(
  'Token',
  () => {
    // 用户信息
    const user = ref<any>()
    // 设置用户，登录后使用
    const setUser = (u: User) => {
      user.value = u
      console.log(user, 'user')
    }
    // 删除用户信息
    const delUser = () => {
      user.value = null
    }
    return { user, setUser, delUser }
  },
  {
    persist: true
  }
)
