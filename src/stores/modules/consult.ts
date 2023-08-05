import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ConsultType } from '@/enums'
import type { ParialConsult, ConsultIllness } from '@/types/consult'
export const ConsultStore = defineStore(
  'Consult',
  () => {
    // 用户信息
    const consult = ref<ParialConsult>({})
    // 记录问诊类型
    const setType = (type: ConsultType) => (consult.value.type = type)
    // 记录问诊级别
    const setIllnessType = (type: 0 | 1) => (consult.value.illnessType = type)
    // 记录科室
    const setDep = (depId: string) => (consult.value.depId = depId)
    // 记录病情
    const setIllness = (illness: ConsultIllness) => {
      consult.value.illnessDesc = illness.illnessDesc
      consult.value.illnessTime = illness.illnessTime
      consult.value.consultFlag = illness.consultFlag
      consult.value.pictures = illness.pictures
    }
    // 记录患者
    const setPatient = (id: string) => (consult.value.patientId = id)
    // 记录优惠卷
    const setCoupon = (id: string) => (consult.value.couponId = id)
    // 清楚数据
    const clear = () => (consult.value = {})
    return {
      setType,
      consult,
      setIllnessType,
      setDep,
      setIllness,
      setPatient,
      setCoupon,
      clear
    }
  },
  {
    persist: true
  }
)
