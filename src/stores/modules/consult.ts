import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type ParialConsult } from '@/types/consult'
export const ConsultStore = defineStore(
  'Consult',
  () => {
    // 用户信息
    const consult = ref<ParialConsult>({})
    // 记录问诊级别
    const setIllnessType = (type: 0 | 1) => (consult.value.illnessType = type)
    // 记录科室
    const setDep = (depId: string) => (consult.value.depId = depId)
    return { consult, setIllnessType, setDep }
  },
  {
    persist: true
  }
)
